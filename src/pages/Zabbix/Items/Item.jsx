import React,{useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import styles from './Item.module.css';
import { useGlobalContext } from '../../../contexts/context2'
import { Header } from '../../../components';
import Plot from 'react-plotly.js';
import SsidChartIcon from '@mui/icons-material/SsidChart';

import {Container,Button,IconButton,Typography,Modal,Grid,FormControl,CircularProgress,Select,MenuItem,InputLabel,Avatar,Paper} from '@mui/material';
import axios from 'axios'

const Items = () => {

const {id} = useParams();
const val = 1234;
const bread = [{value:"Dashboard",nav:"dashboard"},{value:"Zabbix",nav:"Zabbix"},{value:"Hosts",nav:`hosts/${val}`},{value:"Items",nav:`item/${id}`}]
const [open,setOpen] = useState(false)
const {token,link,baseurl} = useGlobalContext()
const [item,setItem] = useState([])
const [load,setLoad] = useState(true)
const [isLoading, setIsLoading] = useState(true);
const [xaxis,setXaxis] = useState(["12.00am","1.00am","2.00am","3.00am","4.00am","5.00am"])
const [yaxis,setYaxis] = useState([])



const handleOpen = (itemid) => {

	setOpen(true)
	const timefrom = Math.floor((new Date().getTime() - 86400000) / 1000)
	const timetill = Math.floor(new Date().getTime() / 1000)
	const body2 = {

  "jsonrpc": "2.0",
  "method": "history.get",
  "params": {
    "output": "extend",
    "history": 0, 
    "itemids": [`${itemid}`], 
    "sortfield": "clock",
    "sortorder": "DESC",
    "time_from": `${timefrom}`, 
    "time_till": `${timetill}`, 
    "limit": "360" 
  },
  "auth": token,
  "id": "1"
}


const newbody = {
  
  content:body2,
  header: { 'Content-Type': 'application/json-rpc' },
  url: link,
};

axios.post(`http://${baseurl}/actionzabbix/zabbixcharts`,newbody)
      .then(function (response) {
        let sum  = 0
        let count = 0
        let temp = 0
        let ydata = []
        for(let i=0;i<response.data.result.result.length;i++)
        {
             sum = sum + parseFloat(response.data.result.result[i].value)
            count = count + 1
            if(count == 60)
            {
                count = 0
                sum = sum/60
                temp = sum
                sum = 0
                ydata.push(temp)
                ydata.reverse()
            }
        }
        console.log(response.data)
        setYaxis(ydata)
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      });


}
const handleClose = () => setOpen(false);


useEffect(() => {



const body={

    "jsonrpc": "2.0",
    "method": "item.get",
    "params": {
        "output": ["itemid", "name", "key_", "lastvalue"],
        "hostids": `${id}`
    },
    "auth": `${token}`,
    "id": 1
}


const newbody2 = {
  
  content:body,
  header: { 'Content-Type': 'application/json-rpc' },
  url: link,
};
axios.post(`http://${baseurl}/actionzabbix/zabbixitems`,newbody2)
      .then(function (response) {

      	const newarr1 = response.data.result.result?.filter((i) => {

      
      if(i.key_ === "system.uname" || i.name === 'Number of threads' || i.name === 'Network interfaces WMI get'){
        return false
      }
      return true

        })

        const newarr2 = newarr1?.map((i) => {

          if(i.key_ === 'icmppingsec')
          {
            let sec = Number(i.lastvalue).toFixed(3) + ' s'
            return {...i,lastvalue:sec}
          }
          if(i.key_ === 'system.cpu.util')
          {
            let cpu = (Number(i.lastvalue)*100).toFixed(2) + ' %'
            return {...i,lastvalue:cpu}
          }
          if(i.name === 'Swap Utilization')
          {
             let data = Number(i.lastvalue).toFixed(2) + ' %'
             return {...i,lastvalue:data}
          }
          if(i.key_ === 'system.uptime')
          {
            let hr = (Number(i.lastvalue)/(60*60)).toFixed(2) + ' hrs'
            return {...i,lastvalue:hr}
          }

          if(i.key_ === 'system.localtime')
          {
             let date = new Date(i.lastvalue * 1000);
              const options = {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                            timeZone: "GMT"
                          };

              const formattedDate = date.toLocaleString("en-US", options) + '(GMT)';
              return {...i,lastvalue:formattedDate} 
          }
          if(i.key_ === 'system.swap.size[,total]' || i.key_ === 'vm.memory.size[total]' || i.key_ === 'vm.memory.size[used]')
          {
            let gb = (Number(i.lastvalue)/(1024*1024*1024)).toFixed(2) + ' GB'
            return {...i,lastvalue:gb}
          }
          if(i.key_ === 'vm.memory.util')
          {
            let mem = Number(i.lastvalue).toFixed(2) + ' %'
            return {...i,lastvalue:mem}

          }
          return i
        })
        setItem(newarr2)
       setLoad(false)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });


},[])


	return (

		<>
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page-2" title="Items" bread={bread}/>
		<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <div className={styles.Box}>
      {isLoading?(<CircularProgress />):(<Plot
        data={[
          {
            x: xaxis,
            y: yaxis,
            type: 'line',
            marker: {color: 'red'},
          }
        ]}
        layout={ {width: 400, height: 240, title: 'CPU Utilization'} }
      />)}
      </div>
      </Modal>
		
			{load?<CircularProgress />:(<div className="flex m-3 flex-wrap  gap-2 ">
				{item?.map((i,index) => (

          <div className={styles.card} key={index} style={{position:'relative'}} >
      <div className={styles.cardname}>{i.name}</div>
      {i.key_ === 'system.cpu.util' && <IconButton   onClick={() => handleOpen(i.itemid)} style={{position:'absolute',top:'5px',right:'5px',borderRadius:'50%',backgroundColor:'#e74c3c',border:'none'}} ><SsidChartIcon /></IconButton>}
      <div className={styles.cardvalue} style={{color:i.lastvalue === ""?'red':'green'}}>{i.lastvalue === ""?'Value not found':i.lastvalue}</div>
    </div>

					// <Grid item xs={3} sm={3} md={4} lg={4}key={index}>
					// 	<Paper className={styles.paper}>
					// 		<div style={{position:'relative'}}>
					// 		<h2 style={{marginBottom:'16px'}}>{i.name}</h2>
					// 		{i.key_ === 'system.cpu.util' && <IconButton   onClick={() => handleOpen(i.itemid)} style={{position:'absolute',top:0,right:0,borderRadius:'50%',backgroundColor:'#e74c3c',border:'none'}} ><SsidChartIcon /></IconButton>}
					// 		</div>
					// 		<p style={{marginBottom:'16px',color:i.lastvalue === ""?'red':'green',fontSize:'28px',paddingRight:'2px'}}>{i.lastvalue === ""?'Value not found':i.lastvalue}</p>
						
					// 	</Paper>
					// </Grid>
					))}
			</div>
      )}
			
		</div>
		</>

		)
}

export default Items
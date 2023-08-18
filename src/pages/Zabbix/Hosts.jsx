import React,{useEffect,useState} from 'react'
import { useGlobalContext } from '../../contexts/context2'
import {useParams,useNavigate} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import DetailsIcon from '@mui/icons-material/Details';
import { Header } from '../../components';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {Container,Button,Typography,Grid,FormControl,Select,MenuItem,InputLabel,Avatar,InputAdornment,TextField,IconButton,Modal} from '@mui/material';
import axios from 'axios'
// import styles from './details.module.css';


const Details = () => {

const {token,link} = useGlobalContext()
const navigate = useNavigate()
const {id} = useParams();
const [host,setHost] = useState([])

const handleItem = (id) => {

console.log(id)
navigate(`/item/${id}`)

}

useEffect(() => {
  console.log(token)
let body
let arr = []
if(JSON.parse(localStorage.getItem('myData')).result.host.length >0)
{
  const groupid = JSON.parse(localStorage.getItem('myData')).result.host?.map((i) => {

    arr.push(i.id)
  })
  console.log(arr)
  body={
    "jsonrpc": "2.0",
    "method": "host.get",
    "params": {
        "output": ["hostid", "name", "status","available","ip"],
        "groupids":arr,
         "selectInterfaces": ["ip"]
    },
    "auth": token,
    "id": 1
}
}
else
{
   

 body={
    "jsonrpc": "2.0",
    "method": "host.get",
    "params": {
        "output": ["hostid", "name", "status","available","ip"],
         "selectInterfaces": ["ip"]
    },
    "auth": token,
    "id": 1
}

}

const newbody = {
  
  content:body,
  header: { 'Content-Type': 'application/json-rpc' },
  url: link,
};


	
	
	// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
	axios.post('http://localhost:5000/actionzabbix/zabbixhosts',newbody)
      .then(function (response) {
      	setHost(response.data.result.result)
      	console.log(response.data)
      
      })
      .catch(function (error) {
        console.log(error)
      });


},[])

const rows = host?.map((i,index) =>{

	return {
		id:index,
		hostid:i.hostid,
		name:i.name,
		status:i.status,
    available:i.available,
		ip:i.interfaces[0].ip
	}
} )

const columns = [
  { field: 'id', headerName: 'SNo', width: 70 },
  { field: 'name', headerName: 'Host', width: 200 },
  { field: 'ip', headerName: 'Ip', width: 150 },
  { field: 'status', headerName: 'Status', width: 120,renderCell:(params) =>{
    return(
      <span style={{color:params.row.status === '0'?'green':'red'}}>{params.row.status === '0'?'Enabled':'Disabled'}</span>
      )
  } },
  { field: 'available', headerName: 'Available', width: 120 ,renderCell:(params) =>{

    return(
      <span style={{color:params.row.available === '1'?'green':'red'}}>{params.row.available === '1'?'Available':'Unavailable'}</span>
      )
  }},
  {field: 'getdetail',headerName: 'getDetail',width: 140,renderCell: (params) => {
      return (
        <Button variant="contained" style={{backgroundColor:'#ba5454'}}onClick={() => handleItem(params.row.hostid)}>
          <KeyboardDoubleArrowRightIcon />
        </Button>
      );
    },
}]


	return (
		<>
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header  title="Hosts" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Zabbix",nav:"Zabbix"},{value:"Hosts",nav:`hosts/${id}`}]}/>
		<div>
		<div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[10]}
        
      />
    </div>
		</div>
		</div>
		</>
		)
}


export default Details
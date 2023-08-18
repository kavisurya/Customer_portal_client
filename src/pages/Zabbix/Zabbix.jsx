import React,{useEffect,useState} from 'react'
// import styles from './Zabbix.module.css';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../../contexts/context2'
import Post from '../../components/Post'
import Zabbiximg from '../../data/zabbix.png'
import { Header } from '../../components';
import {Container,Button,Typography,Grid,FormControl,Select,Menu,MenuItem,InputLabel,Avatar,InputAdornment,TextField,IconButton,Modal} from '@mui/material';

const Zabbix = () => {

const [zabbix,setZabbix] = useState([])

const {setToken,setLink,token,setCustomer,DeletePost,baseurl} = useGlobalContext()

const [anchorEl, setAnchorEl] = useState(null);
const navigate = useNavigate()


useEffect(() => {

axios.get(`http://${baseurl}/action/zabbix`)
      .then(function (response) {


       setZabbix(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });


},[])

const handleDelete = (e) => {

console.log(e)
DeletePost(e)


}

const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

 
  

  const handleMenuClose1 = () => {
    setAnchorEl(null);
    
    
   
  };

  const handleSubMenuClose = (data) => {
    setAnchorEl(null);
    setCustomer(data)
    navigate('/zreports')
    
    
    
  };



const handleConnect = (data) => {

	if(token)
	{
		setToken(null)
		return
	}

	setLink(data.url)
	console.log(data.name,data.password)
	const newurl = '/api'
	const header = { 'Content-Type': 'application/json-rpc'}
	const body={
    "jsonrpc": "2.0",
    "method": "user.login",
    "params": {
        "user": `${data.name}`,
        "password": `${data.password}`
    },
    "id": 1,
    "auth": null
}

const newbody = {

  content: {
    jsonrpc: "2.0",
    method: "user.login",
    params: {
      user: data.name,
      password: data.password,
    },
    id: 1,
    auth: null,
  },
  header: { 'Content-Type': 'application/json-rpc' },
  url: data.url,
};

console.log(newbody)

	// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
	// axios.post(newurl,body,{header:header})
  //     .then(function (response) {

  //     	console.log(response.data)
  //     setToken(response.data.result)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     });

axios.post(`http://${baseurl}/actionzabbix/zabbixauth`,newbody)
      .then(function (response) {

      	console.log(response.data)
      setToken(response.data.result.result)
      })
      .catch(function (error) {
        console.log(error)
      });

	// AuthZab(data)

}


	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <div className='w-full flex justify-between'>
    <Header  title="Zabbix" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Zabbix",nav:"Zabbix"}]}/>
    <div>
     <Button onClick={handleMenuClick} variant='contained' color='secondary'>Create Report</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose1}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
      
        
        
       <MenuItem onClick={() => handleSubMenuClose("Tanmiah")} >Tanmiah</MenuItem>
       <MenuItem onClick={() => handleSubMenuClose("Maadaniyah")} >Maadaniyah</MenuItem>

          
       
        
        
        
        
      </Menu>

      
</div>
    </div>
    <div className="flex m-3 flex-wrap  gap-3 ">
    {zabbix?.map((i) => (
				
			<Post post={i} img={Zabbiximg} handleConnect={handleConnect} handleDelete={handleDelete}/>
					
		))}
    </div>

    </div>
		)
}

export default Zabbix
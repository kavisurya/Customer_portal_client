import React,{useState,useEffect} from 'react'
import { Header } from '../../components';
import { FaAws,FaQuora } from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom";
import { VscAzure } from "react-icons/vsc";
import { useGlobalContext } from '../../contexts/context2'
import {Container,Button,Typography,Avatar,InputAdornment,TextField,IconButton} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';


const CostManage = () => {

	const navigate = useNavigate();

	const {setService12} = useGlobalContext()

	const [service,setService] = useState([

	{
		Service:'AWS',
		Icon:<FaAws />
	},
	{
		Service:'Azure',
		Icon:<VscAzure />
	},
	{
		Service:'GCP',
		Icon:<GoogleIcon />
	}
	
		])

	const [customer,setCustomer] = useState([

	{
		Customer:'Tanmiah',
		Icon:<FaAws />
	},
	{
		Customer:'Maadaniyah',
		Icon:<VscAzure />
	},
	{
		Customer:'Personal',
		Icon:<GoogleIcon />
	},
	{
		Customer:'DigiVerZ',
		Icon:<GoogleIcon />
	}

	
		])


	const handleService = (val) => {

			if(val === 'AWS' || val === 'Azure' || val === 'GCP')
			{
			setService12({name:'Service',val:val})
			navigate('/costservices')

		}
		else{
			setService12({name:'Customer',val:val})
			navigate('/costservices')
		}
		

	}

	return(

		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
   <Header  title="Cost Management" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Cost",nav:"CostManagement"}]} />
   
   <div className='App'>
   <div className='Services'>
   <h1>By Services</h1>
   <div className='flex flex-wrap gap-10 m-10'>
   	{
   		service.map((i) => {

   			return (

   				<Button sx={{ backgroundColor: '#ff0000', color: '#ffffff' }} value={i.Service} variant="contained" startIcon={i.Icon} style={{width:'150px'}} onClick={(e) =>handleService(e.target.value) }>
				  {i.Service}
				</Button>

   				)
   		})
   	}
   </div>
   </div>
   <div className='Customers'>
   <h1>By Customers</h1>
   <div className='flex flex-wrap gap-10 m-10'>
   		{
   		customer.map((i) => {

   			return (

   				<Button sx={{ backgroundColor: '#ff0000', color: '#ffffff' }} variant="contained" value={i.Customer} startIcon={i.Icon} style={{width:'150px'}} onClick={(e) =>handleService(e.target.value)} >
				  {i.Customer}
				</Button>

   				)
   		})
   	}
   </div>

   </div>
   </div>
   </div>

		)
}


export default CostManage
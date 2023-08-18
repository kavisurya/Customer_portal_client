import React,{useState,useEffect} from 'react'
import { Header } from '../../../components';
import { FaAws,FaQuora } from "react-icons/fa";
import axios from 'axios';
import {Link,useNavigate} from "react-router-dom";
import { VscAzure } from "react-icons/vsc";
import { useGlobalContext } from '../../../contexts/context2'
import Post from '../../../components/Post'
import AWSImg from '../../../data/aws.png'
import AzureImg from '../../../data/Azure.jpg'
// import S3 from '../../data/Picture3.png'
// import Ec2 from '../../data/Picture1.png'
// import RedShift from '../../data/Picture4.png'
// import ECS from '../../data/Picture5.png'

import {Container,Button,Typography,Avatar,InputAdornment,TextField,IconButton} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';


const CostServices = () => {

	const navigate = useNavigate();
const {setToken,setLink,setAwscred,service12,setService12,setAzurecred,DeletePost,baseurl} = useGlobalContext()

	const [data,setData] = useState([])

	const handleDelete = (e) => {

console.log(e)
DeletePost(e)


}

const handleConnect = (e) => {

	if(e.connector === 'AWS')
	{
	
	console.log(e)
	setAwscred({accesskey:e.name,secret:e.password,region:e.url})
	navigate('/Cost')
	}
	else if(e.connector === 'Azure')
	{
		
	console.log(e)
	setAzurecred({subscription:e.url,tenant:e.tenant,clientid:e.name,clientsecret:e.password})
	console.log(e)
	navigate('/AzureCost')
	}

	
	
}


	useEffect(() => {

		console.log(service12)

		axios.post(`http://${baseurl}/action/cusservice`,service12)
      .then(function (response) {

        
       setData(response.data)
        console.log(response.data)
        
      })
      .catch(function (error) {
        console.log(error)
        
      });

	},[service12])

	
	return(

		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
   <Header  title={service12.name} bread={[{value:"Dashboard",nav:"dashboard"},{value:"Services",nav:"Services"}]} />
   
   <div className='App'>
        <div className="flex m-3 flex-wrap  gap-3 ">
    {data?.map((i) => (
				
			<Post post={i} img={i.connector === 'AWS'?AWSImg:AzureImg} handleConnect={handleConnect} handleDelete={handleDelete}/>
					
		))}
    </div>
   
   </div>
   </div>

		)
}


export default CostServices
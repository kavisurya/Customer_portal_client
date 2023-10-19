import React,{useState,useEffect} from 'react'
import axios from 'axios'
import styles from './Azure.module.css';
import AzureImg from '../../data/azure.png'
import { Header } from '../../components';
import Post from '../../components/Post';
import { useNavigate,Link } from "react-router-dom";
import { useGlobalContext } from '../../contexts/context2'
import AWSImg from '../../data/aws.jfif'
import {CircularProgress} from '@mui/material';
import S3 from '../../data/Picture3.png'
import Ec2 from '../../data/Picture1.png'
import RedShift from '../../data/Picture4.png'
import ECS from '../../data/Picture5.png'
import Image1 from '../../data/vm.svg';
import Image2 from '../../data/storageacc.svg';
import Image3 from '../../data/Security.svg';
import Image4 from '../../data/Metrics.svg';
import {Container,Button,Typography,Grid,FormControl,Select,Menu,MenuItem,InputLabel,Avatar,InputAdornment,TextField,IconButton,Modal} from '@mui/material';


const Azure = () => {

	const [azure,setAzure] = useState([])
	const [load, setLoad] = useState(true);
	const {setToken,status,setLink,setAzurecred,DeletePost,baseurl} = useGlobalContext()
const navigate = useNavigate()

const column=[
		{
			name:"VM",
			img:Image1
		},
		{
			name:"Metrics",
			img:Image4
		},
		{
			name:"Cost",
			img:Image2
		}
		,

	{
			name:"Security",
			img:Image3
		}
		
	]

const [open,setOpen] = useState(false)

const handleClose = () => {


  setOpen(false)
  setAzurecred({subscription:'',tenant:'',clientid:'',clientsecret:''})
};

const handleServices = (i) => {


if(i.name === 'VM')
{
	navigate('/AzureVM')
}
else if(i.name === 'Metrics')
{
	navigate('/azuremetrics')
}
else if(i.name === 'Cost')
{
	navigate('/AzureCost')
}

  
};

const handleDelete = (e) => {

console.log(e)
DeletePost(e)


}

const handleConnect = (e) => {

	setOpen(true)
	console.log(e)
	setAzurecred({subscription:e.url,tenant:e.tenant,clientid:e.name,clientsecret:e.password})
	console.log(e)
	
}


	useEffect(() => {



axios.get(`http://${baseurl}/action/azure`)
      .then(function (response) {

      	 setAzure(response.data)
      
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });


	},[status])





	return (
		 <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header  title="Azure" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Azure",nav:"Azure"}]}  />
        
        <Modal
        open={open}
        onClose={handleClose}
      >
        <div className={styles.Box}>
        <div style={{borderBottom:'1px solid gray',fontSize:'25px'}}>Services</div>
        <div className="flex m-3 flex-wrap  gap-5 ">
        
        {
        	column.map((i) => {


        		return (

        			<div className={styles.container} onClick={() => handleServices(i)}>
				    <img src={i.img} alt='S3' width='50px' height='50px' />
				    <p>{i.name}</p>
				     </div>

        			)
        	})
        }
       
         
         
   
  
        </div>
        </div>

    </Modal>
         <div className="flex m-3 flex-wrap  gap-6 ">
    {azure?.map((i) => (
				
			<Post post={i} img={AzureImg} handleConnect={handleConnect} handleDelete={handleDelete} />
					
		))}
    </div>
      
		</div>
		)
}

export default Azure
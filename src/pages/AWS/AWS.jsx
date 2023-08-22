import React,{useState,useEffect} from 'react'
import { Header } from '../../components';
import AWS from 'aws-sdk';
import axios from 'axios'
import styles from './Aws.module.css';
import { useNavigate,Link } from "react-router-dom";
import { useGlobalContext } from '../../contexts/context2'
import Post from '../../components/Post'
import AWSImg from '../../data/aws.png'
import S3 from '../../data/Picture3.png'
import Ec2 from '../../data/Picture1.png'
import RedShift from '../../data/Picture4.png'
import ECS from '../../data/Picture5.png'
import {Container,Button,Typography,Grid,FormControl,Select,Menu,MenuItem,InputLabel,Avatar,InputAdornment,TextField,IconButton,Modal} from '@mui/material';


const AWSApp = () => {

const [aws,setAws] = useState([])
const {setToken,setLink,setAwscred,DeletePost,baseurl} = useGlobalContext()
const navigate = useNavigate()

const handleDelete = (e) => {

console.log(e)
DeletePost(e)


}

const column=[
		{
			name:"S3",
			img:S3
		},
		{
			name:"Cost",
			img:ECS
		},
		{
			name:"Ec2",
			img:Ec2
		}
		,

	{
			name:"RedShift",
			img:RedShift
		}
		
	]


const [open,setOpen] = useState(false)

const handleClose = () => {


  setOpen(false)
  setAwscred({accesskey:'',secret:'',region:''})
};

const handleServices = (i) => {


if(i.name === 'S3')
{
	navigate('/s3')
}
else if(i.name === 'Ec2')
{
	navigate('/ec2')
}
else if(i.name === 'Cost')
{
	navigate('/Cost')
}

  
};


  // const toggle = () => setModal(!modal);


const handleConnect = (e) => {

	setOpen(true)
	console.log(e)
	setAwscred({accesskey:e?.name,secret:e?.password,region:e?.url})
	
}



	useEffect(() => {



axios.get(`http://${baseurl}/action/aws`)
      .then(function (response) {

      	 setAws(response.data)
      
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });


	},[])


	return (

		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header  title="AWS" bread={[{value:"Dashboard",nav:"dashboard"},{value:"AWS",nav:"aws"}]} />
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
				    <p>{i?.name}</p>
				     </div>

        			)
        	})
        }
       
         
         
   
  
        </div>
        </div>

    </Modal>

     <div className="flex m-3 flex-wrap  gap-3 ">
    {aws?.map((i) => (
				
			<Post post={i} img={AWSImg} handleConnect={handleConnect} handleDelete={handleDelete}/>
					
		))}
    </div>
    </div>

		)
}

export default AWSApp
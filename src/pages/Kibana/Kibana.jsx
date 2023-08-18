import React,{useEffect,useState} from 'react'
// import styles from './Kibana.module.css';
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";
import { useGlobalContext } from '../../contexts/context2'
import Post from '../../components/Post'
import Kibanaimg from '../../data/kibana.png'
import { Header } from '../../components';

// import Nodata from './rafiki.png'
import {Container,Button,Typography,Avatar,InputAdornment,TextField,Grid,IconButton} from '@mui/material';

const Kibana = () => {

	const [kibana,setKibana] = useState([])
const {setToken,setLink,baseurl} = useGlobalContext()
const navigate = useNavigate()

	useEffect(() => {

axios.get(`http://${baseurl}/action/kibana`)
      .then(function (response) {

      	// setLink(response.data.url)
       setKibana(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });


},[])

const handleConnect = () => {

	navigate('/kibanadash')
	
}


	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header  title="Kibana" bread={["Kibana"]} />
    <div className="flex m-3 flex-wrap  gap-3 ">
    {kibana?.map((i) => (
				
			<Post post={i} img={Kibanaimg} handleConnect={handleConnect} />
					
		))}
    </div>

    </div>
		)
}

export default Kibana
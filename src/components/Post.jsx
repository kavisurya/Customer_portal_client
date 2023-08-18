import React,{useState,useEffect} from 'react'
import {Card,Button,Typography,CardContent,IconButton,InputAdornment,CardMedia,Grid,CardActions} from '@mui/material';
import { useGlobalContext } from '../contexts/context2'
import { useNavigate,Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Post = ({post,img,handleConnect,handleDelete}) => {

const {token,setLink,link} = useGlobalContext()
const navigate = useNavigate()
console.log(post.connector)

const handleDeleteIcon = () => {

  console.log("Deleted")
  console.log(post._id)
  handleDelete(post._id)

}

const handleSome = () => {

if(post.connector === 'Azure')
{
  handleConnect({connector:post.connector,url:post.url,name:post.username,password:post.password,tenant:post.tenant})
}
else
{
handleConnect({connector:post.connector,url:post.url,name:post.username,password:post.password})
}

}

const handleDetail = (id,connect) => {

if(connect === 'Zabbix')
{
  navigate(`/hosts/${id}`)
}
else if(connect === 'Kibana')
{

  setLink(post.url)
  console.log(link)
  navigate('/kibanadash')

}


}
useEffect(() => {

console.log(token)

},[token])

	return (
		<>
<Card sx={{ minWidth: 250, position: 'relative' }}>
  {/* Delete button */}
  <IconButton
    sx={{
      position: 'absolute',
      bottom: 5,
      right: 5,
      color: 'red', // Change the color to your desired color
    width: 32, // Change the width to your desired size
    height: 32 // Change the height to your desired size
    }}
    onClick={handleDeleteIcon}
  >
    <DeleteForeverIcon />
  </IconButton>
      <CardMedia
        sx={{ height: 120 }}
        image={img}
        title={post.connector}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.connector}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/*{post.url.length>30?(post.url).slice(0,30)+'...':post.url}*/}
        {post.account}
        </Typography>
      </CardContent>
      <CardActions>
      {(post.connector === 'Zabbix' || post.connector === 'AWS' || post.connector === 'Azure') && <Button size="small" color='primary' variant='contained' onClick={handleSome}>{post.connector === 'AWS' || post.connector === 'Azure'?'Connect':(token?'Connected':'Connect')}</Button>}
        
       {(post.connector == 'AWS' && post.connector == 'Azure') ||(post.connector == 'Zabbix' || post.connector == 'Kibana') && <Button size="small" color='secondary' variant='contained' disabled={token || post.connector === 'Kibana' || post.connector === 'AWS' || post.connector === 'Azure' ?false:true} onClick={() =>handleDetail(post._id,post.connector)} >View Data</Button>} 
      </CardActions>
    		</Card>
		</>
		)
}

export default Post
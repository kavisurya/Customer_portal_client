import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import {provider,auth} from '../../firebase'
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import styles from './Login.module.css';
import './test.css'
import {Container,Button,Typography,Avatar,InputAdornment,TextField,IconButton} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useGlobalContext } from '../../contexts/context2'
import MicIcon from '../../data/icons8-microsoft.svg'

const Login =() => {

const [name,setName] = useState('')
const [pass,setPass] = useState('')
const [showPass,setShowPass] = useState(false)
const {setUser,baseurl} = useGlobalContext()
const navigate = useNavigate();

	const handleSubmit = (e) => {

		e.preventDefault()
		console.log(name,pass)
		
		axios.post(`http://${baseurl}/user/signin`,
		{
			Username:name,
			password:pass
		})
      .then(function (response) {

      setUser(response.data.token)
       localStorage.setItem('myData',JSON.stringify(response.data))
        console.log(response.data.result)
        const decodedToken = jwt_decode(response.data?.token);
				const expirationTime = decodedToken.exp;
				
				localStorage.setItem("expirationTime", JSON.stringify(expirationTime));
      })
      .catch(function (error) {
      	toast.error('Please try again')
        console.log(error)
      });


	}

	const MicroSoftLogin = () => {

	signInWithPopup(auth,provider).then((authUser) => {
		if(authUser)
			{
			// navigate('/')	
				localStorage.setItem('myMicData',JSON.stringify(authUser))
				localStorage.setItem("expirationTime", JSON.stringify(authUser?.user?.stsTokenManager?.expirationTime));
			}
		})
	.catch((e) => alert(e));
		console.log("WTF")
	}

	useEffect(() => {

		navigate('/', { replace: true });
	},[])

	return (

			<>
		<Toaster />
		<div className={styles.login}>
		<div className={styles.left}>
			<h1 className={styles.text1}>Welcome to KCloud</h1>
		</div>
		<div className={styles.right}>
			<Container component='main' maxWidth='xs'>
		<Paper className={styles.paper} elevation={3}>
			<Avatar style={{backgroundColor:'red'}}>
				<LockIcon />
			</Avatar>
			<Typography variant='h5'>Signin</Typography>
			<form className={styles.form} onSubmit={handleSubmit}>
				<Grid container spacing={2}>
				<Grid item xs={12} sm={12}>
						<TextField name='username' label='Username' variant='outlined' required fullWidth type='text'
									onChange={(e)=> setName(e.target.value)} value={name}/>
					</Grid>
				<Grid item xs={12} sm={12}>
						<TextField name='password' label='Password' value={pass} variant='outlined' required fullWidth type={showPass?'text':'password'}
									onChange={(e) => setPass(e.target.value)} 
									InputProps = {{
										endAdornment:(
										<InputAdornment position='end'>
										 <IconButton onClick={() =>setShowPass(!showPass)}>
										 	{showPass?<VisibilityOffIcon />:<VisibilityIcon />}
										 </IconButton>
									</InputAdornment>
									)
								}}  />
					</Grid>
					</Grid>
					<br />
				<Button fullWidth variant='contained' color='primary' className={styles.submit} type='submit'>SignIn</Button>
					<p style={{margin:'5px',color:'gray'}}>OR</p>
				
				<button className={styles.microsoftbutton} onClick={MicroSoftLogin}>
      <img src={MicIcon} alt="Microsoft logo" className={styles.miclogo} />
      <span className={styles.microsofttext}>Sign in with Microsoft</span>
    </button>
			</form>
		</Paper>
		</Container>
		</div>
		</div>

 
		</>
		)
}


export default Login
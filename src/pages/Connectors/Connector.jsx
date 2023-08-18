import React,{useState} from 'react'
import Grid from '@mui/material/Grid';
import {Container,Button,Typography,Avatar,InputAdornment,TextField,IconButton} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import toast, { Toaster } from 'react-hot-toast';
import { useStateContext } from '../../contexts/context';
import styles from './Connector.module.css';
import { useGlobalContext } from '../../contexts/context2'
import { Header } from '../../components';

const Connector = () => {

	const [name,setName] = useState('')
	const [account,setAccount] = useState('')
	const [pass,setPass] = useState('')
	const [url,setUrl] = useState('')
	const [tenant,setTenant] = useState('')
	const [connect,setConnect] = useState('Zabbix')
	const {AddConnect} = useGlobalContext()
	const { currentColor } = useStateContext();
	const connectors = [
	{
		value:'Zabbix',
		Label:'Zabbix'
	},
	{
		value:'Kibana',
		Label:'Kibana'
	},
	{
		value:'AWS',
		Label:'AWS'
	},
	{
		value:'Azure',
		Label:'Azure'
	}


		]
	
	const handleSubmit =  async (e) => {
		console.log(connect)
		e.preventDefault()
		let data;
		console.log('Hi')
		
		
			
		if(connect === 'Azure')
		{
			 data = {
			username:name,
			password:pass,
			url:url,
			tenant:tenant,
			connector:connect,
			account:account
		}
	}
	else{
		 data = {
			username:name,
			password:pass,
			url:url,
			tenant:'',
			connector:connect,
			account:account
		}


	}

		
		
		setName('')
		setPass('')
		setUrl('')
		setTenant('')
		setConnect('')
		console.log(data)
		AddConnect(data).then((res) => {

			if(res)
			{
				toast.success(`${connect} added Successfully`);
			}
			else
			{
				toast.error(`Something happened,Try again`);
			}

		})
		.catch((error) => {

			console.log(error)
		})
		

    
    
  


	}


	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header  title="Connector" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Connector",nav:"connectors"}]} />

    <div className={styles.connector}>
		<Toaster />
		<div className={styles.form2}>
			
			<form className={styles.form} onSubmit={handleSubmit}>
			<TextField
          id="filled-select-currency"
          select
          label="Connectors"
          defaultValue="Zabbix"
          onChange={(e)=> setConnect(e.target.value)}
          variant="filled"
          style={{ width: '49%',paddingBottom:'10px' }}
        >
          {connectors.map((option) => (
            <MenuItem key={option.value} value={option.value} onClick={() =>setConnect(option.value)}>
              {option.Label}
            </MenuItem>
          ))}
        </TextField>

        <TextField name={connect === 'AWS'?'Region':(connect === 'Azure'?'SubsciptionId':'Endpoint Url')} label={connect === 'AWS'?'Region':(connect === 'Azure'?'SubsciptionId':'Endpoint Url')} variant='filled' style={{paddingBottom:'10px'}} required fullWidth type='text'
									onChange={(e)=> setUrl(e.target.value)} value={url}/>
				{connect === 'Azure' &&  <TextField name="TenantId" label="TenantId" variant='filled' style={{paddingBottom:'10px'}} required fullWidth type='text'
									onChange={(e)=> setTenant(e.target.value)} value={tenant}/>}
			<Grid container spacing={2} style={{paddingBottom:'10px'}}>
				<Grid item xs={6} sm={6}>
						<TextField name={connect === 'AWS'?'AccessKey':(connect === 'Azure'?'ClientId':'Username')} label={connect === 'AWS'?'AccessKey':(connect === 'Azure'?'ClientId':'Username')} variant='filled'  fullWidth type='text' disabled={connect === 'Kibana'?true:false}
									onChange={(e)=> setName(e.target.value)} value={name}/>
				</Grid>
				<Grid item xs={6} sm={6}>
						<TextField name={connect === 'AWS'?'SecretKey':(connect === 'Azure'?'ClientSecret':'Password')} label={connect === 'AWS'?'SecretKey':(connect === 'Azure'?'ClientSecret':'Password')} variant='filled'  fullWidth type='password' disabled={connect === 'Kibana'?true:false}
									onChange={(e)=> setPass(e.target.value)} value={pass}/>
				</Grid>
				</Grid>
				<TextField name='Account' label='Account'
									onChange={(e)=> setAccount(e.target.value)} value={account} variant='filled'  style={{ width: '49%',paddingBottom:'10px' }} type='text' required/>
				<br />
		{/*<Button variant="contained" endIcon={<AddCircleOutlineIcon />} style={{width:'25%'}} type='submit'>
        Add
      </Button>*/}
      <button
      type='submit'
      
      style={{ backgroundColor: currentColor, color:'white',borderRadius:'5px' }}
      className={` text-Add p-3 w-1/4 hover:drop-shadow-xl hover:bg-white`}
    >
    ADD <AddCircleOutlineIcon />
    </button>
			</form>
		</div>
		</div>


    </div>
		)
}

export default Connector
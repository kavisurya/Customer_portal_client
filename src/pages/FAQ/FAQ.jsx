import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Header } from '../../components';
import { BsCloudUploadFill } from "react-icons/bs";
import styles from './FAQ.module.css';
import { useStateContext } from '../../contexts/context';
import { useGlobalContext } from '../../contexts/context2'
import ReactSearchBox from "react-search-box";
import DocImg from '../../data/doc.png'
import './newstyle.css'
import { MuiChipsInput } from 'mui-chips-input'
import FileBase from 'react-file-base64'
import {Container,Button,Typography,Grid,FormControl,Select,Menu,MenuItem,InputLabel,Avatar,InputAdornment,TextField,IconButton,Modal} from '@mui/material';


const FAQ = () => {

	const {currentColor} = useStateContext();
	const {Upload,baseurl} = useGlobalContext()
	const [docs,setDocs] = useState([])
	const [newdocs,setNewDocs] = useState([])
	const [text,setText] = useState('Recent Documents')
	const [toggle,setToggle] = useState(false)
	const [filtdocs,setFiltdocs] = useState([])
	const [open,setOpen] = useState(false)
	const [chips, setChips] = useState([])

	 const fuseConfigs = {
    shouldSort: true,
    threshold: 0.2,
    tokenize: true,
    matchAllTokens: true,
    keys: ['value', 'tags']
  };


	const [input,setInput] = useState({
	
	name:'',
	tags:[],
	document:'',

})

	useEffect(() => {

	axios.get(`http://${baseurl}/action2/getDoc`)
      .then(function (response) {


       setDocs(response.data)
       setNewDocs(response.data.slice(0,6))

       const filtdata = response.data.map((i) => {

       	return (

       	{
       		key:i._id,
       		value:i.name,
       		tags:i.tags
       	}


       		)
       })
       setFiltdocs(filtdata)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });


	},[toggle])

	const handleClose = () => {


  setOpen(false)
  
		};

		const handleInput = (val) => {

			console.log(val)

  	if(val === '')
  	{
  		setNewDocs(docs)
  		setText('Recent Documents')
  	}
  
		};

		const handleOpen = () => {


  setOpen(true)
  
		};
		 const handleChange = (newChips) => {
    setInput({...input,tags:newChips})
  }

		const handleSubmit = (e) => {

e.preventDefault()

  console.log(input)
  setToggle(!toggle)
  
  Upload(input)
  setInput({
	
	name:'',
	tags:[],
	document:'',

})
  setOpen(false)
  
		};

	const handleGetdata = (data) => {

		const newval = data.item.value;
		setText('Found Documents')
		const filteredval = docs.filter((i) => i.name === newval)
		setNewDocs(filteredval)

			


		}



	return (

	<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
    <Header  title="FAQ" bread={[{value:"Dashboard",nav:"dashboard"},{value:"FAQ",nav:"FAQ"}]} />
     <Modal
        open={open}
        onClose={handleClose}
      >
      <div className={styles.Box}>
      <Typography variant='h5'>Upload a document</Typography>
      <br />
      <form noValidate onSubmit={handleSubmit}>
      	<TextField name='title' variant='outlined' label='File Name' fullWidth style={{marginBottom:'10px'}}
				value={input?.name} onChange={(e) => setInput({...input,name:e.target.value})}
				 />

		<MuiChipsInput label='Add Tags' value={input?.tags} onChange={handleChange}  variant='outlined' />

		<div className='w-97 mx-auto my-10'>
					<FileBase 
						type='file'
						multiple = {false}
						value={input?.document}
						onDone={({base64}) => setInput({...input,document:base64})}
						 />
						
						
				</div>
		<Button   variant='contained' 
				size='large' color='primary' type='submit' fullWidth>Submit</Button>

		</form>

      </div>

      </Modal>
    <div className="absolute top-10 right-5 cursor-pointer" onClick={handleOpen}>
    <IconButton><BsCloudUploadFill color={currentColor} size="2rem" /></IconButton>
    </div>


    <div className='flex flex-col items-center'>
    <p className={styles.cloudtext}>Help and Support</p>
     <ReactSearchBox
    	style={{width:'700px'}}
        placeholder="Search for documents"
        fuseConfigs={fuseConfigs}
        data={filtdocs}
         onChange={(value) => handleInput(value)}
         onFocus={() => {
        console.log("This function is called when is focussed");
      }}
        onSelect={(record) => handleGetdata(record)}
        leftIcon={<>🎨</>}
         iconBoxSize="50px"
        autoFocus
       

        // data={this.data}
        // callback={(record) => console.log(record)}
      />

    </div>

    <h2 className='mt-10 text-2xl'>{text}</h2>

    <div className='flex m-3 flex-wrap gap-10 items-center '>
    {

    	newdocs.map((i) => {

    		return (

    			
    			<div className='flex flex-col justify-center items-center gap-2'>
    			<a href={i.document}  target="_blank"><img src={DocImg} alt='S3' width='50px' height='50px' /></a>
				 <p>{i.name.length > 12 ?i.name.slice(0,12) + '...' : i.name}</p>
				</div>

      			

    			)
    	})
    }
    </div>
      

    </div>

		)
}

export default FAQ
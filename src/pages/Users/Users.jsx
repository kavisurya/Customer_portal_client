import React,{useState,useEffect} from 'react'
import styles from './Users.module.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import toast, { Toaster } from 'react-hot-toast';
import { useGlobalContext } from '../../contexts/context2'
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {Container,Button,Typography,Grid,FormControl,Select,Menu,MenuItem,InputLabel,Avatar,InputAdornment,TextField,IconButton,Modal} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Header } from '../../components';
import { DataGrid } from '@mui/x-data-grid';

const Users = () => {

const {setUsers,users,addUser,status,editUser,deleteUser,token,baseurl} = useGlobalContext()

const [open,setOpen] = useState(false)
 const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [id, setId] = useState('');
  const [selectedValue, setSelectedValue] = useState([]);
  const [access, setAccess] = useState('');
  const [edit,setEdit] = useState(false)
  const [hostgrp,setHostgrp] = useState([])


useEffect(() => {


axios.get(`http://${baseurl}/user/getuser`)
      .then(function (response) {


       setUsers(response.data.data)
        console.log(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      });


  },[status])



const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'Username', headerName: 'Username', width: 150 },
  { field: 'Access', headerName: 'Access', width: 130 },
  {field: 'ChangeAccess',headerName: 'ChangeAccess',width: 140,renderCell: (params) => {
      return (
        <Button variant="contained" color="primary" onClick={() => handleChange(params.row)}>
          <ChangeCircleIcon />
        </Button>
      );
    },
},
  {field: 'DeleteUser',headerName: 'DeleteUser',width: 140,renderCell: (params) => {
      return (
        <Button variant="contained" color="secondary" onClick={() => handleUserDelete(params.row)}>
          <DeleteForeverIcon />
        </Button>
      );
    },},
  
];



const rows = users?.map((i,index) =>{

  return {
    id:i._id,
    Username:i.name,
    Access:i.access
  }
} )



const [anchorEl, setAnchorEl] = useState(null);
  const [nestedAnchorEl, setNestedAnchorEl] = useState(null);

  const accessoptions1 = [
  {value:'admin', label:'Admin' },
  {value:'superAdmin',label:'SuperAdmin'},
  {value:'user', label:'User' },
  {value:'guest', label:'Guest' },
];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNestedMenuClick = (event,data) => {
    setNestedAnchorEl(event.currentTarget);
      setAccess('User')
     
  };

  const handleMenuClose = (data) => {
    setAnchorEl(null);
    setNestedAnchorEl(null);
      setAccess(data)
   
  };

  const handleMenuClose1 = () => {
    setAnchorEl(null);
    setNestedAnchorEl(null);
    
   
  };

  const handleSubMenuClose = (data) => {
    setAnchorEl(null);
    setNestedAnchorEl(null);
    setSelectedValue([...selectedValue,{id:data.groupid,name:data.name}])
    
  };

  const handleUserDelete = (data) => {

    console.log(data)
    

    deleteUser(data).then((res) => {

      if(res)
      {
        toast.success(`User deleted Successfully`);
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






const handleDelete = (chipToDelete) => {

  setSelectedValue((prevSelectedValue) =>
      prevSelectedValue.filter((chip) => chip.groupid !== chipToDelete.groupid)
    );
  

}


 const handleOpen = () => {

  setOpen(true)
  // const newurl = '/api'
  // const header = { 'Content-Type': 'application/json-rpc'}
  // const body= {
  //         "jsonrpc":"2.0",
  //         "method": "hostgroup.get",
  //         "params": {
  //           "output": "extend"
  //           },
  //         "auth":`${token}`,
  //         "id": 1
  //       }
  // // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  // axios.post(newurl,body,{header:header})
  //     .then(function (response) {
  //       setHostgrp(response.data.result)
  //       console.log(response.data)
      
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     });



};
const handleClose = () => {

console.log(typeof(access))
console.log(access)
console.log(selectedValue)
setUsername('')
setAccess('')
setEdit(false)

  setOpen(false)};

const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAccessChange = (event) => {
    setAccess(event.target.value);
  };

  const handleChange = (data) => {

    console.log(data)
    setEdit(true)
    handleOpen()
    setUsername(data.Username)
    setId(data.id)
    setAccess(data.Access)

    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the form data

    const formdata = 
    {
      name:username,
      password:password,
      access:access,
      host:selectedValue
    }
    console.log(formdata)
    if(edit)
    {

    //   editUser({
    //   name:username,
    //   password:password,
    //   access:access,
    //   id:id,
    //   host:selectedValue
    // })

    editUser({
      name:username,
      password:password,
      access:access,
      id:id,
      host:selectedValue
    }).then((res) => {

      if(res)
      {
        toast.success(`User edited Successfully`);
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
    else
    {
      // addUser(formdata)

      addUser(formdata).then((res) => {

      if(res)
      {
        toast.success(`User added Successfully`);
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
    handleClose();
    
  };





	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Toaster />
    <div className='flex align-items justify-between'>
     <Header  title="Users" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Users",nav:"users"}]} />
      <button
            type="button"
             onClick={handleOpen}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%'}}
            className="text-xl hover:drop-shadow-xl "
          >
           <AddCircleIcon />
          </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.Box}>
        {edit?<h1 className='capitalize'>Edit the user</h1>:<h1 className='capitalize'>Add a new User</h1>}
        <form className={styles.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
      <TextField
        
        label="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      </Grid>
      <Grid item xs={6} sm={6}>
      <TextField
        
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      </Grid>
      </Grid>
      <br />
      
       <div className={styles.access}>
    <div>
     <Button onClick={handleMenuClick} variant='contained' color='secondary'>{access !== ''?`${access}`:'Access'}</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose1}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
      {accessoptions1.map((i) => {

        return (
          <div>
        <MenuItem onClick={(e) => (i.value === 'user'&& hostgrp?.length>0)?handleNestedMenuClick(e,i.value):handleMenuClose(i.value)}>{i.label}</MenuItem>
        {(i.value === 'user' && hostgrp?.length>0) && (
          <Menu
          anchorEl={nestedAnchorEl}
          open={Boolean(nestedAnchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
        
        {hostgrp?.map((i) => {


          return (
              <MenuItem onClick={() => handleSubMenuClose(i)} >{i.name}</MenuItem>
            )
        })}
          
        </Menu>

          
       
        )}
        </div>
        )

      })}
        
      </Menu>

      
</div>
<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>


 {selectedValue?.map((i) => (

     <Chip
        label={i.name}
        onDelete={() => handleDelete(i)}
        style={{margin:'5px'}}
      />
    )
 )}
    
</div>
    </div>

      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={styles.button}
      >
        {edit?'Edit':'Create'}
      </Button>
    </form>
        </div>
      </Modal>

      <div style={{ height: 400, width: '100%' }}>
       <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
       </div>
       </div>
		)
}

export default Users
import React, { useState, useEffect } from 'react';
import styles from './Users.module.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import toast, { Toaster } from 'react-hot-toast';
import { useGlobalContext } from '../../contexts/context2';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {
  Container,
  Button,
  Typography,
  Grid,
  FormControl,
  Select,
  Menu,
  MenuItem,
  InputLabel,
  Avatar,
  InputAdornment,
  TextField,
  IconButton,
  Modal,
  Paper, 
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  Box,
} from '@mui/material';
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);



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
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'Username', headerName: 'Username', flex: 1 },
    { field: 'Access', headerName: 'Access', flex: 1 },
    {
      field: 'ChangeAccess',
      headerName: 'ChangeAccess',
      flex: 0.5,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleChange(params.row)}>
          <ChangeCircleIcon />
        </Button>
      ),
    },
    {
      field: 'DeleteUser',
      headerName: 'DeleteUser',
      flex: 0.5,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleUserDelete(params.row)}>
          <DeleteOutlineIcon />
        </Button>
      ),
    },
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

  useEffect(() => {
    // Update windowWidth when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

const cellCellStyle = {
  base: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: 'black',
  },
  responsiveSmall: {
    fontSize: '0.7rem',
  },
  responsiveMedium: {
    fontSize: '0.8rem',
  },
  responsiveLarge: {
    fontSize: '1rem',
  },
  redBackground: {
    backgroundColor: '#ff4f4f', // Medium red background (adjust the color code as needed)
    color: 'white', // White text color
  },
  whiteColor:{
    color: 'white',
  },
};

const buttonStyle = {
  base: {
    fontSize: '1rem',
    minWidth: 'unset', // Remove minimum width
    padding: '6px 10px', // Adjust padding as needed
  },
  responsiveSmall: {
    fontSize: '0.5rem',
    padding: '4px 8px', // Adjust padding for small screens
  },
  responsiveMedium: {
    fontSize: '0.7rem',
    padding: '5px 9px', // Adjust padding for medium screens
  },
  responsiveLarge: {
    fontSize: '1rem',
    padding: '6px 10px', // Adjust padding for large screens
  },
};
// Determine the appropriate style based on screen width
let currentStyle = cellCellStyle.base;
if (windowWidth < 600) {
  currentStyle = { ...currentStyle, ...cellCellStyle.responsiveSmall };
} else if (windowWidth < 960) {
  currentStyle = { ...currentStyle, ...cellCellStyle.responsiveMedium };
} else {
  currentStyle = { ...currentStyle, ...cellCellStyle.responsiveLarge };
}

let buttonCurrentStyle = buttonStyle.base;
if (windowWidth < 600) {
  buttonCurrentStyle = { ...buttonStyle, ...buttonStyle.responsiveSmall };
} else if (windowWidth < 960) {
  buttonCurrentStyle = { ...buttonStyle, ...buttonStyle.responsiveMedium };
} else {
  buttonCurrentStyle = { ...buttonStyle, ...buttonStyle.responsiveLarge };
}



  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Toaster />
      <div className="flex align-items justify-between">
        <Header title="Users" bread={[{ value: 'Dashboard', nav: 'dashboard' }, { value: 'Users', nav: 'users' }]} />
        <button
          type="button"
          onClick={handleOpen}
          style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
          className="text-xl hover:drop-shadow-xl "
        >
          <AddCircleIcon />
        </button>
      </div>
      
      <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Box p={4}>
          <h1 className="capitalize" style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: edit ? 'bold' : 'bold',
            paddingBottom: edit ? '10px' : '10px',
          }} >
          {edit ? 'Edit the user' : 'Add a new User'}</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
              </Grid>
            </Grid>
            <br />
            <div className={styles.access}>
              <div style={{ display: 'flex' }}>
                <Button
                  onClick={handleMenuClick}
                  variant="contained"
                  color="secondary"
                >
                  {access !== '' ? `${access}` : 'Access'}
                </Button>
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
                        <MenuItem
                          onClick={(e) => (i.value === 'user' && hostgrp?.length > 0) ? handleNestedMenuClick(e, i.value) : handleMenuClose(i.value)}
                        >
                          {i.label}
                        </MenuItem>
                        {(i.value === 'user' && hostgrp?.length > 0) && (
                          <Menu
                            anchorEl={nestedAnchorEl}
                            open={Boolean(nestedAnchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                          >
                            {hostgrp?.map((i) => {
                              return (
                                <MenuItem onClick={() => handleSubMenuClose(i)}>{i.name}</MenuItem>
                              )
                            })}
                          </Menu>
                        )}
                      </div>
                    )
                  })}
                </Menu>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {selectedValue?.map((i) => (
                  <Chip
                    label={i.name}
                    onDelete={() => handleDelete(i)}
                    style={{ margin: '5px' }}
                  />
                ))}
              </div>
            </div>
            <br />
            <Button variant="contained" color="primary" type="submit">
              {edit ? 'Edit' : 'Create'}
            </Button>
          </form>
        </Box>
      </Dialog>
    </div>

      <TableContainer component={Paper} elevation={0} sx={{ padding: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'grey' }}>ID</TableCell>
              <TableCell style={{ color: 'grey' }}>Username</TableCell>
              <TableCell style={{ color: 'grey' }}>Access</TableCell>
              <TableCell colSpan={2} style={{ color: 'grey', paddingLeft: '40px' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell style={currentStyle}>{row.id}</TableCell>
                <TableCell style={currentStyle}>{row.Username}</TableCell>
                <TableCell style={currentStyle}>{row.Access}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    title="Change Access"
                    style={{
                      ...buttonStyle.base,
                      ...currentStyle,
                      ...cellCellStyle.whiteColor,
                      padding: '4px 8px', // Reduce padding to make buttons smaller
                      margin: '0 4px',   // Reduce margin to bring buttons closer together
                    }}
                    onClick={() => handleChange(row)}
                  >
                    <ChangeCircleIcon style={{ fontSize: buttonStyle.fontSize }} />
                  </Button>
                  <Button
                    variant="contained"
                    title="Delete User"
                    style={{
                      ...buttonStyle.base,
                      ...currentStyle,
                      ...cellCellStyle.redBackground,
                      padding: '4px 8px', // Reduce padding to make buttons smaller
                      margin: '0 4px',   // Reduce margin to bring buttons closer together
                    }}
                    onClick={() => handleUserDelete(row)}
                  >
                    <DeleteOutlineIcon style={{ fontSize: buttonStyle.fontSize }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users;
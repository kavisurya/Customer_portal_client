import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../../contexts/context2'
import { useStateContext } from '../../contexts/context'
import { Header,Calenderprop } from '../../components';
import { Loading } from '../../components';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import styles from './Finance.module.css';
import {Popover,Box,Button,Typography,CircularProgress,Select,FormHelperText,MenuItem,InputLabel,FormControl} from '@mui/material';

import Plot from 'react-plotly.js';


const Finance = () => {

    const [customers, setCustomers] = useState('');
    const {awscred,date,baseurl} = useGlobalContext()
    const [datearr,setDatearr] = useState()
    const [checkval,setCheckval] = useState('Invoice')
    const [csvData, setCSVData] = useState([]);
    const [columns1,setColumns1] = useState([])
    const [rows1,setRows1] = useState([])
    const [load,setLoad] = useState(false)
    

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstName',
          headerName: 'First name',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
          headerClassName: 'super-app-theme--header',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 32 },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];


  const handleChange = (event) => {
    setCustomers(event.target.value);
  };

  const handleClick = () => {

    const checkbox = document.getElementById("myCheckbox");

    // Check if the checkbox is checked
    if (checkbox.checked) {
      console.log("Checkbox is checked");
      setCheckval('Invoice')
    } else {
      console.log("Checkbox is not checked");
      setCheckval('Collection')
    }

  }

  const customsendfunc = () => {

    setDatearr([
        new Date(`${date[0]}`),
        new Date(`${date[1]}`)
    ])
    console.log( new Date(`${date[0]}`),new Date(`${date[1]}`))
  }

  useEffect(() => {

    if(checkval !== '' && customers !== '')
    {

    
        setLoad(true)
		const newdat = (customers+checkval).toLowerCase()
    axios.post(`http://${baseurl}/action2/azurestorage`,{val:newdat})
.then(function (response) {

    console.log(response.data)
    const data = response.data.csvData
    // const columns = data[0].map((header, index) =>map ({
    //     field: `col${index}`,
    //     headerName: header,
    //   }));
    const columns = data[0].map((header,index) => {
        
        return (
            {
                field: `col${index}`,
                headerName: header,
              }

        )
    }).filter((column) => column.headerName !== null && column.headerName !== undefined);
    
    setColumns1(columns)
      const rows = data.slice(1).map((row, index) => {
        // Create an object where keys match the column field names
        const rowData = {};
        row.forEach((cell, cellIndex) => {
            if(cell === null)
            {
                return
            }
            
          rowData[`col${cellIndex}`] = cell.toString().trim();
        });
        return { id: index, ...rowData };
      });
      setRows1(rows)
      console.log(columns,rows)
    // const csvLines = response.data.csvdata.split('\n'); // Split by lines
    // const csvArray = csvLines.map(row => row.split(','));; // Split by commas
    // console.log(csvArray);
    // setCSVData(csvArray);

})
.catch(function (error) {
    console.log(error)
    }) 
    .finally(() => {
        setLoad(false)
        console.log('Experiment completed');
      });

    }
  },[checkval,customers])


    return (

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header  title="Finance" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Finance",nav:"Finance"}]}  />
        <div class="flex">
  <div class="flex-grow w-3.75/5 p-10">
  <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows1}
        columns={columns1}
        loading={load}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        
        disableRowSelectionOnClick
      />
    </Box>
    {/* {csvData.length > 0  && (
        <div>
          <h2>CSV Data</h2>
          <ul>
            {csvData.map((row, index) => (
              <li key={index}>{JSON.stringify(row)}</li>
            ))}
          </ul>
        </div>
      )} */}
  </div>
  <div class="flex flex-shrink w-2.25/5 flex-col">
  <div className='mb-5'>
        <label className={styles.switch} style={{position:'relative'}}>
        <input type="checkbox" id='myCheckbox' />
        <span className={styles.slider} onClick={handleClick} ></span>
        <h2 className={styles.font1}style={{position:'absolute',left:checkval==='Invoice'?'70px':'15px',top:'16px'}} >{checkval}</h2>
        </label>
    </div>
  <FormControl sx={{mr:1,mb:2,minWidth: 120, border: "2px solid black" }}>
        <InputLabel id="demo-simple-select-helper-label">Customers</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={customers}
          label="Customers"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value='tanmiah'>Tanmiah</MenuItem>
          <MenuItem value='maadaniyah'>Maadaniyah</MenuItem>
          <MenuItem value='ara'>ARA</MenuItem>
          <MenuItem value='romana'>Romana</MenuItem>
          <MenuItem value='m360'>M360</MenuItem>
        </Select>
        
      </FormControl>

      <div className={styles.calendar}>
    	<h2 className={styles.font2}>Choose a date/range</h2>
        
        <Calenderprop />
        
    	
    	<Button variant="contained" color="secondary" style={{marginTop:'10px'}} onClick={() =>customsendfunc()}>
  Apply
</Button>
    	</div>
   
  </div>
</div>
        </div>


    )
}
export default Finance


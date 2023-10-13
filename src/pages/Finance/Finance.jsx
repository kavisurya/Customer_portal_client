import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../../contexts/context2'
import { useStateContext } from '../../contexts/context'
import { Header,Calenderprop } from '../../components';
import { Loading } from '../../components';
import Tooltip from '@mui/material/Tooltip';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import styles from './Finance.module.css';
import {Popover,Box,Button,Typography,Fade,Backdrop,Modal,CircularProgress,Select,FormHelperText,MenuItem,InputLabel,FormControl} from '@mui/material';

import Plot from 'react-plotly.js';


const Finance = () => {

    const [customers, setCustomers] = useState('');
    const [smonths, setSmonths] = useState('');
    const {awscred,date,baseurl} = useGlobalContext()
    const {activeMenu,setActiveMenu,screenSize} = useStateContext();
    const [datearr,setDatearr] = useState()
    const [checkval,setCheckval] = useState('Invoice')
    const [csvData, setCSVData] = useState([{id:3,temp:1,temp2:2}]);
    const [columns1,setColumns1] = useState([])
    const [rows1,setRows1] = useState([])
    const [modarr,setModarr] = useState([{name:'Tab 1'}])
    const [marr,setMarr] = useState([{name:'Tab 1'}])
    const [currentfile,setCurrentfile] = useState('')
    const [load,setLoad] = useState(false)
    const [files,setFiles]= useState([{name:'Tab 1'}])
    const [months,setMonths] = useState([])
    const [activeDiv, setActiveDiv] = useState(null);
    const [selected,setSelected] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

const calculatesum = (arr1) => {

  let obj = arr1[arr1.length-1]
  const valuesArray = Object.values(obj);
const lastValue = valuesArray[valuesArray.length - 1];

return lastValue

}

  const handleChange = (event) => {
    setCustomers(event.target.value);
  };
  const handleChange2 = (event) => {

    if(event.target.value === "None" )
    {
      setModarr(marr)
      return
    }
    
    const filteredData = marr.filter(item => {
      // Extract the month from the 'name' property
      const match = item.name.match(/(\d{2})-(\d{2})/);
    
      if (match) {
        const monthNumber = parseInt(match[1], 10);
        // Create a Date object with the month number
        const date = new Date(2023, monthNumber - 1, 1);
        // Check if the month matches the target month
        return date.toLocaleString('default', { month: 'long' }) === event.target.value;
      }
    
      return false;
    });
    setModarr(filteredData)
    console.log(filteredData);
    setSmonths(event.target.value);
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

  const CalculateMonths = (data) => {
    let parts
    const months = data.map(item => {
      if(checkval === 'Collection')
      {
         parts = item.name.split('_')[2].split('-');
      }
      else
      {
         parts = item.name.split('_')[1].split('-');
      }
      
      const monthNumber = parseInt(parts[0], 10);
      
      // Create a Date object with the extracted month number (0-indexed)
      const date = new Date(2023, monthNumber - 1, 1);
      
      // Format the date to get the month name (e.g., "August")
      return {month:date.toLocaleString('default', { month: 'long' })};
    });

    const uniqueArray = Array.from(new Set(months.map(item => item.month)))
  .map(month => {
    return months.find(item => item.month === month);
  });
    console.log(uniqueArray)

    setMonths(uniqueArray)
  }

  const customsendfunc = () => {

    setDatearr([
        new Date(`${date[0]}`),
        new Date(`${date[1]}`)
    ])
    console.log( new Date(`${date[0]}`),new Date(`${date[1]}`))
  }
const reframe = (arr1,arr2) => {

  const associationMap = new Map();

// Iterate through arr2 to associate items with their head values
for (const item of arr2) {
  const head = item.name.split("_")[1]; // Extract the head value
  if (!associationMap.has(head)) {
    associationMap.set(head, []);
  }
  associationMap.get(head).push(item);
}

// Create the final array in the desired format
const result = arr1.map((item) => ({
  name: item.name,
  associate: associationMap.get(item.name.split("_")[0]) || [],
}));

return result
  
}
  
  const fetchData = (newdata) => {

    setActiveDiv(newdata.index);
		const newdat = (customers+checkval).toLowerCase()
    
    console.log(newdata)
    setCurrentfile(newdata)
    let associate = (customers + 'Collection').toLowerCase()
    setLoad(true)
    axios.post(`http://${baseurl}/action2/azurestorage`,{val:newdat,filename:newdata.i.name,associate:associate})
    .then(function (response) {
    
        console.log(response.data)
        const data = response.data.csvData
    //     if(checkval === 'Invoice')
    // {
    //   setModarr(reframe(response.data.files,response.data.filenames))
    //   console.log(reframe(response.data.files,response.data.filenames))
    // }
    // else
    // {
    //   setModarr(response.data.files)
    // }
        
     
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
          setCSVData(rows)
          console.log(columns,rows)
      
      
    
    })
    .catch(function (error) {
        console.log(error)
        }) 
        .finally(() => {
          setLoad(false)
          setSelected(false)
            console.log('Experiment completed');
          });


  }


  useEffect(() => {

    if(checkval !== '' && customers !== '')
    {

        setSelected(true)
        setLoad(true)
		const newdat = (customers+checkval).toLowerCase()
    let associate = (customers + 'Collection').toLowerCase()
    axios.post(`http://${baseurl}/action2/azurestorage`,{val:newdat,filename:'',associate:associate})
.then(function (response) {

    console.log(response.data)
    const data = response.data.csvData
    setFiles(response.data.files)
    if(checkval === 'Invoice')
    {
      let tempval = reframe(response.data.files,response.data.filenames)
      setMarr(reframe(response.data.files,response.data.filenames))
      setModarr(reframe(response.data.files,response.data.filenames))
      console.log(reframe(response.data.files,response.data.filenames))
      CalculateMonths(tempval)
    }
    else
    {
      setMarr(response.data.files)
      setModarr(response.data.files)
      console.log(response.data.files)
      CalculateMonths(response.data.files)
    }
    
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
        <div className={`${styles.container88} ${activeMenu ? styles.container89 : ''}`}>
  <div className="flex-grow w-3.75/5 p-10">
  <div className='flex flex-col justify-end w-full'>
    <div className='mb-5' style={{ marginLeft: 'auto' }}>
        <label className={styles.switch} style={{ position: 'relative' }}>
            <input type="checkbox" id='myCheckbox' />
            <span className={styles.slider} onClick={handleClick}></span>
            <h2
                className={styles.font1}
                style={{
                    position: 'absolute',
                    left: checkval === 'Invoice' ? '70px' : '15px',
                    top: '16px'
                }}
            >
                {checkval}
            </h2>
        </label>
    </div>
    <div className='mt-1 flex justify-end gap-5'>
    <div>
    <FormControl sx={{marginBottom: 2, minWidth: 170, maxWidth: 200}}>
    <InputLabel id="demo-simple-select-helper-label">Filter by Month</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={smonths}
          label="Months"
          onChange={handleChange2}
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          {months.map((i) => {

            return (
              <MenuItem value={i.month}>{i.month}</MenuItem>

            )
          })}
        </Select>
    </FormControl>
    
    </div>
    <div>
    <FormControl sx={{marginBottom: 2, minWidth: 170, maxWidth: 200}}>
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
    </div>
    </div>
</div>

  <div className={styles.season_tabs}>
    
  {modarr.map((i, index) => {
  return (
    <div className={styles.season_tab} key={index}>
      <label
        htmlFor={`tab-${index}`} // Use 'htmlFor' instead of 'for'
        onClick={() => fetchData({ i, index })}
        className={`${styles.divItem} ${
          activeDiv === index ? styles.active : ''
        }`}
      >
        {i.name.split('.')[0]}
        <Tooltip
          title={
            <ul>
              {i?.associate?.map((item, itemIndex) => (
                <li key={itemIndex}>{item.name.split('.')[0]}</li>
              ))}
            </ul>
          }
          placement="right-end"
        >
          <span style={{ color: 'red' }}>
            {`${i.associate ? `(${i.associate.length})*` : ''}`}
          </span>
        </Tooltip>
      </label>

      <div className={styles.season_content}>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={rows1}
            columns={columns1}
            loading={load}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
                },
              },
            }}
            pageSizeOptions={[6]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
})}

    
    
 </div>
 
  
  </div>
  
      {/* <div className={styles.calendar}>
    	<h2 className={styles.font2}>Choose a date/range</h2>
        
        <Calenderprop />
        
    	
    	<Button variant="contained" color="secondary" style={{marginTop:'10px'}} onClick={() =>customsendfunc()}>
  Apply
</Button>
    	</div> */}
   
  </div>

<div className='flex justify-center'>
<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            <span style={{fontWeight:'bold'}}> Summary</span>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             The selected {checkval}---<span style={{fontWeight:'bold'}}>{currentfile?.i?.name}</span> has a total NetValue of <span style={{color:'green'}}>{calculatesum(csvData)}</span> SAR
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             No of collections raised gainst the selected invoice is <span style={{color:'green'}}>{currentfile?.i?.associate?.length}</span>
            </Typography>
          </Box>
        </Fade>
      </Modal>
 {checkval === 'Invoice' && <Button variant='contained' onClick={handleOpen} disabled={selected}>Generate Summary</Button>} 
  </div>
</div>
        


    )
}
export default Finance


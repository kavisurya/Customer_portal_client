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
    const {activeMenu,setActiveMenu,screenSize} = useStateContext();
    const [datearr,setDatearr] = useState()
    const [checkval,setCheckval] = useState('Invoice')
    const [csvData, setCSVData] = useState([]);
    const [columns1,setColumns1] = useState([])
    const [rows1,setRows1] = useState([])
    const [modarr,setModarr] = useState([{name:'Tab 1'}])
    const [load,setLoad] = useState(false)
    const [files,setFiles]= useState([{name:'Tab 1'}])
    const [activeDiv, setActiveDiv] = useState(null);
    

    

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
          console.log(columns,rows)
      
      
    
    })
    .catch(function (error) {
        console.log(error)
        }) 
        .finally(() => {
          setLoad(false)
            console.log('Experiment completed');
          });


  }


  useEffect(() => {

    if(checkval !== '' && customers !== '')
    {

    
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
      setModarr(reframe(response.data.files,response.data.filenames))
      console.log(reframe(response.data.files,response.data.filenames))
    }
    else
    {
      setModarr(response.data.files)
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

  <div className={styles.season_tabs}>
    
    {modarr.map((i,index) => {

      return (
        <div className={styles.season_tab}>
       
        <label for={`tab-${index}`} onClick={() => fetchData({i,index})}  className={`${styles.divItem} ${activeDiv === index ? styles.active : ''}`} >{i.name.split('.')[0]}  <span style={{color:'red'}}>{`${i.associate ? `(${i.associate.length})*` : ''}`}</span>
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
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        
        disableRowSelectionOnClick
      />
    </Box>
        </div> 
    </div>

      )
    })}
    </div>
    {/* <div className={styles.season_tab}>
        <input type="radio" id="tab-1" name="tab-group-1" checked />
        <label for="tab-1">tab 1</label>
        
        <div className={styles.season_content}>
             <Box sx={{ height: '100%', width: '100%' }}>
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
        </div> 
    </div>
     
    <div className={styles.season_tab}>
        <input type="radio" id="tab-2" name="tab-group-1" />
        <label for="tab-2">tab 2</label>
        
        <div className={styles.season_content}>
            <span>content 2</span>
        </div> 
    </div>
     
     <div className={styles.season_tab}>
        <input type="radio" id="tab-3" name="tab-group-1" />
        <label for="tab-3">tab 3</label>
      
        <div className={styles.season_content}>
            <span>content 3</span>
        </div> 
    </div>
       <div className={styles.season_tab}>
        <input type="radio" id="tab-4" name="tab-group-1" />
        <label for="tab-4">tab 4</label>
      
        <div className={styles.season_content}>
            <span>content 4</span>
        </div> 
    </div>
      */}
 </div>
 
  
  </div>
  <div className="flex flex-shrink w-2.25/5 flex-col">
  <div className='mb-5'>
        <label className={styles.switch} style={{position:'relative'}}>
        <input type="checkbox" id='myCheckbox' />
        <span className={styles.slider} onClick={handleClick} ></span>
        <h2 className={styles.font1}style={{position:'absolute',left:checkval==='Invoice'?'70px':'15px',top:'16px'}} >{checkval}</h2>
        </label>
    </div>
  <FormControl sx={{mr:1,mb:2,minWidth: 120,maxWidth:200, border: "2px solid black" }}>
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
        


    )
}
export default Finance


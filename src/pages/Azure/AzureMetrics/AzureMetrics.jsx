import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../../../contexts/context2'
import { useStateContext } from '../../../contexts/context'
import { Header } from '../../../components';
import axios from 'axios';
import pc from '../../../data/Pc.png'
import styles from './AzureMetrics.module.css';
import {CircularProgress} from '@mui/material';
import Image1 from '../../../data/Resourcegrp.svg';
import Plot from "react-plotly.js";
import Image2 from '../../../data/vm.svg';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import {Container,Popover,Radio,FormLabel,RadioGroup,FormControlLabel,FormHelperText,Button,Typography,Grid,FormControl,Select,Menu,MenuItem,InputLabel,Avatar,InputAdornment,TextField,Divider,IconButton,Modal} from '@mui/material';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    if (payload[0].payload.average) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}: ${payload[0].payload.average}`}</p>
        </div>
      );
    }
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}: 0`}</p>
      </div>
    );
  }

  return null;
};


const AzureMetrics = () => {

	const {azurecred,baseurl} = useGlobalContext()
	const [bill,setBill] = useState([])
	const [load, setLoad] = useState(true);
	const { currentColor} = useStateContext();
	const [resgrp, setResgrp] = useState('');
	const [vm, setVm] = useState('');
	const [metric, setMetric] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);
	const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [rsg, setRsg] = useState([]);
  const [vmlist, setVmlist] = useState([]);
  const [data,setData] = useState([])
  const [xaxis,setXaxis] = useState([])
  const [yaxis,setYaxis] = useState([])

  const handleRadio1 = (event) => {
    setValue(event.target.value);
  };

  const handleRadio2 = (event) => {
    setValue2(event.target.value);
  };

  const handleSubmit = () => {
    console.log(resgrp)
    console.log(vm)
    console.log(value)
    console.log(value2)
    console.log(metric)

    const data = {

      params:{resgrp,vm,value,value2,metric},
      cred:azurecred
    }
    if(resgrp !== '' && vm !== '' && value !== '' && value2 !== '' && metric !== '')
    {
      axios.post(`http://${baseurl}/action2/azuremetric`,data)
      .then(function (response) {

        console.log(response.data)
        const newdat = response.data.value[0].timeseries[0].data
        setData(response.data.value[0].timeseries[0].data)

        setXaxis(newdat.map(item => item.timeStamp))
        setYaxis(newdat.map(item => item.average || 0))
       

        })
    }
    setAnchorEl(null);


  }

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResourcegp = (event) => {



    setResgrp(event.target.value)

    const vmlist = {
      sub:azurecred,
      rsg:event.target.value
    }
    axios.post(`http://${baseurl}/action2/azurelistvm`,vmlist)
      .then(function (response) {

        console.log(response.data)
        const data = response.data.value.filter((i) => i.type === "Microsoft.Compute/virtualMachines")
        setVmlist(data)
        console.log(data)

        })




  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  

useEffect(() => {

axios.post(`http://${baseurl}/action2/azurersg`,azurecred)
      .then(function (response) {

      	console.log(response.data)
        setRsg(response.data.value)

      	})

},[])



	return (
		 <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header  title="AzureMetrics" bread={[{value:"Dashboard",nav:"dashboard"},{value:"AzureMetrics",nav:"azuremetrics"}]}  />
        <div className="flex w-full justify-between">
        <div className="flex m-3 flex-wrap gap-5">
        <div>
      
        <InputLabel id="demo-simple-select-required-label2">Resource Groups</InputLabel>
        <Select
          labelId="demo-simple-select-required-label2"
          id="demo-simple-select-required2"
          value={resgrp}
          label="Resource Groups"
          style={{ width: '130px',height:'35px'}}
          onChange={(event) => handleResourcegp(event)}

        >
          

          {rsg.length > 0 ?(

            rsg.map((i) => {

              return (
                 <MenuItem key={i.name} value={i.name}>
          <div className="flex items-center">
            <img src={Image1} width="20px" height="20px" />
            {i.name}
          </div>
        </MenuItem>

                )
            })

            ):(
            <>
            <MenuItem value="">
            <em>None</em>
          </MenuItem>
          
          </>
            )}
        </Select>
        <FormHelperText>Required</FormHelperText>
        
        </div>
        <div>

        <InputLabel id="demo-simple-select-required-label2">Virtual Machines</InputLabel>
        <Select
          labelId="demo-simple-select-required-label2"
          id="demo-simple-select-required2"
          value={vm}
          label="VM's"
          style={{ width: '130px',height:'35px'}}
         onChange={(event) => setVm(event.target.value)}
          disabled={resgrp === ''?true:false}
        >
         {vmlist.length > 0 ?(

            vmlist?.map((i) => {

              return (
                 <MenuItem key={i.name} value={i.name}>
          <div className="flex items-center">
            <img src={Image2} width="20px" height="20px" />
            {i.name}
          </div>
        </MenuItem>

                )
            })

            ):(
            <>
            <MenuItem value="">
            <em>None</em>
          </MenuItem>
          
          </>
            )}
        </Select>
        <FormHelperText>Required</FormHelperText>
        </div>

        </div>
        <div>
         <div>
      
        <InputLabel id="demo-simple-select-required-label3">Metrics</InputLabel>
        <Select
          labelId="demo-simple-select-required-label3"
          id="demo-simple-select-required3"
          value={metric}
          label="Resource Groups"
          style={{ width: '130px',height:'35px'}}
         onChange={(event) => setMetric(event.target.value)}

        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Network In Total">Network In Total</MenuItem>
          <MenuItem value="Percentage CPU">Percentage CPU</MenuItem>
          
        </Select>
        
        
        </div>

        <div style={{marginTop:'5px'}}>
         <Button variant="outlined" size="medium" sx={ { borderRadius: 28 } } onClick={handlePopover}>
          Time Span
        </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: { width: '400px' },
        }}
        style={{ marginTop: '5px' }}
      >
        <Typography sx={{ p: 2 }}>
        <div className="flex gap-5">
        	<div className="w-3/5">

        		 <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Time Span</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        row
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleRadio1}
      >
        <FormControlLabel value="PT24H" style={{fontSize:'14px'}} control={<Radio />} label="Last 24 hrs" />
        <FormControlLabel value="P7D" style={{fontSize:'14px'}} control={<Radio />} label="Last 7 days" />
        <FormControlLabel value="PT12H" style={{fontSize:'14px'}} control={<Radio />} label="Last 12 hrs" />
        <FormControlLabel value="P30D" style={{fontSize:'14px'}} control={<Radio />} label="Last 30 days" />
      </RadioGroup>
    </FormControl>

        	</div>
           <Divider orientation="vertical" flexItem />
        	<div className="w-2/5">
        	 <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Interval</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        row
        name="controlled-radio-buttons-group"
        value={value2}
        onChange={handleRadio2}
      >
        <FormControlLabel value="PT1H" style={{fontSize:'14px'}} control={<Radio />} label="1 hr" />
        <FormControlLabel value="PT6H" style={{fontSize:'14px'}} control={<Radio />} label="6 hr" />
        
      </RadioGroup>
    </FormControl>
        	</div>
        </div>
        <Divider  light />
        <br />
        <Button size="small" variant="contained" onClick={handleSubmit}>Submit</Button>
        </Typography>
      </Popover>
        </div>
        </div>
      
        </div>

    <div className="w-full">
    <Plot
      data={[
        {
          x: xaxis,
          y: yaxis,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "blue" },
        },
      ]}
      layout={{
        width: "80%",
        height: 500,
        title: "VM Metrics",
        xaxis: { title: "Timestamp" },
        yaxis: { title: "Average" },
      }}
    />
      
    </div>

		</div>
		)
}

export default AzureMetrics
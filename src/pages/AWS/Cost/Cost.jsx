import React,{useState,useEffect} from 'react'
import { Header,Calenderprop } from '../../../components';
import { useGlobalContext } from '../../../contexts/context2'
import axios from 'axios';
import Plot from 'react-plotly.js';
import moment from "moment";
import { Loading } from '../../../components';
import styles from './Cost.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {CircularProgress,IconButton,Divider,Button,MenuItem,Chip,TextField} from '@mui/material';




const Cost = () => {

const {awscred,date,baseurl} = useGlobalContext()
const [firstDate,setFirstDate] = useState('')
const [secondDate,setSecondDate] = useState('')
const [load, setLoad] = useState(true);
const [cost,setCost] = useState([])
const [currentcost,setCurrentcost] = useState(NaN)
const [graphy,setGraphy] = useState([])
const [graphx,setGraphx] = useState([])
const [servicecost,setServiceCost] = useState([])
const [services,setServices] = useState([])
const [current,setCurrent] = useState(true)
const [last1,setLast1] = useState(false)
const [last30,setLast30] = useState(false)
const [serviceavail,setServiceavail] = useState(false)
const [last7,setLast7] = useState(false)
 const [selectedValue, setSelectedValue] = useState('');
const [selectedChips, setSelectedChips] = useState([]);


useEffect(() => {
    if (selectedChips.length > 0) {
      AddServices();
    }
    if(selectedChips.length <= 0)
    {
      customsendfunc('*',0)
    }
  }, [selectedChips]);


  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAddChip = () => {
    if (selectedValue && !selectedChips.includes(selectedValue)) {
      setSelectedChips([...selectedChips, selectedValue]);
      setSelectedValue('');
      console.log(servicecost)
      console.log(selectedChips)


     
    }
  };

  const AddServices = () => {
    setServiceavail(true)
    setCurrent(false)
        setLast1(false)
        setLast7(false)
        setLast30(false)
    const totalSum = servicecost.reduce((acc, obj) => {
  const sum = obj.services
    .filter((service) => selectedChips.includes(service.service))
    .reduce((serviceSum, service) => serviceSum + service.cost, 0);
  return acc + sum;
}, 0);

    console.log(totalSum)
    setCurrentcost(totalSum?.toFixed(2))

  }

  const handleDeleteChip = (chipToDelete) => {
    setSelectedChips(selectedChips.filter((chip) => chip !== chipToDelete));
    
  };



function getDateBeforeNDays(dateString,num) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  if(num === '*')
  {
    date.setDate(1);
  }
  else{
    date.setDate(date.getDate() - num);
  }
  // Subtract 15 days from the current date
  

  // Get the year, month, and day from the updated date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  // Return the formatted date string
  return `${year}-${month}-${day}`;
}

function getCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function generateDays(startdate,enddate){

  const startDate = moment(startdate);
const endDate = moment(enddate);

  const datesArray = [];

while (startDate.isSameOrBefore(endDate)) {
  datesArray.push(startDate.format('MMM D'));
  startDate.add(1, 'day');
}

console.log(datesArray);
return datesArray

}


function customsendfunc(days,cus){

let currentdate;
let firstday;

  if(days === 7)
  {
     currentdate = getCurrentDate()
    firstday = getDateBeforeNDays(currentdate,days)
    setCurrent(false)
        setLast1(false)
        setLast7(true)
        setLast30(false)
        setServiceavail(false)

  }
  else if(days === 1)
  {
       currentdate = getCurrentDate()
     firstday = getDateBeforeNDays(currentdate,days)
    setCurrent(false)
        setLast1(true)
        setLast7(false)
        setLast30(false)
        setServiceavail(false)
  }
  else if(days === 30)
  {

    currentdate = getCurrentDate()
  firstday = getDateBeforeNDays(currentdate,days)
    setCurrent(false)
        setLast1(false)
        setLast7(false)
        setLast30(true)
        setServiceavail(false)
  }
  else if(days === '*'){

      currentdate = getCurrentDate()
     firstday = getDateBeforeNDays(currentdate,'*')
    setCurrent(true)
        setLast1(false)
        setLast7(false)
        setLast30(false)
        setServiceavail(false)


  }
  else{

    setCurrent(false)
        setLast1(false)
        setLast7(false)
        setLast30(false)
        setServiceavail(false)

    const datesArray = [
  new Date(`${date[0]}`),
  new Date(`${date[1]}`)
];
console.log(datesArray)
const convertedArray = datesArray.map(date => date.toISOString().substr(0, 10));
currentdate = convertedArray[1]
firstday = convertedArray[0]
setFirstDate(firstday)
setSecondDate(currentdate)
console.log(currentdate)
console.log(firstday)
  }
 

    const data={
      awscred:awscred,
      date1:firstday,
      date2:currentdate
    }

    axios.post(`http://${baseurl}/action/awscost`,data)
      .then(function (response) {

        const currentCost = response.data.ResultsByTime.map(item => parseFloat(item.Total.BlendedCost.Amount)).reduce((total, current) => total + current, 0);
        setCurrentcost(currentCost.toFixed(2))
        console.log(response.data)
        console.log(currentCost)
      
      })
      .catch(function (error) {
        console.log(error)
      }).finally(() => {
        setLoad(false)
        console.log('Experiment completed');
      });




}


const data = [
    {
      x: graphx,
      y: graphy,
      type: 'bar',
    },
  ];

const data2 = [
  {
    x: ['Category 1', 'Category 2', 'Category 3'],
    y: [10, 15, 12],
    name: 'Group 1',
    type: 'bar',
  },
  {
    x: ['Category 1', 'Category 2', 'Category 3'],
    y: [5, 8, 6],
    name: 'Group 2',
    type: 'bar',
  },
  {
    x: ['Category 1', 'Category 2', 'Category 3'],
    y: [3, 6, 8],
    name: 'Group 3',
    type: 'bar',
  },
];

//  const data2 = servicecost.map((item) => ({
//     x: [item.timeperiod],
//     y: item.services.map((service) => service.cost),
//     type: 'bar',
//     name: item.timeperiod,
//     text: item.services.map((service) => `${service.service}: ${service.cost}`),
//     hovertemplate: '%{text}',
//   }));

// const layout2 = {
//         barmode: 'stack',
//         width:600, // Set the width in pixels
//         height: 400, // Set the height in pixels
//       }


  // Define your chart layout
  const layout = {
    title: 'Last 15 day cost',
     width:600, // Set the desired width
    height: 400, // Set the desired height
    xaxis: { title: 'Months' },
    yaxis: { title: 'Cost in USD' },
  };



	useEffect(() => {

    const currentdate = getCurrentDate()
    const firstday = getDateBeforeNDays(currentdate,'*')

    const data={
      awscred:awscred,
      date1:firstday,
      date2:currentdate
    }

		axios.post(`http://${baseurl}/action/awscost`,data)
      .then(function (response) {

        const currentCost = response.data.ResultsByTime.map(item => parseFloat(item.Total.BlendedCost.Amount)).reduce((total, current) => total + current, 0);
      	setCurrentcost(currentCost.toFixed(2))
        setCurrent(true)
        setLast1(false)
        setLast7(false)
        setLast30(false)
      	console.log(response.data)
        console.log(currentCost)
      
      })
      .catch(function (error) {
        console.log(error)
      });


	

	},[])

  useEffect(() => {

    const currentdate = getCurrentDate()
    const firstday = getDateBeforeNDays(currentdate,15)

    const data={
      awscred:awscred,
      date1:firstday,
      date2:currentdate
    }

    axios.post(`http://${baseurl}/action/awsservicecost`,data)
      .then(function (response) {

        
        console.log(response.data)

        const reducedServiceCosts = response?.data.reduce((result, current) => {
  const currentDate = current.timePeriod.split('T')[0];

  if (!result[currentDate]) {
    result[currentDate] = {
      timePeriod: currentDate,
      services: [],
      totalCost: 0,
      currency: current.currency,
    };
  }

  result[currentDate].services.push({
    service: current.service,
    cost: parseFloat(current.cost),
  });

  result[currentDate].totalCost += parseFloat(current.cost);

  return result;
}, {});

const reducedServiceCostsArray = Object.values(reducedServiceCosts);

let longestServicesArray = [];

reducedServiceCostsArray.forEach((item) => {
  if (item.services.length > longestServicesArray.length) {
    longestServicesArray = item.services;
  }
});
setServices(longestServicesArray.map((i) => i.service))


console.log(longestServicesArray);

setServiceCost(reducedServiceCostsArray)
         })

      .catch(function (error) {
        console.log(error)
      });



  },[])


  useEffect(() => {

    const currentdate = getCurrentDate()
    const firstday = getDateBeforeNDays(currentdate,15)
    

    const data={
      awscred:awscred,
      date1:firstday,
      date2:currentdate
    }

    axios.post(`http://${baseurl}/action/awscost`,data)
      .then(function (response) {

        const currentCost = response.data.ResultsByTime.map(item => parseFloat(item.Total.BlendedCost.Amount));
        setGraphy(currentCost)
        const temp1 = getDateBeforeNDays(currentdate,1)
        setGraphx(generateDays(getDateBeforeNDays(temp1,14),temp1))
        console.log(generateDays(getDateBeforeNDays(temp1,14),temp1))
        console.log(currentCost)
      
      })
      .catch(function (error) {
        console.log(error)
      });


  

  },[])




	return (

			<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header  title="Cost Management" bread={[{value:"Dashboard",nav:"dashboard"},{value:"AWS",nav:"aws"},{value:"Cost",nav:"Cost"}]} />
    <div className={styles.Total}>
    <div className={styles.Summary}>
    	<div className={styles.box}>
    	<div className={styles.header}>
    		<h2>Cost Summary</h2>
    	</div>
    	<div className={styles.total2}>
    		<div className={styles.current}>
    		{/*<h4>Current month costs</h4>*/}
      {(current || last7 || last30 || last1 || serviceavail) ? (
        <div>
          {current && <h4>Current Month cost</h4>}
          {last7 && <h4>Last 7 day costs</h4>}
          {last30 && <h4>Last 30 day cost</h4>}
          {last1 && <h4>Last 24 hr cost</h4>}
          {serviceavail && <h4>Services Cost</h4>}
        </div>
      ) : (
        <h4>{`${firstDate} to ${secondDate} `}</h4>
      )}
    		<h1 className={styles.price}>{load ?<Loading />:'$'+ currentcost}</h1>
    		</div>
    		<Divider orientation="vertical" flexItem />
    		<div className={styles.forecast}>
    		<h4>Next Month Forecasting costs</h4>
    		<h1 className={styles.price}>$490.17</h1>
    		</div>

    	</div>
    	</div>

    	<div className={styles.graph}>
    		<Plot data={data} layout={layout} />
    	</div>
    </div>
    <div className={styles.Filter}>

      <div>
      <h2 className={styles.font2}>Filter by Services</h2>
      <div className='flex m-3 flex-wrap  gap-2'>
      
      <TextField
        select
        label="Select a value"
        value={selectedValue}
        onChange={handleDropdownChange}
        variant="outlined"
        style={{ width: '150px'}}
      >
      {
        services?.map((i) => {

          return (
              <MenuItem value={i}>{i}</MenuItem>
            )
        })
      }
       {/* <MenuItem value="Value 1">Value 1</MenuItem>
        <MenuItem value="Value 2">Value 2</MenuItem>
        <MenuItem value="Value 3">Value 3</MenuItem>*/}
      </TextField>

      <IconButton onClick={handleAddChip}  >
        <AddCircleOutlineIcon />
      </IconButton>

      <div>
        {selectedChips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            onDelete={() => handleDeleteChip(chip)}
            style={{ margin: '0.5rem' }}
          />
        ))}
      
    </div>
      </div>
      </div>


    	<div>
    	<h2 className={styles.font2}>Filter by TotalCost</h2>
    	<div className='flex m-3 flex-wrap  gap-2'>
    	<Button variant="contained" color="secondary" onClick={() =>customsendfunc(30,0)}>
  Last month
</Button>
<Button variant="contained" color="secondary" onClick={() =>customsendfunc(7,0)}>
  Last 7 days
</Button>
<Button variant="contained" color="secondary" onClick={() =>customsendfunc(1,0)}>
  Last 24 hrs
</Button>
<Button variant="contained" color="secondary" onClick={() =>customsendfunc('*',0)}>
  Current
</Button>
    	</div>
    	</div>

    	
    	<div className={styles.calendar}>
    	<h2 className={styles.font2}>Choose a date/range</h2>
    	<Calenderprop />
    	<Button variant="contained" color="secondary" style={{marginTop:'10px'}} onClick={() =>customsendfunc('-',0)}>
  Apply
</Button>
    	</div>
    	</div>
    </div>

    

   </div>
		)
}

export default Cost
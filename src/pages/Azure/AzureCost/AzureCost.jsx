import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../../../contexts/context2'
import { useStateContext } from '../../../contexts/context'
import { Header } from '../../../components';
import { Loading } from '../../../components';
import axios from 'axios';
import {CircularProgress} from '@mui/material';
import Plot from 'react-plotly.js';
import Subscription from '../../../data/subscription.svg';
import styles from './AzureCost.module.css';


const AzureCost = () => {

    const {azurecred,baseurl} = useGlobalContext()
	const [vm,setVm] = useState([])
	const [load, setLoad] = useState(true);
    const [data,setData] = useState([])
    const [total,setTotal] = useState(NaN)
    const [graphval,setGraphval] = useState({graphval1:[],graphval2:[]})
    const [graphval2,setGraphval2] = useState([])
	const { currentColor ,handleClose,isClicked,activeMenu} = useStateContext();

    const graphdata = [
        {
          x: data.map((i)=>i.date),
          y: data.map((i)=>i.cost),
          type: 'scatter',
          mode: 'lines',
          fill: 'tozeroy', // Fill the area below the line
        },
      ];
    
      const layout = {
        title: 'Cost by day',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Cost' },
        width: activeMenu ? 800 : 1200,
      };
      const graphdata2 = [
        {
          labels: graphval.graphval1.map((i) => i.service),
          values: graphval.graphval1.map((i) => i.cost),
          type: 'pie',
          hole: 0.4, // Controls the size of the hole in the center (0.4 is 40%)
          
        },
      ];
    
      const layout2 = {
        
        width:activeMenu? 600 : 620,
        height:activeMenu? 600 : 620,
        legend: {
            x: 1.4, // Center the legend horizontally
            y: 0.8, // Move the legend to the bottom (negative value)
            orientation:'h', 
          },
          margin: { t:0, b:205, l: 30, r: 0 },
          annotations: [
            {
              font: {
                size: activeMenu? 15 : 17,
              },
              showarrow: false,
              text: 'Services',
              x: 0.52,
              y: 0.5
            },
        ]
       
      };

      const graphdata3 = [
        {
          labels: graphval2.map((i) => i.region),
          values: graphval2.map((i) => i.cost),
          type: 'pie',
          hole: 0.4, // Controls the size of the hole in the center (0.4 is 40%)
        },
      ];
    
      const layout3 = {
        
        width:activeMenu? 500 : 400,
        height:activeMenu? 500 : 400,
        annotations: [
            {
              font: {
                size: 15
              },
              showarrow: false,
              text: 'Region',
              x: 0.52,
              y: 0.5
            },
        ]
      };
      
      const config = {
        responsive: true, // Make the plot responsive
      };

    useEffect(() => {

		
        axios.post(`http://${baseurl}/action2/azurecost`,azurecred)
.then(function (response) {

  console.log(response?.data)
  
  const originalArray = response.data.values

  const groupedData = {};

originalArray.forEach(item => {
  const date = item.properties.usageStart.split('T')[0]; // Extract date part from usagestart
  if (!groupedData[date]) {
    groupedData[date] = { date, cost: 0 };
  }
  groupedData[date].cost += item.properties.pretaxCost;
});

const newArray = Object.values(groupedData);
newArray.sort((a, b) => a.date.localeCompare(b.date));
setData(newArray)
console.log(newArray);

const groupedData3 = {};

originalArray.forEach(item => {
  const region = item.properties.instanceLocation; // Extract date part from usagestart
  if (!groupedData3[region]) {
    groupedData3[region] = { region, cost: 0 };
  }
  groupedData3[region].cost += item.properties.pretaxCost;
});

const newArray3 = Object.values(groupedData3);

console.log(newArray3.filter((i) => i.instanceLocation!==''));
setGraphval2(newArray3)

const groupedData2 = {};

originalArray.forEach(item => {
  const service = item.properties.product.split('-')[0]; // Extract date part from usagestart
  if (!groupedData2[service]) {
    groupedData2[service] = { service, cost: 0 };
  }
  groupedData2[service].cost += item.properties.pretaxCost;
});

const newArray2 = Object.values(groupedData2);

console.log(newArray2.filter((i) => i.service!==''));
setGraphval({...graphval,graphval1:newArray2.filter((i) => i.service!=='')})
  setTotal(response.data.totalCost)

})
.catch(function (error) {
console.log(error)
}) 
.finally(() => {
    setLoad(false)
    console.log('Experiment completed');
  });






},[])



    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header  title="AzureCost" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Azure",nav:"Azure"},{value:"AzureCost",nav:"AzureCost"}]}  />
        <div className='flex items-center bg-slate-50 rounded-lg p-3 w-1/6' >
            <img src={Subscription} alt='key' width='25px' height='25px' />
            <p>Free Trial</p>
        </div>
        <div className='m-2 flex'>
        <div className='mr-9'>
            <p style={{color:'gray'}}>Actual Cost(Inr only)</p>
            <p style={{fontWeight:'bold',fontSize:'40px'}}>{load ?<Loading />:'$'+ total.toFixed(2)}</p>
        </div>
        <div  onClick={() => console.log(graphval)}>
            <p style={{color:'gray'}}>Forecasted Cost(Inr only)</p>
            <p style={{fontWeight:'bold',fontSize:'40px'}}>$1249.32</p>
        </div>

        </div>
        <div style={{width:'100%',marginTop:'20px'}}>
      <Plot data={graphdata} layout={layout}   />
        </div>
        <div className={`${activeMenu?'flex justify-center items-center flex-col gap-5 m-2':'flex gap-5 flex-wrap'}`} style={{position:'relative'}}>
           
            <div style={{marginRight:`${!activeMenu && '10%'}`}} >
            
            {load ? <div style={{position:'absolute',left:'50%'}}><CircularProgress /></div>: <Plot data={graphdata3} layout={layout3} />}
            </div>
            <div  >
            {load ? <div style={{position:'absolute',left:'90%'}}><CircularProgress /></div>: <Plot data={graphdata2} layout={layout2} />}
            
            </div>
        </div>

        </div>

    )
}

export default AzureCost
import React,{useEffect,useState,useRef,createRef} from 'react'
import { useGlobalContext } from '../../contexts/context2'
import {useParams,useNavigate} from 'react-router-dom'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import LoadingButton from '@mui/lab/LoadingButton';
import {CircularProgress} from '@mui/material';
import {Container,Button,Typography,Grid,FormControl,Select,Menu,MenuItem,InputLabel,Avatar,InputAdornment,TextField,IconButton,Modal} from '@mui/material';
import axios from 'axios'
import dayjs from 'dayjs';
import styles from './Zabbix.module.css';
import { useScreenshot, createFileName } from "use-react-screenshot";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Header } from '../../components';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import Plot from 'react-plotly.js';

const ZReports = () => {

	const {token,link,customer,baseurl} = useGlobalContext()
  
const navigate = useNavigate()
const [host,setHost] = useState([])
const [tservice,setTService] = useState([])
const [disabled,setDisabled] = useState(true)
const [mservice,setMService] = useState()
const [clicked,setClicked] = useState(false)
const [average,setAverage] = useState(99)
const [average2,setAverage2] = useState(99)
const [load, setLoad] = useState(true);
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [from1, setFrom1] = React.useState('');
  const [to1, setTo1] = React.useState('');

  const set1 = useRef(null);
  const set2 = useRef(null);

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

let requestBody
let requestBody2
let requestBody3
let requestBody4
const arr33 = [100,100,99,100,98,100,100,100,100,100,100]
const [service1, setService1] = useState({
  SPFMRNAPRDSQL: [],
SPFPOPRDNIMSH: [],
SPFPOPRDDISP: [],
SPFPOPRDJAVA: [],
SPFPOPRDGATEWAY: [],
SPFPOPRDSMTP: [],
SPFDMSPRDDMS: [],
SPFPOWBISQL: [],
SPFECCPRDORACLE: [/* array of objects matching '60753' */],
SPFAPPRPRDHTTPS1: [/* array of objects matching '60792' */],
SPFMRNAPRDSQL: [/* array of objects matching '53152' */],
SPFPOPRDNIMSH: [/* array of objects matching '53106' */],
SPFPOPRDDISP: [/* array of objects matching '53108' */],
SPFPOPRDJAVA: [/* array of objects matching '53113' */],
SPFPOPRDGATEWAY: [/* array of objects matching '53110' */],
SPFPOPRDSMTP: [/* array of objects matching '53115' */],
SPFDMSPRDDMS: [/* array of objects matching '53125' */],
SPFPOWBISQL: [/* array of objects matching '53167' */],
SPFECCPRDDISPATCHER: [/* array of objects matching '60750' */],
 
});
const [service2, setService2] = useState({
  MAAECCPRDDISP: [],
  MAABWPRDGW: [],
  MAABWPRDDISP: [],
  MAABOPRDHTTP: [],
  MAABWHNAPRDIDX: [],
  MAABOHNAPRDIDX: [],
  MAAHNAPRDSSH: [],
  MAAHNAPRDBIDX1 : [],
  MAAHNAPRDBIDX2 : [],
  MAAHNAPRDBIDX3 : [],
  MAAECCPRDGW: [],
  MAABWPRDMSG: [],
  MAAHNAPRDSYSTEMDB: [],
  MAAHNAPRDIDX: [],
  MAAECCPRDMSG: [],
  MAASOLPRDAPP1: [],
  MAASOLPRDAPP2: [],
  MAASOLPRDDB1: [],
  MAASOLPRDDB2: [],
});



const [tanmiah,setTanmiah] = useState({
	EY:[],
	MrnaPrd:[],
	APPR:[],
	PowerBI:[],
	POPrd:[],
	DMSPrd:[],
	TaxDbPrd:[],
	TaxPrd:[],
	EccPrd:[]

})

const [maadaniyah, setMaadaniyah] = useState({
  BPCPrd: [],
  SolPrd: [],
  DMSPrd: [],
  HanaPrdB: [],
  HanaPrdA: [],
  ECCPrd: [],
  WinMGMT: [],
  BoPrd: [],
});
let [arr1,setArr1] = useState([])
let [arr3,setArr3] = useState([])


const data = [
  {
    labels: ['Unavailability', 'Availability'],
    values: [100-average,average],
    type: 'pie'
  }
];

const data2 = [
  {
    labels: ['Unavailability', 'Availability'],
    values: [100-average2,average2],
    type: 'pie'
  }
];

const layout = {
  title: 'Host Availability'
};

const layout2 = {
  title: 'Services Availability'
};

const exportToPDF = () => {
  const pdf = new jsPDF('p', 'mm', 'a4');

  // Convert the first element (set1.current) to a canvas
  html2canvas(set1.current).then((canvas1) => {
    const imgData1 = canvas1.toDataURL('image/png');

    // Convert the second element (set2.current) to a canvas
    html2canvas(set2.current).then((canvas2) => {
      const imgData2 = canvas2.toDataURL('image/png');

      // Add the first element's image to the PDF
      pdf.addImage(imgData1, 'PNG', 10, 10, 180, 200);
      
      pdf.addPage();// Adjust positioning and size as needed

      // Add the second element's image to the PDF below the first one
      pdf.addImage(imgData2, 'PNG', 10, 120, 180, 250); // Adjust positioning and size as needed

      // Save the PDF
      pdf.save('data.pdf');
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
};

const converttoUnix=(val) => {


  const dateObj = new Date(val);

// Get the Unix timestamp (time in milliseconds since January 1, 1970)
const unixTimestamp = dateObj.getTime();
return unixTimestamp/1000

}
const handleDate=(data) => {

  

if(data?.direction === 'from')
{   

  let newval = converttoUnix(data?.value.$d)
  setFrom(newval)
  setFrom1(data?.value.$d)
//   console.log(data?.value.$d)
//   const dateObj = new Date(data?.value.$d);

// // Get the Unix timestamp (time in milliseconds since January 1, 1970)
// const unixTimestamp = dateObj.getTime();
// setFrom(unixTimestamp/1000)

console.log(newval);


}
if(data?.direction === 'to')
{   
  let newval = converttoUnix(data?.value.$d)
  setTo(newval)
  setTo1(data?.value.$d)
//   console.log(data?.value.$d)
//   const dateObj = new Date(data?.value.$d);

// // Get the Unix timestamp (time in milliseconds since January 1, 1970)
// const unixTimestamp = dateObj.getTime();
// setFrom(unixTimestamp/1000)

console.log(newval);

}

}


useEffect(() => {

setLoad(true)

if(customer === "Tanmiah")
{
  requestBody3 = {
jsonrpc: '2.0',
method: 'item.get',
params: {
output: ['itemid', 'name', 'key_', 'lastvalue'],
hostids: [
  '10572', '10573', '10574', '10575',
   '10579', '10580', '10582', '10587', '10596'
],
selectTags: ['tag', 'value'],
evaltype: 0,
tags: [
  { tag: 'Application', value: 'SAP', operator: 0 },
  { tag: 'Application', value: 'SQL', operator: 0 }
],

},
auth: token,
id: 1
};

requestBody4 = {
jsonrpc: "2.0",
method: "trend.get",
params: {
output: "extend",
itemids: ["60795", "60797", "60802", "60752", "53125", "60269", "60753", "60792", "53152", "60793", "60751", "53167", "53115", "53110", "53113", "53108", "60803", "53106", "60750"],
time_from: from ? from : '1693566435',
time_till:to?to:'1695208035',
},
id: 1,
auth: token,
};

}
else{

 requestBody3 = {
jsonrpc: '2.0',
method: 'item.get',
params: {
output: ['itemid', 'name', 'key_', 'lastvalue'],
hostids: [
   '10588', '10589', '10590', '10591', '10592', '10593',  '10595',
  ],
selectTags: ['tag', 'value'],
evaltype: 0,
tags: [
  { tag: 'Application', value: 'SAP', operator: 0 },
  { tag: 'Application', value: 'SQL', operator: 0 }
],

},
auth: token,
id: 1
};

requestBody4 = {
jsonrpc: "2.0",
method: "trend.get",
params: {
output: "extend",
itemids: [
'53084', '53082','53081', '53074', '53070','53069', '53085', '53083',
'53072',  '53071', '53086', '60414','60417'
,'60415','60416','60739','60743','60741','60745'
]
,
time_from: from ? from : '1693566435',
time_till:to?to:'1695208035',
},
id: 1,
auth: token,
};

}

  

const newbody = {

content:requestBody3,
header: { 'Content-Type': 'application/json-rpc' },
url: link,
};

const newbody2 = {

content:requestBody4,
header: { 'Content-Type': 'application/json-rpc' },
url: link,
};



axios.post(`http://${baseurl}/actionzabbix/zabbixhosts`,newbody)
  .then(function (response) {

    const newarr = response.data.result.result.map((i) => {

      return {
        itemid:i.itemid,
        host:i.name.split('-').slice(0,-1).join(''),
        name:i.name,
        key:i.key_

      }
    })
    newarr.sort((a, b) => {
if (a.host < b.host) {
return -1;
} else if (a.host > b.host) {
return 1;
} else {
return a.id - b.id;
}
});

    let lastCategory = null;


const newRows = newarr.map((row) => {
if (row.host !== lastCategory) {
  lastCategory = row.host;
  return row;
} else {
  return { ...row, host: '' };
}
});
    setTService(newRows)
    console.log(newRows)
  
  })
  .catch(function (error) {
    console.log(error)
  });


axios.post(`http://${baseurl}/actionzabbix/zabbixhosts`,newbody2)
  .then(function (response) {
    
    console.log(response.data.result)
    const data = response?.data?.result?.result;

//         const data = Object.values(data2.reduce((acc, item) => {
//   acc[item.clock] = item;
//   return acc;
// }, {}));
    console.log(data)
    if(customer === "Tanmiah")

    {
      setService1(prevState => ({
...prevState,
SPFEYPRDHTTP: data.filter((i) => i.itemid === '60795'),
SPFTAXPRDHTTP: data.filter((i) => i.itemid === '60797'),
SPFTAXDBPRDPOSTGRES: data.filter((i) => i.itemid === '60802'),
SPFECCPRDMESSAGE: data.filter((i) => i.itemid === '60752'),
SPFDMSPRDDMS: data.filter((i) => i.itemid === '53125'),
SPFPOPRDDATABASE: data.filter((i) => i.itemid === '60269'),
SPFECCPRDORACLE: data.filter((i) => i.itemid === '60753'),
SPFAPPRPRDHTTPS1: data.filter((i) => i.itemid === '60792'),
SPFMRNAPRDSQL: data.filter((i) => i.itemid === '53152'),
SPFAPPRPRDHTTPS2: data.filter((i) => i.itemid === '60793'),
SPFECCPRDGATEWAY: data.filter((i) => i.itemid === '60751'),
SPFPOWBISQL: data.filter((i) => i.itemid === '53167'),
SPFPOPRDSMTP: data.filter((i) => i.itemid === '53115'),
SPFPOPRDGATEWAY: data.filter((i) => i.itemid === '53110'),
SPFPOPRDJAVA: data.filter((i) => i.itemid === '53113'),
SPFPOPRDDISP: data.filter((i) => i.itemid === '53108'),
SPFTAXDBPRDSSH: data.filter((i) => i.itemid === '60803'),
SPFPOPRDNIMSH: data.filter((i) => i.itemid === '53106'),
SPFECCPRDDISPATCHER: data.filter((i) => i.itemid === '60750')
}));
    }
    else{

       setService2(prevState => ({
...prevState,
MAAECCPRDDISP: data.filter((i) => i.itemid === '53084'),
MAABWPRDGW: data.filter((i) => i.itemid === '53082'),
MAABWPRDDISP: data.filter((i) => i.itemid === '53081'),
MAABOPRDHTTP: data.filter((i) => i.itemid === '53074'),
MAABWHNAPRDIDX: data.filter((i) => i.itemid === '53070'),
MAABOHNAPRDIDX: data.filter((i) => i.itemid === '53069'),
MAAECCPRDGW: data.filter((i) => i.itemid === '53085'),
MAABWPRDMSG: data.filter((i) => i.itemid === '53083'),
MAAHNAPRDSYSTEMDB: data.filter((i) => i.itemid === '53072'),
MAAHNAPRDIDX: data.filter((i) => i.itemid === '53071'),
MAAECCPRDMSG: data.filter((i) => i.itemid === '53086'),

MAASOLPRDAPP1: data.filter((i) => i.itemid === '60415'),
MAASOLPRDAPP2: data.filter((i) => i.itemid === '60414'),
MAASOLPRDDB1: data.filter((i) => i.itemid === '60416'),
MAASOLPRDDB2: data.filter((i) => i.itemid === '60417'),

MAAHNAPRDSSH: data.filter((i) => i.itemid === '60745'),
MAAHNAPRDBIDX1: data.filter((i) => i.itemid === '60739'),
MAAHNAPRDBIDX2: data.filter((i) => i.itemid === '60741'),
MAAHNAPRDBIDX3: data.filter((i) => i.itemid === '60743'),

}));



    }
  
  })
  .catch(function (error) {
    console.log(error)
  }).finally(() => {

    setLoad(false)
  })
  ;





},[from,to])

//get hosts

	useEffect(() => {
	// 	let body={
    // "jsonrpc": "2.0",
    // "method": "host.get",
    // "params": {
    //     "output": ["hostid", "name", "status","available","ip"],
    //      "selectInterfaces": ["ip"]
    // },
    // "auth": token,
    // "id": 1
    setLoad(true)
    if(customer === "Tanmiah")
    {
      requestBody = {
        jsonrpc: '2.0',
        method: 'host.get',
        params: {
          output: ['host'], // Specify the desired output fields
          groupids:'26', // ID of the host group
        },
        id: 1,
        auth:token,
      }
    }
    else{

      requestBody = {
        jsonrpc: '2.0',
        method: 'host.get',
        params: {
          output: ['host'], // Specify the desired output fields
          groupids:'29', // ID of the host group
        },
        id: 1,
        auth:token,
      }
    }
 
      

const newbody = {
  
  content:requestBody,
  header: { 'Content-Type': 'application/json-rpc' },
  url: link,
};

axios.post(`http://${baseurl}/actionzabbix/zabbixhosts`,newbody)
      .then(function (response) {
      	setHost(response.data.result.result)
      	console.log(response.data)
      
      })
      .catch(function (error) {
        console.log(error)
      }).finally(() => {

        setLoad(false)
      })


	},[from,to])


	useEffect(() => {
	// 	let body={
    // "jsonrpc": "2.0",
    // "method": "host.get",
    // "params": {
    //     "output": ["hostid", "name", "status","available","ip"],
    //      "selectInterfaces": ["ip"]
    // },
    // "auth": token,
    // "id": 1
    setLoad(true)
if( customer === "Tanmiah")

{
    requestBody2 = {
        jsonrpc: '2.0',
        method: 'trend.get',
        params: {
          output: [
                   "itemid",
                   "clock",
                   "num",
                   "value_min",
                   "value_avg",
                   "value_max"
               ],
          itemids:[ '50838', '50952', '50425', '51027', '49333', '49199', '49467', '50482', '50671'],
          time_from: from ? from : '1693566435',
          time_till:to?to:'1695208035',
         
          
        },
        id: 1,
        auth:token,
      }

}

else{

  requestBody2 = {
        jsonrpc: '2.0',
        method: 'trend.get',
        params: {
          output: [
                   "itemid",
                   "clock",
                   "num",
                   "value_min",
                   "value_avg",
                   "value_max"
               ],
          itemids:['49712', '50114', '49779', '49913', '50047', '49846', '49601','60739','60741','60743','60745'],
          time_from: from ? from : '1693566435',
          time_till:to?to:'1695208035',
          
        },
        id: 1,
        auth:token,
      }

}
 
      

const newbody2 = {
  
  content:requestBody2,
  header: { 'Content-Type': 'application/json-rpc' },
  url: link,
};

axios.post(`http://${baseurl}/actionzabbix/zabbixhosts`,newbody2)
      .then(function (response) {
      	// setHost(response.data.result.result)
      	console.log(response.data.result.result)
        const data = response?.data?.result?.result;
//          const data = Object.values(data2.reduce((acc, item) => {
//   acc[item.clock] = item;
//   return acc;
// }, {}));
         console.log(data)
      	// response?.data?.result?.result.map((i) => {
        if(customer === "Maadaniyah")

        {
          setMaadaniyah(prevState => ({
  ...prevState,
  
  BPCPrd: data.filter((i) => i.itemid === '49712'),
  SolPrd: data.filter((i) => i.itemid === '50114'),
  DMSPrd: data.filter((i) => i.itemid === '49779'),
  HanaPrdB: data.filter((i) => i.itemid === '49913'),
  HanaPrdA: data.filter((i) => i.itemid === '50047'),
  ECCPrd: data.filter((i) => i.itemid === '49846'),

  BoPrd: data.filter((i) => i.itemid === '49601'),
  
  
          }));

    
        }
      		
else{

  // console.log(data.filter((i) => i.itemid === '50905'))
  // console.log(data.filter((i) => i.itemid === '49468'))


  setTanmiah(prevState => ({
  ...prevState,

  EY: data.filter((i) => i.itemid === '50838'),
  MrnaPrd: data.filter((i) => i.itemid === '50952'),
  APPR: data.filter((i) => i.itemid === '50425'),
  PowerBI: data.filter((i) => i.itemid === '51027'),
  POPrd: data.filter((i) => i.itemid === '49333'),
  DMSPrd: data.filter((i) => i.itemid === '49199'),
  TaxDbPrd: data.filter((i) => i.itemid === '49467'),
  TaxPrd: data.filter((i) => i.itemid === '50482'),
  EccPrd: data.filter((i) => i.itemid === '50671'),
}));

}
      	// })
      	
      
      })
      .catch(function (error) {
        console.log(error)
      }).finally(() => {

        setLoad(false)
      })


	},[from,to])


	const CreateValue = () => {

    setClicked(true)
    



			
    if(customer === "Tanmiah")
    {

      
     

      // console.log(tanmiah.MrnaDev)
      // console.log(tanmiah.TaxDbPrd)
      // console.log(tanmiah.PODev)
      // console.log('JIIIIIIII')



    
    CreateTable(tanmiah.EY)
    CreateTable(tanmiah.MrnaPrd)
    CreateTable(tanmiah.APPR)
    CreateTable(tanmiah.PowerBI)
    CreateTable(tanmiah.POPrd)
    CreateTable(tanmiah.DMSPrd)
    CreateTable(tanmiah.TaxDbPrd)
    CreateTable(tanmiah.TaxPrd)
    CreateTable(tanmiah.EccPrd,'last')


CreateTable2(service1.SPFAPPRPRDHTTPS1);
CreateTable2(service1.SPFAPPRPRDHTTPS2);
CreateTable2(service1.SPFDMSPRDDMS);
CreateTable2(service1.SPFECCPRDMESSAGE);
CreateTable2(service1.SPFECCPRDORACLE);
CreateTable2(service1.SPFECCPRDGATEWAY);
CreateTable2(service1.SPFECCPRDDISPATCHER);
CreateTable2(service1.SPFEYPRDHTTP);
CreateTable2(service1.SPFMRNAPRDSQL);
CreateTable2(service1.SPFPOPRDDATABASE);
CreateTable2(service1.SPFPOPRDSMTP);
CreateTable2(service1.SPFPOPRDGATEWAY);
CreateTable2(service1.SPFPOPRDJAVA);
CreateTable2(service1.SPFPOPRDDISP);
CreateTable2(service1.SPFPOPRDNIMSH);
CreateTable2(service1.SPFPOWBISQL);
CreateTable2(service1.SPFTAXDBPRDPOSTGRES);
CreateTable2(service1.SPFTAXDBPRDSSH);
CreateTable2(service1.SPFTAXPRDHTTP,'last');


    }
    else{

       
    // axios.get(`http://${baseurl}/action3/getfirewall`)
    // .then(response => {
    //     console.log('API Response:', response.data);
    // })
    // .catch(error => {
    //     console.error('API Error:', error);
    // });
    console.log(service2.MAASOLPRDAPP2)
    console.log(service2.MAABWDEVMSG)

     


CreateTable(maadaniyah.BPCPrd);
CreateTable(maadaniyah.SolPrd);
CreateTable(maadaniyah.DMSPrd);
CreateTable(maadaniyah.HanaPrdB);
CreateTable(maadaniyah.HanaPrdA);
CreateTable(maadaniyah.ECCPrd);
CreateTable(maadaniyah.BoPrd,'last');


CreateTable2(service2.MAABOHNAPRDIDX);
CreateTable2(service2.MAABOPRDHTTP);


CreateTable2(service2.MAABWHNAPRDIDX);
CreateTable2(service2.MAABWPRDMSG);
CreateTable2(service2.MAABWPRDGW);
CreateTable2(service2.MAABWPRDDISP);

CreateTable2(service2.MAAECCPRDDISP);
CreateTable2(service2.MAAECCPRDGW);
CreateTable2(service2.MAAECCPRDMSG);

CreateTable2(service2.MAAHNAPRDSSH);
CreateTable2(service2.MAAHNAPRDIDX);
CreateTable2(service2.MAAHNAPRDSYSTEMDB);

CreateTable2(service2.MAAHNAPRDBIDX1);
CreateTable2(service2.MAAHNAPRDBIDX2);
CreateTable2(service2.MAAHNAPRDBIDX3);

CreateTable2(service2.MAASOLPRDAPP2);
CreateTable2(service2.MAASOLPRDAPP1);
CreateTable2(service2.MAASOLPRDDB1);
CreateTable2(service2.MAASOLPRDDB2,'last');














    }
		
		


	}

	const CreateTable = (arr2,param2) => {
	
    if(arr2?.length === 0)
    {
      arr2 = [0,0,0]
    }
	 const countOnes = arr2.filter(value => value.value_min === "1")?.length;
	  const totalElements = arr2?.length;
	  const percentage = ((countOnes / totalElements) * 100);
	  // if(arr3?.length === 17 || arr3?.length === 11)
    // {
    //   console.log(arr2)
    //   console.log(percentage)
    //   console.log(typeof(countOnes))
    //   console.log(typeof(totalElements))
    //   console.log(Number(percentage.toFixed(2)))

    // }
	  arr1.push(Number(percentage.toFixed(2)))
	  // console.log(arr1)
	  // if(arr1?.length === 17 || arr1?.length === 11)
    if(param2 === 'last')
	  {
      if(customer === 'Maadaniyah')
      {
        setArr1(arr1.slice(-7))
      }
      else{
        setArr1(arr1.slice(-9))
      }
      
	  	 const sum = arr1.reduce((accumulator, currentValue) => accumulator + currentValue);
		  const avge = sum / arr1?.length;
      console.log(arr1?.length)
      console.log(arr1)
		  setAverage(avge)
	  }

	}

  const CreateTable2 = (arr2,param2) => {

    
    if(arr2?.length === 0)
    {
      arr2 = [0,0,0]
    }
      
    
  
   const countOnes = arr2.filter(value => value.value_min === "1")?.length;
    const totalElements = arr2?.length;
    const percentage = ((countOnes / totalElements) * 100);
    
    arr3.push(Number(percentage.toFixed(2)))
    // console.log(arr3)
    // if(arr3?.length === 17 || arr3?.length === 11)
    if(param2 === 'last')
    {

      if(customer === 'Maadaniyah')
      {
        setArr3(arr3.slice(-19))
      }
      else{
        setArr3(arr3.slice(-19))
      }
      
       const sum = arr3.reduce((accumulator, currentValue) => accumulator + currentValue);
      const avge = sum / arr3?.length;
      setAverage2(avge)
    }

  }

const columns = [
  { field: 'Host', headerName: 'Host', width: 200 },
  { field: 'Up', headerName: 'Up', width: 170 },
  { field: 'Down', headerName: 'Down', width: 170 },
  { field: 'Unreachable', headerName: 'Unreachable', width: 170 }]

const rows = host?.map((i,index) =>{

  
    return {
      id:index,
      Host:i?.host,
      Up:arr1[index]+'%',
      Down:(100-arr1[index]).toFixed(2)+'%',
      Unreachable:(100-arr1[index]).toFixed(2)
    }
  

  
} ).filter(row => row.Up !== 'undefined%');

const getRowClassName = (params) => {
  const Up = params.row.Up;

  const numberString = Up.replace('%', '');

  // Use parseFloat to convert the string to a number
  const numberValue = parseFloat(numberString);

  // Define the CSS class based on the Up value
  if (numberValue > 95) {
    return styles.great; // You can define this CSS class in your styles
  } else if (numberValue > 70 && numberValue < 95) {
    return styles.notsogreat; // You can define this CSS class in your styles
  }
  else
  {
    return styles.worse
  }

  // Default class when no condition matches
  return '';
};

const columns2 = [
  {
    field: 'Host',
    headerName: 'Host',
    width: 170
    // renderCell: (params) => {
    //   if (params.rowIndex === 0 || params.value !== params.api.getRow(params.rowIndex - 1)?.Host) {
    //     return <div>{params.value}</div>;
    //   } else {
    //     return <div></div>;
    //   }
    // },
  },
  { field: 'Services', headerName: 'Services', width: 200 },
  
  { field: 'Up', headerName: 'Up', width: 170 },
  { field: 'Down', headerName: 'Down', width: 170 },
  { field: 'Unreachable', headerName: 'Unreachable', width: 170 }]

const rows2 = tservice?.map((i,index) =>{

  return {
    id:index,
    Host:i?.host,
    Services:i?.name,
    Up:arr3[index]+'%',
    Down:(100-arr3[index]).toFixed(2)+'%',
    Unreachable:(100-arr3[index]).toFixed(2)
  }
} ).filter(row => row.Up !== 'undefined%');



	return (

			<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className='flex justify-between items-center'>
			<Header  title="Availability Report" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Zabbix",nav:"Zabbix"}]}/>
      <div className='hello'>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        
        <DatePicker
          label="From"
          value={from1}
          onChange={(newValue) => handleDate({direction:'from',value:newValue})}
        />
      
        <DatePicker
          label="To"
          value={to1}
          onChange={(newValue) => handleDate({direction:'to',value:newValue})}
        />
      </DemoContainer>
    </LocalizationProvider>
      </div>
      </div>
		<LoadingButton onClick={CreateValue}variant='contained' loadingPosition="start" loading={load} color='secondary'>Generate</LoadingButton>
    <Button onClick={downloadScreenshot} variant='contained'  color='secondary' style={{marginLeft:'5px'}}>PDF</Button>
		
    <div ref={ref}>


    
   
		{clicked && <div style={{ height: 600, width: '80%',marginTop:'20px' }}>
       <h1 style={{fontWeight:'bold',fontSize:'25px',fontFamily:'Arial, Geneva, sans-serif',marginBottom:'20px'}}>Host Availability</h1>
       <DataGrid rows={rows} columns={columns}  getRowClassName={getRowClassName} />
       
       </div> }

       

       {clicked &&
       <>
        <h2 style={{fontWeight:'bold',fontSize:'15px',fontFamily:'Arial, Geneva, sans-serif',margin:'20px'}}>Average: {average.toFixed(2)}</h2>
        <div className='flex w-100 mt-20 justify-between items-center'>
       {clicked && <Plot
      data={data}
      layout={layout}
    />
  } 

  
 
    </div>
     <h1 style={{fontWeight:'bold',fontSize:'25px',fontFamily:'Arial, Geneva, sans-serif',marginBottom:'20px'}}>Services Availability</h1>
       </>   }

    
    </div>

    <div ref = {set2}>
       
    {arr3?.length !==0 && <div style={{ height: 900, width: '85%',marginTop:'20px' }}>
     
       <DataGrid rows={rows2} columns={columns2}  getRowClassName={getRowClassName}/>
       
       </div> }

       {arr3?.length !==0 && <h2 style={{fontWeight:'bold',fontSize:'15px',fontFamily:'Arial, Geneva, sans-serif',marginLeft:'20px',marginTop:'-40px'}}>Average: {average2.toFixed(2)}</h2> }
       

       <div className='flex w-100 mt-20 justify-between items-center'>
      
  {clicked && <Plot
      data={data2}
      layout={layout2}
    />
  } 
    </div>
  
    </div>
      
		
			</div>
		)
}


export default ZReports
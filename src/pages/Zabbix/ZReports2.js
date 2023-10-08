import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/context2";
import { useParams, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
import styles from './Zabbix.module.css';
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
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Header } from "../../components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Plot from "react-plotly.js";

const ZReports2 = () => {
  const { token, link, customer, baseurl } = useGlobalContext();
  const navigate = useNavigate();
  const [host, setHost] = useState();
  const [tservice, setTService] = useState();
  const [mservice, setMService] = useState();
  const [clicked, setClicked] = useState(false);
  const [average, setAverage] = useState(99);
  const [average2, setAverage2] = useState(99);
  const [load, setLoad] = useState(true);
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [from1, setFrom1] = React.useState('');
  const [to1, setTo1] = React.useState('');

  let requestBody;
  let requestBody2;
  let requestBody3;
  let requestBody4;
  const arr33 = [100, 100, 99, 100, 98, 100, 100, 100, 100, 100, 100];
  const [service1, setService1] = useState({
    ROMECCDP: [],
    ROMECCHTTP: [],
    ROMECCSMTP: [],
    ROMECCGW: [],
    ROMECCHTTPS: [],
    ROMECCSSH: [],
    ROMNWGDP: [],
    ROMNWGSSH: [],
    ROMNWGGW: [],
    ROMNWGHTTP: [],
    ROMSOLJAVA: [],
    ROMSOLHTTP: [],
    ROMSOLGW: [],
    ROMSOLSSH: [],
    ROMSOLDP: [],
    ROMS4PRDDP: [],
    ROMS4HNAPRDSSH: [],
    ROMS4HNAPRDIDX2: [],
    ROMS4HNAPRDIDX1 : []
  });
  const [service3, setService3] = useState({
    ARASLMPRDDISP: [],
    ARAFIORIPRDMSG: [],
    ARASLMPRDMSG: [],
    ARAFIORIPRDGW: [],
    ARAS4HNAPRDIDX: [],
    ARAFIORIPRDDISP: [],
    ARAS4PRDSSH: [],
    ARAWDPRDSSH: [],
    ARAFIORIPRDSSH: [],
    ARAWDPRDPORT: [],
    ARASLMPRDGW: [],
    ARAS4HNAPRDSSH: [],
    ARAS4PRDGW: [],
    ARASLMPRDSSH: [],
    ARAS4PRDDISP: [],
    ARAS4PRDMSG: [],
    ARAFIORIPRDHTTP: [],
  });
  
//   const [service4, setService4] = useState({
//     ARAS4QASGW: [],
//     ARAS4QASDISP: [],
//     ARAWDDEVPORT: [],
//     ARAFIORIDEVMSG: [],
//     ARAWDDEVSSH: [],
//     ARAS4QASSSH: [],
//     ARAS4QASMSG: [],
//     ARAS4DEVSSH: [],
//     ARAS4DEVMSG: [],
//     ARAFIORIDEVHTTP: [],
//     ARAFIORIDEVGW: [],
//     ARAS4DEVGW: [],
//     ARAS4DEVDISP: [],
//     ARAFIORIDEVDISP: [],
//     ARAFIORIDEVSSH: [],
//   });
  
  

  const [romana, setRomana] = useState({
    RomEccPrd: [],
    RomHanaPrd: [],
    RomNwgPrd: [],
    RomSolPrd: [],
    RomWdPrd: [],
    // RomHanaDev: [],
    // RomEccDev: [],
    // RomQasDev: [],
    // RomNwgDev: [],
    // RomManVm: [],
  });

  const [maadaniyah, setMaadaniyah] = useState({
    BoDev: [],
    BPCPrd: [],
    SolPrd: [],
    DMSPrd: [],
    HanaPrdB: [],
    HanaPrdA: [],
    ECCPrd: [],
    WinMGMT: [],
    BoPrd: [],
    BPCDev: [],
    HanaDevQas: [],
  });const [ara, setara] = useState({
    PBIP: [],
    S4PRD: [],
    HANAPRD: [],
    NWGPRD: [],
    SLMPRD: [],
    WDPRD: []
  });
  
  const [aranonprd, setaranonprd] = useState({
    NWGDEV: [],
    S4DEV: [],
    S4QAS: [],
    WDDEV: [],
    HANADEV: [],
  });

  let [arr1, setArr1] = useState([]);
  let [arr3, setArr3] = useState([]);

  const data = [
    {
      labels: ["Unavailability", "Availability"],
      values: [100 - average, average],
      type: "pie",
    },
  ];

  const data2 = [
    {
      labels: ["Unavailability", "Availability"],
      values: [100 - average2, average2],
      type: "pie",
    },
  ];

  const layout = {
    title: "Host Availability",
  };

  const layout2 = {
    title: "Services Availability",
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
    if (customer === "Romana") {
      requestBody3 = {
        jsonrpc: "2.0",
        method: "item.get",
        params: {
          output: ["itemid", "name", "key_", "lastvalue"],
          hostids: [
            "10624",
            "10627",
            "10631",
            "10632",
            "10633",
          ],
          selectTags: ["tag", "value"],
          evaltype: 0,
          tags: [
            { tag: "Application", value: "SAP", operator: 0 },
            { tag: "Application", value: "SQL", operator: 0 },
          ],
        },
        auth: token,
        id: 1,
      };

      requestBody4 = {
        jsonrpc: "2.0",
        method: "trend.get",
        params: {
          output: "extend",
          itemids: [
            '56892',
            '56896',
            '56900',
            '56894',
            '56898',
            '56902',
            '56876',
            '56882',
            '56878',
            '56880',
            '56930',
            '56928',
            '56926',
            '56932',
            '56924',
            '57007',
            '60723',
            '60721',
            '60719',

          ],
          time_from: from ? from : '1693566435',
          time_till:to?to:'1695208035',
        },
        id: 1,
        auth: token,
      };
    } else {
         requestBody3 = {
   jsonrpc: '2.0',
   method: 'item.get',
   params: {
     output: ['itemid', 'name', 'key_', 'lastvalue'],
     hostids: [
       '10563', '10638', '10639', '10640','10641', '10642'],
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
      '56946', '56004','56950', '56002', '56787', '56001', '56942', '56960', '56936', '56958', '56948', '56940', '56792', 
      '56952', '56791', '56793', '56003'
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
      content: requestBody3,
      header: { "Content-Type": "application/json-rpc" },
      url: link,
    };

    const newbody2 = {
      content: requestBody4,
      header: { "Content-Type": "application/json-rpc" },
      url: link,
    };

    axios
      .post(`http://${baseurl}/actionzabbix/zabbixhosts`, newbody)
      .then(function (response) {
        const newarr = response.data.result.result.map((i) => {
          return {
            itemid: i.itemid,
            host: i.name.split("-").slice(0, -1).join(""),
            name: i.name,
            key: i.key_,
          };
        });
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
            return { ...row, host: "" };
          }
        });
        setTService(newRows);
        console.log(newRows);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .post(`http://${baseurl}/actionzabbix/zabbixhosts`, newbody2)
      .then(function (response) {
        console.log(response.data.result);
        const data = response?.data?.result?.result;

        //         const data = Object.values(data2.reduce((acc, item) => {
        //   acc[item.clock] = item;
        //   return acc;
        // }, {}));
        console.log(data);
        if (customer === "Romana") {
          setService1((prevState) => ({
            ...prevState,
            ROMECCDP: data.filter((i) => i.itemid === '56892'),
            ROMECCHTTP: data.filter((i) => i.itemid === '56896'),
            ROMECCSMTP: data.filter((i) => i.itemid === '56900'),
            ROMECCGW: data.filter((i) => i.itemid === '56894'),
            ROMECCHTTPS: data.filter((i) => i.itemid === '56898'),
            ROMECCSSH: data.filter((i) => i.itemid === '56902'),
            ROMNWGDP: data.filter((i) => i.itemid === '56876'),
            ROMNWGSSH: data.filter((i) => i.itemid === '56882'),
            ROMNWGGW: data.filter((i) => i.itemid === '56878'),
            ROMNWGHTTP: data.filter((i) => i.itemid === '56880'),
            ROMSOLJAVA: data.filter((i) => i.itemid === '56930'),
            ROMSOLHTTP: data.filter((i) => i.itemid === '56928'),
            ROMSOLGW: data.filter((i) => i.itemid === '56926'),
            ROMSOLSSH: data.filter((i) => i.itemid === '56932'),
            ROMSOLDP: data.filter((i) => i.itemid === '56924'),
            // ROMSOLDP: data.filter((i) => i.itemid === '56926'),
            ROMS4PRDDP: data.filter((i) => i.itemid === '57007'),
            ROMS4HNAPRDIDX1: data.filter((i) => i.itemid === '60719'),
            ROMS4HNAPRDIDX2: data.filter((i) => i.itemid === '60721'),
            ROMS4HNAPRDSSH: data.filter((i) => i.itemid === '60723'),
          }));
        } else {
            setService3(prevState => ({
                ...prevState,
                ARASLMPRDDISP: data.filter((i) => i.itemid === '56946'),
                ARAFIORIPRDMSG: data.filter((i) => i.itemid === '56004'),
                ARASLMPRDMSG: data.filter((i) => i.itemid === '56950'),
                ARAFIORIPRDGW: data.filter((i) => i.itemid === '56002'),
                ARAS4HNAPRDIDX: data.filter((i) => i.itemid === '56787'),
                ARAFIORIPRDDISP: data.filter((i) => i.itemid === '56001'),
                ARAS4PRDSSH: data.filter((i) => i.itemid === '56942'),
                ARAWDPRDSSH: data.filter((i) => i.itemid === '56960'),
                ARAFIORIPRDSSH: data.filter((i) => i.itemid === '56936'),
                ARAWDPRDPORT: data.filter((i) => i.itemid === '56958'),
                ARASLMPRDGW: data.filter((i) => i.itemid === '56948'),
                ARAS4HNAPRDSSH: data.filter((i) => i.itemid === '56940'),
                ARAS4PRDGW: data.filter((i) => i.itemid === '56792'),
                ARASLMPRDSSH: data.filter((i) => i.itemid === '56952'),
                ARAS4PRDDISP: data.filter((i) => i.itemid === '56791'),
                ARAS4PRDMSG: data.filter((i) => i.itemid === '56793'),
                ARAFIORIPRDHTTP: data.filter((i) => i.itemid === '56003'),
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [from,to]);

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
    if (customer === "Romana") {
      requestBody = {
        jsonrpc: "2.0",
        method: "host.get",
        params: {
          output: ["host"], // Specify the desired output fields
          groupids: "35", // ID of the host group
        },
        id: 1,
        auth: token,
      };
    } else {
        requestBody = {
            jsonrpc: '2.0',
            method: 'host.get',
            params: {
              output: ['host'], // Specify the desired output fields
              groupids:'37', // ID of the host group
            },
            id: 1,
            auth:token,
          }
    }

    const newbody = {
      content: requestBody,
      header: { "Content-Type": "application/json-rpc" },
      url: link,
    };

    axios
      .post(`http://${baseurl}/actionzabbix/zabbixhosts`, newbody)
      .then(function (response) {
        setHost(response.data.result.result);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [from,to]);

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
    if (customer === "Romana") {
      requestBody2 = {
        jsonrpc: "2.0",
        method: "trend.get",
        params: {
          output: [
            "itemid",
            "clock",
            "num",
            "value_min",
            "value_avg",
            "value_max",
          ],
          itemids: [
            // '56892',
            // '56896',
            // '56900',
            // '56894',
            // '56898',
            // '56902',
            // '56876',
            // '56882',
            // '56878',
            // '56880',
            // '56930',
            // '56928',
            // '56926',
            // '56932',
            // '56924',
            // '57007',
            '53728',
            '54016',
            '54284',
            '54351',
            '54418',
          ],
          time_from: from ? from : '1693566435',
          time_till:to?to:'1695208035',
        },
        id: 1,
        auth: token,
      };
    } else {
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
              itemids:['50368', '54752', '54819', '54886', '54953', '55020'],
              time_from: from ? from : '1693566435',
              time_till:to?to:'1695208035',
             
              
            },
            id: 1,
            auth:token,
          }
    }

    const newbody2 = {
      content: requestBody2,
      header: { "Content-Type": "application/json-rpc" },
      url: link,
    };

    axios
      .post(`http://${baseurl}/actionzabbix/zabbixhosts`, newbody2)
      .then(function (response) {
        // setHost(response.data.result.result)
        console.log(response.data.result.result);
        const data = response?.data?.result?.result;
        //          const data = Object.values(data2.reduce((acc, item) => {
        //   acc[item.clock] = item;
        //   return acc;
        // }, {}));
        // console.log(data);
        // response?.data?.result?.result.map((i) => {
        if (customer === "ARA") {
            // console.log(data.filter((i) => i.itemid === '50905'))
            // console.log(data.filter((i) => i.itemid === '49468'))
          
          
            setara(prevState => ({
            ...prevState,
            PBIP: data.filter((i) => i.itemid === '50368'),
            S4PRD: data.filter((i) => i.itemid === '54752'),
            HANAPRD: data.filter((i) => i.itemid === '54819'),
            NWGPRD: data.filter((i) => i.itemid === '54886'),
            SLMPRD: data.filter((i) => i.itemid === '54953'),
            WDPRD: data.filter((i) => i.itemid === '55020'),
          }));

          setLoad(false);
        } else {
        //   console.log(data.filter((i) => i.itemid === "50905"));
        //   console.log(data.filter((i) => i.itemid === "49468"));

          setRomana((prevState) => ({
            ...prevState,
            RomEccPrd: data.filter((i) => i.itemid === "53728"),
            RomHanaPrd: data.filter((i) => i.itemid === "54016"),
            RomNwgPrd: data.filter((i) => i.itemid === "54284"),
            RomSolPrd: data.filter((i) => i.itemid === "54351"),
            RomWdPrd: data.filter((i) => i.itemid === "54418"),
          }));
        }
        // })
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [from,to]);

  const CreateValue = () => {
    setClicked(true);

    if (customer === "Romana") {
      console.log(service1.ROMS4HNAPRDSSH)
      console.log(service1.ROMS4HNAPRDIDX1)
      // console.log(tanmiah.PODev)
      // console.log('JIIIIIIII')
      CreateTable(romana.RomEccPrd);
      CreateTable(romana.RomHanaPrd);
      CreateTable(romana.RomNwgPrd);
      CreateTable(romana.RomSolPrd);
      CreateTable(romana.RomWdPrd,'last');

      CreateTable2(service1.ROMECCDP);
      CreateTable2(service1.ROMECCHTTP);
      CreateTable2(service1.ROMECCSMTP);
      CreateTable2(service1.ROMECCHTTPS);
      CreateTable2(service1.ROMECCGW);
      CreateTable2(service1.ROMECCSSH);

      CreateTable2(service1.ROMNWGDP);
      CreateTable2(service1.ROMNWGSSH);
      CreateTable2(service1.ROMNWGHTTP);
      CreateTable2(service1.ROMNWGGW);

      CreateTable2(service1.ROMS4HNAPRDSSH);

      CreateTable2(service1.ROMS4HNAPRDIDX2);
      CreateTable2(service1.ROMS4HNAPRDIDX1);
      
      CreateTable2(service1.ROMS4PRDDP);

      CreateTable2(service1.ROMSOLJAVA);
      CreateTable2(service1.ROMSOLHTTP);
      CreateTable2(service1.ROMSOLGW);
      CreateTable2(service1.ROMSOLSSH);
      CreateTable2(service1.ROMSOLDP,'last');
      

   

    } else {
        CreateTable(ara.PBIP);
        CreateTable(ara.S4PRD);
        CreateTable(ara.HANAPRD);
        CreateTable(ara.NWGPRD);
        CreateTable(ara.SLMPRD);
        CreateTable(ara.WDPRD,'last');
        
        CreateTable2(service3.ARAFIORIPRDHTTP);
        CreateTable2(service3.ARAFIORIPRDMSG);
        CreateTable2(service3.ARAFIORIPRDGW);
        CreateTable2(service3.ARAFIORIPRDDISP);
        CreateTable2(service3.ARAFIORIPRDSSH);

         CreateTable2(service3.ARAS4HNAPRDIDX);
         CreateTable2(service3.ARAS4HNAPRDSSH);

         CreateTable2(service3.ARAS4PRDSSH);
         CreateTable2(service3.ARAS4PRDGW);
         CreateTable2(service3.ARAS4PRDDISP);
         CreateTable2(service3.ARAS4PRDMSG);


         
        CreateTable2(service3.ARASLMPRDDISP);
       CreateTable2(service3.ARASLMPRDMSG);
       CreateTable2(service3.ARASLMPRDGW);
       CreateTable2(service3.ARASLMPRDSSH);
       
        CreateTable2(service3.ARAWDPRDSSH);
       CreateTable2(service3.ARAWDPRDPORT,'last');
        
       
       
        
        
    }
  };

  const CreateTable = (arr2,param2) => {
	
   
    if(arr2.length === 0)
    {
      arr2 = [0,0,0]
    }
	 const countOnes = arr2.filter(value => value.value_min === "1")?.length;
	  const totalElements = arr2.length;
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
      if(customer === 'ARA')
      {
        setArr1(arr1.slice(-6))
      }
      else{
        setArr1(arr1.slice(-5))
      }
      
	  	 const sum = arr1.reduce((accumulator, currentValue) => accumulator + currentValue);
		  const avge = sum / arr1?.length;
      console.log(arr1.length)
      console.log(arr1)
		  setAverage(avge)
	  }

	}

  const CreateTable2 = (arr2,param2) => {

    
    if(arr2.length === 0)
    {
      arr2 = [0,0,0]
    }
      
    
  
   const countOnes = arr2.filter(value => value.value_min === "1")?.length;
    const totalElements = arr2?.length;
    const percentage = ((countOnes / totalElements) * 100);
    
    arr3.push(Number(percentage.toFixed(2)))
    console.log(arr3)
    // if(arr3?.length === 17 || arr3?.length === 11)
    if(param2 === 'last')
    {

      if(customer === 'ARA')
      {
        setArr3(arr3.slice(-17))
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
    { field: "Host", headerName: "Host", width: 200 },
    { field: "Up", headerName: "Up", width: 170 },
    { field: "Down", headerName: "Down", width: 170 },
    { field: "Unreachable", headerName: "Unreachable", width: 100 },
  ];

  const rows = host?.map((i, index) => {
    return {
      id: index,
      Host: i.host,
      Up: arr1[index] + "%",
      Down: (100 - arr1[index]).toFixed(2) + "%",
      Unreachable: (100 - arr1[index]).toFixed(2),
    };
  });

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
      field: "Host",
      headerName: "Host",
      width: 170,
      // renderCell: (params) => {
      //   if (params.rowIndex === 0 || params.value !== params.api.getRow(params.rowIndex - 1)?.Host) {
      //     return <div>{params.value}</div>;
      //   } else {
      //     return <div></div>;
      //   }
      // },
    },
    { field: "Services", headerName: "Services", width: 200 },

    { field: "Up", headerName: "Up", width: 170 },
    { field: "Down", headerName: "Down", width: 170 },
    { field: "Unreachable", headerName: "Unreachable", width: 100 },
  ];

  const rows2 = tservice?.map((i, index) => {
    return {
      id: index,
      Host: i.host,
      Services: i.name,
      Up: arr3[index] + "%",
      Down: (100 - arr3[index]).toFixed(2) + "%",
      Unreachable: (100 - arr3[index]).toFixed(2),
    };
  });

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
  
 
  {clicked && <div style={{ height: 400, width: '70%',marginTop:'20px' }}>
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
  );
};

export default ZReports2;

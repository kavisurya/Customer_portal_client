import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../../../contexts/context2'
import { useStateContext } from '../../../contexts/context'
import { Header } from '../../../components';
import axios from 'axios';
import pc from '../../../data/Pc.png'
import styles from './AzureVM.module.css';
import {CircularProgress} from '@mui/material';

const AzureVM = () => {

const {azurecred,baseurl} = useGlobalContext()
	const [vm,setVm] = useState([])
	const [load, setLoad] = useState(true);
	const { currentColor ,handleClose,isClicked} = useStateContext();

	useEffect(() => {

		
				axios.post(`http://${baseurl}/action2/azurevm`,azurecred)
      .then(function (response) {

      	
      	setLoad(false)
      	const newdata = response.data?.Allvms?.map((i,index) => {

      		return {

      			Name:i.name,
      			location:i.location,
      			VMsize:i.hardwareProfile?.vmSize,
      			id:i.vmId,
      			type:i.type,
      			timeCreated:i.timeCreated,
      			OS:i.storageProfile?.osDisk?.osType,
      			Status:response?.data?.status[index].status

      		}
      	})
      		
      		// return {
      		// 	InstanceId:i.InstanceId,
      		// 	InstanceType:i.InstanceType,
      		// 	LaunchTime:i.LaunchTime,
      		// 	PlatformDetails:i.PlatformDetails,
      		// 	PrivateIpAddress:i.PrivateIpAddress,
      		// 	PublicIpAddress:i.PublicIpAddress,
      		// 	State:i.State.Name,
      		// 	VpcId:i.VpcId,
      		// 	SubnetId:i.SubnetId
      		// }


      	
      	 	setVm(newdata)
      	
        console.log(response?.data)
        console.log(newdata)
      })
      .catch(function (error) {
        console.log(error)
      });

		
		
		


	},[])

return (
		 <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header  title="AzureVM" bread={[{value:"Dashboard",nav:"dashboard"},{value:"Azure",nav:"Azure"},{value:"AzureVM",nav:"AzureVM"}]}  />
        {load?<CircularProgress />:(
        <div className="flex m-3 flex-wrap  gap-3 ">
    	{vm.map((i) => {

    		return (

					    			<div className={styles.card}>
										  <div className={styles.content}>
										    <div className={styles.front}>
										      <div style={{display:'flex',alignItems:'center',marginBottom:'10px'}}>
				    <img src={pc} alt='PC' width='100px' height='100px' />
				    <div style={{marginLeft:'10px'}}>
				    <p><span>Name: </span> {i.Name}</p>
				    <p><span>Status: </span> {i.Status}</p>
				    <p><span>VM id:</span> {i.id}</p>
				    <p><span>Platform: </span> {i.OS}</p>

				    </div>
				    </div>
				    	
										    </div>
										    <div className={styles.back}>
										       <div style={{marginLeft:'10px'}}>
													    <p><span>VM Type:</span> {i.type}</p>
													    <p><span>LaunchTime: </span> {i.timeCreated}</p>
													    <p><span>VMsize: </span> {i.VMsize}</p>
													    <p><span>Location: </span> {i.location}</p>
													    

				    							</div>
										    </div>
										  </div>
					</div>





    			)
    	})}
    </div>
    )}
    
		</div>
		)
}

export default AzureVM
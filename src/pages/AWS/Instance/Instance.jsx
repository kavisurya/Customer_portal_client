import React,{useEffect,useState} from 'react'
import { Header } from '../../../components';
import { useGlobalContext } from '../../../contexts/context2'
import { useStateContext } from '../../../contexts/context'
import styles from './Instance.module.css';
import axios from 'axios';
import pc from '../../../data/Pc.png'

const Instance = () => {

	const {awscred,baseurl} = useGlobalContext()
	const [ec2,setEc2] = useState([])
	const { currentColor ,handleClose,isClicked} = useStateContext();

useEffect(() => {

		
				axios.post(`http://${baseurl}/action/awsec2`,awscred)
      .then(function (response) {

      	const newdata = response?.data.Reservations?.map(i => i.Instances[0] )
      	console.log(newdata)
      	const newdata2 = newdata?.map((i) => {

      		return (

      		{
      			InstanceId:i.InstanceId,
      			InstanceType:i.InstanceType,
      			LaunchTime:i.LaunchTime,
      			PlatformDetails:i.PlatformDetails,
      			PrivateIpAddress:i.PrivateIpAddress,
      			PublicIpAddress:i.PublicIpAddress,
      			State:i.State.Name,
      			VpcId:i.VpcId,
      			SubnetId:i.SubnetId,
      			Name:i?.Tags[0]?.Value
      		}


      			)
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


      	
      	setEc2(newdata2)
      	
        console.log(newdata2)
      })
      .catch(function (error) {
        console.log(error)
      });

		
		
		


	},[])


	return (

			<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header  title="EC2" bread={[{value:"Dashboard",nav:"dashboard"},{value:"AWS",nav:"aws"},{value:"ec2",nav:"EC2"}]} />
    <div className="flex m-3 flex-wrap  gap-3 ">
    	{ec2.map((i) => {

    		return (

    				// <div className={styles.container}>
    				// <div style={{display:'flex',alignItems:'center',marginBottom:'10px'}}>
				    // <img src={pc} alt='PC' width='100px' height='100px' />
				    // <div style={{marginLeft:'10px'}}>
				    // <p><span>InstanceID:</span> {i.InstanceId}</p>
				    // <p style={{color:i.State === 'running'?'green':'red'}}><span style={{color:'black'}}>State:</span> {i.State}</p>
				    // <p><span>LaunchTime:</span> {i.LaunchTime}</p>

				    // </div>
				    // </div>
				    // 	<button
				    //         type="button"
				    //         // onClick={() => handleClose('userProfile')}
				    //          style={{ backgroundColor: currentColor, color:'white',borderRadius:'5px' }}
      			// 			className={`p-1 w-1/4 hover:drop-shadow-xl hover:bg-white`}
				    //       >
				    //         View
				    //       </button>
				    //  </div>

					    			<div className={styles.card}>
										  <div className={styles.content}>
										    <div className={styles.front}>
										      <div style={{display:'flex',alignItems:'center',marginBottom:'10px'}}>
				    <img src={pc} alt='PC' width='100px' height='100px' />
				    <div style={{marginLeft:'10px'}}>
				    <p><span>Name: </span> {i.Name}</p>
				    <p style={{color:i.State === 'running'?'green':'red'}}><span style={{color:'#03446A'}}>State: </span> {i.State}</p>
				    <p><span>InstanceId:</span> {i.InstanceId}</p>
				    <p><span>Platform: </span> {i.PlatformDetails}</p>

				    </div>
				    </div>
				    	
										    </div>
										    <div className={styles.back}>
										       <div style={{marginLeft:'10px'}}>
													    <p><span>InstanceType:</span> {i.InstanceType}</p>
													    <p><span>LaunchTime: </span> {i.LaunchTime}</p>
													    <p><span>PrivateIpAddress: </span> {i.PrivateIpAddress}</p>
													    <p><span>PublicIpAddress: </span> {i.PublicIpAddress}</p>
													    <p><span>VPC id: </span> {i.VpcId}</p>

				    							</div>
										    </div>
										  </div>
					</div>





    			)
    	})}
    </div>

    </div>
		)
}

export default Instance
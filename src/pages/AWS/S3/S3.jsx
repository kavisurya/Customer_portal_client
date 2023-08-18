import React,{useState,useEffect} from 'react'
import { Header } from '../../../components';
import { useGlobalContext } from '../../../contexts/context2'
import axios from 'axios';
import Tree from 'react-animated-tree'
import styles from './S3.module.css';
import {CircularProgress} from '@mui/material';


const TreeComponent = ({ data }) => {
  const renderTreeNodes = (nodes) => {
    return nodes.map((node,index) => {
      if (node.contents) {
      	const size = (Number(node.size)/1024).toFixed(2)
      	const value = `${node.key}--------(${size}MB)`
        return (
          <Tree key={index} content={value} style={{ color: '#63b1de' }} >
            {renderTreeNodes(node.contents)}
          </Tree>
        );
      }

      return <Tree  content={node.key}  />;
    });
  };

  return renderTreeNodes(data)
};

const S3 = () => {

	
	const {awscred} = useGlobalContext()
	console.log(awscred)
	const [s3data,setS3data] = useState()
	const [load, setLoad] = useState(true);

	const typeStyles = {
  fontSize: '15px',
  verticalAlign: 'middle',

  
  
}

	useEffect(() => {

		
				axios.post('http://localhost:5000/action/awss3',awscred)
      .then(function (response) {

      	setLoad(false)
      	console.log(load)
      	setS3data(response.data)
      	
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });

		
		
		


	},[])



	return (

		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
   <Header  title="S3" bread={[{value:"Dashboard",nav:"dashboard"},{value:"AWS",nav:"aws"},{value:"S3",nav:"s3"}]} />

    {load?<CircularProgress />:(

<>
{s3data?.newbucketlist?.map((i) => {

    	
    	return(
    		<>
    		 	<Tree content={i.name} type="Bucket"  style={typeStyles}>
    		
    		 <TreeComponent data={i.contents} />

    		</Tree> 
    		</>

    		)

    	

    		

    		

    })}
</>
    	)}
    

    </div>
    	

    


   
    

		)
}

export default S3
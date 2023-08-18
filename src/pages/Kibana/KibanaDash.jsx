import React,{useEffect} from 'react'
// import styles from './kibanadash.module.css';
import { useGlobalContext } from '../../contexts/context2'
import { Header } from '../../components';
import axios from 'axios'
const KibanaDash = () => {

	const {link} = useGlobalContext()
	let embed = 'embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&show-time-filter=true'
	let index = link.indexOf('?')
	let newlink = link.slice(0,index+1) + embed
	console.log()

return (

	<>
	<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header  title="Kibana" bread={["Kibana","KibanaDash"]} />
	<iframe  src={newlink} height="800" width="100%"></iframe>
	</div>
	</>
	)



}

export default KibanaDash
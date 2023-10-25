import React, { useEffect, useState } from 'react'
import { Header } from '../../components';
import { useGlobalContext } from '../../contexts/context2'
import { useParams, useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Plot from 'react-plotly.js';

const SLAReport = () => {
    const { slaData } = useGlobalContext()
    console.log(slaData)

    const layout = {
        title: 'Host Availability',
        width: 400, // Set the width to 300 pixels
        height: 400, // Set the height to 200 pixels
        // margin: {
        //     l: 20, // Left margin
        //     r: 20, // Right margin
        // }
    };

    const layout2 = {
        title: 'Services Availability',
        width: 400, // Set the width to 300 pixels
        height: 400, // Set the height to 200 pixels
        padding: {
            t: 40, // Left margin
            
        }
    };

    const data = [
        {
            labels: ['Unavailability', 'Availability'],
            values: [100 - slaData.HostAverageAvailability, slaData.HostAverageAvailability],
            type: 'pie'
        }
    ];

    const data2 = [
        {
            labels: ['Unavailability', 'Availability'],
            values: [100 - slaData.ServiceAverageAvailability, slaData.ServiceAverageAvailability],
            type: 'pie'
        }
    ];

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="" bread={[{ value: "Dashboard", nav: "Dashboard" }, { value: "SLA", nav: "SLA" }, { value: "Preview", nav: "SLAReport" }]} />

            <div className='flex w-100 mt-20 justify-between items-center'>
                <div className="flex-grow">
                    <Plot
                        data={data}
                        layout={layout}
                    />
                </div>
                <div className="flex-grow" >
                    <Plot
                        data={data2}
                        layout={layout2}
                    />
                </div>

            </div>
            <div style={{ height: 700, width: '80%', marginTop: '20px' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '25px', fontFamily: 'Arial, Geneva, sans-serif', marginBottom: '20px' }}>Host Availability</h1>
                <DataGrid rows={slaData.HARows} columns={slaData.HAColumns} slots={{ toolbar: GridToolbar }} />
            </div>
            <h2 style={{ fontWeight: 'bold', fontSize: '15px', fontFamily: 'Arial, Geneva, sans-serif', margin: '20px' }}>Average: {slaData.HostAverageAvailability.toFixed(2)}</h2>
            <div>
            <br />
            <br />

            </div>

            <h1 style={{ fontWeight: 'bold', fontSize: '25px', fontFamily: 'Arial, Geneva, sans-serif', marginBottom: '20px' }}>Services Availability</h1>
            <div style={{ height: 900, width: '85%', marginTop: '20px' }}>

                <DataGrid rows={slaData.SARows} columns={slaData.SAColumns} slots={{ toolbar: GridToolbar }} />

            </div>
            <h2 style={{ fontWeight: 'bold', fontSize: '15px', fontFamily: 'Arial, Geneva, sans-serif', marginLeft: '20px', marginTop: '-40px' }}>Average: {slaData.ServiceAverageAvailability.toFixed(2)}</h2>





        </div>
    )
}

export default SLAReport;
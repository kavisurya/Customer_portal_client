import React, { useState, useEffect } from 'react'
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Header } from '../../components';
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../contexts/context2'
import { Container, Button, Typography, Avatar, FormControl, InputAdornment, TextField, IconButton, Modal } from '@mui/material';
import { Page, Document, Text, View, StyleSheet, Image, Font, PDFDownloadLink } from '@react-pdf/renderer';

import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import MessageIcon from '@mui/icons-material/Message';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { DataGrid } from '@mui/x-data-grid';

import { BlobServiceClient } from '@azure/storage-blob';

import styles from './styles.module.css'

import MyDocument from './SLADownload';
import Togglecomponent from './Toggle';

import axios from 'axios'


const SLA = () => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { setSlaData, SetIDBlobName, IDBlobName } = useGlobalContext()
    const [blobList, setBlobList] = useState([]);
    const [blobVar, setBlobVar] = useState([]);
    const [selectedBlobContent, setSelectedBlobContent] = useState(null);

    // let IdblobName = new Map();
    const [IdblobName, setIdblobName] = useState({})
    const accountName = 'customersladata';
    const containerName = 'testing';
    const sasToken = '?sp=racwdli&st=2023-10-05T10:36:54Z&se=2023-10-31T18:36:54Z&sv=2022-11-02&sr=c&sig=V1VC34TgY3dGRXpbOIrXgFBqD4KvrelL0ZTjmByqISc%3D';


    const [allData, setAllData] = useState([]);
    const [commentMessage, setCommentMessage] = useState("")
    const [rowdata, setRowData] = useState({})
    const { baseurl } = useGlobalContext()

    const onChange = (newValue) => {
        // Handle the value change here, e.g., update your data
        console.log("value", newValue);

    };


    const columns = [
        // { field: 'id', headerName: 'ID', width: 200 },
        { field: 'version', headerName: 'Version', width: 70 },
        { field: 'reportName', headerName: 'Report Name', width: 250 },
        { field: 'customer', headerName: 'Customer', width: 130 },
        // { field: 'status', headerName: 'Status', width: 130 },

        {
            field: 'status', headerName: 'Status', width: 200, resizable: true, renderCell: (params) => {
                return (

                    <Togglecomponent row={params.row} />

                );
            },
        },
        {
            field: 'comment', headerName: 'Comment', width: 140, renderCell: (params) => {
                return (
                    <Button variant="contained" color="secondary" onClick={() => handleComment(params.row)}>
                        <MessageIcon />
                    </Button>
                );
            },
        },
        // {
        //     field: 'Download', headerName: 'Download', width: 140, renderCell: (params) => {
        //         return (
        //             <PDFDownloadLink document={<MyDocument row={params.row} />} fileName={`${params.row.reportName}.pdf`} >
        //                 {({ blob, url, loading, error }) =>
        //                     loading ? "Loading..." : (
        //                         <Button variant="contained" color="primary">
        //                             <SimCardDownloadIcon />
        //                         </Button>
        //                     )
        //                 }
        //             </PDFDownloadLink>
        //         );
        //     },
        // },
        {
            field: 'Download', headerName: 'Download', width: 140, renderCell: (params) => {
                return (  
                                <Button variant="contained" color="primary" onClick={() => handledownloadChange2(params.row)}>
                                    <SimCardDownloadIcon />
                                </Button>      
                )
            },
        },
        {
            field: 'Preview', headerName: 'Preview', width: 140, renderCell: (params) => {
                return (
                    <Button variant="contained" color="primary" onClick={() => handlePreview(params.row)}>
                        <KeyboardDoubleArrowRightIcon />
                    </Button>
                );
            },
        }

    ];





    const handleComment = (data) => {

        console.log(data)
        setOpen(true)
        setRowData(data)
        setCommentMessage(data.comment)
    }
    <></>

    // const handledownloadChange = (data) => {

    //     // setSlaData(data)
    //     setRowData(data)

    // }
    const handledownloadChange2 = async (data) => {

        console.log(data)
        const doc = <MyDocument row={data} />;
        const asPdf = pdf([]); // {} is important, throws without an argument
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();
        console.log(blob)
        saveAs(blob, `${data.reportName}.pdf`);

    }

    const handlePreview = (data) => {
       
        setSlaData(data)
        navigate('/SLAReport')
    }


    useEffect(() => {
        setBlobList([]);
        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net${sasToken}`
        );

        const containerClient = blobServiceClient.getContainerClient(containerName);

        const listBlobs = async () => {
            let blobs = [];
            for await (const blob of containerClient.listBlobsFlat()) {
                // blobs.push(blob.name);
                blobs = [...blobs, blob.name]

            }
            setBlobList(blobs);
        };

        listBlobs();
    }, []);

    useEffect(() => {

        
        const handleBlobSelection = async (blobName) => {

            const blobServiceClient = new BlobServiceClient(
                `https://${accountName}.blob.core.windows.net${sasToken}`
            );

            const containerClient = blobServiceClient.getContainerClient(containerName);

            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            try {
                const response = await blockBlobClient.download();
                const content = await response.blobBody;

                const reader = new FileReader();

                reader.onloadend = () => {
                    const parsedContent = JSON.parse(reader.result);
                    setSelectedBlobContent(parsedContent);
                    
                    setAllData((prevArray) => [...prevArray, parsedContent].slice(0,4));

                    // setIdblobName((prevState) => ({
                    //     ...prevState,
                    //     [parsedContent.id]: blobName
                    //   }));

                    SetIDBlobName((prevState) => ({
                        ...prevState,
                        [parsedContent.id]: blobName
                    }));

                };

                reader.readAsText(content);
            } catch (error) {
                console.error('Error downloading or parsing blob:', error);
                setSelectedBlobContent(null);
            }
        };

        blobList.forEach(async (item) => {
            console.log(item)
            await handleBlobSelection(item);
        });


        console.log('--idblobname---')
        // console.log(IdblobName)
        // SetIDBlobName(IdblobName)


    }, [blobList]);

    console.log('all data', allData)
    console.log(blobList)


    const handleClose = () => {

        setOpen(false)
    };

    const handleResetComment = () =>{
        setCommentMessage("")
    }





   const handlecommentsubmit = async () => {
        // console.log("-------")
        rowdata.comment = commentMessage
        setOpen(false)
        // console.log(rowdata)
        await updateblob(rowdata)
        const data = {
            message: "comment",
            customer: rowdata.customer,
            reportName:`${rowdata.reportName}.pdf`
        }
        axios.post(`http://${baseurl}/api/comment`, data)
            .then(
                function (response) {
                    console.log('comment-response', response)
                })
            .catch(function (error) {
                console.log(error)
            })

        setOpen(false)
    } 

    const handleCommentChange = (e) => {
        setCommentMessage(e.target.value)
    };

    const updateblob = async (data) => {
        // Get a reference to the blob
        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net${sasToken}`
        );

        const containerClient = blobServiceClient.getContainerClient(containerName);

        const len = await blobList.length
        console.log(data.id)
        // console.log(IdblobName)
        console.log(IDBlobName)

        // const blobNameToUpdate = IdblobName[data.id]

        const blobNameToUpdate = IDBlobName[data.id]

        console.log("blobName to update", blobNameToUpdate)
        // const encodedBlobName = encodeURIComponent(blobNameToUpdate);
        const blobClient = await containerClient.getBlockBlobClient(blobNameToUpdate);

        const updatedContent = JSON.stringify(data);

        try {
            // Upload the updated content to the blob
            await blobClient.upload(updatedContent, updatedContent.length, { overwrite: true });

            console.log('Blob updated successfully');
        } catch (error) {
            console.error('Error updating blob', error);
        }

    }









    return (

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Service-Level Agreement" bread={[{ value: "Dashboard", nav: "Dashboard" }, { value: "SLA", nav: "SLA" }]} />

            <div className='App'>
                <div className='Services'>
                    <div>

                    </div>


                </div>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={allData} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.Box}>
                    <div className={styles.Insidebox}>
                    
                    <TextField
                        id="filled-multiline-static"
                        label="FeedBack"
                        multiline
                        rows={5}
                        // defaultValue="Default Value"
                        variant="filled"
                        value={commentMessage}
                        style={{ width: '500px',margin:'15px'}}
                        onChange={handleCommentChange}
                    />
                    <div className={styles.Alignright}>
                    <Button variant="contained" color="primary" onClick={handleClose} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleResetComment}  >
                        Reset
                    </Button>
                    <Button variant="contained" color="primary" onClick={handlecommentsubmit} >
                        Submit
                    </Button>
                    
                    </div>
                </div>
        </div>

                
            </Modal >
            

    


        </div >

    )
}


export default SLA
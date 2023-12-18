import React, { useState, useEffect } from 'react';
import "./ToggleButton.css"; // Import the CSS file for styling
import styles from './styles.module.css'
import { Container, Button, Typography, Avatar, FormControl, InputAdornment, TextField, IconButton, Modal, Box } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { BlobServiceClient } from '@azure/storage-blob';
import MyDocument from './SLADownload';
import axios from 'axios'

import { useGlobalContext } from '../../contexts/context2'
import {
  Page,
  Document,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  BlobProvider,
} from "@react-pdf/renderer";

const buttonBoxStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const buttonStyle = {
  margin: '8px',
};




const Togglecomponent = (props) => {

  // console.log(props.row.status)

  const [position, setPosition] = useState()
  const [prestate, setPresate] = useState("")
  const [uploadPdf, setUploadPdf] = useState(false);
  const [base64String, setBase64String] = useState(false);
  const {IDBlobName } = useGlobalContext()
  const { baseurl } = useGlobalContext()

  // console.log(IDBlobName)

  const accountName = 'customersladata';
  const containerName = 'sla-reports';
  const sasToken = '?sp=racwdli&st=2023-10-28T11:57:47Z&se=2024-09-30T19:57:47Z&sv=2022-11-02&sr=c&sig=%2B%2BGLxhrfidGVSfVPfVonDm85bdOlMo%2FfJOQYwpGoEto%3D';


  const uploadToAzureBlob = async (pdfContent) => {

    const blobName = `${props.row.reportName}.pdf`

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.uploadData(pdfContent, {
      blobHTTPHeaders: { blobContentType: 'application/pdf' },
    });

    console.log(`Upload status code: ${uploadBlobResponse._response.status}`);

    // Azure Blob Storage upload logic
    // Replace the placeholders with your actual Azure Blob Storage details
    console.log("ready to upload")
  };

  const updateblob = async (data) => {
    const accountName = 'customersladata';
    const containerName = 'testing';
    const sasToken = '?sp=racwdli&st=2023-10-28T11:52:35Z&se=2024-09-30T19:52:35Z&sv=2022-11-02&sr=c&sig=QBk0AU1gCn7Q0lPuGxMX47TJBiYzQflvrOojP7ch20E%3D';
    // Get a reference to the blob
    console.log("inside-update--",data)
    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);
    console.log(data.id)
    console.log(IDBlobName)
    const blobNameToUpdate = IDBlobName[data.id]
    
    console.log("blobName to update",blobNameToUpdate)
    const encodedBlobName = encodeURIComponent(blobNameToUpdate);
    const blobClient = await containerClient.getBlockBlobClient(blobNameToUpdate);

    const updatedContent = JSON.stringify(data);

    try {
        // Upload the updated content to the blob
        await blobClient.upload(updatedContent, updatedContent.length, { overwrite: true });

        console.log('Blob updated successfully');
    } catch (error) {
        console.error('Error updating blob', error);
    }

    //Upload the updated content
    // await blobClient.upload(updatedContent, updatedContent.length, { overwrite: true });



}

const handlerejectapprove = async (rowdata) => {
  
  const data = {
      message: rowdata.status,
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
}
const delay = ms => new Promise(

  resolve => setTimeout(resolve, ms)

);


  useEffect(() => {
    if (props.row.status === "New") {
      setPosition("middle");
      setPresate("New")
    } else if (props.row.status === "rejected") {
      setPosition("left");
      setPresate("rejected")
    } else if (props.row.status === "approved") {
      setPosition("right");
      setPresate("approved")
    }
  }, []);


  useEffect(() => {
    async function makeRequest(){
    // console.log("upload status updated")
    console.log('prestate', prestate)
    console.log('position', position)

    const rowdata = props.row

    if(position === 'middle'){
      rowdata.status = 'New'
    }
    else if(position === 'right'){
      rowdata.status = 'approved'
    }
    else if(position === 'left'){
      rowdata.status = 'rejected'
    }
    else{
      console.log('No state found')
    }

    console.log('before updating--',rowdata)

    
   
    
    

    if ((prestate === "New" || prestate === "reject") && (position === "right")) {

      setUploadPdf(true)
      await delay(1000)

    }

     const result = updateblob(rowdata)
    if(prestate ==="New" && position !== "middle"){

      // const result = updateblob(rowdata)
      handlerejectapprove(rowdata)
    }
  }
  makeRequest();
  }, [position]);

 



  const [open, setOpen] = useState(false)

  // if (position === 'right') {
  //   console.log("approved..........")
  // }

  const handleClose = () => {

    setOpen(false)
  };

  const handleapprove = () => {
    setPosition("right");
    setOpen(false)
  }


  const handleLeftClick = () => {

    if (position !== "left") {
      if (position !== "right") {
        setPosition("left");
      }
    }
  };

  const handleRightClick = () => {
    if (position !== "right") {
      setOpen(true)
      // setPosition("right");
    }
  };

  const handleMiddleClick = () => {
    if (position !== "middle") {
      if (position !== "right") {
        setPosition("middle");
      }

    }
  };


  return (
    <div>
      <div className="tristate-toggle">
        <div className={`slider ${position}`} />
        <div className="toggle-button left" onClick={handleLeftClick}>
          <span className="icon">&#10006;</span>
        </div>
        <div className="toggle-button middle" onClick={handleMiddleClick}>
          <span className="icon">&bull;</span>
        </div>
        <div className="toggle-button right" onClick={handleRightClick}>
          <span className="icon">&#10004;</span>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.Box2}>
          <Box >
            <div>
              Once approved, Can't be revoked.
            </div>
            <div>
              Are you really want to approve?
            </div>
            <div>
              <br></br>
            </div>
            <div style={{ flexGrow: 1 }}>
              <Box >
                <div style={buttonBoxStyle}>
                  <Button variant="outlined" style={buttonStyle} onClick={handleClose}>
                    <CloseOutlinedIcon />
                  </Button>
                  <Button variant="contained" style={buttonStyle} onClick={handleapprove}>
                    <DoneOutlineIcon />
                  </Button>
                </div>
              </Box>
            </div>
          </Box>

        </div>
      </Modal>
      {uploadPdf ? (
        <BlobProvider document={<MyDocument row={props.row} />}>
          {({ blob }) => {
            if (blob) {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                setBase64String(reader.result)
                console.log("The base64 String is", reader.result);

                const base64String = reader.result;
                // Convert the base64 string to byte characters
                const byteCharacters = atob(base64String.split(',')[1]);
                // Convert the byte characters to a typed array
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                // Create a blob from the byte array
                const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
                uploadToAzureBlob(pdfBlob)
                console.log('uploaded to the blob')
                // Do something with the PDF blob, such as downloading or storing it
                // For example, you can use this URL to create a link or a button to download the PDF file
                // const blobUrl = URL.createObjectURL(pdfBlob);
                // console.log("The PDF Blob URL is", blobUrl);

              };
            }
          }}
        </BlobProvider>
      ) : null}
    </div>

  )

}
export default Togglecomponent;
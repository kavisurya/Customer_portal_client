import React from 'react';
import { Complextable } from '../../data/dummy';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done'; // Green checkmark icon
import ClearIcon from '@mui/icons-material/Clear'; // Red X icon
import ErrorIcon from '@mui/icons-material/Error'; // Orange error icon
import styles from './Charts.module.css'; // Import the CSS module

const statusIcons = {
  Completed: <DoneIcon sx={{ color: 'white', borderRadius: '50%', padding: '4px', backgroundColor: 'green', width: '0.8em', height: '0.8em' }} />,
  Disable: <ClearIcon sx={{ color: 'white', borderRadius: '50%', padding: '4px', backgroundColor: 'red', width: '0.8em', height: '0.8em' }} />,
  Pending: <ErrorIcon sx={{ color: 'orange' }} />,
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const date = new Date(dateString);
  if (isNaN(date)) {
    return dateString; // If the date is not valid, return the original string
  }
  return date.toLocaleDateString('en-US', options);
};


const CustomTableCell = ({ value, isHeader, status }) => (
  <TableCell>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {statusIcons[status]}
      <Typography
        variant={isHeader ? 'h6' : 'body1'}
        color={isHeader ? 'primary' : 'textSecondary'}
        className={styles['complex_table']}
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          fontSize: "0.9rem",
          color: isHeader ? 'grey' : 'black',
        }}
      >
        {isHeader ? value : formatDate(value)}
      </Typography>
    </div>
  </TableCell>
);

const ComplexTable = () => {
  return (
  <div className="responsive-complex-table">
    <TableContainer component={Paper} elevation={0} sx={{ padding: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell value="NAME" isHeader />
              <CustomTableCell value="STATUS" isHeader />
              <CustomTableCell value="DATE" isHeader />
            </TableRow>
          </TableHead>
          <TableBody>
            {Complextable.map((event, index) => (
              <TableRow key={index}>
                <CustomTableCell value={event.NAME} />
                <CustomTableCell value={event.STATUS} status={event.STATUS} />
                <CustomTableCell value={event.DATE} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ComplexTable;

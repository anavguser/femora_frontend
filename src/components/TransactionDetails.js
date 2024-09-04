import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Typography, Button, TablePagination 
} from '@mui/material';

export default function TransactionDetails({ data }) {
  const { description } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Function to filter data based on description
  const filterData = (data, description) => {
    if (description === 'Removal Order ID Filter') {
      return filterAndRemoveOrders(data);
    } else {
      return data ? data.filter(item => item.P_Description === description) : [];
    }
  };

  // Function to filter orders with Order ID of length 10
  const filterAndRemoveOrders = (resultArray) => {
    if (!Array.isArray(resultArray)) {
      console.error('Data is not an array:', resultArray);
      return [];
    }

    // Filter rows where 'Order ID' has length 10
    const removalArray = resultArray.filter(row => {
      const orderId = row['Order ID'];
      return typeof orderId === 'string' && orderId.length === 10;
    });

    return removalArray;
  };

  const filteredData = filterData(data, description);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get all unique headers from the data
  const headers = filteredData && filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  return (
    <div>
      <Button onClick={() => navigate('/')} sx={{ mb: 2 }}>Back to Summary</Button>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Transaction Details: {description}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  {headers.map((header) => (
                    <TableCell key={header}>{row[header]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

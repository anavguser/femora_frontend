import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const p_descriptions = [
    'Fulfillment Fee Refund',
    'FBA Inventory Reimbursement - Customer Return',
    'FBA Inventory Reimbursement - Customer Service Issue',
    'FBA Inventory Reimbursement - Damaged:Warehouse',
    'FBA Removal Order: Return Fee',
    'FBA Inbound Pickup Service',
    'Cost of Advertising',
    'Removal Order ID Filter' // New description for the new card
];

export default function TransactionSummaries({ data }) {
  const navigate = useNavigate();

  const handleCardClick = (description) => {
    navigate(`/transaction/${encodeURIComponent(description)}`);
  };

  const getCount = (description) => {
    if (description === 'Removal Order ID Filter') {
      const removalArray = filterAndRemoveOrders(data);
      console.log('Filtered Removal Array:', removalArray);
      return removalArray.length;
    }
    return data.filter(item => item.P_Description === description).length;
  };

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

    // Count the number of unique Order IDs with length 10
    const orderIds = removalArray.map(row => row['Order ID']);
    const uniqueOrderIdCount = new Set(orderIds).size;

    // Print the count of Order IDs
    console.log(`Removal Order IDs: ${uniqueOrderIdCount}\n`);

    // Display the new array
    console.log(removalArray, "\n");

    return removalArray;
  };

  return (
    <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
      {p_descriptions.map((description) => (
        <Grid item xs={12} sm={6} md={4} key={description}>
          <Card>
            <CardActionArea onClick={() => handleCardClick(description)}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Count: {getCount(description)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

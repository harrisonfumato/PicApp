// OrderTable.js
import React, { useState, useEffect } from 'react';

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch order data
    fetch('https://localhost:7074/api/Order')
      .then((response) => response.json())
      .then((orderData) => {
        setOrders(orderData);

        // Fetch customer data
        fetch('https://localhost:7074/api/customer')
          .then((response) => response.json())
          .then((customerData) => {
            setCustomers(customerData);

            // Fetch picture data
            fetch('https://localhost:7074/api/pictures')
              .then((response) => response.json())
              .then((pictureData) => {
                setPictures(pictureData);
                setLoading(false);
              })
              .catch((error) => {
                console.error('Error fetching picture data:', error);
                setLoading(false);
              });
          })
          .catch((error) => {
            console.error('Error fetching customer data:', error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
        setLoading(false);
      });
  }, []);

  // Function to get customer name by CustomerId
  const getCustomerName = (CustomerId) => {
    const customer = customers.find((c) => c.customerId === CustomerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
  };

  // Function to get picture title by PictureId <td className="px-4 py-2">{getCustomerName(order.customerId)}</td>
                    //<td className="px-4 py-2">{getPictureTitle(order.pictureId)}</td>
  const getPictureTitle = (PictureId) => {
    const picture = pictures.find((p) => p.pictureId === PictureId);
    return picture ? picture.title : 'Unknown Picture';
  };

  return (
        <div className="container mx-auto main-content">
          <h2 className="text-2xl font-bold mb-4">Order List</h2>
          {loading ? (
            <p className="text-center">Loading data...</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Customer Name</th>
                  <th className="px-4 py-2">Picture Ordered</th>
                  <th className="px-4 py-2">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="px-4 py-2">{order.orderId}</td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2">{order.pictureOrdered}</td>
                    <td className="px-4 py-2">{order.orderDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

  );
}

export default OrderTable;

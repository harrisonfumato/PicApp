import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/orderSlice.js';
import { fetchCustomers } from '../../redux/customerSlice.js';
import { fetchPictures } from '../../redux/pictureSlice.js';

function OrderTable() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);  // Fix here
  const customers = useSelector((state) => state.customers.customers);  // Access customer data correctly
  const pictures = useSelector((state) => state.pictures.pictures);  // Access picture data correctly
  const loading = useSelector((state) => state.orders.loading);  // Fix loading state

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    dispatch(fetchOrders(apiBaseUrl));
    dispatch(fetchCustomers(apiBaseUrl));
    dispatch(fetchPictures(apiBaseUrl));
  }, [dispatch, apiBaseUrl]);

  const getCustomerName = (CustomerId) => {
    const customer = customers.find((c) => c.customerId === CustomerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
  };

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
                <td className="px-4 py-2">{getCustomerName(order.customerId)}</td>
                <td className="px-4 py-2">{getPictureTitle(order.pictureId)}</td>
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

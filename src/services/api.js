// services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5020'; // Replace with your API endpoint

export const getAllBookings = () => axios.get(`${API_URL}/bookings`);
export const getBookingById = (id) => axios.get(`${API_URL}/bookings/${id}`);
export const createBooking = (bookingData) => axios.post(`${API_URL}/bookings`, bookingData);
export const updateBooking = (id, bookingData) => axios.put(`${API_URL}/bookings/${id}`, bookingData);
export const deleteBooking = (id) => axios.delete(`${API_URL}/bookings/${id}`);
export const updatePartialBooking = (id, patchData) => axios.patch(`${API_URL}/bookings/${id}`, patchData);

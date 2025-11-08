import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ticket API calls
export const getTickets = () => api.get('/tickets');
export const getTicket = (id) => api.get(`/tickets/${id}`);
export const createTicket = (ticketData) => api.post('/tickets', ticketData);
export const updateTicket = (id, ticketData) => api.put(`/tickets/${id}`, ticketData);
export const deleteTicket = (id) => api.delete(`/tickets/${id}`);

export default api;
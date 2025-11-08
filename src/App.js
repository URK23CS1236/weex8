import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import { getTickets, createTicket, updateTicket, deleteTicket } from './services/api';
import './styles/App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await getTickets();
      setTickets(response.data);
      setError('');
    } catch (err) {
    //   setError('Failed to fetch tickets. Please check if the server is running.');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      setLoading(true);
      await createTicket(ticketData);
      await fetchTickets();
      setError('');
    } catch (err) {
    //   setError('Failed to create ticket.');
      console.error('Error creating ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTicket = async (ticketData) => {
    try {
      setLoading(true);
      await updateTicket(editingTicket._id, ticketData);
      setEditingTicket(null);
      await fetchTickets();
      setError('');
    } catch (err) {
      setError('Failed to update ticket.');
      console.error('Error updating ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        setLoading(true);
        await deleteTicket(ticketId);
        await fetchTickets();
        setError('');
      } catch (err) {
        setError('Failed to delete ticket.');
        console.error('Error deleting ticket:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleCancelEdit = () => {
    setEditingTicket(null);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="main-content">
          <div className="form-section">
            <TicketForm
              onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
              editingTicket={editingTicket}
              onCancel={handleCancelEdit}
              loading={loading}
            />
          </div>
          
          <div className="list-section">
            <TicketList
              tickets={tickets}
              onEdit={handleEditTicket}
              onDelete={handleDeleteTicket}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
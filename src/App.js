import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Board from './components/Board';
import DisplayOptions from './components/DisplayOptions';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status'); // Load from localStorage if available
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority'); // Load from localStorage if available

  
  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => {
        console.log('API response:', response.data);
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  }, []);

 
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);


  const sortTickets = (tickets) => {
    const sortedTickets = [...tickets];
    
    if (sortBy === 'priority') {
      sortedTickets.sort((a, b) => Number(b.priority) - Number(a.priority)); 
    } else if (sortBy === 'title') {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title)); 
    }

    return sortedTickets;
  };

  const groupTickets = (tickets) => {
    const grouped = {};
    tickets.forEach(ticket => {
      const key = ticket[groupBy]; 
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });
    return grouped;
  };

  
  const sortedTickets = useMemo(() => sortTickets(tickets), [tickets, sortBy]);
  const groupedTickets = useMemo(() => groupTickets(sortedTickets), [sortedTickets, groupBy]);


  if (tickets.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: "#f4f6fa" }}>
      <DisplayOptions
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        setSortBy={setSortBy}
      />
      <Board 
        tickets={groupedTickets} 
        groupBy={groupBy} 
        users={users} 
      />
    </div>
  );
};

export default App;






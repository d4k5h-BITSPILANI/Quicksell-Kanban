import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from './stateManage/titcketsSlice';

const App = () => {
  const dispatch = useDispatch();
  const { tickets, users, status, error } = useSelector((state) => state.tickets);

  const [groupBy, setGroupBy] = useState('user'); // Default grouping is by user
  const [sortBy, setSortBy] = useState('priority'); // Default sorting is by priority

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTickets());
    }
  }, [status, dispatch]);

  // Group tickets by userId
  const groupTicketsByUser = () => {
    const groupedTickets = {};
    tickets.forEach((ticket) => {
      const userId = ticket.userId;
      if (!groupedTickets[userId]) {
        groupedTickets[userId] = [];
      }
      groupedTickets[userId].push(ticket);
    });
    return groupedTickets;
  };

  // Group tickets by status
  const groupTicketsByStatus = () => {
    const groupedTickets = {};
    tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!groupedTickets[status]) {
        groupedTickets[status] = [];
      }
      groupedTickets[status].push(ticket);
    });
    return groupedTickets;
  };

  // Group tickets by priority
  const groupTicketsByPriority = () => {
    const groupedTickets = {};
    tickets.forEach((ticket) => {
      const priority = ticket.priority;
      if (!groupedTickets[priority]) {
        groupedTickets[priority] = [];
      }
      groupedTickets[priority].push(ticket);
    });
    return groupedTickets;
  };

  // Get grouped tickets based on current groupBy state
  const getGroupedTickets = () => {
    switch (groupBy) {
      case 'user':
        return groupTicketsByUser();
      case 'status':
        return groupTicketsByStatus();
      case 'priority':
        return groupTicketsByPriority();
      default:
        return groupTicketsByUser();
    }
  };

  // Sorting logic
  const sortTickets = (tickets) => {
    switch (sortBy) {
      case 'priority':
        return [...tickets].sort((a, b) => b.priority - a.priority); // Sort by priority (descending)
      case 'title':
        return [...tickets].sort((a, b) => a.title.localeCompare(b.title)); // Sort by title (ascending)
      default:
        return tickets;
    }
  };

  const handleGroupChange = (groupType) => {
    setGroupBy(groupType);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const groupedTickets = getGroupedTickets();

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <>
        <div>
          <button onClick={() => handleGroupChange('user')}>Group by User</button>
          <button onClick={() => handleGroupChange('status')}>Group by Status</button>
          <button onClick={() => handleGroupChange('priority')}>Group by Priority</button>
        </div>

        <div>
          <button onClick={() => handleSortChange('priority')}>Sort by Priority</button>
          <button onClick={() => handleSortChange('title')}>Sort by Title</button>
        </div>

        <h2>Grouped and Sorted Tickets</h2>
        <div>
          {Object.keys(groupedTickets).length > 0 ? (
            Object.keys(groupedTickets).map((groupKey) => (
              <div key={groupKey}>
                <h3>{groupBy === 'user' ? users.find((user) => user.id === groupKey)?.name : groupKey}</h3>
                <ul>
                  {sortTickets(groupedTickets[groupKey]).map((ticket) => (
                    <li key={ticket.id}>
                      <h5>{ticket.title}</h5>
                      <p>Status: {ticket.status}</p>
                      <p>Priority: {ticket.priority}</p>
                      <p>Tags: {ticket.tag.join(', ')}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No tickets to display.</p>
          )}
        </div>
      </>
    );
  } else if (status === 'failed') {
    content = <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {content}
    </div>
  );
};

export default App;

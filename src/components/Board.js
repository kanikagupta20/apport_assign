import React from 'react';
import Card from './Card';


const getGroupIcon = (groupName, users, groupBy) => {
  if (groupBy === 'userId') {
  
    const user = users.find(user => user.id === groupName);
    if (user) {
      const userInitials = user.name.split(' ').map(word => word[0]).join('');
      const avatarBackgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      const avatarTextColor = "#fff";

      return (
        <div
          style={{
            width: "23px",
            height: "23px",
            borderRadius: "50%",
            backgroundColor: avatarBackgroundColor,
            color: avatarTextColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "8px",
            position: "relative",
          }}
        >
          {userInitials}
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: user.available ? "grey" : "yellow",
              position: "absolute",
              bottom: "-1px",
              right: "-1px",
              border: "1.5px solid #ffffff",
            }}
          />
        </div>
      );
    } else {
      return null;
    }
  } else {
    switch (groupName) {
      case 'Todo':
        return <img src='assest/icons_FEtask/To-do.svg' alt="To-do icon" style={{ width: '20px', height: '20px' }} />;
      case 'In progress':
        return <img src='assest/icons_FEtask/in-progress.svg' alt="In-progress icon" style={{ width: '20px', height: '20px' }} />;
      case 'Backlog':
        return <img src='assest/icons_FEtask/Backlog.svg' alt="Backlog icon" style={{ width: '20px', height: '20px' }} />;
      case 'Done':
        return <img src='assest/icons_FEtask/Done.svg' alt="Done icon" style={{ width: '20px', height: '20px' }} />;
      case 'Cancelled':
        return <img src='assest/icons_FEtask/Cancelled.svg' alt="Cancelled icon" style={{ width: '20px', height: '20px' }} />;
      case '0':
        return <img src='assest/icons_FEtask/No-priority.svg' alt="No Priority icon" style={{ width: '20px', height: '20px' }} />;
      case '1':
        return <img src='assest/icons_FEtask/Img - Low Priority.svg' alt="Low Priority icon" style={{ width: '20px', height: '20px' }} />;
      case '2':
        return <img src='assest/icons_FEtask/Img - Medium Priority.svg' alt="Medium Priority icon" style={{ width: '20px', height: '20px' }} />;
      case '3':
        return <img src='assest/icons_FEtask/Img - High Priority.svg' alt="High Priority icon" style={{ width: '20px', height: '20px' }} />;
      case '4':
        return <img src='assest/icons_FEtask/urgentcolour.svg' alt="Urgent Priority icon" style={{ width: '20px', height: '20px' }} />;
      default:
        return <img src='assest/icons_FEtask/Display.svg' alt="Default icon" style={{ width: '20px', height: '20px' }} />;
    }
  }
};

const Board = ({ tickets = {}, users = [], groupBy, sortBy }) => {
 
  const sortByPriority = (tickets) => {
    return tickets.sort((a, b) => {
     
      return b.priority - a.priority; 
    });
  };

  
  const getSortedGroupedTickets = (tickets) => {
    if (sortBy === 'priority') {
     
      const sortedTickets = {};
      Object.keys(tickets).forEach(group => {
        sortedTickets[group] = sortByPriority(tickets[group]);
      });

     
      const sortedGroups = Object.keys(sortedTickets).sort((a, b) => {
        const priorityOrder = { '4': 4, '3': 3, '2': 2, '1': 1, '0': 0 };
        return priorityOrder[b] - priorityOrder[a]; 
      });

   
      const sortedGroupedTickets = {};
      sortedGroups.forEach(group => {
        sortedGroupedTickets[group] = sortedTickets[group];
      });

      return sortedGroupedTickets;
    }
    return tickets; 
  };

  const sortedTickets = getSortedGroupedTickets(tickets); 

  return (
    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      {Object.keys(sortedTickets).map((group, index) => {
        
        const activityCount = sortedTickets[group] ? sortedTickets[group].length : 0;

        return (
          <div key={index} style={{ marginRight: '20px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: "20px" }}>
            <div style={{ marginRight: '8px' }}>
              {getGroupIcon(group, users, groupBy)}
            </div>
        
            {/* Container for group name and icon section */}
            <div
              style={{
                marginRight: '20px',
                fontSize: "14px",
                color: "#818589",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: '100%',  // Ensure full width for the spacing
              }}
            >
              <div>
                {groupBy === 'userId' ? (
                  users.find(user => user.id === group)?.name || 'Unknown User'
                ) : (
                  group
                )}
                <span style={{ color: "#899499" }}> {" "} ({activityCount})</span>
              </div>
        
              {/* Icons section */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',  // Position icons at the top-right
                  right: 0,              // Align to the right side
                  top: 0,                // Align to the top of the container
                  gap: '8px',            // Space between the icons
                }}
              >
                <img
                  src='assest/icons_FEtask/add.svg'
                  alt="Add icon"
                  style={{ width: '15px', height: '15px' }}
                />
                <img
                  src='assest/icons_FEtask/3 dot menu.svg'
                  alt="Menu icon"
                  style={{ width: '15px', height: '15px' }}
                />
              </div>
            </div>
          </div>
        
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sortedTickets[group]?.map((ticket, idx) => (
              <Card key={idx} ticket={ticket} users={users} />
            ))}
          </div>
        </div>
        
        );
      })}
    </div>
  );
};

export default Board;

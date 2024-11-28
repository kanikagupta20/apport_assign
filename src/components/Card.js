import React from 'react';

const Card = ({ ticket, users }) => {
  const user = users.find(user => user.id === ticket.userId);
  const userInitials = user ? user.name.slice(0, 2).toUpperCase() : "";
  const getRandomColor = () => {
    const colors = [
      "#8FBC8F", // Muted Green (Soft Olive)
    "#6A5ACD", // Slate Blue
    "#A52A2A", // Brown (Dark Red)
    "#8B4513", // Saddle Brown
    "#556B2F", // Dark Olive Green
    "#D2691E", // Chocolate
    "#BDB76B", // Dark Khaki
    "#808000", // Olive
    "#A9A9A9", // Dark Gray
    "#9ACD32", // Yellow Green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const avatarBackgroundColor = getRandomColor(); 
  const avatarTextColor = "#fff";
  return (
    <div 
      style={{ 
        border: '1px solid #E5E4E2', 
        padding: '15px', 
        marginBottom: '10px', 
        backgroundColor:'#ffffff',
        boxShadow: '4px 4px 10px rgba(211, 211, 211, 0.6)',
        borderRadius: '10px',
        width:"250px",
        position: 'relative' 
      }}
    >
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color:"#707174", fontFamily: 'Roboto, sans-serif' }}>
          {ticket.id}
        </div>
        
       
        {user && (
  <div 
    style={{
      width: "23px", // Increased size to fit both initials and status
      height: "23px", // Increased size to fit both initials and status
      borderRadius: "50%", 
      backgroundColor: avatarBackgroundColor, // Random color for the background
      color: avatarTextColor, // White text color for the initials
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "8px", // Adjusted font size for better visibility
      position: "relative", // This will allow us to position the status circle inside the avatar
     // Optional border for the avatar
    }}
  >
    {userInitials} {/* Display initials */}
    
    {/* Availability Status */}
    <div 
      style={{
        width: "8px", // Smaller circle for status
        height: "8px", // Smaller circle for status
        borderRadius: "50%",
        backgroundColor: user.available ? "grey" : "yellow", // Green for available, red for not available
        position: "absolute",
        bottom: "-1px", // Position it at the bottom of the avatar
        right: "-1px", // Position it at the right of the avatar
        border:"1.5px solid #ffffff" // White border for better visibility
      }}
    />
  </div>
)}

      </div>

      {/* Title */}
      <div style={{display:"flex" , flexDirection:"row"}}><img 
  src={
    ticket.status === "Todo" 
    ? "assest/icons_FEtask/To-do.svg" 
    : (ticket.status === "In progress" 
      ? "assest/icons_FEtask/in-progress.svg" 
      : (ticket.status === "Backlog" 
        ? "assest/icons_FEtask/Backlog.svg" 
        : "assest/icons_FEtask/Done.svg")
      )
  } 
  alt="status icon" 
  style={{marginRight: "4px"}} 
/>


      <div style={{ color:"#333333", fontWeight:"500", fontFamily: 'Roboto, sans-serif' }}>
        {ticket.title}
      </div>
      </div>
      {/* Ticket Tags */}
      {ticket.tag?.map((value, index) => (
        <div 
          key={index}
          style={{
            marginTop:"8px",
            color: "#aaacae", 
            fontFamily: 'Roboto, sans-serif',  
            border: '1px solid #E5E4E2', 
            width: "150px", 
            height: "36px", 
            borderRadius: '6px', 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            marginTop: '10px', // Add some space between tags and title
          }}
        >
        
          <div 
            style={{
              width: "12px", 
              height: "12px", 
              backgroundColor: "#aaa", 
              borderRadius: "50%", 
              marginRight: "5px", // space between circle and value
            }} 
          ></div>
        
        
          {value}
        </div>
      ))}
  
    </div>
  );
};

export default Card;

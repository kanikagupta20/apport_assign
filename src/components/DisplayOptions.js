import React, { useState } from 'react';

const DisplayOptions = ({ groupBy, setGroupBy, setSortBy }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubOption, setSelectedSubOption] = useState('');

  
  const handleDisplayChange = (e) => {
    setSelectedOption(e.target.value);
    setSelectedSubOption('');
  };

  return (
    <div style={{ marginBottom: '20px', backgroundColor: "#fff", padding: "10px" }}>
     
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: '10px' }}>Display: </label>
        <select value={selectedOption} onChange={handleDisplayChange}>
          <option value="">Select Display Option</option>
          <option value="groupBy">Group By</option>
          <option value="sortBy">Sort By</option>
        </select>
      </div>

     
      {selectedOption === 'groupBy' && (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <label style={{ marginRight: '10px' }}>Group By: </label>
          <select value={selectedSubOption} onChange={(e) => {
            setSelectedSubOption(e.target.value);
            setGroupBy(e.target.value);
          }}>
            <option value="status">Status</option>
            <option value="userId">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      )}

   
      {selectedOption === 'sortBy' && (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <label style={{ marginRight: '10px' }}>Sort By: </label>
          <select value={selectedSubOption} onChange={(e) => {
            setSelectedSubOption(e.target.value);
            setSortBy(e.target.value);
          }}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;













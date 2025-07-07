import React from 'react';

function ModuleList({ topics = [] }) {
  // safely read first topic
  const first = topics[0]?.title ?? 'No Topics';
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Module List</h3>
      <div className="text-gray-700">{first}</div>
    </div>
  );
}

export default ModuleList;
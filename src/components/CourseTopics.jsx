import React from 'react';
import { safeEntries } from '../utils/safeUtils';

function CourseTopics({ data = {} }) {
  const rows = safeEntries(data).map(([key, val]) => (
    <li key={key} className="border-b border-gray-200 py-2">
      <span className="font-medium">{key}: </span>
      <span>{val}</span>
    </li>
  ));
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Course Topics</h3>
      <ul className="space-y-2">
        {rows.length > 0 ? rows : <li className="text-gray-500">No topics available</li>}
      </ul>
    </div>
  );
}

export default CourseTopics;
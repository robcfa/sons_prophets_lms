import React from 'react';
import { safeReduce } from '../utils/safeUtils';

// Usage example of safeReduce
export default function ExampleDataReducer({ items }) {
  // Sum up a count field safely, default to 0
  const total = safeReduce(items, (acc, x) => acc + (x.count ?? 0), 0);
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Data Summary</h3>
      <div className="text-2xl font-bold text-blue-600">
        Total items count: {total}
      </div>
    </div>
  );
}
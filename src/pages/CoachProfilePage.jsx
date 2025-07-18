import React, { useState, useEffect } from 'react';
import { safeGet } from '../utils/safeObjectUtils';

function CoachProfilePage({ profile = {} }) {
  // Use safeGet instead of unsafe property access
  const bio = safeGet(profile, 'drSarahJohnson.bio', 'Bio not available');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Coach Profile</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Dr. Sarah Johnson</h2>
            <p className="text-gray-600 leading-relaxed">{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachProfilePage;
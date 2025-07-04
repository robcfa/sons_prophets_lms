import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Button from '../../components/ui/Button';

const HuddlePage = () => {
  const [roomName] = useState(() =>
    `huddle-${Math.random().toString(36).substring(2, 8)}`
  );
  const [notes, setNotes] = useState('');

  const handleSaveNotes = async () => {
    try {
      await fetch('http://localhost:4000/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: roomName, type: 'huddle', notes })
      });
      alert('Notes saved');
    } catch (err) {
      alert('Unable to save notes');
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Huddle - Sons Prophets LMS</title>
      </Helmet>
      <GlobalHeader />
      <PrimaryNavigation />
      <BreadcrumbTrail />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <h1 className="text-3xl font-heading font-heading-semibold text-text-primary">
          Huddle Room
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={`https://meet.jit.si/${roomName}`}
              allow="camera; microphone; fullscreen; display-capture"
              className="w-full h-full border-0"
              title="Jitsi Meeting"
            />
          </div>
          <div>
            <h2 className="font-heading font-heading-semibold text-text-primary mb-2">
              Shared Notes
            </h2>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              className="w-full h-64 p-4 border border-subtle rounded-lg bg-surface text-sm font-body"
              placeholder="Write meeting notes here..."
            />
            <div className="mt-4">
              <Button variant="primary" size="sm" onClick={handleSaveNotes}>
                Save Notes
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HuddlePage;


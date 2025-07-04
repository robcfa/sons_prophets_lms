import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import CalendarGrid from './components/CalendarGrid';
import CalendarHeader from './components/CalendarHeader';
import EventModal from './components/EventModal';
import EventFilters from './components/EventFilters';
import UpcomingEventsList from './components/UpcomingEventsList';
import MiniCalendar from './components/MiniCalendar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('month');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [selectedInstructor, setSelectedInstructor] = useState('all');
  const [events, setEvents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for events
  const mockEvents = [
    {
      id: 1,
      title: "Old Testament Prophecy: Understanding Daniel",
      description: `Join us for an in-depth study of the Book of Daniel, exploring its prophetic significance and historical context. We'll examine the visions, dreams, and prophecies that have shaped theological understanding for centuries.\n\nThis session will cover Daniel's interpretation of Nebuchadnezzar's dream, the fiery furnace, and the writing on the wall. We'll also discuss the prophetic timeline and its relevance to modern believers.`,
      date: "2024-12-20",
      time: "19:00",
      endTime: "21:00",
      location: "Main Sanctuary",
      address: "123 Faith Street, Jerusalem, Israel",
      type: "lecture",
      instructor: {
        id: 1,
        name: "Dr. Sarah Mitchell",
        title: "Professor of Biblical Studies",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      attendees: 45,
      maxAttendees: 60,
      userRSVP: null,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop",
      prerequisites: [
        "Basic understanding of Old Testament structure",
        "Completed Introduction to Biblical Studies"
      ],
      materials: [
        "Bible (ESV or NIV recommended)",
        "Notebook for taking notes",
        "Daniel Study Guide (provided)"
      ],
      isRecurring: false,
      duration: 120
    },
    {
      id: 2,
      title: "Weekly Bible Study: Jeremiah\'s Call",
      description: `A weekly study group focusing on the prophetic calling of Jeremiah and its implications for modern ministry. We'll explore themes of obedience, persecution, and God's faithfulness through difficult times.\n\nThis week we're examining Jeremiah 1:4-19, where God calls Jeremiah to be a prophet to the nations. We'll discuss the significance of his youth, his initial reluctance, and God's promise of protection.`,
      date: "2024-12-18",
      time: "18:30",
      endTime: "20:00",
      location: "Fellowship Hall",
      address: "123 Faith Street, Jerusalem, Israel",
      type: "study-group",
      instructor: {
        id: 2,
        name: "Pastor Michael Johnson",
        title: "Senior Pastor",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      attendees: 28,
      maxAttendees: 35,
      userRSVP: "attending",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
      prerequisites: [],
      materials: [
        "Bible",
        "Jeremiah Study Workbook"
      ],
      isRecurring: true,
      duration: 90
    },
    {
      id: 3,
      title: "Prayer Meeting: Intercession for Nations",
      description: `Join us for a special prayer meeting focused on intercession for the nations, inspired by the prophetic burden of the Old Testament prophets for God's people and the surrounding nations.\n\nWe'll be praying for current world events, missionary work, and the spread of the Gospel globally. This is a time for corporate prayer, worship, and seeking God's heart for the nations.`,
      date: "2024-12-19",
      time: "19:30",
      endTime: "21:00",
      location: "Prayer Chapel",
      address: "123 Faith Street, Jerusalem, Israel",
      type: "prayer-meeting",
      instructor: {
        id: 3,
        name: "Elder Rebecca Davis",
        title: "Prayer Ministry Leader",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      attendees: 22,
      maxAttendees: 40,
      userRSVP: "maybe",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop",
      prerequisites: [],
      materials: [],
      isRecurring: true,
      duration: 90
    },
    {
      id: 4,
      title: "Christmas Special Service: Messianic Prophecies",
      description: `A special Christmas service exploring the Messianic prophecies of the Old Testament and their fulfillment in Jesus Christ. We'll examine prophecies from Isaiah, Micah, and other prophetic books.\n\nThis service will include special music, dramatic readings, and a message on how the Old Testament prophets foretold the coming of the Messiah. Perfect for inviting friends and family to hear the Gospel message.`,
      date: "2024-12-24",
      time: "18:00",
      endTime: "19:30",
      location: "Main Sanctuary",
      address: "123 Faith Street, Jerusalem, Israel",
      type: "special-service",
      instructor: {
        id: 1,
        name: "Dr. Sarah Mitchell",
        title: "Professor of Biblical Studies",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      attendees: 120,
      maxAttendees: 200,
      userRSVP: null,
      image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=300&fit=crop",
      prerequisites: [],
      materials: [],
      isRecurring: false,
      duration: 90
    },
    {
      id: 5,
      title: "Prophetic Writing Workshop",
      description: `Learn the art of prophetic writing and interpretation in this hands-on workshop. We'll study the literary techniques used by Old Testament prophets and practice applying these principles to modern spiritual writing.\n\nParticipants will engage in writing exercises, peer review, and receive feedback on their work. This workshop is perfect for aspiring writers, teachers, and anyone interested in deepening their understanding of prophetic literature.`,
      date: "2024-12-21",
      time: "14:00",
      endTime: "17:00",
      location: "Conference Room A",
      address: "123 Faith Street, Jerusalem, Israel",
      type: "workshop",
      instructor: {
        id: 4,
        name: "Prof. David Thompson",
        title: "Hebrew Literature Specialist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      attendees: 15,
      maxAttendees: 20,
      userRSVP: null,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=300&fit=crop",
      prerequisites: [
        "Basic Hebrew reading ability helpful but not required",
        "Interest in creative writing"
      ],
      materials: [
        "Notebook and pens",
        "Laptop or tablet (optional)",
        "Hebrew-English Bible"
      ],
      isRecurring: false,
      duration: 180
    },
    {
      id: 6,
      title: "Youth Study: Minor Prophets Overview",
      description: `A youth-focused study of the twelve Minor Prophets, designed to help young people understand these often-overlooked books of the Bible. We'll use interactive activities, multimedia presentations, and group discussions.\n\nThis session covers Hosea through Malachi, highlighting key themes and messages relevant to young believers today. We'll explore how these ancient messages apply to modern life and faith.`,
      date: "2024-12-22",
      time: "16:00",
      endTime: "17:30",
      location: "Youth Center",
      address: "123 Faith Street, Jerusalem, Israel",
      type: "study-group",
      instructor: {
        id: 5,
        name: "Pastor Lisa Chen",
        title: "Youth Pastor",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      attendees: 18,
      maxAttendees: 25,
      userRSVP: null,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop",
      prerequisites: [],
      materials: [
        "Bible",
        "Minor Prophets Study Guide"
      ],
      isRecurring: true,
      duration: 90
    }
  ];

  const mockInstructors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      eventCount: 2,
      specialization: "Biblical Studies"
    },
    {
      id: 2,
      name: "Pastor Michael Johnson",
      eventCount: 1,
      specialization: "Pastoral Ministry"
    },
    {
      id: 3,
      name: "Elder Rebecca Davis",
      eventCount: 1,
      specialization: "Prayer Ministry"
    },
    {
      id: 4,
      name: "Prof. David Thompson",
      eventCount: 1,
      specialization: "Hebrew Literature"
    },
    {
      id: 5,
      name: "Pastor Lisa Chen",
      eventCount: 1,
      specialization: "Youth Ministry"
    }
  ];

  useEffect(() => {
    // Simulate loading events
    setLoading(true);
    setTimeout(() => {
      setEvents(mockEvents);
      setInstructors(mockInstructors);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRSVP = async (eventId, status) => {
    // Simulate RSVP API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === eventId 
              ? { 
                  ...event, 
                  userRSVP: status,
                  attendees: status === 'attending' 
                    ? event.attendees + (event.userRSVP === 'attending' ? 0 : 1)
                    : event.userRSVP === 'attending' 
                      ? event.attendees - 1 
                      : event.attendees
                }
              : event
          )
        );
        
        if (selectedEvent && selectedEvent.id === eventId) {
          setSelectedEvent(prev => ({
            ...prev,
            userRSVP: status,
            attendees: status === 'attending' 
              ? prev.attendees + (prev.userRSVP === 'attending' ? 0 : 1)
              : prev.userRSVP === 'attending' 
                ? prev.attendees - 1 
                : prev.attendees
          }));
        }
        
        resolve();
      }, 500);
    });
  };

  const handleQuickRSVP = (eventId, status) => {
    handleRSVP(eventId, status);
  };

  const getFilteredEvents = () => {
    let filtered = events;

    if (selectedEventType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedEventType);
    }

    if (selectedInstructor !== 'all') {
      filtered = filtered.filter(event => event.instructor.id.toString() === selectedInstructor);
    }

    return filtered;
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return getFilteredEvents()
      .filter(event => new Date(`${event.date}T${event.time}`) > now)
      .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
      .slice(0, 5);
  };

  const getEventCounts = () => {
    const counts = {
      all: events.length,
      lecture: events.filter(e => e.type === 'lecture').length,
      studyGroup: events.filter(e => e.type === 'study-group').length,
      prayerMeeting: events.filter(e => e.type === 'prayer-meeting').length,
      specialService: events.filter(e => e.type === 'special-service').length,
      workshop: events.filter(e => e.type === 'workshop').length
    };
    return counts;
  };

  const getEventDates = () => {
    return getFilteredEvents().map(event => event.date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Events Calendar - Sons Prophets LMS</title>
          <meta name="description" content="Discover and RSVP to theological education events, lectures, study groups, and special services." />
        </Helmet>
        
        <GlobalHeader />
        <PrimaryNavigation />
        <BreadcrumbTrail />
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-text-secondary font-body">Loading events calendar...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Events Calendar - Sons Prophets LMS</title>
        <meta name="description" content="Discover and RSVP to theological education events, lectures, study groups, and special services." />
        <meta name="keywords" content="events, calendar, theology, bible study, lectures, workshops" />
      </Helmet>

      <GlobalHeader />
      <PrimaryNavigation />
      <BreadcrumbTrail />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-heading-semibold text-text-primary mb-2">
                Events Calendar
              </h1>
              <p className="text-text-secondary font-body">
                Discover and join theological education events, study groups, and special services.
              </p>
            </div>
            
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="outline" size="sm" iconName="Download">
                Export Calendar
              </Button>
              <Button variant="primary" size="sm" iconName="Plus">
                Create Event
              </Button>
            </div>
          </div>
        </div>

        {/* Event Filters */}
        <EventFilters
          selectedType={selectedEventType}
          onTypeChange={setSelectedEventType}
          selectedInstructor={selectedInstructor}
          onInstructorChange={setSelectedInstructor}
          instructors={instructors}
          eventCounts={getEventCounts()}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Calendar Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Calendar Header */}
            <CalendarHeader
              currentDate={currentDate}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
              onTodayClick={handleTodayClick}
              onViewChange={setCurrentView}
              currentView={currentView}
            />

            {/* Calendar Grid */}
            {currentView === 'month' && (
              <CalendarGrid
                currentDate={currentDate}
                events={getFilteredEvents()}
                onDateSelect={handleDateSelect}
                onEventClick={handleEventClick}
                selectedDate={selectedDate}
                eventTypeFilter={selectedEventType}
              />
            )}

            {/* Mobile Upcoming Events */}
            <div className="lg:hidden">
              <UpcomingEventsList
                events={getUpcomingEvents()}
                onEventClick={handleEventClick}
                onQuickRSVP={handleQuickRSVP}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mini Calendar */}
            <MiniCalendar
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onMonthChange={setCurrentDate}
              eventDates={getEventDates()}
            />

            {/* Desktop Upcoming Events */}
            <div className="hidden lg:block">
              <UpcomingEventsList
                events={getUpcomingEvents()}
                onEventClick={handleEventClick}
                onQuickRSVP={handleQuickRSVP}
              />
            </div>

            {/* Quick Stats */}
            <div className="bg-background rounded-lg border border-subtle p-4">
              <h3 className="font-heading font-heading-semibold text-text-primary mb-4">
                This Month
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Total Events</span>
                  <span className="font-data font-data-semibold text-text-primary">
                    {getFilteredEvents().length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Your RSVPs</span>
                  <span className="font-data font-data-semibold text-success">
                    {events.filter(e => e.userRSVP === 'attending').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Total Attendees</span>
                  <span className="font-data font-data-semibold text-text-primary">
                    {events.reduce((sum, event) => sum + event.attendees, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="md:hidden fixed bottom-20 right-4 space-y-3">
          <Button variant="outline" size="sm" className="shadow-soft-lg" iconName="Download">
            Export
          </Button>
          <Button variant="primary" size="sm" className="shadow-soft-lg" iconName="Plus">
            Create
          </Button>
        </div>
      </main>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
        onRSVP={handleRSVP}
      />
    </div>
  );
};

export default EventsCalendar;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../contexts/AuthContext';
import { getUserPlan } from '../utils/planUtils';
import WithPlan from '../components/Layout/WithPlan';
import MobileNav from '../components/Layout/MobileNav';
import Sidebar from '../components/Layout/Sidebar';
import GlobalHeader from '../components/ui/GlobalHeader';
import BreadcrumbTrail from '../components/ui/BreadcrumbTrail';
import Icon from '../components/AppIcon';

const JitsiMeeting = ({ roomName, displayName, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) {
        initializeJitsi();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://8x8.vc/vpaas-magic-cookie-3b8fe87a8f0c4b8db2b6e7b6c2b7d8b1/external_api.js';
      script.async = true;
      script.onload = initializeJitsi;
      script.onerror = () => setError('Failed to load video conference');
      document.head.appendChild(script);
    };

    const initializeJitsi = () => {
      try {
        const domain = '8x8.vc';
        const options = {
          roomName: `vpaas-magic-cookie-3b8fe87a8f0c4b8db2b6e7b6c2b7d8b1/${roomName}`,
          width: '100%',
          height: 600,
          parentNode: document.querySelector('#jitsi-container'),
          userInfo: {
            displayName: displayName || 'Anonymous'
          },
          configOverwrite: {
            startWithAudioMuted: true,
            startWithVideoMuted: true,
            prejoinPageEnabled: true,
            disableModeratorIndicator: false,
            startScreenSharing: false,
            enableEmailInStats: false
          },
          interfaceConfigOverwrite: {
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            DISABLE_PRESENCE_STATUS: true,
            DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
            HIDE_INVITE_MORE_HEADER: true,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            BRAND_WATERMARK_LINK: '',
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
              'tileview', 'select-background', 'download', 'help', 'mute-everyone'
            ]
          }
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);
        
        api.addEventListener('readyToClose', () => {
          api.dispose();
        });

        setIsLoading(false);
      } catch (err) {
        setError('Failed to initialize video conference');
        setIsLoading(false);
      }
    };

    loadJitsiScript();

    return () => {
      if (window.JitsiMeetExternalAPI) {
        const iframe = document.querySelector('#jitsi-container iframe');
        if (iframe) {
          iframe.remove();
        }
      }
    };
  }, [roomName, displayName]);

  if (error) {
    return (
      <div className="bg-error/10 border border-error/20 rounded-lg p-4">
        <p className="text-error font-body">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-secondary font-body">Loading video conference...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <div id="jitsi-container" className="w-full min-h-[600px]"></div>
    </div>
  );
};

const WebinarPage = () => {
  const { user, userProfile } = useAuth();
  const userPlan = getUserPlan({ user, userProfile });
  const [activeSession, setActiveSession] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    // Mock data for webinar sessions
    const mockSessions = [
      {
        id: 1,
        title: 'Prophetic Interpretation Workshop',
        instructor: 'Dr. Sarah Martinez',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        duration: 90,
        attendees: 45,
        maxAttendees: 50,
        description: 'Join us for an interactive workshop on interpreting prophetic texts in their historical context.',
        isLive: false
      },
      {
        id: 2,
        title: 'Q&A with Biblical Scholars',
        instructor: 'Prof. Michael Thompson',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 60,
        attendees: 32,
        maxAttendees: 100,
        description: 'Bring your questions about Old Testament prophecy to our panel of biblical scholars.',
        isLive: false
      }
    ];

    setUpcomingSessions(mockSessions);
  }, []);

  const joinSession = (session) => {
    setActiveSession(session);
  };

  const leaveSession = () => {
    setActiveSession(null);
  };

  return (
    <>
      <Helmet>
        <title>Coaching & Webinars - Sons Prophets LMS</title>
        <meta name="description" content="Join live coaching sessions and webinars with biblical scholars and experienced coaches" />
      </Helmet>

      <div className="min-h-screen bg-page">
        <MobileNav plan={userPlan} />
        <div className="flex">
          <Sidebar plan={userPlan} />
          
          <div className="flex-1 flex flex-col">
            <GlobalHeader />
            <BreadcrumbTrail />
            
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
              {activeSession ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-heading font-heading-bold text-primary">
                        {activeSession.title}
                      </h1>
                      <p className="text-secondary font-body mt-1">
                        with {activeSession.instructor}
                      </p>
                    </div>
                    <button
                      onClick={leaveSession}
                      className="flex items-center px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
                    >
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Leave Session
                    </button>
                  </div>
                  
                  <JitsiMeeting
                    roomName={`session-${activeSession.id}`}
                    displayName={user?.userProfile?.full_name || user?.email || 'Anonymous'}
                  />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="icon--platform w-16 h-16 mx-auto mb-4"></div>
                    <h1 className="text-3xl font-heading font-heading-bold text-primary mb-2">
                      Coaching & Webinars
                    </h1>
                    <p className="text-secondary font-body max-w-2xl mx-auto">
                      Join live coaching sessions and webinars with biblical scholars and experienced coaches. 
                      Available for Plus and Premium members.
                    </p>
                  </div>

                  {/* Plan Benefits */}
                  <div className="bg-card rounded-lg p-6 border border-divider">
                    <h2 className="text-xl font-heading font-heading-semibold text-primary mb-4">
                      Your Plan Benefits
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-success/10 rounded-full p-2">
                          <Icon name="Check" size={16} className="text-success" />
                        </div>
                        <div>
                          <h3 className="font-heading font-heading-medium text-primary">
                            Live Group Sessions
                          </h3>
                          <p className="text-sm text-secondary">
                            Join interactive webinars with biblical scholars
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-success/10 rounded-full p-2">
                          <Icon name="Check" size={16} className="text-success" />
                        </div>
                        <div>
                          <h3 className="font-heading font-heading-medium text-primary">
                            Q&A Sessions
                          </h3>
                          <p className="text-sm text-secondary">
                            Get your questions answered by experts
                          </p>
                        </div>
                      </div>
                      
                      {userPlan === 'premium' && (
                        <div className="flex items-start space-x-3">
                          <div className="bg-success/10 rounded-full p-2">
                            <Icon name="Check" size={16} className="text-success" />
                          </div>
                          <div>
                            <h3 className="font-heading font-heading-medium text-primary">
                              1-on-1 Coaching
                            </h3>
                            <p className="text-sm text-secondary">
                              Personal coaching sessions with experienced mentors
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upcoming Sessions */}
                  <div>
                    <h2 className="text-2xl font-heading font-heading-semibold text-primary mb-6">
                      Upcoming Sessions
                    </h2>
                    
                    <div className="grid gap-6">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="card hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-heading font-heading-medium text-primary mb-2">
                                {session.title}
                              </h3>
                              <p className="text-secondary font-body mb-3">
                                {session.description}
                              </p>
                              
                              <div className="flex items-center space-x-4 text-sm text-tertiary">
                                <div className="flex items-center space-x-1">
                                  <Icon name="User" size={14} />
                                  <span>{session.instructor}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Icon name="Clock" size={14} />
                                  <span>{session.duration} minutes</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Icon name="Users" size={14} />
                                  <span>{session.attendees}/{session.maxAttendees}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm text-tertiary mb-1">
                                {session.startTime.toLocaleDateString()}
                              </p>
                              <p className="text-lg font-data font-bold text-primary mb-3">
                                {session.startTime.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                              <button
                                onClick={() => joinSession(session)}
                                className="button bg-primary text-white hover:bg-primary/90"
                              >
                                Join Session
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {upcomingSessions.length === 0 && (
                        <div className="text-center py-12">
                          <Icon name="Calendar" size={48} className="text-tertiary mx-auto mb-4" />
                          <h3 className="text-lg font-heading font-heading-medium text-primary mb-2">
                            No Upcoming Sessions
                          </h3>
                          <p className="text-secondary font-body">
                            Check back later for new coaching sessions and webinars.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithPlan(['plus', 'premium'])(WebinarPage);
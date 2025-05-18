import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, User } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardImage } from '../components/ui/Card';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';

const RegisteredEvents: React.FC = () => {
  const navigate = useNavigate();
  const { registeredEvents, unregisterFromEvent, isLoading } = useEvents();
  const { user } = useAuth();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleUnregister = async (eventId: string) => {
    try {
      await unregisterFromEvent(eventId);
    } catch (error) {
      console.error('Unregister error:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Registered Events</h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : registeredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {registeredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden h-full">
                  {event.imageUrl && (
                    <CardImage 
                      src={event.imageUrl} 
                      alt={event.name} 
                    />
                  )}
                  
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">{event.name}</h2>
                    
                    <div className="text-sm text-gray-600 space-y-2 mb-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-gray-400" />
                        <span>Organized by {event.organizerName}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick={() => handleUnregister(event.id)}
                      >
                        Cancel Registration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">You haven't registered for any events yet</h2>
              <p className="text-gray-600 mb-6">Explore events in your community and register for those that interest you.</p>
              <Button onClick={() => navigate('/')}>
                Explore Events
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredEvents;
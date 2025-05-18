import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Share2, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/mockData';
import { formatDate, formatTimeRange } from '../utils/formatters';
import Badge from '../components/ui/Badge';

interface AttendeeFormData {
  name: string;
  email: string;
  phone: string;
  numberOfAttendees: number;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, registerForEvent, unregisterFromEvent, isLoading } = useEvents();
  const { user } = useAuth();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState<AttendeeFormData>({
    name: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    numberOfAttendees: 1,
  });
  
  const event = id ? getEvent(id) : undefined;
  const category = event ? CATEGORIES.find(c => c.id === event.category) : undefined;
  
  const isRegistered = user && event?.attendees.some(a => a.userId === user.id);
  const isOrganizer = user && event?.organizerId === user.id;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfAttendees' ? parseInt(value) || 1 : value,
    }));
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!event || !id) return;
    
    try {
      await registerForEvent(id, formData);
      setShowRegistrationForm(false);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  const handleUnregister = async () => {
    if (!event || !id) return;
    
    try {
      await unregisterFromEvent(id);
    } catch (error) {
      console.error('Unregister error:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
        <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Image */}
          {event.imageUrl && (
            <div className="w-full h-64 md:h-80 overflow-hidden">
              <img 
                src={event.imageUrl} 
                alt={event.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          
          {/* Event Details */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{event.name}</h1>
                <p className="text-gray-600">Organized by {event.organizerName}</p>
                
                {category && (
                  <div className="mt-2">
                    <Badge variant="info">{category.name}</Badge>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                >
                  <Share2 size={16} className="mr-1" />
                  Share
                </Button>
                
                {isOrganizer && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/edit-event/${event.id}`)}
                  >
                    Edit Event
                  </Button>
                )}
              </div>
            </div>
            
            {/* Event Time & Location */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar size={20} className="mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Date & Time</h3>
                    <p className="text-gray-600">{formatDate(event.startDate)}</p>
                    <p className="text-gray-600">{formatTimeRange(event.startDate, event.endDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={20} className="mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <User size={20} className="mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Attendees</h3>
                    <p className="text-gray-600">
                      {event.attendees.length} {event.attendees.length === 1 ? 'person' : 'people'} attending
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={20} className="mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">Registration</h3>
                    <p className="text-gray-600">
                      Opens {formatDate(event.registrationStartDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this event</h2>
              <div className="prose max-w-none text-gray-700">
                <p>{event.description}</p>
              </div>
            </div>
            
            {/* Registration Button */}
            <div className="flex justify-center">
              {isRegistered ? (
                <Button 
                  variant="outline" 
                  onClick={handleUnregister}
                >
                  Cancel Registration
                </Button>
              ) : isOrganizer ? (
                <p className="text-gray-600 italic">You are the organizer of this event</p>
              ) : (
                <Button 
                  onClick={() => setShowRegistrationForm(true)}
                >
                  Register for this Event
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Registration Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Register for Event</h3>
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleRegister} className="p-6">
              <Input
                label="Name"
                name="name"
                type="text"
                fullWidth
                required
                value={formData.name}
                onChange={handleInputChange}
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                fullWidth
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
              
              <Input
                label="Number of Attendees"
                name="numberOfAttendees"
                type="number"
                min="1"
                fullWidth
                required
                value={formData.numberOfAttendees}
                onChange={handleInputChange}
              />
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRegistrationForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Register</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
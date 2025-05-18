import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileEdit, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { formatDateShort } from '../utils/formatters';
import { CATEGORIES } from '../data/mockData';

const MyEvents: React.FC = () => {
  const navigate = useNavigate();
  const { myEvents, deleteEvent, isLoading } = useEvents();
  const { user } = useAuth();
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleDeleteEvent = async (eventId: string) => {
    if (deletingEventId) return;
    
    try {
      setDeletingEventId(eventId);
      await deleteEvent(eventId);
    } catch (error) {
      console.error('Delete event error:', error);
    } finally {
      setDeletingEventId(null);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success" className="ml-2">Approved</Badge>;
      case 'pending':
        return <Badge variant="warning" className="ml-2">Pending Approval</Badge>;
      case 'rejected':
        return <Badge variant="danger" className="ml-2">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Events</h1>
            <Button onClick={() => navigate('/create-event')}>
              <Plus size={18} className="mr-1" />
              Create Event
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : myEvents.length > 0 ? (
            <div className="space-y-4">
              {myEvents.map((event) => {
                const category = CATEGORIES.find(c => c.id === event.category);
                
                return (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {event.imageUrl && (
                          <div className="w-full md:w-48 h-32 flex-shrink-0">
                            <img 
                              src={event.imageUrl} 
                              alt={event.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        )}
                        
                        <div className="p-4 md:p-6 flex-grow">
                          <div className="flex flex-wrap justify-between items-start">
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900">
                                {event.name}
                                {getStatusBadge(event.status)}
                              </h2>
                              
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <span>{formatDateShort(event.startDate)}</span>
                                <span className="mx-2">•</span>
                                <span>{event.location}</span>
                                {category && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span>{category.name}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex mt-2 md:mt-0 space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/events/${event.id}`)}
                              >
                                View
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/edit-event/${event.id}`)}
                              >
                                <FileEdit size={16} className="mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleDeleteEvent(event.id)}
                                disabled={deletingEventId === event.id}
                              >
                                <Trash2 size={16} className="mr-1" />
                                {deletingEventId === event.id ? 'Deleting...' : 'Delete'}
                              </Button>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{event.description}</p>
                          
                          <div className="mt-3 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              {event.attendees.length} {event.attendees.length === 1 ? 'person' : 'people'} registered
                            </div>
                            
                            {event.status === 'pending' && (
                              <div className="flex items-center text-sm text-amber-600">
                                <AlertTriangle size={16} className="mr-1" />
                                Awaiting approval from admin
                              </div>
                            )}
                            
                            {event.status === 'approved' && (
                              <div className="flex items-center text-sm text-green-600">
                                <CheckCircle size={16} className="mr-1" />
                                Approved and visible to the public
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">You haven't created any events yet</h2>
              <p className="text-gray-600 mb-6">Get started by creating your first event to share with your community.</p>
              <Button onClick={() => navigate('/create-event')}>
                <Plus size={18} className="mr-1" />
                Create Your First Event
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
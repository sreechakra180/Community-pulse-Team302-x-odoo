import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Users, Calendar, AlertTriangle, Flag, User, Shield } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { formatDateShort } from '../utils/formatters';
import { MOCK_USERS } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { events, updateEvent, isLoading } = useEvents();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'users'>('pending');
  
  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }
  
  const pendingEvents = events.filter(event => event.status === 'pending');
  
  const handleApproveEvent = async (eventId: string) => {
    try {
      await updateEvent(eventId, { status: 'approved' });
    } catch (error) {
      console.error('Approve event error:', error);
    }
  };
  
  const handleRejectEvent = async (eventId: string) => {
    try {
      await updateEvent(eventId, { status: 'rejected' });
    } catch (error) {
      console.error('Reject event error:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Events</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{events.length}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar size={24} className="text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Events</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{pendingEvents.length}</h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <AlertTriangle size={24} className="text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Users</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{MOCK_USERS.length}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users size={24} className="text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reported Content</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">0</h3>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <Flag size={24} className="text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="flex border-b">
              <button
                className={`py-4 px-6 text-sm font-medium ${activeTab === 'pending' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('pending')}
              >
                <AlertTriangle size={16} className="inline mr-2" />
                Pending Approval
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium ${activeTab === 'all' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('all')}
              >
                <Calendar size={16} className="inline mr-2" />
                All Events
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium ${activeTab === 'users' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('users')}
              >
                <Users size={16} className="inline mr-2" />
                Users
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'pending' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Events Pending Approval</h2>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                  ) : pendingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {pendingEvents.map((event) => (
                        <div key={event.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">{event.name}</h3>
                              <p className="text-sm text-gray-500">
                                {formatDateShort(event.startDate)} • Organized by {event.organizerName}
                              </p>
                              <p className="text-sm text-gray-700 mt-2 line-clamp-2">{event.description}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/events/${event.id}`)}
                              >
                                View
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleApproveEvent(event.id)}
                              >
                                <CheckCircle size={16} className="mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRejectEvent(event.id)}
                              >
                                <XCircle size={16} className="mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No events pending approval</p>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'all' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">All Events</h2>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Event
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Organizer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Attendees
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {events.map((event) => (
                            <tr key={event.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{event.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{event.organizerName}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{formatDateShort(event.startDate)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {event.status === 'approved' && <Badge variant="success">Approved</Badge>}
                                {event.status === 'pending' && <Badge variant="warning">Pending</Badge>}
                                {event.status === 'rejected' && <Badge variant="danger">Rejected</Badge>}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {event.attendees.length}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/events/${event.id}`)}
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'users' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">User Management</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_USERS.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <User size={16} className="text-gray-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{user.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.role === 'admin' ? (
                                <Badge variant="info" className="flex items-center w-fit">
                                  <Shield size={12} className="mr-1" />
                                  Admin
                                </Badge>
                              ) : (
                                <Badge variant="default">User</Badge>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.isVerifiedOrganizer && (
                                <Badge variant="success">Verified Organizer</Badge>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                >
                                  View Events
                                </Button>
                                {!user.isVerifiedOrganizer && user.role !== 'admin' && (
                                  <Button
                                    variant="success"
                                    size="sm"
                                  >
                                    Verify
                                  </Button>
                                )}
                                {user.role !== 'admin' && (
                                  <Button
                                    variant="danger"
                                    size="sm"
                                  >
                                    Ban
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
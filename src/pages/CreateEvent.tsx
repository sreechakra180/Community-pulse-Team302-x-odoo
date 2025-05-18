import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Select from '../components/ui/Select';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../data/mockData';

interface EventFormData {
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  category: string;
  imageUrl: string;
}

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { createEvent, isLoading } = useEvents();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    registrationStartDate: '',
    category: '',
    imageUrl: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('You must be logged in to create an event');
      navigate('/login');
      return;
    }
    
    try {
      const event = await createEvent({
        ...formData,
        organizerId: user.id,
        organizerName: user.username,
      });
      
      navigate(`/events/${event.id}`);
    } catch (error) {
      console.error('Create event error:', error);
    }
  };
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-green-600 text-white">
            <h1 className="text-2xl font-bold">Create a New Event</h1>
            <p className="mt-2">Share your event with the community</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
                
                <Input
                  label="Event Name"
                  name="name"
                  type="text"
                  placeholder="Enter the name of your event"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                
                <TextArea
                  label="Description"
                  name="description"
                  placeholder="Tell people about your event"
                  rows={5}
                  fullWidth
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                />
                
                <Input
                  label="Location"
                  name="location"
                  type="text"
                  placeholder="Where will your event take place?"
                  fullWidth
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Date and Time</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date & Time"
                    name="startDate"
                    type="datetime-local"
                    fullWidth
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  
                  <Input
                    label="End Date & Time"
                    name="endDate"
                    type="datetime-local"
                    fullWidth
                    required
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Input
                  label="Registration Start Date & Time"
                  name="registrationStartDate"
                  type="datetime-local"
                  fullWidth
                  required
                  value={formData.registrationStartDate}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Category & Image</h2>
                
                <Select
                  label="Category"
                  name="category"
                  options={CATEGORIES.map(cat => ({ value: cat.id, label: cat.name }))}
                  fullWidth
                  required
                  onChange={handleSelectChange('category')}
                />
                
                <Input
                  label="Event Image URL (optional)"
                  name="imageUrl"
                  type="url"
                  placeholder="Enter a URL for your event image"
                  fullWidth
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
                
                {formData.imageUrl && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Preview</label>
                    <div className="w-full h-48 border rounded-md overflow-hidden">
                      <img 
                        src={formData.imageUrl} 
                        alt="Event preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Event'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
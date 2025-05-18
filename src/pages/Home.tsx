import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import Button from '../components/ui/Button';
import { useEvents } from '../context/EventContext';
import { CATEGORIES } from '../data/mockData';

const Home: React.FC = () => {
  const { events, isLoading } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Filter events based on search term and selected category
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      searchTerm === '' || 
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory && event.status === 'approved';
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-500 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Discover Local Events in Your Community
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
            Find and join community events, meetups, and activities happening near you
          </p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2 flex items-center">
            <Search size={20} className="ml-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for events, activities, or locations..."
              className="flex-grow px-4 py-2 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button>
              Find Events
            </Button>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Filter size={20} className="mr-2" />
              Filter Events
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === '' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              All
            </Button>
            
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Upcoming Events</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No events found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Want to host your own event?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Create and share your own events with the community. It's easy and free!
          </p>
          <Button size="lg">
            Create an Event
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
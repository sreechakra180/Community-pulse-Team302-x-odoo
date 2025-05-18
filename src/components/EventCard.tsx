import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardImage } from './ui/Card';
import Badge from './ui/Badge';
import { Event } from '../types';
import { CATEGORIES } from '../data/mockData';
import { formatDate } from '../utils/formatters';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const category = CATEGORIES.find(c => c.id === event.category);
  
  return (
    <Link to={`/events/${event.id}`}>
      <Card className="h-full hover:translate-y-[-4px]">
        {event.imageUrl && (
          <CardImage 
            src={event.imageUrl} 
            alt={event.name} 
          />
        )}
        <CardContent>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{event.name}</h3>
            {category && (
              <Badge variant="info" className="ml-2 whitespace-nowrap">
                {category.name}
              </Badge>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
          
          <div className="text-sm text-gray-500 space-y-1">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-400" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-gray-400" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2 text-gray-400" />
              <span>{event.organizerName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
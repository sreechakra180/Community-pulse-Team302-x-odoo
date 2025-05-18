import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, EventAttendee } from '../types';
import { MOCK_EVENTS } from '../data/mockData';
import { useAuth } from './AuthContext';

interface EventContextType {
  events: Event[];
  myEvents: Event[];
  registeredEvents: Event[];
  getEvent: (id: string) => Event | undefined;
  createEvent: (event: Omit<Event, 'id' | 'status' | 'attendees' | 'createdAt'>) => Promise<Event>;
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
  registerForEvent: (eventId: string, attendee: Omit<EventAttendee, 'id'>) => Promise<void>;
  unregisterFromEvent: (eventId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Load events from mock data
    setEvents(MOCK_EVENTS);
    setIsLoading(false);
  }, []);
  
  const myEvents = user 
    ? events.filter(event => event.organizerId === user.id)
    : [];
  
  const registeredEvents = user
    ? events.filter(event => event.attendees.some(a => a.userId === user.id))
    : [];
  
  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };
  
  const createEvent = async (eventData: Omit<Event, 'id' | 'status' | 'attendees' | 'createdAt'>): Promise<Event> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('You must be logged in to create an event');
      }
      
      const newEvent: Event = {
        id: `event${events.length + 1}`,
        ...eventData,
        status: user.role === 'admin' ? 'approved' : 'pending',
        attendees: [],
        createdAt: new Date().toISOString(),
      };
      
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('You must be logged in to update an event');
      }
      
      const eventIndex = events.findIndex(e => e.id === id);
      if (eventIndex === -1) {
        throw new Error('Event not found');
      }
      
      const event = events[eventIndex];
      
      // Check if user is the organizer or an admin
      if (event.organizerId !== user.id && user.role !== 'admin') {
        throw new Error('You do not have permission to update this event');
      }
      
      const updatedEvent = { ...event, ...eventData };
      
      const updatedEvents = [...events];
      updatedEvents[eventIndex] = updatedEvent;
      
      setEvents(updatedEvents);
      return updatedEvent;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteEvent = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('You must be logged in to delete an event');
      }
      
      const event = events.find(e => e.id === id);
      if (!event) {
        throw new Error('Event not found');
      }
      
      // Check if user is the organizer or an admin
      if (event.organizerId !== user.id && user.role !== 'admin') {
        throw new Error('You do not have permission to delete this event');
      }
      
      setEvents(events.filter(e => e.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const registerForEvent = async (eventId: string, attendeeData: Omit<EventAttendee, 'id'>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const eventIndex = events.findIndex(e => e.id === eventId);
      if (eventIndex === -1) {
        throw new Error('Event not found');
      }
      
      const event = events[eventIndex];
      
      // Check if user is already registered
      if (user && event.attendees.some(a => a.userId === user.id)) {
        throw new Error('You are already registered for this event');
      }
      
      const attendee: EventAttendee = {
        id: `attendee${Math.random().toString(36).substring(2, 9)}`,
        ...attendeeData,
        userId: user?.id,
      };
      
      const updatedEvent = {
        ...event,
        attendees: [...event.attendees, attendee],
      };
      
      const updatedEvents = [...events];
      updatedEvents[eventIndex] = updatedEvent;
      
      setEvents(updatedEvents);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const unregisterFromEvent = async (eventId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('You must be logged in to unregister from an event');
      }
      
      const eventIndex = events.findIndex(e => e.id === eventId);
      if (eventIndex === -1) {
        throw new Error('Event not found');
      }
      
      const event = events[eventIndex];
      
      const updatedEvent = {
        ...event,
        attendees: event.attendees.filter(a => a.userId !== user.id),
      };
      
      const updatedEvents = [...events];
      updatedEvents[eventIndex] = updatedEvent;
      
      setEvents(updatedEvents);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <EventContext.Provider value={{
      events,
      myEvents,
      registeredEvents,
      getEvent,
      createEvent,
      updateEvent,
      deleteEvent,
      registerForEvent,
      unregisterFromEvent,
      isLoading,
      error
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
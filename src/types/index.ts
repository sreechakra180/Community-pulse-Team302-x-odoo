export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isVerifiedOrganizer: boolean;
}

export interface EventCategory {
  id: string;
  name: string;
  icon: string;
}

export interface EventAttendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  numberOfAttendees: number;
  userId?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  category: string;
  organizerId: string;
  organizerName: string;
  status: 'pending' | 'approved' | 'rejected';
  imageUrl?: string;
  attendees: EventAttendee[];
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  eventId: string;
  message: string;
  type: 'reminder' | 'update' | 'cancellation';
  isRead: boolean;
  createdAt: string;
}

export type NotificationChannel = 'email' | 'sms' | 'whatsapp';
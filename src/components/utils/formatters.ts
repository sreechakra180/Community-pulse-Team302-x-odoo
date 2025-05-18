export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatTimeRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
  };
  
  return `${new Intl.DateTimeFormat('en-US', timeOptions).format(start)} - ${new Intl.DateTimeFormat('en-US', timeOptions).format(end)}`;
};
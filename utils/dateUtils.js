module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    format_date: (date) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthIndex = new Date(date).getMonth();
      const day = new Date(date).getDate();
      const year = new Date(date).getFullYear();
      const hour = new Date(date).getHours();
      const minute = new Date(date).getMinutes();
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12; // Convert to 12-hour format
  
      return `${months[monthIndex]} ${day}, ${year} at ${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    },
  };


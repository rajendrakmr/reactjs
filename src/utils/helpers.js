
import moment from "moment";
export const convertDate = (dateString) => { 
    if (!dateString) {
      return '';  
    }  
    const trimmedDateString = dateString.trim(); 
    const parsedDate = moment(trimmedDateString, ["DD-MM-YYYY", "DD/MM/YYYY", moment.ISO_8601], true); 
    if (parsedDate.isValid()) {
      return parsedDate.format("DD/MM/YYYY");
    } 
    return "Invalid date";
  };


  export const convertddMMYYDate = (dateString) => { 
    if (!dateString) {
      return '';  
    }  
    const trimmedDateString = dateString.trim(); 
    const parsedDate = moment(trimmedDateString, ["DD-MM-YYYY", "DD/MM/YYYY", moment.ISO_8601], true); 
    if (parsedDate.isValid()) {
      return parsedDate.format("DD-MM-YYYY");
    } 
    return "Invalid date";
  };



  export const formatDate = (value) => {
    if (!value) return '';
  
    // Check if the input is in DD/MM/YYYY format
    const parts = value.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  
    // If the value is in a recognizable date format
    const date = new Date(value);
    return !isNaN(date) ? date.toISOString().substring(0, 10) : '';
  };
import dayjs from 'dayjs';
const mode: any = import.meta.env.VITE_MODE;

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDate = (date: string, format: string = "DD MMM YYYY"): any => {
  // console.log("got this to work with", date);
  try {
    if (!date || !dayjs(date).isValid()) {
      return "Invalid Date";
    }
    return dayjs(date).format(format);
  } catch (error) {
    console.error("Error in formatDate", error);
    return "Invalid Date";
  }
};

// Format date
// export const formatDate = (date: string | Date): string => {
//   const d = new Date(date);
//   return d.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
// };

// Format date with time
export const formatDateTime = (date: string | Date): string => {

  const d = new Date(date);

  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

};

// Generate initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Generate random ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Get status color
export const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    active: '#52c41a',
    inactive: '#ff4d4f',
    pending: '#faad14',
    completed: '#1890ff',
    draft: '#d9d9d9',
  };

  return colors[status.toLowerCase()] || '#d9d9d9';
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncate text
export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};


export const logHelper = (tag: string, message: string, value: any) => {
  // console.log("" + tag, " ===> " + key, value);
  if (mode === 'development') {
    try {
      console.log('🟢 ' + tag, " =====> ", message, value);
      // console.trace();
    } catch (error) {
      console.log("🟢", message);
    }
  }
};

export const getEventList = (eventListData: any) => {
  if (!eventListData) return [];
  try {
    return eventListData.map((event: any) => ({
      label: event.name,
      value: event.name
    }));
  } catch (error) {
    console.error("Error in getEventList", error);
    return [];
  }
};

export const getServiceTypes = (serviceTypesData: any) => {
  if (!serviceTypesData) return [];

  try {
    return serviceTypesData.map((serviceType: any) => ({
      label: serviceType,
      value: serviceType
    }));
  } catch (error) {
    return [];
  }

};

export const getCargoTypes = (cargoTypesData: any) => {
  if (!cargoTypesData) return [];

  try {
    return cargoTypesData.map((cargoType: any) => ({
      label: cargoType.name || cargoType,
      value: cargoType.id || cargoType
    }));
  } catch (error) {
    return [];
  }
};

export const strYesNoToBool = (str: string): boolean => {
  return str === 'Yes' || str === 'yes';
};

export const booleanToStrYesNo = (bool: boolean): string => {
  return bool ? 'yes' : 'no';
};

export const cleanDataToSave = (data: any) => {
  let cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined && v !== "")
  );
  return cleanedData;
};

export const validateIfNotShipment = (formStatus: any) => {

  const withoutShipment = ['exhibitor_status', 'events_status', 'service_logistics', 's_i'];
  const value = "validated";

  const allValid = withoutShipment.every((key: any) => formStatus[key] === value);

  return allValid;

}

export const isEmpty = (value: any) => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};


export const underscorIfEmpty = (value: any) => {
  if (isEmpty(value) == true) {
    return "_";
    } else if (value == 0) {
      return "0";
  } else {
    return value;
  }
};



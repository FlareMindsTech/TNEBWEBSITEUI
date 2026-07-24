const API_BASE_URL = process.env.BACKEND_API || 'https://tnebserver-u7qr.onrender.com';

export const BASE_URL = API_BASE_URL;
export const MAIL_URL = API_BASE_URL;

// ==================== GALLERY APIs ====================

/**
 * Get all galleries (Public)
 * @returns {Promise} Array of all galleries
 */
export const getAllGalleries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/gallery`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching galleries:', error);
    throw error;
  }
};

/**
 * Get gallery by slug (Public)
 * @param {string} slug - Gallery slug identifier
 * @returns {Promise} Single gallery object
 */
export const getGalleryBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/gallery/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching gallery with slug ${slug}:`, error);
    throw error;
  }
};

// ==================== MINTHIRAN APIs ====================

/**
 * Get all Minthirans (Year-wise)
 * @returns {Promise} Array of all Minthiran editions grouped by year
 */
export const getAllMinthirans = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/minthiran`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Minthirans:', error);
    throw error;
  }
};

/**
 * Get Minthirans by specific year
 * @param {number|string} year - Year to filter by (e.g., 2025)
 * @returns {Promise} Array of Minthiran editions for the specified year
 */
export const getMinthiransByYear = async (year) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/minthiran/year/${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Minthirans for year ${year}:`, error);
    throw error;
  }
};

/**
 * Get single Minthiran by ID
 * @param {string} id - Minthiran ID
 * @returns {Promise} Single Minthiran object
 */
export const getMinthiranById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/minthiran/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Minthiran with ID ${id}:`, error);
    throw error;
  }
};

// ==================== IMPORTANT NOTICE APIs ====================

/**
 * Get all important notices
 * @returns {Promise} Array of all important notices
 */
export const getAllImportantNotices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/important-notices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching important notices:', error);
    throw error;
  }
};

// ==================== EVENT APIs ====================

/**
 * Get all events
 * @returns {Promise} Array of all events
 */
export const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// ==================== CAROUSEL APIs ====================

/**
 * Get all carousel images
 * @returns {Promise} Array of all carousel images
 */
export const getAllCarouselImages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carousel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    throw error;
  }
};

// ==================== VISITOR TRACKING APIs ====================

/**
 * Generate or retrieve unique visitor ID from localStorage
 * @returns {string} Unique visitor ID
 */
export const getVisitorId = () => {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

/**
 * Track a visitor (with 1-hour cooldown)
 * @param {string} visitorId - Unique visitor identifier
 * @returns {Promise} Tracking response with success status
 */
export const trackVisitor = async (visitorId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/visitors/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visitorId }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error tracking visitor:', error);
    throw error;
  }
};

/**
 * Get total visitor count
 * @returns {Promise} Object with visitor count
 */
export const getVisitorCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/visitors/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    throw error;
  }
};

// ==================== AUTHENTICATION APIs ====================

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.phone_no
 * @param {string} userData.city
 * @param {string} userData.lm_number
 * @param {string} userData.ppo_number
 * @param {string} userData.date_of_birth
 * @param {string} userData.emp_id
 * @returns {Promise} Registration response with user data
 */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.identifier - Employee ID or PPO Number
 * @param {string} credentials.password - User's password
 * @returns {Promise} Login response with token and user data
 */
export const loginUser = async (credentials) => {
  try {
    const loginData = {
      identifier: credentials.identifier,
      password: credentials.password
    };
    
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Store token in localStorage if login is successful
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user || {}));
    }
    
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Logout user (clear local storage)
 * @returns {void}
 */
export const logoutUser = () => {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

/**
 * Forgot Password
 * @param {Object} data - Forgot password data
 * @returns {Promise}
 */
export const forgotPassword = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in forgot password:', error);
    throw error;
  }
};

/**
 * Get stored auth token
 * @returns {string|null} Auth token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Get stored user data
 * @returns {Object|null} User data object or null
 */
export const getUserData = () => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a valid token
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

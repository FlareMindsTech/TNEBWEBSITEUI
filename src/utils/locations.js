// Indian States/Locations for weather and location-based features
export const INDIAN_LOCATIONS = [
  { id: 'tamilnadu', label: '🏛️ Tamil Nadu', code: 'TN', region: 'South' },
  { id: 'andhra', label: '🏙️ Andhra Pradesh', code: 'AP', region: 'South' },
  { id: 'karnataka', label: '🌿 Karnataka', code: 'KA', region: 'South' },
  { id: 'telangana', label: '🏗️ Telangana', code: 'TG', region: 'South' },
  { id: 'kerala', label: '🌴 Kerala', code: 'KL', region: 'South' },
  { id: 'maharashtra', label: '🌃 Maharashtra', code: 'MH', region: 'West' },
  { id: 'goa', label: '🏖️ Goa', code: 'GA', region: 'West' },
  { id: 'rajasthan', label: '🏜️ Rajasthan', code: 'RJ', region: 'North' },
  { id: 'delhi', label: '🏛️ Delhi', code: 'DL', region: 'North' },
  { id: 'haryana', label: '🚜 Haryana', code: 'HR', region: 'North' },
  { id: 'punjab', label: '🌾 Punjab', code: 'PB', region: 'North' },
  { id: 'himachal', label: '⛰️ Himachal Pradesh', code: 'HP', region: 'North' },
  { id: 'uttarakhand', label: '🏔️ Uttarakhand', code: 'UK', region: 'North' },
  { id: 'uttar', label: '🏞️ Uttar Pradesh', code: 'UP', region: 'North' },
  { id: 'bihar', label: '🌾 Bihar', code: 'BR', region: 'East' },
  { id: 'jharkhand', label: '⛏️ Jharkhand', code: 'JH', region: 'East' },
  { id: 'west', label: '🌳 West Bengal', code: 'WB', region: 'East' },
  { id: 'odisha', label: '🏖️ Odisha', code: 'OD', region: 'East' },
  { id: 'assam', label: '🌿 Assam', code: 'AS', region: 'Northeast' },
  { id: 'manipur', label: '💎 Manipur', code: 'MN', region: 'Northeast' },
  { id: 'meghalaya', label: '☔ Meghalaya', code: 'ML', region: 'Northeast' },
  { id: 'nagaland', label: '🏔️ Nagaland', code: 'NL', region: 'Northeast' },
];

/**
 * Get location details by ID
 * @param {string} locationId - Location ID
 * @returns {Object|null} Location object or null
 */
export const getLocationById = (locationId) => {
  return INDIAN_LOCATIONS.find(loc => loc.id === locationId) || null;
};

/**
 * Get locations by region
 * @param {string} region - Region name
 * @returns {Array} Array of locations in that region
 */
export const getLocationsByRegion = (region) => {
  return INDIAN_LOCATIONS.filter(loc => loc.region === region);
};

/**
 * Get all unique regions
 * @returns {Array} Array of unique regions
 */
export const getAllRegions = () => {
  return [...new Set(INDIAN_LOCATIONS.map(loc => loc.region))];
};

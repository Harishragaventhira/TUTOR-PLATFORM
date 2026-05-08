const axios = require('axios');

const getCoordinates = async (addressObj) => {
  try {
    if (!addressObj) return null;

    // We will try multiple levels of specificity
    // Nominatim often fails if you provide too much specific info (like Door No) that it doesn't have.
    
    const queriesToTry = [
      // 1. Most specific (excluding Door No as it almost always fails in Nominatim India)
      [addressObj.street_address, addressObj.area, addressObj.taluk, addressObj.district, addressObj.state, addressObj.pincode],
      // 2. Medium specific (Area, District, State, Pincode)
      [addressObj.area, addressObj.district, addressObj.state, addressObj.pincode],
      // 3. Broad (Taluk, District, State)
      [addressObj.taluk, addressObj.district, addressObj.state],
      // 4. Very Broad (District, State)
      [addressObj.district, addressObj.state]
    ];

    // Determine country code dynamically if needed, defaulting to 'in' (India)
    const countryCode = (addressObj.country && addressObj.country.toLowerCase() === 'india') ? 'in' : 'in';

    for (const parts of queriesToTry) {
      const q = parts.filter(Boolean).map(p => p.trim()).join(', ');
      if (!q) continue;

      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q,
          format: 'json',
          limit: 1,
          countrycodes: countryCode // Restrict search to the correct country to prevent namesake mismatches
        },
        headers: {
          'User-Agent': 'TutorBridge-App/1.0'
        }
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        console.log(`Geocoded successfully using query: "${q}" -> Mapped to: ${display_name}`);
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          display_name // Pass this back so the user sees what was actually detected
        };
      }
    }
    
    console.warn('Geocoding failed for all fallback levels.');
    return null;
  } catch (error) {
    console.error('Geocoding failed silently:', error.message);
    return null;
  }
};

module.exports = { getCoordinates };

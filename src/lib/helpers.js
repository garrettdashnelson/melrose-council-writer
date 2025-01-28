/**
 * Geocodes an address using the Census Geocoder API
 * @param {string} streetAddress - The street address to geocode
 * @returns {Promise} Promise that resolves to the geocoding result
 */
export async function geocodeAddress(streetAddress) {
  // Construct the API URL with the address parameters
  const baseUrl = 'https://api.mapbox.com/search/geocode/v6/forward';
  const params = new URLSearchParams({
    address_line1: streetAddress,
    postcode: '02176',
    country: 'USA',
    locality: 'Melrose',
    limit: '1',
    types: 'address',
    access_token: 'pk.eyJ1IjoiZ2FycmV0dG5lbHNvbiIsImEiOiJobnR2YjdRIn0.iANqBs5R5cw3euoH_62X4g'
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if we got any matches
    if (data.features.length === 0) {
      throw new Error('No matching addresses found');
    }

    return data.features[0];

  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}

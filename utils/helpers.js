// Function to calculate distance between two locations using Haversine formula
export const calculateDistance = (location1, location2) => {
  const { latitude: lat1, longitude: lng1 } = location1;
  const { latitude: lat2, longitude: lng2 } = location2;

  const earthRadius = 6371; // km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
};

// Helper function to convert degrees to radians
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(location);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
}

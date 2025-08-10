const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.reverseGeocode = functions.https.onCall(async (data, context) => {
  const { lat, lon } = data;

  if (!lat || !lon) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with two arguments 'lat' and 'lon'.",
    );
  }

  // OpenStreetMap Nominatim API endpoint
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  try {
    const response = await fetch(url, {
      headers: {
        // IMPORTANT: The API requires a User-Agent header to identify your app
        "User-Agent": "EmployeeManagementSystem/1.0 (your-email@example.com)",
      },
    });

    if (!response.ok) {
      throw new functions.https.HttpsError(
        "internal",
        "Failed to fetch from Nominatim API.",
      );
    }
    
    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error("Error fetching from Nominatim:", error);
    throw new functions.https.HttpsError(
      "unknown",
      "An unknown error occurred.",
    );
  }
});
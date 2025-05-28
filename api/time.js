module.exports = async (req, res) => {
  const offsetStr = req.query.timezone;

  // Validate input
  if (!offsetStr) {
    return res.status(400).json({ error: "Missing 'timezone' parameter." });
  }
  if (offsetStr.includes(':') || offsetStr.includes(',')) {
    return res.status(400).json({ error: "Invalid format. Use decimal notation." });
  }

  const offsetNum = parseFloat(offsetStr);
  if (isNaN(offsetNum) || offsetNum < -12 || offsetNum > 14) {
    return res.status(400).json({ error: "Invalid 'timezone' range." });
  }

  // Map timezone to location
  const timezoneToLocation = {
    "-12": { city: "Anywhere on Earth", lat: -27.4698, lon: -109.5336 },
    "-11": { city: "Midway Atoll", lat: 28.2076, lon: -177.3819 },
    "-10": { city: "Honolulu", lat: 21.3069, lon: -157.8583 },
    "-9": { city: "Anchorage", lat: 61.2181, lon: -149.9003 },
    "-8": { city: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    "-7": { city: "Denver", lat: 39.7392, lon: -104.9903 },
    "-6": { city: "Mexico City", lat: 19.4326, lon: -99.1332 },
    "-5": { city: "New York", lat: 40.7128, lon: -74.0060 },
    "-4": { city: "Santiago", lat: -33.4489, lon: -70.6693 },
    "-3": { city: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
    "-2": { city: "South Georgia", lat: -54.4286, lon: -36.5879 },
    "-1": { city: "Azores", lat: 38.7169, lon: -27.2116 },
    "0": { city: "London", lat: 51.5074, lon: -0.1278 },
    "1": { city: "Berlin", lat: 52.52, lon: 13.405 },
    "2": { city: "Johannesburg", lat: -26.2041, lon: 28.0473 },
    "3": { city: "Moscow", lat: 55.7558, lon: 37.6173 },
    "3.5": { city: "Tehran", lat: 35.6892, lon: 51.3890 },
    "4": { city: "Dubai", lat: 25.276987, lon: 55.296249 },
    "5": { city: "Karachi", lat: 24.8607, lon: 67.0011 },
    "5.5": { city: "New Delhi", lat: 28.6139, lon: 77.2090 },
    "6": { city: "Dhaka", lat: 23.8103, lon: 90.4125 },
    "6.5": { city: "Yangon", lat: 16.8409, lon: 96.1735 },
    "7": { city: "Bangkok", lat: 13.7563, lon: 100.5018 },
    "8": { city: "Singapore", lat: 1.3521, lon: 103.8198 },
    "8.75": { city: "Kimberley", lat: -17.927, lon: 122.215 },
    "9": { city: "Seoul", lat: 37.5665, lon: 126.9780 },
    "9.5": { city: "Adelaide", lat: -34.9285, lon: 138.6007 },
    "10": { city: "Sydney", lat: -33.8688, lon: 151.2093 },
    "10.5": { city: "Lord Howe Island", lat: -31.556, lon: 159.077 },
    "11": { city: "Solomon Islands", lat: -9.6458, lon: 160.1562 },
    "11.5": { city: "Norfolk Island", lat: -29.0408, lon: 167.9547 },
    "12": { city: "Wellington", lat: -41.2867, lon: 174.7762 },
    "12.75": { city: "Chatham Islands", lat: -43.9566, lon: -176.5402 },
    "13": { city: "Nuku'alofa", lat: -21.1394, lon: -175.2048 },
    "14": { city: "Kiritimati", lat: 1.8700, lon: -157.4291 },
  };

  const location = timezoneToLocation[offsetStr] || timezoneToLocation["0"];

  // Get current server time
  const now = new Date();

  // Convert server time to UTC
  const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  // Convert UTC to local time based on offset
  const localTime = new Date(utcTime.getTime() + offsetNum * 3600000);

  // Extract local date components
  const year = localTime.getFullYear();
  const month = String(localTime.getMonth() + 1).padStart(2, '0');
  const day = String(localTime.getDate()).padStart(2, '0');

  // Format date as DD-MM-YYYY for URL path
  const datePath = `${day}-${month}-${year}`;

  // Also prepare query param in same format
  const dateParam = `${day}-${month}-${year}`;

  // Construct the API URL
  const apiUrl = `https://api.aladhan.com/v1/gToH/${datePath}?date=${dateParam}&latitude=${location.lat}&longitude=${location.lon}`;

  let hijriDateStr = "N/A couldn't fetch";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if data is valid
    if (
      data &&
      data.data &&
      data.data.hijri &&
      data.data.hijri.day &&
      data.data.hijri.month &&
      data.data.hijri.year
    ) {
      hijriDateStr = `${data.data.hijri.day} ${data.data.hijri.month.en} ${data.data.hijri.year}`;
    }
  } catch (error) {
    console.error("Error fetching Hijri date:", error);
  }

  // Format local time in 12-hour format
  const hours24 = localTime.getHours();
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();
  const ampm = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  const timeStr = `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;

  const unixSeconds = Math.floor(localTime.getTime() / 1000);

  // Return response
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    timezone: offsetNum,
    region: location.city,
    date: `${day}-${month}-${year}`,
    time: timeStr,
    unix: unixSeconds,
    UTC: new Date().toISOString(),
    hijri: hijriDateStr,
    info: {
      credits: "Made by harys722, available for everyone!",
      website: "https://harys.is-a.dev/",
    },
  });
};

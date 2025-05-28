module.exports = async (req, res) => {
  const offsetStr = req.query.timezone;
  let jsonResponse = {};

  if (!offsetStr) {
    return res.status(400).json({
      error: "Missing 'timezone' parameter. Please specify '?timezone=offset' where offset is between -12 and 14 (e.g., 3.5 for Iran).",
    });
  }

  if (offsetStr.includes(':') || offsetStr.includes(',')) {
    return res.status(400).json({
      error: "Invalid format. Please use decimal notation like 4.5 or 5.75, not '4:30'. 4.5 for 4:30 and 5.75 for 5:45",
    });
  }

  const offsetNum = parseFloat(offsetStr);
  if (isNaN(offsetNum)) {
    return res.status(400).json({
      error: "Invalid 'timezone' parameter. Please provide a numeric value, e.g., 5.5 or -3.",
    });
  }

  if (offsetNum < -12 || offsetNum > 14) {
    return res.status(400).json({
      error: "Invalid 'timezone' range. Offset must be between -12 and 14.",
    });
  }

  const timezoneRegions = {
    "-12": "Anywhere on Earth (AoE)",
    "-11": "Niue, Midway Atoll",
    "-10": "Hawaii-Aleutian Time (HST)",
    "-9.5": "Marquesas Islands",
    "-9": "Alaska Standard Time (AKST)",
    "-8": "Pacific Standard Time (PST)",
    "-7": "Mountain Standard Time (MST)",
    "-6": "Central Standard Time (CST)",
    "-5": "Eastern Standard Time (EST)",
    "-4": "Atlantic Standard Time (AST)",
    "-3.5": "Newfoundland Standard Time (NST)",
    "-3": "Argentina, Brazil (BRT)",
    "-2": "South Georgia & South Sandwich Islands",
    "-1": "Azores, Cape Verde",
    "0": "Coordinated Universal Time (UTC)",
    "1": "Central European Time (CET), West Africa Time",
    "2": "Central Africa Time (CAT), South Africa Standard Time",
    "3": "East Africa Time, Moscow Standard Time",
    "3.5": "Iran Standard Time",
    "4": "Gulf Standard Time, Azerbaijan Standard Time",
    "4.5": "Afghanistan Time",
    "5": "Pakistan Standard Time, Yekaterinburg Time",
    "5.5": "India Standard Time, Sri Lanka",
    "5.75": "Nepal Time",
    "6": "Bangladesh, Bhutan, Omsk Time",
    "6.5": "Cocos Islands, Myanmar",
    "7": "Indochina Time, Krasnoyarsk Time",
    "8": "China, Singapore, Hong Kong, Taiwan",
    "8.75": "Australia Central Western Standard Time (Kimberley)",
    "9": "Japan, Korea, Yakutsk Time",
    "9.5": "Australian Central Standard Time (ACST)",
    "10": "Australian Eastern Standard Time (AEST), Vladivostok",
    "10.5": "Lord Howe Island",
    "11": "Solomon Islands, Magadan Time",
    "11.5": "Norfolk Island",
    "12": "New Zealand, Fiji, Kamchatka",
    "12.75": "Chatham Islands",
    "13": "Tonga, Phoenix Islands",
    "14": "Line Islands (Kiribati)",
  };

  const region = timezoneRegions[offsetStr] || "Custom timezone";

  // Function to get date in dd-mm-yyyy format
  function getFormattedDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const now = new Date();

  // Compute local time with offset
  function getTimeWithOffset(offsetHours) {
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    return new Date(utcTime.getTime() + offsetHours * 3600000);
  }

  const localTime = getTimeWithOffset(offsetNum);

  // Format date as dd-mm-yyyy for API
  const dateStr = getFormattedDate(localTime);

  // Format time for output
  const hours = localTime.getHours();
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const timeFormatted = `${String(hour12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;

  const unixTimestampSeconds = Math.floor(localTime.getTime() / 1000);

  // Fetch Hijri date from Aladhan API using the formatted date string
  try {
    const response = await fetch(`https://api.aladhan.com/v1/gToH/${dateStr}`);
    const hijriData = await response.json();

    const hijriDate = hijriData.data.hijri;

    jsonResponse = {
      timezone: offsetNum,
      region: region,
      date: dateStr,
      time: timeFormatted,
      unix: unixTimestampSeconds,
      UTC: new Date().toISOString(),
      hijri: `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year}`,
      info: {
        credits: "Made by harys722, available for everyone!",
        website: "https://harys.is-a.dev/",
      },
    };
  } catch (error) {
    jsonResponse = {
      timezone: offsetNum,
      region: region,
      date: dateStr,
      time: timeFormatted,
      unix: unixTimestampSeconds,
      UTC: new Date().toISOString(),
      hijri: "N/A (Failed to fetch)",
      info: {
        credits: "Made by harys722, available for everyone!",
        website: "https://harys.is-a.dev/",
      },
    };
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(jsonResponse);
};

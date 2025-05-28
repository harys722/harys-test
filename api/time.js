module.exports = async (req, res) => {
  const offsetStr = req.query.timezone;
  let jsonResponse = {};

  if (!offsetStr) {
    jsonResponse = {
      error: "Missing 'timezone' parameter. Please specify '?timezone=offset' where offset is between -12 and 14 (e.g., 3.5 for Iran).",
    };
    return res.status(400).json(jsonResponse);
  }

  if (offsetStr.includes(':') || offsetStr.includes(',')) {
    jsonResponse = {
      error: "Invalid format. Please use decimal notation like 4.5 or 5.75, not '4:30'. 4.5 for 4:30 and 5.75 for 5:45",
    };
    return res.status(400).json(jsonResponse);
  }

  const offsetNum = parseFloat(offsetStr);
  if (isNaN(offsetNum)) {
    jsonResponse = {
      error: "Invalid 'timezone' parameter. Please provide a numeric value, e.g., 5.5 or -3.",
    };
    return res.status(400).json(jsonResponse);
  }

  if (offsetNum < -12 || offsetNum > 14) {
    jsonResponse = {
      error: "Invalid 'timezone' range. Offset must be between -12 and 14.",
    };
    return res.status(400).json(jsonResponse);
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

  function getTimeWithOffset(offsetHours) {
    const now = new Date();
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const localTime = new Date(utcTime.getTime() + offsetHours * 3600000);
    return localTime;
  }

  const localTime = getTimeWithOffset(offsetNum);
  const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const dateStr = localTime.toLocaleDateString(undefined, dateOptions);

  const hours = localTime.getHours();
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const timeFormatted = `${String(hour12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;

  const unixTimestampSeconds = Math.floor(localTime.getTime() / 1000);

  // Fetch Hijri date from Aladhan API
  try {
    const todayTimestamp = Math.floor(localTime.getTime() / 1000);
    const response = await fetch(`https://api.aladhan.com/v1/gToH/${todayTimestamp}`);
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
    // If API call fails, omit Hijri date
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

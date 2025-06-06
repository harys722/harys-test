const allemojis = [
  {
    emoji: "😀",
    name: "Grinning Face",
    category: "Smileys & Emotion",
    unicode: "U+1F600",
    description: "A typical smiley face, happy and friendly.",
    color: "Yellow",
    mood: "Happy"
  },
  {
    emoji: "😃",
    name: "Smiling Face with Open Mouth",
    category: "Smileys & Emotion",
    unicode: "U+1F603",
    description: "A smiling face with open mouth, joyful.",
    color: "Yellow",
    mood: "Joyful"
  },
  {
    emoji: "😄",
    name: "Smiling Face with Smiling Eyes",
    category: "Smileys & Emotion",
    unicode: "U+1F604",
    description: "Smiling face with smiling eyes, cheerful.",
    color: "Yellow",
    mood: "Content"
  },
  {
    emoji: "😁",
    name: "Beaming Face with Smiling Eyes",
    category: "Smileys & Emotion",
    unicode: "U+1F601",
    description: "Very happy, with big smile and eyes closed.",
    color: "Yellow",
    mood: "Excited"
  },
  {
    emoji: "🤣",
    name: "Rolling on the Floor Laughing",
    category: "Smileys & Emotion",
    unicode: "U+1F923",
    description: "Laughing hard, cannot stop.",
    color: "Yellow",
    mood: "Humorous"
  },
  {
    emoji: "😂",
    name: "Face with Tears of Joy",
    category: "Smileys & Emotion",
    unicode: "U+1F602",
    description: "Laughing with tears.",
    color: "Yellow",
    mood: "Joyful"
  },
  {
    emoji: "🙂",
    name: "Slightly Smiling Face",
    category: "Smileys & Emotion",
    unicode: "U+1F642",
    description: "A gentle, friendly smile.",
    color: "Yellow",
    mood: "Content"
  },
  {
    emoji: "🙃",
    name: "Upside-Down Face",
    category: "Smileys & Emotion",
    unicode: "U+1F643",
    description: "Playful, sarcastic tone.",
    color: "Yellow",
    mood: "Playful"
  },
  {
    emoji: "😉",
    name: "Winking Face",
    category: "Smileys & Emotion",
    unicode: "U+1F609",
    description: "Winking, playful or joking.",
    color: "Yellow",
    mood: "Flirty"
  },
  {
    emoji: "😍",
    name: "Smiling Face with Heart-Eyes",
    category: "Smileys & Emotion",
    unicode: "U+1F60D",
    description: "Love and adoration.",
    color: "Yellow",
    mood: "Romantic"
  },
  {
    emoji: "🥰",
    name: "Smiling Face with Hearts",
    category: "Smileys & Emotion",
    unicode: "U+1F970",
    description: "Happy, love, affection.",
    color: "Yellow",
    mood: "Loving"
  },
  {
    emoji: "😘",
    name: "Face Blowing a Kiss",
    category: "Smileys & Emotion",
    unicode: "U+1F618",
    description: "Sending a kiss.",
    color: "Yellow",
    mood: "Affectionate"
  },
  {
    emoji: "😎",
    name: "Smiling Face with Sunglasses",
    category: "Smileys & Emotion",
    unicode: "U+1F60E",
    description: "Cool, relaxed.",
    color: "Yellow",
    mood: "Cool"
  },
  {
    emoji: "🤓",
    name: "Nerd Face",
    category: "Smileys & Emotion",
    unicode: "U+1F913",
    description: "Smart, geeky.",
    color: "Yellow",
    mood: "Intelligent"
  },
  {
    emoji: "🧐",
    name: "Face with Monocle",
    category: "Smileys & Emotion",
    unicode: "U+1F9D0",
    description: "Curious, scrutinizing.",
    color: "Yellow",
    mood: "Thoughtful"
  },
  {
    emoji: "🥳",
    name: "Partying Face",
    category: "Smileys & Emotion",
    unicode: "U+1F973",
    description: "Celebration, party.",
    color: "Yellow",
    mood: "Festive"
  },
  {
    emoji: "🤗",
    name: "Hugging Face",
    category: "Smileys & Emotion",
    unicode: "U+1F917",
    description: "Hugs, warmth.",
    color: "Yellow",
    mood: "Affectionate"
  },
  // More smileys
  {
    emoji: "❤️",
    name: "Red Heart",
    category: "Symbols",
    unicode: "U+2764",
    description: "Love, affection.",
    color: "Red",
    mood: "Loving"
  },
  {
    emoji: "💖",
    name: "Sparkling Heart",
    category: "Symbols",
    unicode: "U+1F496",
    description: "Love, admiration.",
    color: "Pink",
    mood: "Romantic"
  },
  {
    emoji: "💜",
    name: "Purple Heart",
    category: "Symbols",
    unicode: "U+1F49C",
    description: "Love, compassion.",
    color: "Purple",
    mood: "Loving"
  },
  {
    emoji: "💙",
    name: "Blue Heart",
    category: "Symbols",
    unicode: "U+1F499",
    description: "Trust, harmony.",
    color: "Blue",
    mood: "Calm"
  },
  {
    emoji: "💚",
    name: "Green Heart",
    category: "Symbols",
    unicode: "U+1F49A",
    description: "Jealousy, envy, health.",
    color: "Green",
    mood: "Neutral"
  },
  {
    emoji: "🧡",
    name: "Orange Heart",
    category: "Symbols",
    unicode: "U+1F9E1",
    description: "Warmth, happiness.",
    color: "Orange",
    mood: "Happy"
  },
  {
    emoji: "🖤",
    name: "Black Heart",
    category: "Symbols",
    unicode: "U+1F5A4",
    description: "Mourning, sorrow.",
    color: "Black",
    mood: "Sad"
  },
  {
    emoji: "🤍",
    name: "White Heart",
    category: "Symbols",
    unicode: "U+1F90D",
    description: "Pure love, innocence.",
    color: "White",
    mood: "Pure"
  },

  // Animals
  {
    emoji: "🐶",
    name: "Dog Face",
    category: "Animals & Nature",
    unicode: "U+1F436",
    description: "Dog face, friendly.",
    color: "Brown/Gray",
    mood: "Loyal"
  },
  {
    emoji: "🐱",
    name: "Cat Face",
    category: "Animals & Nature",
    unicode: "U+1F431",
    description: "Cute cat face.",
    color: "Gray/Orange",
    mood: "Playful"
  },
  {
    emoji: "🦁",
    name: "Lion Face",
    category: "Animals & Nature",
    unicode: "U+1F981",
    description: "Majestic lion.",
    color: "Yellow/Brown",
    mood: "Regal"
  },
  {
    emoji: "🐯",
    name: "Tiger Face",
    category: "Animals & Nature",
    unicode: "U+1F42F",
    description: "Tiger face.",
    color: "Orange/Black",
    mood: "Fierce"
  },
  {
    emoji: "🐼",
    name: "Panda Face",
    category: "Animals & Nature",
    unicode: "U+1F43C",
    description: "Cute panda.",
    color: "Black, White",
    mood: "Adorable"
  },
  {
    emoji: "🐸",
    name: "Frog Face",
    category: "Animals & Nature",
    unicode: "U+1F438",
    description: "Frog, nature.",
    color: "Green",
    mood: "Fresh"
  },
  {
    emoji: "🦄",
    name: "Unicorn Face",
    category: "Animals & Nature",
    unicode: "U+1F984",
    description: "Mythical creature, magical.",
    color: "White, Rainbow",
    mood: "Whimsical"
  },

  // Food
  {
    emoji: "🍎",
    name: "Red Apple",
    category: "Food & Drink",
    unicode: "U+1F34E",
    description: "Healthy snack.",
    color: "Red",
    mood: "Fresh"
  },
  {
    emoji: "🍕",
    name: "Pizza",
    category: "Food & Drink",
    unicode: "U+1F355",
    description: "Pizza slice.",
    color: "Various",
    mood: "Celebration"
  },
  {
    emoji: "🍔",
    name: "Hamburger",
    category: "Food & Drink",
    unicode: "U+1F354",
    description: "Burger.",
    color: "Brown",
    mood: "Casual"
  },
  {
    emoji: "🍩",
    name: "Doughnut",
    category: "Food & Drink",
    unicode: "U+1F369",
    description: "Sweet treat.",
    color: "Pink",
    mood: "Happy"
  },
  {
    emoji: "🍫",
    name: "Chocolate Bar",
    category: "Food & Drink",
    unicode: "U+1F36B",
    description: "Sweet chocolate.",
    color: "Brown",
    mood: "Delicious"
  },

  // Travel & Places
  {
    emoji: "🚗",
    name: "Automobile",
    category: "Travel & Places",
    unicode: "U+1F697",
    description: "Car.",
    color: "Various",
    mood: "On the move"
  },
  {
    emoji: "✈️",
    name: "Airplane",
    category: "Travel & Places",
    unicode: "U+2708",
    description: "Flying.",
    color: "White",
    mood: "Adventurous"
  },
  {
    emoji: "🚀",
    name: "Rocket",
    category: "Travel & Places",
    unicode: "U+1F680",
    description: "Space travel.",
    color: "Gray",
    mood: "Exciting"
  },
  {
    emoji: "🌍",
    name: "Globe Showing Europe-Africa",
    category: "Travel & Places",
    unicode: "U+1F30D",
    description: "Earth.",
    color: "Blue, Green",
    mood: "Global"
  },
  {
    emoji: "🗽",
    name: " Statue of Liberty",
    category: "Travel & Places",
    unicode: "U+1F5FD",
    description: "New York.",
    color: "Green",
    mood: "Iconic"
  },

  // Activities & sports
  {
    emoji: "⚽",
    name: "Soccer Ball",
    category: "Activities",
    unicode: "U+26BD",
    description: "Football.",
    color: "Black/White",
    mood: "Active"
  },
  {
    emoji: "🏀",
    name: "Basketball",
    category: "Activities",
    unicode: "U+1F3C0",
    description: "Basketball game.",
    color: "Orange",
    mood: "Competitive"
  },
  {
    emoji: "🎸",
    name: "Guitar",
    category: "Activities",
    unicode: "U+1F3B8",
    description: "Music.",
    color: "Brown",
    mood: "Creative"
  },
  {
    emoji: "🎮",
    name: "Video Game",
    category: "Activities",
    unicode: "U+1F3AE",
    description: "Gaming.",
    color: "Various",
    mood: "Fun"
  },

  // Objects
  {
    emoji: "💡",
    name: "Light Bulb",
    category: "Objects",
    unicode: "U+1F4A1",
    description: "Idea, innovation.",
    color: "Yellow",
    mood: "Inspired"
  },
  {
    emoji: "📱",
    name: "Mobile Phone",
    category: "Objects",
    unicode: "U+1F4F1",
    description: "Smartphone.",
    color: "Black/Green",
    mood: "Connected"
  },
  {
    emoji: "💻",
    name: "Laptop",
    category: "Objects",
    unicode: "U+1F4BB",
    description: "Work, tech.",
    color: "Gray",
    mood: "Productive"
  },

  // Flags
  {
    emoji: "🇺🇸",
    name: "Flag: United States",
    category: "Flags",
    unicode: "U+1F1FA U+1F1F8",
    description: "USA.",
    color: "Red, White, Blue",
    mood: "Patriotic"
  },
  {
    emoji: "🇯🇵",
    name: "Flag: Japan",
    category: "Flags",
    unicode: "U+1F1EF U+1F1F5",
    description: "Japan.",
    color: "Red, White",
    mood: "Cultural"
  },
  {
    emoji: "🇩🇪",
    name: "Flag: Germany",
    category: "Flags",
    unicode: "U+1F1E9 U+1F1EA",
    description: "Germany.",
    color: "Black, Red, Gold",
    mood: "National pride"
  },
  // More emojis can be added here...
];

export default allemojis;

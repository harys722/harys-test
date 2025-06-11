export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { text } = req.body;

  if (typeof text !== 'string') {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const numberMap = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90,
    'hundred': 100,
    'thousand': 1000,
    'million': 1000000,
  };

  function wordsToNumber(words) {
    let total = 0;
    let current = 0;
    for (const word of words) {
      const key = word.toLowerCase();
      if (key === 'and') continue;

      const val = numberMap[key];
      if (val === undefined) return null; // unrecognized word

      if (val === 100) {
        if (current === 0) current = 1;
        current *= val;
      } else if (val >= 1000) {
        if (current === 0) current = 1;
        total += current * val;
        current = 0;
      } else {
        current += val;
      }
    }
    return total + current;
  }

  // Split text into tokens, keeping hyphenated words together
  const tokens = text.match(/\b[\w-]+\b|\W+/g);

  let inNumberSequence = false;
  let currentSequence = [];
  const outputTokens = [];

  for (const token of tokens) {
    const cleanToken = token.trim();

    // Check if token is a number word or hyphenated number
    const isNumberWord = (() => {
      if (/\w+/.test(cleanToken)) {
        // handle hyphenated words
        const parts = cleanToken.split('-');
        return parts.every(part => numberMap.hasOwnProperty(part.toLowerCase()));
      }
      return false;
    })();

    if (isNumberWord) {
      currentSequence.push(cleanToken);
      inNumberSequence = true;
    } else {
      // If sequence was ongoing, convert it
      if (inNumberSequence) {
        // Normalize sequence: split hyphenated words into parts
        const allParts = currentSequence.flatMap(w => w.split('-'));
        const numberValue = wordsToNumber(allParts);
        if (numberValue !== null) {
          outputTokens.push(numberValue.toString());
        } else {
          // fallback: output original sequence
          outputTokens.push(currentSequence.join(''));
        }
        currentSequence = [];
        inNumberSequence = false;
      }
      // Add the current token as is
      outputTokens.push(token);
    }
  }

  // If sequence ends at the end of text
  if (inNumberSequence) {
    const allParts = currentSequence.flatMap(w => w.split('-'));
    const numberValue = wordsToNumber(allParts);
    if (numberValue !== null) {
      outputTokens.push(numberValue.toString());
    } else {
      outputTokens.push(currentSequence.join(''));
    }
  }

  const outputText = outputTokens.join('');
  res.status(200).json({ result: outputText });
}

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

  // Function to convert a sequence of number words into a number
  function wordsToNumber(words) {
    let total = 0;
    let current = 0;

    for (const word of words) {
      const key = word.toLowerCase();

      if (key === 'and') {
        continue; // ignore "and"
      }

      const val = numberMap[key];
      if (val === undefined) {
        return null; // unrecognized word
      }

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

  // Split text into tokens: words, punctuation, spaces, etc.
  const tokens = text.split(/\b/); // split by word boundaries

  const resultTokens = [];
  let sequence = [];
  let inSequence = false;

  for (const token of tokens) {
    const trimmedToken = token.trim();

    // Check if token is a number word
    if (numberMap.hasOwnProperty(trimmedToken.toLowerCase())) {
      sequence.push(trimmedToken);
      inSequence = true;
    } else {
      // If sequence exists, convert and replace
      if (inSequence) {
        const numberValue = wordsToNumber(sequence);
        if (numberValue !== null) {
          resultTokens.push(numberValue.toString());
        } else {
          resultTokens.push(sequence.join(''));
        }
        sequence = [];
        inSequence = false;
      }
      // Push the current token as-is
      resultTokens.push(token);
    }
  }

  // Handle trailing sequence
  if (inSequence) {
    const numberValue = wordsToNumber(sequence);
    if (numberValue !== null) {
      resultTokens.push(numberValue.toString());
    } else {
      resultTokens.push(sequence.join(''));
    }
  }

  const outputText = resultTokens.join('');
  res.status(200).json({ result: outputText });
}

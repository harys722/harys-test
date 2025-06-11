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
    'billion': 1000000000
  };

  // Function to convert a sequence of words to a number
  function wordsToNumber(words) {
    let total = 0;
    let current = 0;

    for (let word of words) {
      const lowerWord = word.toLowerCase();

      if (lowerWord === 'and') {
        continue; // skip "and"
      }

      const val = numberMap[lowerWord];

      if (val === undefined) {
        // unrecognized word
        return null;
      }

      if (val === 100) {
        // multiply current by 100
        if (current === 0) current = 1; // e.g., "hundred" without a number before
        current *= val;
      } else if (val >= 1000) {
        // scale words like thousand, million
        if (current === 0) current = 1;
        total += current * val;
        current = 0;
      } else {
        // small number
        current += val;
      }
    }
    total += current;
    return total;
  }

  // Tokenize input text (split by non-word characters)
  const tokens = text.split(/\b/);

  const resultTokens = [];
  let sequence = [];
  let inSequence = false;

  for (let token of tokens) {
    const lowerToken = token.toLowerCase().trim();

    if (numberMap.hasOwnProperty(lowerToken)) {
      sequence.push(lowerToken);
      inSequence = true;
    } else {
      // process sequence if ended
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
      resultTokens.push(token);
    }
  }

  // handle last sequence
  if (inSequence) {
    const numberValue = wordsToNumber(sequence);
    if (numberValue !== null) {
      resultTokens.push(numberValue.toString());
    } else {
      resultTokens.push(sequence.join(''));
    }
  }

  const convertedText = resultTokens.join('');
  res.status(200).json({ result: convertedText });
}

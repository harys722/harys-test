import allEmojis from '../../database/allemojis';

export default function handler(req, res) {
  const { emoji } = req.query;

  if (emoji) {
    // Find specific emoji
    const found = allEmojis.find(e => e.emoji === emoji);
    if (!found) {
      return res.status(404).json({ error: "Emoji not found." });
    }
    return res.json({
      ...found,
      info: {
        credits: "Made by harys722, available only for cool people.",
        website: "https://harys.is-a.dev"
      }
    });
  } else {
    // No param: pick a random emoji
    const randomIndex = Math.floor(Math.random() * allEmojis.length);
    const randomEmoji = allEmojis[randomIndex];
    return res.json({
      ...randomEmoji,
      info: {
        credits: "Made by harys722, available only for cool people.",
        website: "https://harys.is-a.dev"
      }
    });
  }
}

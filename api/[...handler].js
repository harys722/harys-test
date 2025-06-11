export default function handler(req, res) {
  const { handler } = req.query; // array of path segments

  // define valid API routes
  const validRoutes = ['color', 'emoji', 'encode', 'list', 'time'];

  if (handler && validRoutes.includes(handler[0])) {
    // process valid route
    res.json({ message: `Processing ${handler[0]}` });
  } else {
    // return error for invalid route
    res.status(400).json({ error: 'Invalid API route' });
  }
}

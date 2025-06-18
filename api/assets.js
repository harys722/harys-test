import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { file } = req.query;
  const referer = req.headers.referer;
  const userAgent = req.headers['user-agent'] || '';
  
  // Security checks
  if (!referer || 
      !referer.includes('harys.is-a.dev') || 
      userAgent.includes('curl') || 
      userAgent.includes('wget') ||
      userAgent.includes('python') ||
      userAgent.includes('bot')) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  // Validate file parameter
  if (!file || typeof file !== 'string') {
    return res.status(400).json({ error: 'Invalid file parameter' });
  }
  
  // Security: Only allow CSS and JS files
  const allowedExtensions = ['.css', '.js'];
  const fileExtension = path.extname(file).toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    return res.status(403).json({ error: 'File type not allowed' });
  }
  
  // Security: Prevent directory traversal
  if (file.includes('..') || file.includes('\\') || file.startsWith('/')) {
    return res.status(403).json({ error: 'Invalid file path' });
  }
  
  // Build file path
  const filePath = path.join(process.cwd(), 'assets', file);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  try {
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Set appropriate content type
    const mimeTypes = {
      '.css': 'text/css',
      '.js': 'application/javascript'
    };
    
    res.setHeader('Content-Type', mimeTypes[fileExtension]);
    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Send the file content
    res.status(200).send(fileContent);
    
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

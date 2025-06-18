import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { file } = req.query;
  const referer = req.headers.referer;
  const userAgent = req.headers['user-agent'] || '';
  
  // Security checks - redirect to 404 instead of showing error
  if (!referer || 
      !referer.includes('harys.is-a.dev') || 
      userAgent.includes('curl') || 
      userAgent.includes('wget') ||
      userAgent.includes('python') ||
      userAgent.includes('bot')) {
    return res.redirect(302, '/404.html');
  }
  
  // Validate file parameter
  if (!file || typeof file !== 'string') {
    return res.redirect(302, '/404.html');
  }
  
  // Security: Only allow CSS and JS files
  const allowedExtensions = ['.css', '.js'];
  const fileExtension = path.extname(file).toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    return res.redirect(302, '/404.html');
  }
  
  // Security: Prevent directory traversal
  if (file.includes('..') || file.includes('\\') || file.startsWith('/')) {
    return res.redirect(302, '/404.html');
  }
  
  // Build file path
  const filePath = path.join(process.cwd(), 'assets', file);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.redirect(302, '/404.html');
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
    res.redirect(302, '/404.html');
  }
}

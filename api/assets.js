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
  
  // Security: Allow common web asset files
  const allowedExtensions = [
    '.css', '.js', '.json', '.txt', '.md', 
    '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico',
    '.woff', '.woff2', '.ttf', '.eot',
    '.mp3', '.mp4', '.webm', '.ogg',
    '.pdf', '.zip'
  ];
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
    // Read file content (handle both text and binary files)
    const isTextFile = ['.css', '.js', '.json', '.txt', '.md', '.svg'].includes(fileExtension);
    const fileContent = fs.readFileSync(filePath, isTextFile ? 'utf8' : null);
    
    // Set appropriate content type
    const mimeTypes = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.txt': 'text/plain',
      '.md': 'text/markdown',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.ico': 'image/x-icon',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.mp3': 'audio/mpeg',
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.ogg': 'audio/ogg',
      '.pdf': 'application/pdf',
      '.zip': 'application/zip'
    };
    
    res.setHeader('Content-Type', mimeTypes[fileExtension] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Send the file content
    res.status(200).send(fileContent);
    
  } catch (error) {
    console.error('Error reading file:', error);
    res.redirect(302, '/404.html');
  }
}

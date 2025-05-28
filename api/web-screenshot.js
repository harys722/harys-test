import puppeteer from 'puppeteer-core';
import chrome from '@sparticuz/chromium';

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}

export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!isValidUrl(url)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid parameter `url`. Must be a valid URL"
      });
    }

    // Configure Chromium options
    chrome.setGraphicsMode = true;
    chrome.setHeadlessMode = true;

    const browser = await puppeteer.launch({
      executablePath: await chrome.executablePath(),
      headless: chrome.headless,
      args: chrome.args,
      defaultViewport: chrome.defaultViewport
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 720 });

    await page.goto(url, {
      waitUntil: 'networkidle0'
    });

    const screenshotBuffer = await page.screenshot({ type: 'png' });

    // Send the screenshot as PNG
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshotBuffer);

    await browser.close();
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error\n' + error.message
    });
  }
}

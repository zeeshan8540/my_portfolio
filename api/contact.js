// Vercel Serverless Function: /api/contact
// Securely proxies contact form submissions to Formspree using environment variables.

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Health/status check endpoint
  if (req.method === 'GET') {
    const hasKey = Boolean(
      process.env.FORMSPREE_KEY ||
      process.env.FORMSPREE_FORM_ID ||
      process.env.FORMSPREE_ID ||
      process.env.NEXT_PUBLIC_FORMSPREE_KEY ||
      process.env.VITE_FORMSPREE_KEY
    );
    return res.status(200).json({
      status: 'active',
      configured: hasKey
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Resolve the Formspree key/endpoint from Vercel environment variables
  const formspreeKey = (
    process.env.FORMSPREE_KEY ||
    process.env.FORMSPREE_FORM_ID ||
    process.env.FORMSPREE_ID ||
    process.env.NEXT_PUBLIC_FORMSPREE_KEY ||
    process.env.VITE_FORMSPREE_KEY ||
    'xwvjbggz'
  ).trim();

  let targetUrl = formspreeKey;
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = `https://formspree.io/f/${formspreeKey}`;
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        // Leave as string if not JSON
      }
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error forwarding contact submission to Formspree:', error);
    return res.status(500).json({
      error: 'Failed to send message. Please try again or reach out directly at zeeshanarshad854@gmail.com'
    });
  }
};

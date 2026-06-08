export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }


  const { ticker, target } = req.query;

  const API_KEY = process.env.STOCK_API_KEY;

  let url;


  // EODHD
  if (target === 'history') {
    url = `https://eodhd.com/api/eod/${ticker}.US?api_token=${API_KEY}&fmt=json`;
  }
  else if (target === 'current') {
    url = `https://eodhd.com/api/real-time/${ticker}.US?api_token=${API_KEY}&fmt=json`;
  }
  else {
    return res.status(400).json({ error: "Invalid target." });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

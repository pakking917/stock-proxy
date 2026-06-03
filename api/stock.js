export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');


  const { ticker } = req.query;
  const { target } = req.query;

  const API_KEY = process.env.STOCK_API_KEY;

  console.log(ticker);
  console.log(target);

  // EODHD
  if (ticker = 'history') {
    const url = `https://eodhd.com/api/eod/${ticker}.US?api_token=${API_KEY}&fmt=json`;
  }
  else if (ticker = 'current') {
    const url = `https://eodhd.com/api/real-time/${ticker}.US?api_token=${API_KEY}&fmt=json`;

  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

let temperatureData = [];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (you can specify a specific origin if needed)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end(); // Respond to preflight request
    return;
  }

  if (req.method === 'POST') {
    const { temperature } = req.body;
    temperatureData.push(temperature);
    if (temperatureData.length > 10) {
      temperatureData.shift(); // Keep only the last 10 readings
    }
    res.status(200).json({ message: 'Temperature received' });
  } else if (req.method === 'GET') {
    res.status(200).json(temperatureData); // Send back the stored temperature data
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

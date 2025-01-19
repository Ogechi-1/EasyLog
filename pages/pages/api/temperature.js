   // pages/api/temperature.js
   let temperatureData = [];

   export default function handler(req, res) {
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

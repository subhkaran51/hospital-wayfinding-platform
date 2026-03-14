import express from 'express';
import { query } from '../db/index.js';
import twilio from 'twilio';

const router = express.Router();

// Search endpoint for Departments, Clinics, and Rooms
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
    if (!q) {
      return res.json([]);
    }

    // Full text search on departments
    const searchString = q.split(' ').map(word => `${word}:*`).join(' & ');
    
    try {
      // We do a basic ILIKE matching as fallback if tsvector is empty, or better yet just ILIKE for starter
      const result = await query(
        `SELECT d.id, d.name, d.description, b.name AS building_name, f.floor_level 
         FROM departments d
         JOIN buildings b ON d.building_id = b.id
         JOIN floors f ON d.floor_id = f.id
         WHERE d.name ILIKE $1 OR d.description ILIKE $1
         LIMIT 10`,
        [`%${q}%`]
      );
      res.json(result.rows);
    } catch(dbErr) {
      console.warn('DB connect failed, returning mock search payload:', dbErr.message);
      const mockResults = [
        { id: 1, name: 'Cardiology', description: 'Heart and vascular care', building_name: 'Main Hospital', floor_level: 'Level 4' },
        { id: 2, name: 'Radiology', description: 'X-Ray and scans', building_name: 'Main Hospital', floor_level: 'Level G' },
        { id: 3, name: 'Emergency Department', description: 'Emergency Room', building_name: 'Main Hospital', floor_level: 'Level 1' },
      ];
      // Basic mock filter
      const filtered = mockResults.filter(r => r.name.toLowerCase().includes(q.toLowerCase()));
      res.json(filtered.length > 0 ? filtered : mockResults);
    }
  } catch (error) {
    console.error('Search router error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// A* or Dijkstra Routing Endpoint (Mocked via pgRouting theoretically, here we do a stub)
router.get('/route', async (req, res) => {
  const { startNode, endNode, accessibleOnly } = req.query;
  
  try {
    // In a real postgis/pgRouting setup we'd call pgr_dijkstra here
    // Ex: SELECT * FROM pgr_dijkstra('SELECT id, node_a AS source, node_b AS target, distance AS cost FROM routing_edges WHERE is_accessible = true', ...)

    // Temporary mock response
    res.json({
      success: true,
      route: [
        { instruction: "Start at Main Entrance", coords: [ -111.8383, 40.7622 ] },
        { instruction: "Turn left at the Information Desk", coords: [ -111.8385, 40.7623 ] },
        { instruction: "Arrive at Destination", coords: [ -111.8388, 40.7625 ] }
      ],
      distance: 120, // meters
      estimatedTime: 2 // minutes
    });
  } catch (err) {
    console.error('Routing error:', err);
    res.status(500).json({ error: 'Routing failed' });
  }
});

// Twilio SMS integration for Mobile Handoff
router.post('/sms', async (req, res) => {
  const { phone, routeUrl } = req.body;
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!twilioSid || !twilioToken || !twilioNumber) {
    return res.status(500).json({ error: 'Twilio not configured in environment' });
  }

  try {
    const client = twilio(twilioSid, twilioToken);
    
    const message = await client.messages.create({
      body: `Here is your Interactive Hospital Navigation Route: ${routeUrl}`,
      from: twilioNumber,
      to: phone
    });

    res.json({ success: true, messageId: message.sid });
  } catch (err) {
    console.error('SMS error:', err);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

export default router;

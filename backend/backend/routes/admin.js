import express from 'express';
import { query } from '../db/index.js';

const router = express.Router();

// Get all buildings
router.get('/buildings', async (req, res) => {
  try {
    const result = await query('SELECT id, name, description FROM buildings ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching buildings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new department/POI
router.post('/departments', async (req, res) => {
  const { building_id, floor_id, name, description, operating_hours, phone } = req.body;
  try {
    const result = await query(
      `INSERT INTO departments (building_id, floor_id, name, description, operating_hours, phone)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [building_id, floor_id, name, description, operating_hours, phone]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ error: 'Failed to add department' });
  }
});

// Update a department
router.put('/departments/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, operating_hours } = req.body;
  try {
    const result = await query(
      `UPDATE departments SET name = $1, description = $2, operating_hours = $3 WHERE id = $4 RETURNING *`,
      [name, description, operating_hours, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Failed to update department' });
  }
});

// Delete a department
router.delete('/departments/:id', async (req, res) => {
  try {
    await query(`DELETE FROM departments WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Failed to delete department' });
  }
});

// Analytics (Mocked up)
router.get('/analytics/popular-searches', async (req, res) => {
  // In a real system, you'd log searches in an 'analytics_logs' table. Here we return mock data for the UI
  res.json([
    { query: 'Emergency Department', count: 145 },
    { query: 'Radiology', count: 98 },
    { query: 'Pharmacy', count: 87 },
    { query: 'Restroom', count: 56 },
    { query: 'Cardiology', count: 32 }
  ]);
});

export default router;

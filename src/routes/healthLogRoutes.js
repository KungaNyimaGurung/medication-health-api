import express from 'express';
import {
  createHealthLog,
  getHealthLogs,
  getHealthLogById,
  updateHealthLog,
  deleteHealthLog
} from '../controllers/healthLogController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * POST /api/healthlogs
 * --------------------
 * Create a new health log for the authenticated patient.
 * Controller: createHealthLog
 * Middleware: protect (ensures user is logged in)
 */
router.post('/', protect, createHealthLog);

/**
 * GET /api/healthlogs
 * -------------------
 * Fetch all health logs belonging to the authenticated patient.
 * Controller: getHealthLogs
 * Middleware: protect
 */
router.get('/', protect, getHealthLogs);

/**
 * GET /api/healthlogs/:id
 * -----------------------
 * Fetch a single health log by its ID.
 * Only returns the log if it belongs to the authenticated patient.
 * Controller: getHealthLogById
 * Middleware: protect
 */
router.get('/:id', protect, getHealthLogById);

/**
 * PUT /api/healthlogs/:id
 * -----------------------
 * Update a specific health log.
 * Only updates if the log belongs to the authenticated patient.
 * Controller: updateHealthLog
 * Middleware: protect
 */
router.put('/:id', protect, updateHealthLog);

/**
 * DELETE /api/healthlogs/:id
 * --------------------------
 * Delete a specific health log.
 * Only deletes if the log belongs to the authenticated patient.
 * Controller: deleteHealthLog
 * Middleware: protect
 */
router.delete('/:id', protect, deleteHealthLog);

export default router;

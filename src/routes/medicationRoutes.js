import express from 'express';
import {
    createMedication,
    getMedications,
    updateMedication,
    deleteMedication
} from '../controllers/medicationController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * POST /api/medications
 * ---------------------
 * Create a new medication entry for the authenticated patient.
 * Controller: createMedication
 * Middleware: protect (ensures only logged-in users can access)
 */
router.post('/', protect, createMedication);

/**
 * GET /api/medications
 * --------------------
 * Fetch all medications belonging to the authenticated patient.
 * Controller: getMedications
 * Middleware: protect
 */
router.get('/', protect, getMedications);

/**
 * PUT /api/medications/:id
 * ------------------------
 * Update a specific medication by ID.
 * Only updates if the medication belongs to the authenticated patient.
 * Controller: updateMedication
 * Middleware: protect
 */
router.put('/:id', protect, updateMedication);

/**
 * DELETE /api/medications/:id
 * ---------------------------
 * Delete a specific medication by ID.
 * Only deletes if the medication belongs to the authenticated patient.
 * Controller: deleteMedication
 * Middleware: protect
 */
router.delete('/:id', protect, deleteMedication);

export default router;

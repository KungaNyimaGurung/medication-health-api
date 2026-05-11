import express from 'express';
import {
    createMedication,
    getMedications,
    updateMedication,
    deleteMedication
} from '../controllers/medicationController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createMedication);
router.get('/', protect, getMedications);
router.put('/:id', protect, updateMedication);
router.delete('/:id', protect, deleteMedication);

export default router;

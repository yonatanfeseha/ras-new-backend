import express from 'express';
import * as trainingController from '../controllers/trainingType.controller.js';

const router = express.Router();

// =============================
// 🔹 TRAINING TYPE CRUD
// =============================
router.get('/', trainingController.getTrainingTypes);
router.get('/:id', trainingController.getTrainingType);
router.post('/', trainingController.createTrainingType);
router.put('/:id', trainingController.updateTrainingType);
router.delete('/:id', trainingController.deleteTrainingType);

// =============================
// 🔥 MEMBER TRAINING TYPES
// =============================

// get member training types
router.get('/member/:memberId', trainingController.getMemberTrainingTypes);

// assign training types to member
router.post('/member/assign', trainingController.assignTrainingTypes);

// remove training type from member
router.delete(
  '/member/remove',
  trainingController.removeTrainingTypeFromMember
);

// =============================
// 🔥 COACH TRAINING TYPES
// =============================

// get coach training types
router.get('/coach/:coachId', trainingController.getCoachTrainingTypes);

// assign training types to coach
router.post('/coach/assign', trainingController.assignTrainingTypesToCoach);

// remove training type from coach
router.delete('/coach/remove', trainingController.removeCoachTrainingType);

export default router;

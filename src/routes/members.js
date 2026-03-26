import express from 'express';
import * as MemberController from '../controllers/member.js';

const router = express.Router();

router.post('/', MemberController.createMember);
router.get('/', MemberController.getMembers);
router.get('/:id', MemberController.getMember);
router.put('/:id', MemberController.updateMember);
router.delete('/:id', MemberController.deleteMember);

export default router;

// MEMBER
router.get('/:id/profile', getMemberProfile);
router.post('/register', registerMember);

// COACH
router.get('/:id/profile', getCoachProfile);

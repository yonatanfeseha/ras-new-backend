import * as memberService from '../services/member.service.js';

export const getMemberProfile = async (req, res) => {
  try {
    const profile = await memberService.getFullMemberProfile(req.params.id);

    if (!profile) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(profile);
  } catch {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const registerMember = async (req, res) => {
  try {
    const result = await memberService.registerMember(req.body);

    res.status(201).json({
      message: 'Member registered successfully',
      ...result,
    });
  } catch {
    res.status(500).json({ error: 'Registration failed' });
  }
};

import * as memberModel from '../models/member.js';

// 🔹 Get all
export const getMembers = async (req, res) => {
  try {
    const members = await memberModel.getAllMembers();
    res.json(members);
  } catch {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};

// 🔹 Get one
export const getMember = async (req, res) => {
  try {
    const member = await memberModel.getMemberById(req.params.id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member);
  } catch {
    res.status(500).json({ error: 'Error retrieving member' });
  }
};

// 🔹 Create
export const createMember = async (req, res) => {
  try {
    const { name, gender, b_date } = req.body;

    if (!name || !gender || !b_date) {
      return res.status(400).json({
        error: 'name, gender, b_date required',
      });
    }

    const result = await memberModel.createMember(req.body);

    res.status(201).json({ message: 'Member created', ...result });
  } catch {
    res.status(500).json({ error: 'Create failed' });
  }
};

// 🔹 Update
export const updateMember = async (req, res) => {
  try {
    const existing = await memberModel.getMemberById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await memberModel.updateMember(req.params.id, req.body);

    res.json({ message: 'Updated successfully' });
  } catch {
    res.status(500).json({ error: 'Update failed' });
  }
};

// 🔹 Delete
export const deleteMember = async (req, res) => {
  try {
    const affected = await memberModel.deleteMember(req.params.id);

    if (affected === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Delete failed' });
  }
};

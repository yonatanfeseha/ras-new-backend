import * as MemberModel from "../models/member.js";

// Create
export const createMember = async (req, res) => {
  try {
    const member = await MemberModel.createMember(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all
export const getMembers = async (req, res) => {
  try {
    const members = await MemberModel.getAllMembers();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one
export const getMember = async (req, res) => {
  try {
    const member = await MemberModel.getMemberById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updateMember = async (req, res) => {
  try {
    const member = await MemberModel.updateMember(
      req.params.id,
      req.body
    );

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
export const deleteMember = async (req, res) => {
  try {
    await MemberModel.deleteMember(req.params.id);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
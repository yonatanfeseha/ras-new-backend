import * as memberService from "../services/member.service.js";

// FULL PROFILE
export const getMemberProfile = async (req, res) => {
  try {
    const profile = await memberService.getFullMemberProfile(req.params.id);

    if (!profile) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("FULL PROFILE ERROR:", err);

    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

// FULL REGISTER
export const registerMember = async (req, res) => {
  try {
    const result = await memberService.registerMemberFull(req.body);

    res.status(201).json({
      message: "Member registered successfully",
      ...result,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 🔹 FULL DELETE
export const deleteMember = async (req, res) => {
  try {
    await memberService.deleteMemberFull(req.params.id);

    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    if (err.message === "Member not found") {
      return res.status(404).json({ error: err.message });
    }

    res.status(500).json({ error: "Member deletion failed" });
  }
};

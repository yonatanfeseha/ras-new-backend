import { getFullMemberProfile } from "../models/mfull.js";

export const fetchFullMemberProfile = async (req, res) => {
  try {
    const memberId = req.params.id;

    const data = await getFullMemberProfile(memberId);

    if (!data.member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

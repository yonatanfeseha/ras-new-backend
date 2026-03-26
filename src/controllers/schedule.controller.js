import * as scheduleModel from "../models/schedule.js";

// 🔹 Get all schedules
export const getSchedules = async (req, res) => {
  try {
    const schedules = await scheduleModel.getAllSchedules();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

// 🔹 Get single schedule
export const getSchedule = async (req, res) => {
  try {
    const schedule = await scheduleModel.getScheduleById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving schedule" });
  }
};

// 🔹 Create schedule
export const createSchedule = async (req, res) => {
  try {
    const { date, time } = req.body;

    // ✅ validation
    if (!date || !time) {
      return res.status(400).json({ error: "Date and time are required" });
    }

    const id = await scheduleModel.createSchedule({ date, time });

    res.status(201).json({
      message: "Schedule created",
      id,
      date,
      time,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create schedule" });
  }
};

// 🔹 Update schedule
export const updateSchedule = async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ error: "Date and time are required" });
    }

    const affected = await scheduleModel.updateSchedule(req.params.id, {
      date,
      time,
    });

    if (affected === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

// 🔹 Delete schedule
export const deleteSchedule = async (req, res) => {
  try {
    const affected = await scheduleModel.deleteSchedule(req.params.id);

    if (affected === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};


// =============================
// MEMBER SCHEDULES
// =============================

// 🔹 Assign schedules to member
export const assignMemberSchedules = async (req, res) => {
  try {
    const { memberId, scheduleIds } = req.body;

    if (!memberId || !scheduleIds?.length) {
      return res.status(400).json({ error: "memberId and scheduleIds required" });
    }

    await scheduleModel.assignMemberSchedules(memberId, scheduleIds);

    res.json({ message: "Schedules assigned to member" });
  } catch (error) {
    res.status(500).json({ error: "Assignment failed" });
  }
};

// 🔹 Remove schedule from member
export const removeMemberSchedule = async (req, res) => {
  try {
    const { memberId, scheduleId } = req.body;

    const affected = await scheduleModel.removeMemberSchedule(
      memberId,
      scheduleId
    );

    if (affected === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json({ message: "Removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Remove failed" });
  }
};

// 🔹 Get member schedules
export const getMemberSchedules = async (req, res) => {
  try {
    const schedules = await scheduleModel.getMemberSchedules(req.params.memberId);
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch member schedules" });
  }
};


// =============================
// COACH SCHEDULES
// =============================

// 🔹 Assign schedules to coach
export const assignCoachSchedules = async (req, res) => {
  try {
    const { coachId, scheduleIds } = req.body;

    if (!coachId || !scheduleIds?.length) {
      return res.status(400).json({ error: "coachId and scheduleIds required" });
    }

    await scheduleModel.assignCoachSchedules(coachId, scheduleIds);

    res.json({ message: "Schedules assigned to coach" });
  } catch (error) {
    res.status(500).json({ error: "Assignment failed" });
  }
};

// 🔹 Remove schedule from coach
export const removeCoachSchedule = async (req, res) => {
  try {
    const { coachId, scheduleId } = req.body;

    const affected = await scheduleModel.removeCoachSchedule(
      coachId,
      scheduleId
    );

    if (affected === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json({ message: "Removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Remove failed" });
  }
};

// 🔹 Get coach schedules
export const getCoachSchedules = async (req, res) => {
  try {
    const schedules = await scheduleModel.getCoachSchedules(req.params.coachId);
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coach schedules" });
  }
};
import * as model from "../models/mNested.js";

// ================= HEALTH =================

export const getHealth = async (req, res) => {
  const data = await model.getMemberHealth(req.params.id);
  res.json({ success: true, data });
};

export const saveHealth = async (req, res) => {
  await model.upsertMemberHealth(req.params.id, req.body);
  res.json({ success: true, message: "Health saved" });
};

// ================= EMERGENCY =================

export const getContacts = async (req, res) => {
  const data = await model.getEmergencyContacts(req.params.id);
  res.json({ success: true, data });
};

export const addContact = async (req, res) => {
  const id = await model.createEmergencyContact(req.params.id, req.body);
  res.json({ success: true, id });
};

export const editContact = async (req, res) => {
  await model.updateEmergencyContact(req.params.contactId, req.body);
  res.json({ success: true });
};

// ================= COACHES =================

export const getCoaches = async (req, res) => {
  const data = await model.getMemberCoaches(req.params.id);
  res.json({ success: true, data });
};

export const assignCoachesCtrl = async (req, res) => {
  await model.assignCoaches(req.params.id, req.body.coachIds);
  res.json({ success: true });
};

export const removeCoachCtrl = async (req, res) => {
  await model.removeCoach(req.params.id, req.params.coachId);
  res.json({ success: true });
};

// ================= SCHEDULES =================

export const getSchedules = async (req, res) => {
  const data = await model.getMemberSchedules(req.params.id);
  res.json({ success: true, data });
};

export const assignSchedulesCtrl = async (req, res) => {
  await model.assignSchedules(req.params.id, req.body.scheduleIds);
  res.json({ success: true });
};

export const removeScheduleCtrl = async (req, res) => {
  await model.removeSchedule(req.params.id, req.params.scheduleId);
  res.json({ success: true });
};

// ================= TRAINING TYPES =================

export const getTrainingTypes = async (req, res) => {
  const data = await model.getMemberTrainingTypes(req.params.id);
  res.json({ success: true, data });
};

export const assignTrainingTypesCtrl = async (req, res) => {
  await model.assignTrainingTypes(req.params.id, req.body.typeIds);
  res.json({ success: true });
};

export const removeTrainingTypeCtrl = async (req, res) => {
  await model.removeTrainingType(req.params.id, req.params.typeId);
  res.json({ success: true });
};

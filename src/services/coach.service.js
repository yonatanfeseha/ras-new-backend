import * as coachModel from "../models/coach.js";
import * as scheduleModel from "../models/schedule.js";
import * as trainingModel from "../models/trainingType.js";
import * as userService from "./user.service.js";

// FULL PROFILE
export const getFullCoachProfile = async (coachId) => {
  const coach = await coachModel.getCoachById(coachId);
  if (!coach) return null;

  const [schedules, trainingTypes] = await Promise.all([
    scheduleModel.getCoachSchedules(coachId),
    trainingModel.getCoachTrainingTypes(coachId),
  ]);

  return {
    ...coach,
    schedules,
    trainingTypes,
  };
};

export const registerCoachFull = async (coachData) => {
  try {
    const {
      name,
      gender,
      b_date,
      address_id,
      phone,
      url,
      scheduleIds,
      trainingTypeIds,
      password,
    } = coachData;

    // Basic validation
    if (!name || !phone) {
      throw new Error("Name and phone are required");
    }

    if (!Array.isArray(scheduleIds) || !scheduleIds.length) {
      throw new Error("scheduleIds must be a non-empty array");
    }

    if (!Array.isArray(trainingTypeIds) || !trainingTypeIds.length) {
      throw new Error("trainingTypeIds must be a non-empty array");
    }

    // Create coach (make sure this returns insertId)
    const coachId = await coachModel.createCoach({
      name,
      gender,
      b_date,
      address_id,
      phone,
      url,
    });

    const year = new Date().getFullYear().toString().slice(-2);
    const ras_id = `RAS/${String(coachId).padStart(4, "0")}/${year}`;

    await coachModel.updateRasId(coachId, ras_id);

    await Promise.all([
      scheduleModel.assignCoachSchedules(coachId, scheduleIds),
      trainingModel.assignTrainingTypesToCoach(coachId, trainingTypeIds),
      userService.registerUser({
        id: ras_id,
        password: password || 123456,
        role: "coach",
      }),
    ]);

    return { coachId };
  } catch (error) {
    console.error("REGISTER COACH FULL ERROR:", error);
    throw error;
  }
};

export const deleteCoachFull = async (coachId) => {
  const coach = await coachModel.getCoachById(coachId);
  if (!coach) throw new Error("Coach not found");

  await Promise.all([
    scheduleModel.removeCoachSchedule(coachId),
    trainingModel.removeCoachTrainingType(coachId),
    coachModel.deleteCoach(coachId),
  ]);
};

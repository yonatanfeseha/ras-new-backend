import * as coachModel from "../models/coach.js";
import * as scheduleModel from "../models/schedule.js";
import * as trainingModel from "../models/trainingType.js";

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



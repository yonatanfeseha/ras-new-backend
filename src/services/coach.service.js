import * as coachModel from '../models/coach.js';
import * as scheduleModel from '../models/schedule.js';
import * as trainingModel from '../models/trainingType.js';

// FULL PROFILE
export const getFullCoachProfile = async coachId => {
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

// FULL REGISTER
export const registerCoachFull = async coachData => {
  const { name, email, phone, scheduleIds, trainingTypeIds } = coachData;

  // Create coach
  const coachId = await coachModel.createCoach({ name, email, phone });

  // Assign schedules and training types
  await Promise.all([
    scheduleModel.assignCoachSchedules(coachId, scheduleIds),
    trainingModel.assignTrainingTypesToCoach(coachId, trainingTypeIds),
  ]);

  return { coachId };
};

export const deleteCoachFull = async coachId => {
  const coach = await coachModel.getCoachById(coachId);
  if (!coach) throw new Error('Coach not found');

  await Promise.all([
    scheduleModel.removeCoachSchedule(coachId),
    trainingModel.removeCoachTrainingType(coachId),

    coachModel.deleteCoach(coachId),
  ]);
};


import * as memberModel from "../models/member.js";
import * as healthModel from "../models/health.js";
import * as emergencyModel from "../models/emergency.js";
import * as scheduleModel from "../models/schedule.js";
import * as trainingModel from "../models/trainingType.js";
import * as coachModel from "../models/coach.js";

// =============================
// FULL PROFILE
// =============================
export const getFullMemberProfile = async (memberId) => {
  const member = await memberModel.getMemberById(memberId);
  if (!member) return null;

  const [health, emergency, schedules, trainingTypes, coaches] =
    await Promise.all([
      healthModel.getHealthByMember(memberId),
      emergencyModel.getEmergencyContact(memberId),
      scheduleModel.getMemberSchedules(memberId),
      trainingModel.getMemberTrainingTypes(memberId),
      coachModel.getMemberCoaches(memberId),
    ]);

  return {
    ...member,
    health,
    emergency,
    schedules,
    trainingTypes,
    coaches,
  };
};

export const deleteMemberFull = async (memberId) => {
  // 🔹 check existence
  const member = await memberModel.getMemberById(memberId);
  if (!member) {
    throw new Error('Member not found');
  }

  // 🔹 delete relations first, then member
  await Promise.all([
    healthModel.deleteHealth(memberId),
    emergencyModel.deleteEmergencyContact(memberId),
    scheduleModel.removeMemberSchedules(memberId),
    trainingModel.removeMemberTrainingTypes(memberId),
  ]);

  await memberModel.deleteMember(memberId);

  return {
    message: 'Member deleted successfully',
  };
};

export const registerMemberFull = async (memberData) => {
  const { name, gender, b_date, health, emergency, scheduleIds, trainingTypeIds } = memberData;

  // 🔹 Create member
  const memberId = await memberModel.createMember({ name, gender, b_date });

  // 🔹 Create health and emergency records
  await Promise.all([
    healthModel.createHealth({ memberId, ...health }),
    emergencyModel.createEmergencyContact({ memberId, ...emergency }),
  ]);

  // 🔹 Assign schedules and training types
  await Promise.all([
    scheduleModel.assignMemberSchedules(memberId, scheduleIds),
    trainingModel.assignTrainingTypes(memberId, trainingTypeIds),
  ]);

  return { memberId };
};

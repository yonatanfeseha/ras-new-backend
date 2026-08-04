import * as memberModel from "../models/member.js";
import * as healthModel from "../models/health.js";
import * as emergencyModel from "../models/emergency.js";
import * as scheduleModel from "../models/schedule.js";
import * as trainingModel from "../models/trainingType.js";
import * as coachModel from "../models/coach.js";
import * as userService from "./user.service.js";

// FULL PROFILE
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
    img_url: member.url,
    health,
    emergency,
    schedules,
    trainingTypes,
    coaches,
  };
};

export const getMemberVerification = async (memberId) => {
  const member = await memberModel.getMemberById(memberId);

  if (!member) return null;

  const [schedules, trainingTypes, emergency] = await Promise.all([
    scheduleModel.getMemberSchedules(memberId),
    trainingModel.getMemberTrainingTypes(memberId),
    emergencyModel.getEmergencyContact(memberId),
  ]);

  return {
    name: member.name,
    image: member.url,
    payment_status: member.payment_status,
    ras_id: member.ras_id,
    emergency_name: emergency?.contact_name ?? null,
    emergency_phone: emergency?.phone ?? null,

    training_type: trainingTypes.map((t) => t.t_type),

    schedule: schedules.map((s) => ({
      date: s.date,
      time: s.time,
    })),
  };
};
export const deleteMemberFull = async (memberId) => {
  // check existence
  const member = await memberModel.getMemberById(memberId);
  if (!member) {
    throw new Error("Member not found");
  }

  // delete relations first, then member
  await Promise.all([
    healthModel.deleteHealth(memberId),
    emergencyModel.deleteEmergencyContact(memberId),
    scheduleModel.removeMemberSchedules(memberId),
    trainingModel.removeMemberTrainingTypes(memberId),
    coachModel.removeCoaches(memberId),
  ]);

  await memberModel.deleteMember(memberId);

  return {
    message: "Member deleted successfully",
  };
};
export const registerMemberFull = async (memberData) => {
  const {
    member,
    health,
    emergency,
    scheduleIds = [],
    trainingTypeIds = [],
    coachIds = [],
    password,
  } = memberData;

  // create member first
  const memberId = await memberModel.createMember(member);

  // generate the next sequential ras id (thread-safe via row lock)
  const ras_id = await memberModel.getNextRasId();

  // update ras id
  await memberModel.updateRasId(memberId, ras_id);

  // related data
  await Promise.all([
    healthModel.createHealth(memberId, health),
    emergencyModel.createEmergencyContact(memberId, emergency),
  ]);

  // optional relations
  await Promise.all([
    scheduleModel.assignMemberSchedules(memberId, scheduleIds),
    trainingModel.assignTrainingTypes(memberId, trainingTypeIds),
    coachModel.assignCoaches(memberId, coachIds),
  ]);

  // auth
  await userService.registerUser({
    id: ras_id,
    password: password ?? "123456",
    role: "member",
  });

  return { memberId, ras_id };
};

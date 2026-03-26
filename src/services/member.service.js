import * as memberModel from '../models/member.js';
import * as healthModel from '../models/health.js';
import * as emergencyModel from '../models/emergency.js';
import * as scheduleModel from '../models/schedule.js';
import * as trainingModel from '../models/trainingType.js';
import * as coachModel from '../models/coach.js';

export const getFullMemberProfile = async memberId => {
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

export const registerMember = async data => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. create member
    const member = await memberModel.createMember(data);

    const memberId = member.id;

    // 2. optional inserts
    if (data.health) {
      await healthModel.createHealth(memberId, data.health, connection);
    }

    if (data.emergency) {
      await emergencyModel.createEmergencyContact(
        memberId,
        data.emergency,
        connection
      );
    }

    if (data.scheduleIds) {
      await scheduleModel.assignMemberSchedules(memberId, data.scheduleIds);
    }

    if (data.trainingTypeIds) {
      await trainingModel.assignTrainingTypes(memberId, data.trainingTypeIds);
    }

    if (data.coachIds) {
      await coachModel.assignCoaches(memberId, data.coachIds);
    }

    await connection.commit();

    return { id: memberId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

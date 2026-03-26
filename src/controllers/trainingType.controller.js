import * as trainingModel from '../models/trainingType.js';

// =============================
// 🔹 TRAINING TYPE CRUD
// =============================

// 🔹 Get all training types
export const getTrainingTypes = async (req, res) => {
  try {
    const types = await trainingModel.getAllTrainingTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch training types' });
  }
};

// 🔹 Get single training type
export const getTrainingType = async (req, res) => {
  try {
    const type = await trainingModel.getTrainingTypeById(req.params.id);

    if (!type) {
      return res.status(404).json({ error: 'Training type not found' });
    }

    res.json(type);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving training type' });
  }
};

// 🔹 Create training type
export const createTrainingType = async (req, res) => {
  try {
    const { t_type } = req.body;

    if (!t_type) {
      return res.status(400).json({ error: 'Training type is required' });
    }

    const result = await trainingModel.createTrainingType({ t_type });

    res.status(201).json({
      message: 'Training type created',
      ...result,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create training type' });
  }
};

// 🔹 Update training type
export const updateTrainingType = async (id, data) => {
  const { t_type } = data;

  const [result] = await db.query(
    `UPDATE training_type SET t_type = ? WHERE id = ?`,
    [t_type, id]
  );

  return result.affectedRows;
};

// 🔹 Delete training type
export const deleteTrainingType = async (req, res) => {
  try {
    const affected = await trainingModel.deleteTrainingType(req.params.id);

    if (affected === 0) {
      return res.status(404).json({ error: 'Training type not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
};

// =============================
// MEMBER TRAINING TYPES
// =============================

// 🔹 Get member training types
export const getMemberTrainingTypes = async (req, res) => {
  try {
    const types = await trainingModel.getMemberTrainingTypes(
      req.params.memberId
    );
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch member training types' });
  }
};

// 🔹 Assign training types to member
export const assignTrainingTypes = async (req, res) => {
  try {
    const { memberId, typeIds } = req.body;

    if (!memberId || !typeIds?.length) {
      return res.status(400).json({ error: 'memberId and typeIds required' });
    }

    await trainingModel.assignTrainingTypes(memberId, typeIds);

    res.json({ message: 'Training types assigned to member' });
  } catch (error) {
    res.status(500).json({ error: 'Assignment failed' });
  }
};

// 🔹 Remove training type from member
export const removeTrainingTypeFromMember = async (req, res) => {
  try {
    const { memberId, typeId } = req.body;

    const affected = await trainingModel.removeTrainingType(memberId, typeId);

    if (affected === 0) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json({ message: 'Removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Remove failed' });
  }
};

// =============================
// COACH TRAINING TYPES
// =============================

// 🔹 Get coach training types
export const getCoachTrainingTypes = async (req, res) => {
  try {
    const types = await trainingModel.getCoachTrainingTypes(req.params.coachId);
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coach training types' });
  }
};

// 🔹 Assign training types to coach
export const assignTrainingTypesToCoach = async (req, res) => {
  try {
    const { coachId, typeIds } = req.body;

    if (!coachId || !typeIds?.length) {
      return res.status(400).json({ error: 'coachId and typeIds required' });
    }

    await trainingModel.assignTrainingTypesToCoach(coachId, typeIds);

    res.json({ message: 'Training types assigned to coach' });
  } catch (error) {
    res.status(500).json({ error: 'Assignment failed' });
  }
};

// 🔹 Remove training type from coach
export const removeCoachTrainingType = async (req, res) => {
  try {
    const { coachId, typeId } = req.body;

    const affected = await trainingModel.removeCoachTrainingType(
      coachId,
      typeId
    );

    if (affected === 0) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json({ message: 'Removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Remove failed' });
  }
};

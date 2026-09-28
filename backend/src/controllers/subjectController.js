import { dbService } from "../services/dbService.js";

export const getSubjects = async (req, res, next) => {
  try {
    const subjects = await dbService.getSubjects();
    return res.status(200).json({ subjects });
  } catch (error) {
    next(error);
  }
};

export const getSubjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subject = await dbService.getSubjectById(id);

    if (!subject) {
      return res.status(404).json({
        error: "Not Found",
        message: `Subject with ID '${id}' was not found.`
      });
    }

    return res.status(200).json({ subject });
  } catch (error) {
    next(error);
  }
};

export const getTopicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = await dbService.getTopicById(id);

    if (!topic) {
      return res.status(404).json({
        error: "Not Found",
        message: `Topic with ID '${id}' was not found.`
      });
    }

    return res.status(200).json({ topic });
  } catch (error) {
    next(error);
  }
};

export const completeTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const topic = await dbService.getTopicById(id);
    if (!topic) {
      return res.status(404).json({
        error: "Not Found",
        message: `Topic with ID '${id}' was not found.`
      });
    }

    const updatedProgress = await dbService.recordTopicCompletion(userId, id);

    return res.status(200).json({
      message: `Topic '${topic.title}' marked as completed!`,
      progress: updatedProgress
    });
  } catch (error) {
    next(error);
  }
};

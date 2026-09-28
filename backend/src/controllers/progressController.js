import { dbService } from "../services/dbService.js";

export const getProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const progress = await dbService.getProgress(userId);
    const history = await dbService.getQuizHistory(userId);
    const subjects = await dbService.getSubjects();

    // Compute progress by subject
    const subjectProgress = subjects.map((sub) => {
      // Find full subject to check topics
      const fullSub = dbService.data.subjects.find((s) => s.id === sub.id);
      const totalTopicsInSub = fullSub ? fullSub.topics.length : 0;
      const completedInSub = fullSub
        ? fullSub.topics.filter((t) => progress.completedTopics.includes(t.id)).length
        : 0;

      const completionPercentage = totalTopicsInSub > 0
        ? Math.round((completedInSub / totalTopicsInSub) * 100)
        : 0;

      return {
        id: sub.id,
        title: sub.title,
        icon: sub.icon,
        totalTopics: totalTopicsInSub,
        completedTopics: completedInSub,
        completionPercentage
      };
    });

    return res.status(200).json({
      progress: {
        ...progress,
        quizHistory: history.slice(0, 10), // Most recent 10 attempts
        subjectProgress
      }
    });
  } catch (error) {
    next(error);
  }
};

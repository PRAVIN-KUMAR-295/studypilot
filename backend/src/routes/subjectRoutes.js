import express from "express";
import {
  getSubjects,
  getSubjectById,
  getTopicById,
  completeTopic
} from "../controllers/subjectController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/subjects", getSubjects);
router.get("/subjects/:id", getSubjectById);
router.get("/topics/:id", getTopicById);
router.post("/topics/:id/complete", requireAuth, completeTopic);

export default router;

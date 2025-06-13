import express from "express";
import {
  getAllNotes,
  getSingleNote,
  createNote,
  editNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getSingleNote );
router.post("/", createNote);
router.put("/:id", editNote);
router.delete("/:id", deleteNote);

export default router;

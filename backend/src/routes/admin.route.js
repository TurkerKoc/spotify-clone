import { Router } from "express";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
const router = Router();

//protect all routes below this middleware
router.use(protectRoute, requireAdmin);

//admin routes
router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
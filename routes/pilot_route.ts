import express from "express";

import {setPilot, getPilots, deleteAllPilots} from "../controllers/pilot_controller";

const router = express.Router();

router.get("/", getPilots);
router.delete("/erase", deleteAllPilots);
router.get("/:drone_id", setPilot);


export default router;
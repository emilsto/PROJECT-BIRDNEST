import express from "express";

import {setPilot} from "../controllers/pilot_controller";

const router = express.Router();

router.put("/:drone_id", setPilot);


export default router;
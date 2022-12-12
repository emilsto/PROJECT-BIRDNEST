import express from "express";
import {getDrones, addDrone, deleteDrone, deleteAllDrones, getTrespassingDrones} from "../controllers/drone_controller";

const router = express.Router();

router.get("/", getDrones);
router.get("/trespassers", getTrespassingDrones);
router.post("/", addDrone);
router.delete("/erase", deleteAllDrones);
router.delete("/:id", deleteDrone);



export default router;

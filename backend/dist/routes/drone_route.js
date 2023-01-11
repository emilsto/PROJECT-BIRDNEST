"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drone_controller_1 = require("../controllers/drone_controller");
const router = express_1.default.Router();
router.get("/", drone_controller_1.getDrones);
router.get("/trespassers", drone_controller_1.getTrespassingDrones);
router.post("/", drone_controller_1.addDrone);
router.delete("/erase", drone_controller_1.deleteAllDrones);
router.delete("/:id", drone_controller_1.deleteDrone);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pilot_controller_1 = require("../controllers/pilot_controller");
const router = express_1.default.Router();
router.put("/:drone_id", pilot_controller_1.setPilot);
exports.default = router;

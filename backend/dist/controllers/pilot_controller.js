"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPilot = void 0;
const pilot_model_1 = __importDefault(require("../models/pilot_model"));
const axios_1 = __importDefault(require("../api/axios"));
const setPilot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drone_id = req.params.drone_id;
        const response = yield axios_1.default.get(`/pilots/${drone_id}`);
        //response may be empty, because the pilot is not in the database
        if (response.data === "") {
            const error = new Error("Pilot not found!");
            console.log(error);
            res.send("Error!");
        }
        const data = response.data;
        //check if pilot is already in the database
        const duplicatePilot = yield pilot_model_1.default.findOne({ pilotId: data.pilotId
        });
        if (duplicatePilot) {
            console.log("Pilot " + data.pilotId + " is already in the database!");
            return;
        }
        res.send(data);
    }
    catch (error) {
        console.log(error);
        res.send("Error!");
    }
});
exports.setPilot = setPilot;

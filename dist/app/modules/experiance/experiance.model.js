"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experiance = void 0;
const mongoose_1 = require("mongoose");
const ExperianceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    startdate: {
        type: String,
        required: false,
    },
    enddate: {
        type: String,
        required: false,
    },
    present: {
        type: String,
        required: false,
    },
    company: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.Experiance = (0, mongoose_1.model)('Experiance', ExperianceSchema);

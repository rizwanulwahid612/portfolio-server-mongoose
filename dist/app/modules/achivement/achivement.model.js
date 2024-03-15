"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Achivement = void 0;
const mongoose_1 = require("mongoose");
const AchivementSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    certificate: {
        type: String,
        required: false,
    },
    get: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.Achivement = (0, mongoose_1.model)('Achivement', AchivementSchema);

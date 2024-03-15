"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Framework = void 0;
const mongoose_1 = require("mongoose");
const FrameworkSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.Framework = (0, mongoose_1.model)('Frameworks', FrameworkSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
//import { FrameworkModel, IFramework } from './framework.interface';
const ProjectSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    frontend: {
        type: String,
        required: true,
    },
    backend: {
        type: String,
        required: true,
    },
    title: {
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
    techonology: {
        type: String,
        required: false,
    },
    ownername: {
        type: String,
        required: false,
    },
    gitClient: {
        type: String,
        required: false,
    },
    gitServer: {
        type: String,
        required: false,
    },
    liveproject: {
        type: String,
        required: false,
    },
    liveServer: {
        type: String,
        required: false,
    },
    videoLink: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.Project = (0, mongoose_1.model)('Project', ProjectSchema);

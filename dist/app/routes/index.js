"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const framework_route_1 = require("../modules/framework/framework.route");
const project_route_1 = require("../modules/projects/project.route");
const skills_route_1 = require("../modules/skills/skills.route");
const experiance_route_1 = require("../modules/experiance/experiance.route");
const achivement_route_1 = require("../modules/achivement/achivement.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/framework',
        route: framework_route_1.FrameworksRoutes,
    },
    {
        path: '/project',
        route: project_route_1.ProjectRoutes,
    },
    {
        path: '/skill',
        route: skills_route_1.SkillRoutes,
    },
    {
        path: '/experiance',
        route: experiance_route_1.ExperianceRoutes,
    },
    {
        path: '/achivement',
        route: achivement_route_1.AchivementRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;

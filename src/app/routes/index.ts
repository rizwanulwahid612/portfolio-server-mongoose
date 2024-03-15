import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { FrameworksRoutes } from '../modules/framework/framework.route';
import { ProjectRoutes } from '../modules/projects/project.route';
import { SkillRoutes } from '../modules/skills/skills.route';
import { ExperianceRoutes } from '../modules/experiance/experiance.route';
import { AchivementRoutes } from '../modules/achivement/achivement.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/framework',
    route: FrameworksRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/skill',
    route: SkillRoutes,
  },
  {
    path: '/experiance',
    route: ExperianceRoutes,
  },
  {
    path: '/achivement',
    route: AchivementRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

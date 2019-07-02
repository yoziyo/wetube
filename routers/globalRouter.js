import express from "express";
import routes from "../routes";
import { home, getSearch } from "../controllers/videoController";
import {
  logout,
  postJoin,
  getJoin,
  getLogin,
  postLogin
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, getSearch);
globalRouter.get(routes.logout, logout);

export default globalRouter;

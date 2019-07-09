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
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, getSearch);
globalRouter.get(routes.logout, logout);

export default globalRouter;

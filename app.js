import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser"; // 이후 세션 데이터 저장등 쿠키 에 사용
import bodyParser from "body-parser"; // 넘어온 데이터 처리용
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// 미들웨어 사용
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); // json 타입 지정
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }) // session을 DB에 저장하는걸 셋팅함
  })
);
// 상단 cookie parser 로부터 내려와서, initialize되고, passport가 session에서 스스로 쿠키를 보고 해당 사용자 찾아줌
// 그 데이터가 req로 localsMiddleware로 들어감.
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

// view 엔진으로 pug 설정
// 기본적으로 /views 경로를 사용함
app.set("view engine", "pug");

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

// 라우터 지정
app.use(routes.users, userRouter);
app.use(routes.home, globalRouter);
app.use(routes.videos, videoRouter);

export default app;

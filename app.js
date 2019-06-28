import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser"; // 이후 세션 데이터 저장등 쿠키 에 사용
import bodyParser from "body-parser"; // 넘어온 데이터 처리용
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

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

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser"; // 이후 세션 데이터 저장등 쿠키 에 사용
import bodyParser from "body-parser"; // 넘어온 데이터 처리용
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
const app = express();


app.use(cookieParser());
app.use(bodyParser.json()); // json 타입 지정
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(helmet());
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
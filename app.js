import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser"; // 이후 세션 데이터 저장등 쿠키 에 사용
import bodyParser from "body-parser"; // 넘어온 데이터 처리용
import {
  userRouter
} from "./router";

const app = express();

const PORT = 4000;

const handleHome = (req, res) => res.send("Hello from ass");

const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.json()); // json 타입 지정
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter); // /user에 대한 하위 라우터를 생성

export default app;
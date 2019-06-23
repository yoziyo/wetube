import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now // 함수 명만 넣음으로써 호출 할때 마다 현재 시간을 반환하는 함수를 실행 시키게 됨
  }
});

// Video 모델에 videoSchema를 넣어서 모델을 만듬
const model = mongoose.model("Video", videoSchema);
export default model;

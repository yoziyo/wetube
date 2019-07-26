import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentDeleteList = document.querySelectorAll(
  "#jsCommentList .video__comments-delete"
);

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = (comment, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const spanToDelete = document.createElement("span");

  span.innerHTML = comment;
  li.appendChild(span);
  spanToDelete.setAttribute("class", "video__comments-delete");
  spanToDelete.innerHTML = `<input type="hidden" value="${commentId}">x`;
  li.appendChild(spanToDelete);
  commentList.prepend(li);
  increaseNumber();
  [].forEach.call(
    document.querySelectorAll("#jsCommentList .video__comments-delete"),
    commentDelete => {
      commentDelete.addEventListener("click", deleteComment);
    }
  );
};

const deleteComment = async event => {
  const commentId = event.target.children[0].value;

  const response = await axios({
    url: `/api/${commentId}/comment/delete`,
    method: "POST"
  });

  if (response.status === 200) {
    decreaseNumber();
    event.target.parentElement.remove();
  }
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];

  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment, response.data);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  [].forEach.call(commentDeleteList, commentDelete => {
    commentDelete.addEventListener("click", deleteComment);
  });
}

if (addCommentForm) {
  init();
}

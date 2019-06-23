import routes from "../routes";

export const home = (req, res) =>
  res.render("home", {
    pageTitle: "Home"
  });
export const getSearch = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;

  res.render("search", {
    pageTitle: "Search",
    searchingBy
  });
};
export const getUpload = (req, res) =>
  res.render("upload", {
    pageTitle: "Upload"
  });
export const postUpload = (req, res) => {
  const {
    body: { file, title, description }
  } = req;
  // TODO: Upload And Save Video
  res.redirect(routes.videoDetail(324132));
};
export const videoDetail = (req, res) =>
  res.render("videoDetail", {
    pageTitle: "video detail"
  });
export const editVideo = (req, res) =>
  res.render("editVideo", {
    pageTitle: "video edit"
  });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", {
    pageTitle: "video delete"
  });

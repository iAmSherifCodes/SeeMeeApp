import express from "express";
import handlers from "../handlers/index.js";
const postHandler = handlers.postHandler;

var router = express.Router();

router.post("/post", (req, res) => {
    postHandler.createPost(req, res).then(r => console.log("Error"));
});

router.post("/like", (req, res) => {
    postHandler.likePost(req, res);
});

router.post("/comment", (req, res)=>{
  postHandler.commentPost(req, res);
});

export default router;

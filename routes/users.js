import express from "express";

var router = express.Router({
  mergeParams: true,
});

function UserController(){
  console.log("here");
  router.get('/hi', (req, res, next) => {
    
    console.log("hit");
    res.send('respond with a resource');
  });

  return router;
}

export default UserController;
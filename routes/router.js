const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");

//routes
router.post("/userdb/register", controllers.userpost);
router.get("/userdb/getAlluser", controllers.getUsers);
router.get("/userdb/singleuser/:id", controllers.getSingleUser);
router.delete("/userdb/deleteuser/:id", controllers.deleteuser);
router.put("/userdb/updateuser/:id", controllers.updateUser);

router
.route("/")
.get(controllers.handleGetLogin)
.post(controllers.handleCreateLogin);

router
.route("/login")
.get(controllers.handleGetLogin)
.post(controllers.handleCreateLogin);

router
.route("/home")
.get(controllers.handleGetHome);

router
.route("/signup")
.get(controllers.handleGetSignup)
.post(controllers.handleCreateSignup);



module.exports = router;
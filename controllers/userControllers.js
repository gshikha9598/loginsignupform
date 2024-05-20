const userdb = require("../models/usersSchema");
const moment = require("moment");

//getLogin
exports.handleGetLogin = (req, res) => {
  res.render("login");
};

//getSignup
exports.handleGetSignup = (req, res) => {
  res.render("signup");
};

//getHome
exports.handleGetHome = (req, res) => {
  res.render("home");
};

//createSignup
exports.handleCreateSignup = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All input is required" });
    }
    
    await userdb.insertMany({ email, password });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//createLogin
exports.handleCreateLogin = async (req, res) => {
  try {
    const check = await userdb.findOne({ email: req.body.email });

    if (check.password === req.body.password) {
      return res.redirect("/home");
    } else {
      return res.send("wrong password");
    }
  } catch {
    return res.send("wrong credentials");
  }
};

//create user
exports.userpost = async (req, res) => {
  //console.log(req.body);
  const { firstname, email, password, mobile, gender, status } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All Input Is required" });
  }

  try {
    const preuser = await userdb.findOne({ email: email });
    if (preuser) {
      res
        .status(400)
        .json({ error: "This user already exist in our database" });
    } else {
      const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      const userData = new userdb({
        firstname,
        email,
        password,
        mobile,
        gender,
        status,
        datecreated: dateCreate,
      });

      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//get all users
exports.getUsers = async (req, res) => {
  try {
    const usersData = await userdb.find();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//get single user
exports.getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const singleUserData = await userdb.findOne({ _id: id });
    res.status(200).json(singleUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//delete user
exports.deleteuser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUserData = await userdb.findByIdAndDelete({ _id: id });
    res.status(200).json(deleteUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

//update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, email, password, mobile, gender, status } = req.body;

  try {
    const dateUpdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    const updateUserData = await userdb.findByIdAndUpdate(
      { _id: id },
      {
        firstname,
        email,
        password,
        mobile,
        gender,
        status,
        dateUpdated: dateUpdate,
      },
      { new: true }
    );

    await updateUserData.save();

    res.status(200).json(updateUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

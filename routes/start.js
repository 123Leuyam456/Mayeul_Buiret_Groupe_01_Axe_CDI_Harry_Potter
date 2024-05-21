const express = require ("express");
const UsersController = require("../controllers/UsersController");
const { authenticateToken } = require("../middlewares/Auth")


//USERS

const router = express.Router();

router.get("/users", UsersController.index); //SEE ALL
router.post("/users", UsersController.store);//CREATE
router.get("/users/:id", UsersController.show); //SEE SOMEONE
router.put("/users/:id", UsersController.update); //UPDATE
router.delete("/users/:id", UsersController.delete);  //DELETE


//Authentification

const AuthentificationController = require("../controllers/AuthentificationController");

router.post("/login", AuthentificationController.login);
router.get(
    "/getMyProfile",
    authenticateToken,
    AuthentificationController.getMyProfile
  );
  
  module.exports = router;

module.exports = router;
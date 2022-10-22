const express = require("express");
const reflectionsController = require("../controllers/reflectionsController");
const UsersControllers =  require("../controllers/usersController")
const {body, query} = require("express-validator")
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization")
const router = express.Router();



//register
router.post(
    "/api/v1/users/register",
    body("email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("email is not valid")
    .custom( async (value) => {
        let isExist = await UsersControllers.findUserEmail(value);

        if(isExist) {
            return Promise.reject("email already in use")
        }
    }),
    body("password")
        .notEmpty().withMessage("password is required"),
    UsersControllers.register
);


//login
router.post(
    "/api/v1/users/login",
    body("email")
        .notEmpty().withMessage("email is required"),
    body("password")
        .notEmpty().withMessage("password is required"), 
    UsersControllers.login
);



//endpoint
router.use(authentication);

router.get("/api/v1/reflections", reflectionsController.methodGet);

router.post(
    "/api/v1/reflections",
    body("success").notEmpty().withMessage("success is required"),
    body("low_point").notEmpty().withMessage("low_point is required"),
    body("take_away").notEmpty().withMessage("take_point is required"), 
    reflectionsController.methodPost
);

router.use('/api/v1/reflections/:id', authorization);

router.put(
    "/api/v1/reflections/:id",
    body("success").notEmpty().withMessage("success is required"),
    body("low_point").notEmpty().withMessage("low_point is required"),
    body("take_away").notEmpty().withMessage("take_away is required"), 
    reflectionsController.methodPut
);


router.delete("/api/v1/reflections/:id", reflectionsController.methodDelete);




module.exports = router;
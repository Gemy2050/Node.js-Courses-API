const express = require("express");
const router = express.Router();

const coursesController = require("../controllers/courses");
const { coursesValidation } = require("../middlewares/coursesValidation");
const verifyToken = require("../middlewares/verifyToken");
const roles = require("../utils/roles");
const allowedTo = require("../middlewares/allowedTo");

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    verifyToken,
    allowedTo(roles.MANAGER, roles.ADMIN),
    coursesValidation(),
    coursesController.addCourse
  );

router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(
    verifyToken,
    allowedTo(roles.MANAGER, roles.ADMIN),
    coursesController.updateCourse
  )
  .delete(
    verifyToken,
    allowedTo(roles.MANAGER),
    coursesController.deleteCourse
  );

module.exports = router;

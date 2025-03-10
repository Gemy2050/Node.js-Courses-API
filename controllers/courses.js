const { validationResult } = require("express-validator");

const Course = require("../models/courses.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");

const getAllCourses = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
};

const getCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId, { __v: false });
  if (!course) {
    const error = appError.create("Course Not Found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const addCourse = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: errors.array() });
  }

  const course = await Course.insertOne(req.body);
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { course } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const data = req.body;
  const courseId = req.params.courseId;
  const newCourse = await Course.findByIdAndUpdate(courseId, data, {
    new: true,
  });
  if (!newCourse) {
    const error = appError.create(
      "No Course to update",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: { newCourse } });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.courseId;
  await Course.deleteOne({ _id: courseId });
  res.json({
    status: httpStatusText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};

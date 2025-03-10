const { body } = require("express-validator");

const coursesValidation = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength(2)
      .withMessage("title must be at latest 2 chars"),
    body("price").isNumeric().notEmpty().withMessage("price is required"),
  ];
};

module.exports = {
  coursesValidation,
};

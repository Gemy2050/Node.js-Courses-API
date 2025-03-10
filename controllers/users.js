const User = require("../models/users.model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  // can access fileName from req.file.filename because of multer
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return next(
      appError.create("User already exists", 400, httpStatusText.FAIL)
    );
  }

  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req?.file?.filename,
  });

  await user.save();

  const token = await generateJWT({ id: user._id, email: user.email });

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { user: { ...user.toJSON(), token } },
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(appError.create("User not found", 404, httpStatusText.FAIL));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (user && isPasswordCorrect) {
    const { password: _, ...userData } = user.toJSON();
    const token = await generateJWT({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { user: { ...userData, token } },
    });
  } else {
    return next(
      appError.create("Invalid email or password", 400, httpStatusText.FAIL)
    );
  }
});

module.exports = {
  getAllUsers,
  register,
  login,
};

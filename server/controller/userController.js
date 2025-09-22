const userModel = require('../model/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find();
    res.status(200).json({
      status: 'Success',
      result: user.length,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'Success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

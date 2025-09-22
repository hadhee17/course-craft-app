const moduleModel = require('../model/moduleModel');

exports.getAllModule = async (req, res, next) => {
  try {
    const modules = await moduleModel.find();

    res.status(200).json({
      status: 'success',
      result: modules.length,
      data: {
        modules,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getModuleById = async (req, res, next) => {
  try {
    const modules = await moduleModel
      .findById(req.params.id)
      .populate('lessons');

    res.status(200).json({
      status: 'success',
      result: modules.length,
      data: {
        modules,
      },
    });
  } catch (error) {
    next(error);
  }
};

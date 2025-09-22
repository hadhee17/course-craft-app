const lessonModule = require('../model/lessonsModel');

exports.getLessonById = async (req, res, next) => {
  try {
    const lesson = await lessonModule
      .findById(req.params.id)
      .populate('module');

    res.status(200).json({
      status: 'Success',
      result: lesson.length,
      data: {
        lesson,
      },
    });
  } catch (error) {
    next(error);
  }
};

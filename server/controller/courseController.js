const courseModel = require('../model/courseModel');
const AppFeature = require('../utils/appFeature');
const AppError = require('../utils/appError');
const uploadCloudinary = require('../utils/imageUpload');

exports.aliasData = (req, res, next) => {
  const query = new URLSearchParams(req.query);
  query.set('fields', 'title,description,instructor,price,level,image');

  // Rebuild the URL so Express reparses req.query
  req.url = `${req.path}?${query.toString()}`;

  console.log('aliasData triggered:', req.url); // optional debug
  next();
};

exports.getAllCourse = async (req, res, next) => {
  try {
    const features = new AppFeature(courseModel.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();

    const course = await features.query;

    res.status(200).json({
      status: 'Success',

      data: {
        course,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await courseModel.findById(req.params.id);

    res.status(200).json({
      status: 'Success',

      data: {
        course,
      },
    });
  } catch (error) {
    next(new AppError('could not find course by this ID', 404));
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, instructor, price, level, image } = req.body;
    console.log(req.file, 'image uploaded by multer');
    if (!req.file) return next(new AppError('image not found', 404));

    const cloudinaryRes = await uploadCloudinary(req.file.path);
    console.log(cloudinaryRes, 'image uploaded to cloudinary');

    const newCourse = new courseModel({
      title,
      description,
      instructor,
      price,
      level,
      image: cloudinaryRes,
    });

    let savedCourse = await newCourse.save();

    if (savedCourse)
      return res.status(200).json({
        status: 'success',
        data: {
          savedCourse,
        },
      });
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, instructor, price, level } = req.body;

    let updateData = {
      title,
      description,
      instructor,
      price,
      level,
    };

    // If new image is uploaded, replace the old one in DB
    if (req.file) {
      console.log(req.file, 'new image uploaded by multer');

      const cloudinaryRes = await uploadCloudinary(req.file.path);
      console.log(cloudinaryRes, 'new image uploaded to cloudinary');

      updateData.image = cloudinaryRes; // 🔥 replaces old image field
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updatedCourse) return next(new AppError('Course not found', 404));

    return res.status(200).json({
      status: 'success',
      data: { updatedCourse },
    });
  } catch (error) {
    next(error);
  }
};

exports.getTopRated = async (req, res, next) => {
  try {
    const course = await courseModel.aggregate([
      {
        $match: {
          rating: { $gte: 4.5 },
        },
      },

      {
        $project: {
          _id: 0,
          title: 1,
          rating: 1,
          level: 1,
        },
      },
      {
        $sort: {
          rating: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      result: course.length,
      data: {
        course,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await courseModel.findByIdAndDelete(req.params.id);

    if (!course) {
      return next(new AppError('No Course found with this Id', 404));
    }
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (error) {
    next(`delete course:${error}`);
  }
};

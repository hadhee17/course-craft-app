const cloudinary = require('../config/cloudinaryConfig');

const uploadCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: 'product' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );
  });
};

module.exports = uploadCloudinary;

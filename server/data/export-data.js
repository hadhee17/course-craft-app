// server/data/export-data.js
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/DB');

const CourseModel = require('../model/courseModel');
const ModuleModel = require('../model/moduleModel');
const LessonModel = require('../model/lessonsModel');

const exportDataToDB = async () => {
  try {
    await connectDB();

    // ✅ Delete existing data first
    await CourseModel.deleteMany();
    await ModuleModel.deleteMany();
    await LessonModel.deleteMany();

    // ✅ Load JSON data
    const courseData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'course.json'), 'utf-8'),
    );
    const moduleDataRaw = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'modules.json'), 'utf-8'),
    );
    const lessonDataRaw = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'lessons.json'), 'utf-8'),
    );

    // 1️⃣ Insert courses
    const savedCourses = await CourseModel.insertMany(courseData);

    // 2️⃣ Insert modules with proper course reference
    const moduleData = moduleDataRaw.map((mod) => {
      const matchedCourse = savedCourses.find(
        (c) => c.title === mod.courseTitle,
      );
      if (!matchedCourse)
        throw new Error(`Course not found for module: ${mod.title}`);
      return {
        title: mod.title,
        sequence: mod.sequence,
        course: matchedCourse._id,
      };
    });
    const savedModules = await ModuleModel.insertMany(moduleData);

    // 3️⃣ Link module IDs to corresponding courses
    for (const course of savedCourses) {
      const courseModules = savedModules.filter(
        (m) => m.course.toString() === course._id.toString(),
      );
      course.modules = courseModules.map((m) => m._id);
      await course.save();
    }

    // 4️⃣ Insert lessons with proper module reference
    const lessonData = lessonDataRaw.map((lesson) => {
      const matchedModule = savedModules.find(
        (m) => m.title === lesson.moduleTitle,
      );
      if (!matchedModule)
        throw new Error(`Module not found for lesson: ${lesson.title}`);
      return {
        title: lesson.title,
        content: lesson.content,
        duration: lesson.duration,
        module: matchedModule._id,
      };
    });
    const savedLessons = await LessonModel.insertMany(lessonData);

    // 5️⃣ Link lessons to modules
    for (const module of savedModules) {
      const moduleLessons = savedLessons.filter(
        (l) => l.module.toString() === module._id.toString(),
      );
      module.lessons = moduleLessons.map((l) => l._id);
      await module.save();
    }

    console.log('✅ Data seeded successfully to DB');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

const deleteDataFromDB = async () => {
  try {
    await connectDB();

    await CourseModel.deleteMany();
    await ModuleModel.deleteMany();
    await LessonModel.deleteMany();

    console.log('✅ Data deleted successfully from DB');
    process.exit();
  } catch (error) {
    console.error('❌ Could not delete data:', error);
    process.exit(1);
  }
};

// CLI usage
if (process.argv[2] === '--export') {
  exportDataToDB();
} else if (process.argv[2] === '--delete') {
  deleteDataFromDB();
}

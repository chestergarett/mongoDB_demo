const mongoose = require('mongoose');

//connect to DB
mongoose.connect('mongodb://localhost/mongo-exercises');

//create Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

//add model
const Course = mongoose.model('Course', courseSchema)

//query from Courses
async function getCourses(){
    return await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 })
}

async function run(){
    const courses = await getCourses();
    courses.map(course => console.log(course._doc))
}

run();


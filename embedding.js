const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  const course = await Course.update({ _id: courseId }, { 
    $set: {
      'author.name': 'John Smith'
    }
   });
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse('React Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Chester' }),
// ]);

// updateAuthor('61c16924985ca11aacf57261')

//addAuthor('61c16bb1ab5cbd1be234f2b5', new Author({name: 'Emelou'}) );

removeAuthor('61c16bb1ab5cbd1be234f2b5', '61c16c99ebc90d1c2dfac81e');

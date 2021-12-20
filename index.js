const mongoose = require('mongoose');

//connect to mongoDB
mongoose.connect('mongodb://localhost/playground')
    .then( ()=> console.log('Connected to MongoDB...'))
    .catch( err => console.error('Could not connect to MongoDB..', err))

//create schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

//create model
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['javscript', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

//getting courses - querying from database
async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course

        //starts with
        // .find({ author: /^Mosh/ })

        //ends with
        // .find({ author: /Hamedani$/i })

        //contains Mosh
        // .find({ author: /.*Mosh.*/ })

        //and query
        .find({ author: 'Mosh', isPublished: true })

        //greater than, less than or  equal
        // .find({ price: { $gte: 10, $lte: 20 } })

        //or query
        // .find({ price: { $in: [10, 15, 20] } })

        //logical operator queries
        // .find()
        // .or([ { author: ' Mosh' }, { isPublished: true } ])
        // .and([ { author: ' Mosh' }, { isPublished: true } ])
        
        .skip((pageNumber - 1) * pageSize )
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
        
        //to aggregate values
        // .count();
    console.log(courses);
}

getCourses();

//sql operator shortcuts
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

//logical operators
    //or
    //and

//query first
// async function updateCourse(id){
//     const course = await Course.findById(id);
//     if (!course) return;
    
//     course.set({
//         isPublished: true,
//         author: 'Another Author'
//     })

//     const result = await course.save();
//     console.log(result);
// };

//document update first
async function updateCourse(id){

};

updateCourse('61c02d6e1457bd2b4c077f9e');
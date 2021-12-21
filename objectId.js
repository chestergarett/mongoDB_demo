const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
const isValid = mongoose.Types.ObjectId.isValid('1234');
//to get timestamp in Object_ID
console.log(id.getTimestamp());
console.log(isValid);
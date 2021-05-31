const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PTTK", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    nameCourse: String,
    schedule: String,
    during: String,
    isActive: String
}, {
    collection: "course",
});
const CourseModel = mongoose.model("course", AccountSchema);
module.exports = CourseModel;
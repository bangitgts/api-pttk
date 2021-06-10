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
    amount: String,
    isCheck: String
}, {
    collection: "coursecopy",
});
const CourseCopyModel = mongoose.model("coursecopy", AccountSchema);
module.exports = CourseCopyModel;
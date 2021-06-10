const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PTTK", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    course20: Array,
    course30: Array,
    course40: Array
}, {
    collection: "sortcourse",
});
const sortCourseModel = mongoose.model("sortcourse", AccountSchema);
module.exports = sortCourseModel;
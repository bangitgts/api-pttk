const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PTTK", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    nameStudent: String,
    dateBirth: String,
    phoneNumber: String,
    userName: String,
    passWord: String,
    khoaHoc: String
}, {
    collection: "student",
});
const AccountModel = mongoose.model("student", AccountSchema);
module.exports = AccountModel;
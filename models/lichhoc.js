const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PTTK", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const lichHoc = new Schema({
    nameRoom: String,
    thuChan: String,
    thuLe: String,
    capacity: String,
}, {
    collection: "lichhoc",
});
const lichhocModel = mongoose.model("lichhoc", lichHoc);
module.exports = lichhocModel;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PTTK", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const testSchema = new Schema({
    so: String
}, {
    collection: "test",
});
const testModel = mongoose.model("test", testSchema);
module.exports = testModel;
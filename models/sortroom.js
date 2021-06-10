const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PTTK", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    room20: Array,
    room30: Array,
    room40: Array
}, {
    collection: "sortroom",
});
const sortRoomModel = mongoose.model("sortroom", AccountSchema);
module.exports = sortRoomModel;
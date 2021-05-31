const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PTTK", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    nameRoom: String,
    capacity: String,
}, {
    collection: "room",
});
const RoomModel = mongoose.model("room", AccountSchema);
module.exports = RoomModel;
const express = require("express");
const app = express();
const port = 3500;
var morgan = require("morgan");
const bodyParser = require("body-parser");
const AccountModel = require("./models/student");
const CourseModel = require("./models/course");
const RoomModel = require("./models/room");

var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const checkToken = require("./auth/checkToken");
var cors = require("cors");
app.use(cookieParser());
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/add-student", (req, res, next) => {
    AccountModel.find({})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

app.get("/add-course", (req, res, next) => {
    CourseModel.find({})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

app.put("/change-dadangki", (req, res, next) => {
    var nameCourse = req.body.nameCourse;
    var daDangki = req.body.daDangki;
    CourseModel.update({
            nameCourse: nameCourse
        }, {
            daDangki: daDangki
        })
        .then((data) => res.json(data))
        .catch((err) => console.log(err))
});

app.get("/add-room", (req, res, next) => {
    RoomModel.find({})
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

app.post("/add-room", (req, res, next) => {
    var nameRoom = req.body.nameRoom;
    var capacity = req.body.capacity;
    RoomModel.findOne({ nameRoom: nameRoom })
        .then((data) => {
            if (data) {
                res.json("Phòng này đã tồn tại");
            } else {
                RoomModel.create({
                    nameRoom: nameRoom,
                    capacity: capacity,
                });
            }
        })
        .then((data) => res.json("Tạo Phòng Thành Công"))
        .catch((err) => res.status(500).json("Thất bại "));
});

app.post("/add-course", (req, res, next) => {
    var nameCourse = req.body.nameCourse;
    var schedule = req.body.schedule;
    var during = req.body.during;
    var amount = amount;
    CourseModel.findOne({ nameCourse: nameCourse })
        .then((data) => {
            if (data) {
                res.json("Khóa học này đã tồn tại");
            } else {
                CourseModel.create({
                    nameCourse: nameCourse,
                    schedule: schedule,
                    during: during,
                    amount: amount,
                });
            }
        })
        .then((data) => res.json("Tạo Khóa học thành công"))
        .catch((err) => res.status(500).json("Thất bại "));
});

app.post("/add-student", (req, res, next) => {
    var nameStudent = req.body.nameStudent;
    var dateBirth = req.body.dateBirth;
    var phoneNumber = req.body.phoneNumber;
    var userName = req.body.userName;
    var passWord = req.body.passWord;
    var khoaHoc = req.body.khoaHoc;
    AccountModel.findOne({ userName: userName })
        .then((data) => {
            if (data) {
                res.json("Học Viên Này Đã Tồn Tại");
            } else {
                AccountModel.create({
                    nameStudent: nameStudent,
                    dateBirth: dateBirth,
                    phoneNumber: phoneNumber,
                    userName: userName,
                    passWord: passWord,
                    khoaHoc: khoaHoc,
                });
            }
        })
        .then((data) => res.json("Tạo Tài Khoản Thành Công"))
        .catch((err) => res.status(500).json("Thất bại "));
});

app.post("/register", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    AccountModel.findOne({ username: username })
        .then((data) => {
            if (data) {
                res.json("User này đã tồn tại");
            } else {
                AccountModel.create({
                    username: username,
                    password: password,
                });
            }
        })
        .then((data) => res.json("Tạo Tài Khoản Thành Công"))
        .catch((err) => res.status(500).json("Thất bại "));
});
app.post("/login", (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    AccountModel.findOne({
            username: username,
            password: password,
        })
        .then((data) => {
            if (data) {
                let token = jwt.sign({
                        _id: data._id,
                    },
                    "password"
                );
                res.header("auth-token", token).send(token);
                res.json({
                    message: "Logged  successfully",
                    token: token,
                });
            } else {
                return res.json("Tai khoan hoac mat khau sai");
            }
        })
        .catch((err) => res.status(500).json("Có lỗi sever"));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
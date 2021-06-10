const express = require("express");
const app = express();
const port = 3500;

var morgan = require("morgan");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const AccountModel = require("./models/student");
const CourseModel = require("./models/course");
const CourseCopyModel = require("./models/coursecopy");
const sortCourseModel = require("./models/sortcourse");
const RoomModel = require("./models/room");
const lichhocModel = require("./models/lichhoc");
const testModel = require("./models/test");
const sortRoomModel = require("./models/sortroom");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const checkToken = require("./auth/checkToken");
var cors = require("cors");
app.use(cookieParser());
const Bluebird = require("bluebird");
const { json } = require("body-parser");
fetch.Promise = Bluebird;
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
            nameCourse: nameCourse,
        }, {
            daDangki: daDangki,
        })
        .then((data) => res.json(data))
        .catch((err) => console.log(err));
});

app.get("/add-room", (req, res, next) => {
    RoomModel.find({})
        .then((data) => {
            let room20 = [];
            let room30 = [];
            let room40 = [];
            for (let item of data) {
                if (item.capacity === "1") {
                    room20.push({
                        nameRoom: item.nameRoom,
                        capacity: item.capacity,
                        thuchan: [],
                        thule: [],
                        fulltuan: [],
                    });
                }
                if (item.capacity === "2") {
                    room30.push({
                        nameRoom: item.nameRoom,
                        capacity: item.capacity,
                        thuchan: [],
                        thule: [],
                        fulltuan: [],
                    });
                }
                if (item.capacity === "3") {
                    room40.push({
                        nameRoom: item.nameRoom,
                        capacity: item.capacity,
                        thuchan: [],
                        thule: [],
                        fulltuan: [],
                    });
                }
            }

            var MongoClient = require("mongodb").MongoClient;
            var url = "mongodb://127.0.0.1:27017/";

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("PTTK");
                var myquery = { room: "room" };
                var newvalues = {
                    $set: { room20: room20, room30: room30, room40: room40 },
                };
                dbo
                    .collection("sortroom")
                    .updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                        db.close();
                    });
            });

            console.log(room20);
            res.json(data);
        })
        .catch((err) => res.json(err));
});

app.put("/testaddroom", (req, res, next) => {
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("PTTK");
        var myquery = { room: "room1" };
        var newvalues = { $set: { room: "room" } };
        dbo
            .collection("sortroom")
            .updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });
    });

    res.json("thanh cong");
    //sortRoomModel.find({}).then((data) => res.json(data));
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

                var MongoClient = require("mongodb").MongoClient;
                var url = "mongodb://127.0.0.1:27017/";
                if (capacity === "1") {
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("PTTK");
                        var myquery = { room: "room" };
                        var newvalues = {
                            $push: {
                                room20: {
                                    nameRoom: nameRoom,
                                    capacity: capacity,
                                    thuchan: [],
                                    thule: [],
                                    fulltuan: [],
                                },
                            },
                        };

                        dbo
                            .collection("sortroom")
                            .updateOne(myquery, newvalues, function(err, res) {
                                if (err) throw err;
                                console.log("1 document updated");
                                db.close();
                            });
                    });
                }

                if (capacity === "2") {
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("PTTK");
                        var myquery = { room: "room" };
                        var newvalues = {
                            $push: {
                                room30: {
                                    nameRoom: nameRoom,
                                    capacity: capacity,
                                    thuchan: [],
                                    thule: [],
                                    fulltuan: [],
                                },
                            },
                        };

                        dbo
                            .collection("sortroom")
                            .updateOne(myquery, newvalues, function(err, res) {
                                if (err) throw err;
                                console.log("1 document updated");
                                db.close();
                            });
                    });
                }

                if (capacity === "3") {
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("PTTK");
                        var myquery = { room: "room" };
                        var newvalues = {
                            $push: {
                                room40: {
                                    nameRoom: nameRoom,
                                    capacity: capacity,
                                    thuchan: [],
                                    thule: [],
                                    fulltuan: [],
                                },
                            },
                        };
                        dbo
                            .collection("sortroom")
                            .updateOne(myquery, newvalues, function(err, res) {
                                if (err) throw err;
                                console.log("1 document updated");
                                db.close();
                            });
                    });
                }
            }
        })
        .then((data) => res.json("Tạo Phòng Thành Công"))
        .catch((err) => res.status(500).json("Thất bại "));
});

app.post("/add-course", (req, res, next) => {
    var nameCourse = req.body.nameCourse;
    var schedule = req.body.schedule;
    var during = req.body.during;
    var amount = req.body.amount;
    var isCheck = req.body.isCheck;
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
                    isCheck: isCheck, // 0 la chua khai giaang
                });

                CourseCopyModel.create({
                    nameCourse: nameCourse,
                    schedule: schedule,
                    during: during,
                    amount: amount,
                    isCheck: isCheck,
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

// app.post("/register", (req, res, next) => {
//     var username = req.body.username;
//     var password = req.body.password;
//     AccountModel.findOne({ username: username })
//         .then((data) => {
//             if (data) {
//                 res.json("User này đã tồn tại");
//             } else {
//                 AccountModel.create({
//                     username: username,
//                     password: password,
//                 });
//             }
//         })
//         .then((data) => res.json("Tạo Tài Khoản Thành Công"))
//         .catch((err) => res.status(500).json("Thất bại "));
// });

// app.post("/getDuLieu", (req, res, next) => {
//     var temp;
//     CourseModel.find({ schedule: "3-5-7" }).then((data) => {
//         for (let item of data) {
//             console.log(item.nameCourse);
//             const change = { nameCourse: item.nameCourse, amount: item.amount };
//             for (let item of data) {
//                 lichhocModel
//                     .findOne({ thuLe: "" })
//                     .then((data) => {
//                         lichhocModel
//                             .updateOne({ nameRoom: data.nameRoom }, {
//                                 $set: { thuLe: item.nameCourse },
//                             })
//                             .then((data) => console.log("thanh cong"));
//                     })
//                     .catch((err) => console.log(" thatbai"));
//             }
//         }
//     });
// });

// app.post("/login", (req, res, next) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     AccountModel.findOne({
//             username: username,
//             password: password,
//         })
//         .then((data) => {
//             if (data) {
//                 let token = jwt.sign({
//                         _id: data._id,
//                     },
//                     "password"
//                 );
//                 res.header("auth-token", token).send(token);
//                 res.json({
//                     message: "Logged  successfully",
//                     token: token,
//                 });
//             } else {
//                 return res.json("Tai khoan hoac mat khau sai");
//             }
//         })
//         .catch((err) => res.status(500).json("Có lỗi sever"));
// });

app.get("/gettest", (req, res, next) => {
    function bubbleSort(array) {
        var size = array.length;
        for (var i = 0; i < size - 1; i++) {
            for (var j = 0; j < size - i - 1; j++) {
                if (array[j].during > array[j + 1].during) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
                if (
                    array[j].during === array[j + 1].during &&
                    array[j].amount > array[j + 1].amount
                ) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }

    CourseCopyModel.find({}).then((data) => {
        let cousre20 = [];
        let cousre30 = [];
        let cousre40 = [];
        var MongoClient = require("mongodb").MongoClient;
        var url = "mongodb://127.0.0.1:27017/";
        for (let item of data) {
            if (parseInt(item.amount) <= 20) {
                cousre20.push(item);
            }
            if (parseInt(item.amount) <= 30 && parseInt(item.amount) > 20) {
                cousre30.push(item);
            }
            if (parseInt(item.amount) <= 40 && parseInt(item.amount) > 30) {
                cousre40.push(item);
            }
        }
        bubbleSort(cousre20);
        bubbleSort(cousre30);
        bubbleSort(cousre40);

        for (let item of cousre30) {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("PTTK");
                var myquery = { course: "course" };
                var newvalues = {
                    $push: {
                        course30: item,
                    },
                };
                dbo
                    .collection("sortcourse")
                    .updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                        db.close();
                    });
            });
        }
        for (let item of cousre20) {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("PTTK");
                var myquery = { course: "course" };
                var newvalues = {
                    $push: {
                        course20: item,
                    },
                };
                dbo
                    .collection("sortcourse")
                    .updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                        db.close();
                    });
            });
        }

        for (let item of cousre40) {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("PTTK");
                var myquery = { course: "course" };
                var newvalues = {
                    $push: {
                        course40: item,
                    },
                };
                dbo
                    .collection("sortcourse")
                    .updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                        db.close();
                    });
            });
        }

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var myquery = {};
            var dbo = db.db("PTTK");
            dbo.collection("coursecopy").remove(myquery, function(err, obj) {
                if (err) throw err;
                console.log(obj.result.n + " document(s) deleted");
                db.close();
            });
        });
        res.json("thanh cong");
    });
});
app.get("/khoahoc", (req, res, next) => {
    sortCourseModel.find({}).then((data) => res.json(data));
});

app.get("/roomhoc", (req, res, next) => {
    function xeplop(room, course) {
        let temp = [];
        for (let item of course) {
            if (item.schedule === "full") {
                const found = room.find(
                    (element) =>
                    element.fulltuan.length === 0 &&
                    element.thuchan.length === 0 &&
                    element.thule.length === 0
                );
                found.fulltuan.push(item);
                temp.push(found);
            }
        }
        for (let item of course) {
            try {
                if (item.schedule === "thuchan") {
                    const found = room.find(
                        (element) =>
                        element.thuchan.length === 0 && element.fulltuan.length === 0
                    );
                    found.thuchan.push(item);
                    temp.push(found);
                }
                if (item.schedule === "thule") {
                    const found = room.find(
                        (element) =>
                        element.thule.length === 0 && element.fulltuan.length === 0
                    );
                    found.thule.push(item);
                    temp.push(found);
                }
            } catch (error) {
                console.log("da tran phong");
            }
        }
        return temp;
    }

    sortRoomModel.find({}).then((data) => {
        let room20 = [];
        let room30 = [];
        let room40 = [];

        for (let item of data) {
            room20 = item.room20;
            room30 = item.room30;
            room40 = item.room40;
        }
        console.log(room20);
        sortCourseModel.find({}).then((data) => {
            let course20 = [];
            let course30 = [];
            let course40 = [];
            for (let item of data) {
                course20 = item.course20;
                course30 = item.course30;
                course40 = item.course40;
            }

            const c = xeplop(room20, course20);

            // var temp = [];
            // for (let item of room20) {

            //     if (item.fulltuan.length > 0) {
            //         let sum = item.fulltuan.reduce(function(accumulator, currentValue) {
            //             return accumulator + parseInt(currentValue.during)
            //         }, 0)
            //         const abc = {
            //             nameRoom: item.nameRoom,
            //             tong: sum
            //         }
            //         temp.push(abc);
            //     }
            // }

            res.json(c);
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
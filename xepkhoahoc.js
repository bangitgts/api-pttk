const course = [{
        nameCourse: "name1",
        sohocvien: "39",
        trongthoigian: 14,
        lichhoc: "thule",
    },
    {
        nameCourse: "name2",
        sohocvien: "18",
        trongthoigian: 14,
        lichhoc: "thuchan",
    },
    {
        nameCourse: "name2",
        sohocvien: "19",
        trongthoigian: 21,
        lichhoc: "thuchan",
    },
    {
        nameCourse: "name3",
        sohocvien: "16",
        trongthoigian: 14,
        lichhoc: "full",
    },
    {
        nameCourse: "name4",
        sohocvien: "29",
        trongthoigian: 14,
        lichhoc: "le",
    },
    {
        nameCourse: "name6",
        sohocvien: "27",
        trongthoigian: 14,
        lichhoc: "full",
    },
];
let course20 = [];
let course30 = [];
let course40 = [];

for (let item of course) {
    if (parseInt(item.sohocvien) <= 20) {
        course20.push(item);
    }
    if (parseInt(item.sohocvien) <= 30 && parseInt(item.sohocvien) > 20) {
        course30.push(item);
    }
    if (parseInt(item.sohocvien) <= 40 && parseInt(item.sohocvien) > 30) {
        course40.push(item);
    }
}

function bubbleSort(array) {
    var size = array.length;
    for (var i = 0; i < size - 1; i++) {
        for (var j = 0; j < size - i - 1; j++) {
            if (array[j].trongthoigian > array[j + 1].trongthoigian) {
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
            if (array[j].trongthoigian === array[j + 1].trongthoigian && array[j].sohocvien > array[j + 1].sohocvien) {
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

bubbleSort(course20);
console.log(course20);

// can 1 sourse tong khoa hoc,
// day la du lieu fetch
// buubleSort tao them 1 collection
// se co nhieu phong 
// vi du: 5 p 20
// 4 p 30
// y tuong for(room)
// if(room.thu246.length ===0)
// push vao lun room nay
// if(room.thu246.lenth>=1)
// sosanhtiep toi thu roi moi push
// trong room lop vi dung lop = [a01,a02,a03]
// a01 14 ngay, a02 21, a03 14 => tong bang 14+21+14 xong lay tong nay de so sanh so nhat push thich hop
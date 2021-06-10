let item = [{
        nameRoom: "A04",
        capacity: "1",
        thuchan: [],
        thule: [],
        fulltuan: [{
            _id: "60bea4874f45723e746edede",
            nameCourse: "A04",
            schedule: "full",
            during: "14",
            amount: "17",
            isCheck: "0",
        }]
    },
    {
        nameRoom: "A00",
        capacity: "1",
        thuchan: [],
        thule: [],
        fulltuan: [{
            _id: "60bea4684f45723e746ededc",
            nameCourse: "A02",
            schedule: "full",
            during: "14",
            amount: "19",
            isCheck: "0",
        }]
    },
    {
        nameRoom: "A01",
        capacity: "1",
        thuchan: [{
            _id: "60bea4784f45723e746ededd",
            nameCourse: "A03",
            schedule: "thuchan",
            during: "21",
            amount: "16",
            isCheck: "0",
        }],
        thule: [{
            _id: "60bea4574f45723e746ededb",
            nameCourse: "A01",
            schedule: "thule",
            during: "14",
            amount: "19",
            isCheck: "0",
        }]
    }

]

let ngay = new Date("2021-10-06");
console.log(ngay);

function addDays(numDays) {
    ngay.setDate(ngay.getDate() + numDays);
    return ngay;
}

let temp = [];
for (let a of item) {

    if (a.fulltuan !== undefined) {
        for (let test of a.fulltuan) {
            for (let i = 1; i <= test.during; i++) {
                console.log(ngay);
                let data = {
                    title: `${a.nameRoom} lophoc: ${test.nameCourse}`,
                    date: new Date(`2021-6-${i+13}`)
                }
                temp.push(data);
            }
        }
    };
}
console.log(temp);
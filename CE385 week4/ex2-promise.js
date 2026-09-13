const students = [
    {
        id: "65001",
        name: "สมชาย ใจดี",
        major: "Computer Science",
        score: 85
    },
    {
        id: "65002",
        name: "สมหญิง รักเรียน",
        major: "Information Technology",
        score: 92
    },
    {
        id: "65003",
        name: "สมใจ มั่งมี",
        major: "Software Engineering",
        score: 78
    },
    {
        id: "65004",
        name: "ณิชาพัชร พูลสุข",
        major: "Digital Technology",
        score: 88
    }
];


function toGrade(score) {
    if (score >= 80) {
        return "A";
    } else if (score >= 70) {
        return "B";
    } else if (score >= 60) {
        return "C";
    } else if (score >= 50) {
        return "D";
    } else {
        return "F";
    }
}

function fetchStudentByIdAsync(id) {

    return new Promise((resolve, reject) => {

        // ตรวจสอบ id
        if (typeof id !== "string" || id.trim() === "") {
            reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
            return;
        }

        // จำลองการดึงข้อมูล 300ms
        setTimeout(() => {

            const student = students.find(
                (student) => student.id === id
            );

            // ไม่พบข้อมูล
            if (!student) {
                reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
                return;
            }

            // พบข้อมูล
            resolve({ ...student });

        }, 300);
    });
}


// กรณีที่ 1 : พบข้อมูล
fetchStudentByIdAsync("65001")
    .then((student) => {
        console.log("กรณีที่ 1 พบข้อมูล:", student);
    })
    .catch((error) => {
        console.log("กรณีที่ 1 Error:", error.message);
    })
    .finally(() => {
        console.log("กรณีที่ 1 ทำงานเสร็จ");
    });


// กรณีที่ 2 : ไม่พบข้อมูล
fetchStudentByIdAsync("99999")
    .then((student) => {
        console.log("กรณีที่ 2 พบข้อมูล:", student);
    })
    .catch((error) => {
        console.log("กรณีที่ 2 Error:", error.message);
    })
    .finally(() => {
        console.log("กรณีที่ 2 ทำงานเสร็จ");
    });


// กรณีที่ 3 : id ผิดรูปแบบ
fetchStudentByIdAsync(42)
    .then((student) => {
        console.log("กรณีที่ 3 พบข้อมูล:", student);
    })
    .catch((error) => {
        console.log("กรณีที่ 3 Error:", error.message);
    })
    .finally(() => {
        console.log("กรณีที่ 3 ทำงานเสร็จ");
    });

fetchStudentByIdAsync("65001")
    .then((student) => {

      
        return {
            name: student.name,
            grade: toGrade(student.score)
        };

    })
    .then((data) => {

        return `นักศึกษา ${data.name} ได้เกรด ${data.grade}`;

    })
    .then((report) => {

        console.log(report);

    })
    .catch((error) => {

        console.log("เกิดข้อผิดพลาด:", error.message);

    })
    .finally(() => {

        console.log("จบการทำงานของ Promise");

    });


function promisify(fn) {

    return function (...args) {

        return new Promise((resolve, reject) => {

            fn(...args, (error, result) => {

                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            });

        });
    };
}


function fetchStudentById(id, callback) {

    if (typeof id !== "string" || id.trim() === "") {
        callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
        return;
    }

    setTimeout(() => {

        const student = students.find(
            (student) => student.id === id
        );

        if (!student) {
            callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
            return;
        }

        callback(null, { ...student });

    }, 300);
}

const fetchStudentPromise = promisify(fetchStudentById);


fetchStudentPromise("65001")
    .then((student) => {
        console.log("Promisify:", student);
    })
    .catch((error) => {
        console.log("Promisify Error:", error.message);
    });
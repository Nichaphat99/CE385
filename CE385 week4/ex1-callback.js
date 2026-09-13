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


function fetchStudentById(id, callback) {

    // ตรวจสอบว่า id เป็น string และไม่เป็นค่าว่าง
    if (typeof id !== "string" || id.trim() === "") {
        callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
        return;
    }

    setTimeout(() => {

        const student = students.find(
            (student) => student.id === id
        );

        // กรณีค้นหาไม่พบ
        if (!student) {
            callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
            return;
        }

        callback(null, { ...student });

    }, 300);
}


// กรณีที่ 1 : รหัสนักศึกษาที่มีอยู่จริง
fetchStudentById("65001", (error, student) => {

    if (error) {
        console.log("กรณีที่ 1 เกิดข้อผิดพลาด:", error.message);
        return;
    }

    console.log("กรณีที่ 1 พบข้อมูลนักศึกษา:");
    console.log(student);
});


// กรณีที่ 2 : รหัสนักศึกษาที่ไม่มีอยู่
fetchStudentById("99999", (error, student) => {

    if (error) {
        console.log("กรณีที่ 2 เกิดข้อผิดพลาด:", error.message);
        return;
    }

    console.log("กรณีที่ 2 พบข้อมูลนักศึกษา:");
    console.log(student);
});


// กรณีที่ 3 : รหัสผิดรูปแบบ
fetchStudentById(42, (error, student) => {

    if (error) {
        console.log("กรณีที่ 3 เกิดข้อผิดพลาด:", error.message);
        return;
    }

    console.log("กรณีที่ 3 พบข้อมูลนักศึกษา:");
    console.log(student);
});

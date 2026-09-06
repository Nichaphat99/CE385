
const students = [
    {
        id: "1001",
        name: "สมชาย ใจดี",
        major: "CE",
        score: 75,
        contact: {
            email: "somchai@gmail.com",
            phone: "0812345678"
        }
    },
    {
        id: "1002",
        name: "สมหญิง รักเรียน",
        major: "IT",
        score: 85,
        contact: {
            email: "somying@gmail.com",
            phone: "0823456789"
        }
    },
    {
        id: "1003",
        name: "วิชัย เก่งมาก",
        major: "CE",
        score: 48,
        contact: {
            email: "wichai@gmail.com",
            phone: "0834567890"
        }
    },
    {
        id: "1004",
        name: "มานี ขยันเรียน",
        major: "IT",
        score: 65,
        contact: {
            email: "manee@gmail.com",
            phone: "0845678901"
        }
    },
    {
        id: "1005",
        name: "ปิติ ตั้งใจ",
        major: "CE",
        score: 52,
        contact: {
            email: "piti@gmail.com",
            phone: "0856789012"
        }
    },
    {
        id: "1006",
        name: "สุดา เรียนดี",
        major: "IT",
        score: 90,
        contact: {
            email: "suda@gmail.com",
            phone: "0867890123"
        }
    }
];


// ==========================================
// ส่วนที่ 2 — เขียนฟังก์ชันค้นหาและเพิ่มข้อมูล
// ==========================================

// 1. ค้นหานักศึกษาจาก id
const findById = (students, id) => {
    return students.find(s => s.id === id);
};


// 2. ค้นหา array ของนักศึกษาในสาขานั้น
const findByMajor = (students, major) => {
    return students.filter(s => s.major === major);
};


// 3. ตรวจสอบว่ามีนักศึกษาที่สอบตกหรือไม่
// คะแนนต่ำกว่า 50 ถือว่าสอบตก
const hasFailingStudent = (students) => {
    return students.some(s => s.score < 50);
};


// 4. ดึงอีเมลของนักศึกษา
// ใช้ ?. และ ??
const getEmail = (students, id) => {
    const student = findById(students, id);

    return student?.contact?.email ?? "ไม่พบข้อมูลอีเมล";
};


// ==========================================
// ส่วนที่ 3 — ทดสอบกรณีที่หาไม่เจอ
// ==========================================

// ค้นหา id ที่ไม่มีอยู่
console.log("findById 9999:");
console.log(findById(students, "9999"));


// หา email ของ id ที่ไม่มีอยู่
console.log("getEmail 9999:");
console.log(getEmail(students, "9999"));


// ==========================================
// เพิ่มนักศึกษาใหม่ โดยใช้ Spread
// ห้ามแก้ array ต้นฉบับ
// ==========================================

const newStudent = {
    id: "1007",
    name: "กิตติ ตั้งใจเรียน",
    major: "IT",
    score: 78
};

// ใช้ Spread เพื่อสร้าง array ใหม่
const updatedStudents = [
    ...students,
    {
        ...newStudent,
        contact: {
            email: "kitti@gmail.com",
            phone: "0871234567"
        }
    }
];


// ==========================================
// ทดสอบฟังก์ชันทั้งหมด
// ==========================================

console.log("\n===== ผลการทดสอบ =====");


// findById
console.log("ค้นหา ID 1001:");
console.log(findById(updatedStudents, "1001"));


// findByMajor
console.log("\nนักศึกษาสาขา CE:");
console.log(findByMajor(updatedStudents, "CE"));


// hasFailingStudent
console.log("\nมีนักศึกษาสอบตกหรือไม่:");
console.log(hasFailingStudent(updatedStudents));


// getEmail
console.log("\nEmail ของ ID 1002:");
console.log(getEmail(updatedStudents, "1002"));


// getEmail กรณีหาไม่เจอ
console.log("\nEmail ของ ID 9999:");
console.log(getEmail(updatedStudents, "9999"));


// แสดงข้อมูลหลังเพิ่มนักศึกษา
console.log("\nข้อมูลนักศึกษาหลังเพิ่ม:");
console.log(updatedStudents);
// ข้อมูลนักศึกษา
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
// 1. แสดงชื่อของนักศึกษาทุกคน
// ใช้ map
// ==========================================

const getNames = (students) => {
    return students.map(student => student.name);
};


// ==========================================
// 2. แสดงนักศึกษาที่สอบผ่าน
// คะแนน >= 50
// ใช้ filter
// ==========================================

const getPassedStudents = (students) => {
    return students.filter(student => student.score >= 50);
};


// ==========================================
// 3. หาคะแนนรวมของนักศึกษาทั้งหมด
// ใช้ reduce
// ==========================================

const getTotalScore = (students) => {
    return students.reduce((total, student) => {
        return total + student.score;
    }, 0);
};


// ==========================================
// 4. หาคะแนนเฉลี่ย
// ถ้าไม่มีข้อมูล ให้คืนค่า 0
// ==========================================

const getAverageScore = (students) => {

    if (students.length === 0) {
        return 0;
    }

    return getTotalScore(students) / students.length;
};


// ==========================================
// 5. นับจำนวนคนแยกตามเกรด
// ใช้ reduce
// ==========================================

const countByGrade = (students) => {

    return students.reduce((result, student) => {

        let grade;

        if (student.score >= 80) {
            grade = "A";
        } else if (student.score >= 70) {
            grade = "B";
        } else if (student.score >= 60) {
            grade = "C";
        } else if (student.score >= 50) {
            grade = "D";
        } else {
            grade = "F";
        }

        result[grade] = (result[grade] || 0) + 1;

        return result;

    }, {});
};


// ==========================================
// 6. หานักศึกษาที่คะแนนสูงสุด
// ใช้ reduce
// ==========================================

const getTopStudent = (students) => {

    if (students.length === 0) {
        return undefined;
    }

    return students.reduce((top, student) => {

        if (student.score > top.score) {
            return student;
        }

        return top;

    });
};


// ==========================================
// ส่วนที่ 2
// CE → ผ่าน → เอาคะแนน → หาค่าเฉลี่ย
// filter → map → reduce
// ==========================================

const cePassedStudents = students
    .filter(student => student.major === "CE")
    .filter(student => student.score >= 50);

const cePassedScores = cePassedStudents
    .map(student => student.score);

const ceAverage = cePassedScores.length === 0
    ? 0
    : cePassedScores.reduce((total, score) => {
        return total + score;
    }, 0) / cePassedScores.length;


// ==========================================
// ส่วนที่ 3
// ทดสอบกรณี Array ว่าง
// ==========================================

const emptyStudents = [];

console.log("===== ทดสอบ Array ว่าง =====");

console.log("Average:");
console.log(getAverageScore(emptyStudents));

console.log("Top Student:");
console.log(getTopStudent(emptyStudents));


// ==========================================
// ทดสอบฟังก์ชันทั้งหมด
// ==========================================

console.log("\n===== ผลการทดสอบ =====");

console.log("1. ชื่อนักศึกษาทั้งหมด:");
console.log(getNames(students));


console.log("\n2. นักศึกษาที่สอบผ่าน:");
console.log(getPassedStudents(students));


console.log("\n3. คะแนนรวม:");
console.log(getTotalScore(students));


console.log("\n4. คะแนนเฉลี่ย:");
console.log(getAverageScore(students));


console.log("\n5. จำนวนคนแยกตามเกรด:");
console.log(countByGrade(students));


console.log("\n6. นักศึกษาที่ได้คะแนนสูงสุด:");
console.log(getTopStudent(students));


console.log("\n7. คะแนนเฉลี่ยของนักศึกษา CE ที่สอบผ่าน:");
console.log(ceAverage);
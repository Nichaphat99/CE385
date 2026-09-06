// ตรวจสอบว่าคะแนนอยู่ในช่วง 0 - 100 หรือไม่
const isValidScore = (score) => {
    return typeof score === "number" && score >= 0 && score <= 100;
};


// แปลงคะแนนเป็นเกรด
const toGrade = (score) => {
    const grades = [
        { min: 80, grade: "A" },
        { min: 75, grade: "B+" },
        { min: 70, grade: "B" },
        { min: 65, grade: "C+" },
        { min: 60, grade: "C" },
        { min: 55, grade: "D+" },
        { min: 50, grade: "D" },
        { min: 0, grade: "F" }
    ];

    if (!isValidScore(score)) {
        return "Invalid";
    }

    const result = grades.find(item => score >= item.min);
    return result.grade;
};


// คำนวณคะแนน Workshop
const calculateWorkshopScore = (raw, full = 60, weight = 20) => {
    if (!isValidScore(raw) || !isValidScore(full) || full === 0) {
        return 0;
    }

    return (raw / full) * weight;
};


// คำนวณคะแนนรวม
const calculateTotal = (workshop, attendance, project, midterm, final) => {
    return workshop + attendance + project + midterm + final;
};

//แสดงผล
console.log(isValidScore(80));

console.log(toGrade(80));

console.log(calculateWorkshopScore(48));

console.log(calculateWorkshopScore(48, 60, 20));

console.log(calculateWorkshopScore(48, undefined, 25));

console.log(calculateTotal(16, 10, 18, 20, 25));
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
        name: "กิตติพงษ์ มีสุข",
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

        // ตรวจสอบรูปแบบ ID
        if (typeof id !== "string" || id.trim() === "") {
            reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
            return;
        }

        // จำลองการดึงข้อมูล 300ms
        setTimeout(() => {

            const student = students.find(
                (student) => student.id === id
            );

            // ถ้าไม่พบ
            if (!student) {
                reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
                return;
            }

            // ถ้าพบ
            resolve({ ...student });

        }, 300);
    });
}

async function reportSequential() {

    const ids = ["65001", "65002", "65003"];

    // เริ่มจับเวลา
    const start = Date.now();

    console.log("===== Sequential =====");

    // ใช้ for...of เพื่อดึงข้อมูลทีละคน
    for (const id of ids) {

        const student = await fetchStudentByIdAsync(id);

        console.log(
            `${student.name} - เกรด ${toGrade(student.score)}`
        );
    }

    // เวลาที่ใช้ทั้งหมด
    const elapsed = Date.now() - start;

    console.log(`Sequential ใช้เวลา ${elapsed} ms`);
}

async function reportParallel() {

    const ids = ["65001", "65002", "65003"];

    // เริ่มจับเวลา
    const start = Date.now();

    console.log("===== Parallel =====");

    // map สร้าง Promise ทั้ง 3 ตัว
    const promises = ids.map(
        (id) => fetchStudentByIdAsync(id)
    );

    // รอ Promise ทั้งหมดพร้อมกัน
    const studentsResult = await Promise.all(promises);

    studentsResult.forEach((student) => {

        console.log(
            `${student.name} - เกรด ${toGrade(student.score)}`
        );
    });

    // เวลาที่ใช้ทั้งหมด
    const elapsed = Date.now() - start;

    console.log(`Parallel ใช้เวลา ${elapsed} ms`);
}

async function saveReport(id) {

    try {

        // รอผลจาก Promise
        const student = await fetchStudentByIdAsync(id);

        // ถ้าพบข้อมูล
        console.log(
            `พบข้อมูล: ${student.name} (เกรด ${toGrade(student.score)})`
        );

    } catch (error) {

        // ถ้าเกิด Error
        console.log(
            `ตรวจไม่พบ: ${error.message}`
        );

    } finally {

        // ทำงานทุกกรณี
        console.log(
            `--- จบการตรวจสอบ ${id} ---`
        );
    }
}

async function main() {

    // ทดสอบข้อ 1
    await reportSequential();

    console.log("");

    // ทดสอบข้อ 2
    await reportParallel();

    console.log("");

    // ทดสอบ saveReport อย่างน้อย 2 ID
    await saveReport("65001");

    console.log("");

    await saveReport("99999");
}

main();
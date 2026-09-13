const wait = (ms, value, willFail = false) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (willFail) {
                reject(new Error(`${value} ล้มเหลว`));
            } else {
                resolve(value);
            }

        }, ms);
    });
};

async function scenario1() {

    try {

        const results = await Promise.all([
            wait(300, "โปรไฟล์"),
            wait(400, "ตารางเรียน"),
            wait(500, "ประกาศ")
        ]);

        console.log("สถานการณ์ที่ 1 สำเร็จ:");
        console.log(results);

    } catch (error) {

        console.log("สถานการณ์ที่ 1 Error:", error.message);

    }
}


async function scenario2() {

    const results = await Promise.allSettled([
        wait(300, "Email สำเร็จ"),
        wait(500, "SMS", true),
        wait(400, "App สำเร็จ")
    ]);

    console.log("สถานการณ์ที่ 2 ผลลัพธ์ทุกช่อง:");
    console.log(results);
}


async function scenario3() {

    try {

        const result = await Promise.any([
            wait(300, "mirror-A", true),
            wait(600, "mirror-B")
        ]);

        console.log("สถานการณ์ที่ 3 ได้ข้อมูลจาก:");
        console.log(result);

    } catch (error) {

        console.log("สถานการณ์ที่ 3 Error:", error.message);

    }
}

async function scenario4() {

    try {

        const result = await Promise.race([
            wait(1200, "ผลจากฐานข้อมูล"),
            wait(800, "หมดเวลา")
        ]);

        console.log("สถานการณ์ที่ 4 ผลลัพธ์:");
        console.log(result);

    } catch (error) {

        console.log("สถานการณ์ที่ 4 Error:", error.message);

    }
}

async function main() {

    console.log("========== WORKSHOP 3 ข้อที่ 4 ==========");

    console.log("\n--- สถานการณ์ที่ 1 ---");
    await scenario1();

    console.log("\n--- สถานการณ์ที่ 2 ---");
    await scenario2();

    console.log("\n--- สถานการณ์ที่ 3 ---");
    await scenario3();

    console.log("\n--- สถานการณ์ที่ 4 ---");
    await scenario4();

    console.log("\n========== จบการทำงาน ==========");
}


// เริ่มโปรแกรม
main();
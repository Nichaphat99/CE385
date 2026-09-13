1. เปลี่ยนจาก Callback เป็น Promise
    fetchStudentById(id, callback)
คือส่ง callback เข้าไป แล้วตอนทำงานเสร็จก็เรียก
    callback(error, student)
แต่ข้อ 2 ไม่ต้องรับ callback แล้ว เปลี่ยนเป็น
    function fetchStudentByIdAsync(id) {

    return new Promise((resolve, reject) => {
        // ...
    });
    }

2. resolve กับ reject คืออะไร
Promise มี 2 ทางหลัก ๆ
    resolve() = ทำสำเร็จ
    reject() = เกิดข้อผิดพลาด
ดังนั้นถ้าหารหัสนักศึกษาเจอ
    resolve({ ...student });
หมายถึง "ค้นหาสำเร็จ นี่คือข้อมูลนักศึกษา"
แต่ถ้าไม่เจอ
    reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
หมายถึง "ค้นหาไม่สำเร็จ เพราะไม่พบข้อมูล"

3. ทำไมต้องใช้ return
เช่น
    if (!student) {
    reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
    return;
    }
เพราะเมื่อเกิด Error เราต้องการ หยุดการทำงานตรงนั้นเลย ไม่ให้โค้ดด้านล่างทำต่อ
เช่นเดียวกับตอนตรวจ id
    if (typeof id !== "string" || id.trim() === "") {
    reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
    return;
    }

4. .then() / .catch() / .finally()
หลังจากฟังก์ชันคืน Promise เราสามารถใช้ 3 ตัวนี้จัดการผลลัพธ์ได้
ถ้าสำเร็จ → .then()
    fetchStudentByIdAsync("65001")
    .then((student) => {
        console.log(student);
    });
ถ้า resolve(student) ทำงาน ข้อมูลจะเข้ามาที่ student


ถ้าเกิด Error → .catch()
ถ้า reject(error) ทำงาน จะกระโดดมาที่ .catch()
ดังนั้น resolve() → .then()
     reject()  → .catch()

.finally() คือทำงานทุกกรณี
ไม่ว่าจะ เจอข้อมูล, ไม่เจอข้อมูล, ID ผิด
    .finally() ก็จะทำงาน
จึงเหมาะกับคำว่า "จบการทำงาน"
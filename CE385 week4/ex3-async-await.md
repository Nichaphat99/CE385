1. async และ await
จากข้อ 2 เรามีฟังก์ชัน
    fetchStudentByIdAsync(id)
ซึ่งคืนค่าเป็น Promise
ในข้อนี้เราจะใช้
    async function ...
เพื่อให้สามารถใช้ await ได้
เช่น
    async function test() {
    const student = await fetchStudentByIdAsync("65001");

    console.log(student);
    }
await มีความหมายง่าย ๆ ว่า
รอให้ Promise ทำงานเสร็จก่อน แล้วค่อยเอาผลลัพธ์มาใช้

2. ส่วนที่ 1 — reportSequential()
โจทย์ให้ดึงนักศึกษา 3 คน ทีละคน
ตรงที่สำคัญที่สุดคือ
    for (const id of ids) {
        const student = await fetchStudentByIdAsync(id);
    }
เพราะมี await อยู่ใน for
มันจึงทำแบบนี้:
    65001 - รอ 300ms - เสร็จ - 65002 - รอ 300ms - เสร็จ - 65003 - รอ 300ms - เสร็จ
ดังนั้นเวลารวมประมาณ
300 + 300 + 300 = 900 ms
นี่เรียกว่า Sequential หรือการทำงาน ตามลำดับ

3. Date.now() 
เอาไว้เก็บเวลาตอนเริ่มต้น หลังจากทำงานเสร็จ
    const elapsed = Date.now() - start;
ก็คือเอา เวลาตอนจบ - เวลาตอนเริ่ม
เพื่อดูว่าโปรแกรมใช้เวลาทั้งหมดกี่มิลลิวินาที

4. ส่วนที่ 2 — reportParallel()
ส่วนนี้ต่างจากข้อแรก เพราะโจทย์ต้องการให้ดึงนักศึกษา พร้อมกัน
    const promises = ids.map(
    (id) => fetchStudentByIdAsync(id)
    );
map() จะสร้าง Promise ของนักศึกษาทั้ง 3 คน
ประมาณนี้
    65001 → Promise
    65002 → Promise
    65003 → Promise
แล้วใช้ await Promise.all(promises);
เพื่อ รอให้ Promise ทั้งหมดเสร็จ

5. ทำไม Parallel ถึงเร็วกว่า
เพราะทั้ง 3 คนเริ่มทำงาน พร้อมกัน

65001 ─────────→ 300ms
65002 ─────────→ 300ms
65003 ─────────→ 300ms

ไม่ได้รอคนแรกเสร็จก่อนถึงจะเริ่มคนที่สอง
ดังนั้นเวลารวมประมาณ ≈ 300ms ไม่ใช่ 900ms

6. ส่วนที่ 3 — saveReport()
โจทย์ให้สร้างฟังก์ชัน
    async function saveReport(id)
และกำหนดว่าต้องใช้
    try-catch-finally
try คือ
คือ ลองทำคำสั่งนี้
ถ้ารหัสถูกและพบข้อมูล ก็ทำงานตามปกติ
catch คือ
ถ้า Promise เกิด catch จะรับ Error มา
เช่นเรียก
    await saveReport("99999");
ถ้าไม่มีรหัสนี้ จะได้ ตรวจไม่พบ: ไม่พบรหัสนักศึกษา 99999
ที่สำคัญคือ โปรแกรมไม่ Crash

7. finally คือ
finally จะทำงาน ไม่ว่าจะสำเร็จหรือเกิด Error
เช่นรหัสมีอยู่:

    พบข้อมูล: สมชาย ใจดี
    --- จบการตรวจสอบ 65001 ---

รหัสไม่มี:
    ตรวจไม่พบ: ไม่พบรหัสนักศึกษา 99999
    --- จบการตรวจสอบ 99999 ---

try     = ลองทำ
catch   = ถ้า Error ให้จัดการ
finally = จบแล้วทำอันนี้เสมอ

8. "ลืม await" หน้า Promise.all() คือ
ถ้าเราเขียน
    const studentsResult = Promise.all(promises);
แทน
    const studentsResult = await Promise.all(promises);
จะเกิดอะไรขึ้น 

ถ้า ไม่ใส่ await
    const studentsResult = Promise.all(promises);
ตัวแปร studentsResult จะยังเป็น Promise
ไม่ใช่ข้อมูลนักศึกษา

ดังนั้นถ้าเอาไป
    studentsResult.forEach(...)
จะทำไม่ได้ เพราะมันยังไม่ใช่ Array ของนักศึกษา

แต่ถ้าเขียน
    const studentsResult = await Promise.all(promises);
โปรแกรมจะรอให้ทุก Promise เสร็จ แล้วจึงได้ Array ข้อมูลนักศึกษาออกมา

9. คำถามเรื่อง async
async ทำให้ฟังก์ชันนั้นสามารถใช้ await ได้ และฟังก์ชัน async จะคืนค่าเป็น Promise

10. ทำไม try-catch จับ await
ถ้าเราเขียน
    try {
        const student = await fetchStudentByIdAsync(id);
    }
    catch (error) {
        console.log(error);
    }
ถ้า Promise ทำ
    reject(error)
await จะส่ง Error ออกมา ทำให้ catch สามารถรับได้
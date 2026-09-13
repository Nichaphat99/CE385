1. Promise.all() — ต้องสำเร็จทุกตัว
สถานการณ์ที่ 1 คือโหลดข้อมูล 3 อย่าง
    โปรไฟล์     300ms
    ตารางเรียน  400ms
    ประกาศ      500ms
โจทย์ต้องการว่า ทั้ง 3 อย่างต้องสำเร็จ
จึงใช้
    const results = await Promise.all([
        wait(300, "โปรไฟล์"),
        wait(400, "ตารางเรียน"),
        wait(500, "ประกาศ")
    ]);
Promise.all() จะรอทุก Promise ถ้าทุกตัวสำเร็จ → ได้ข้อมูลทั้งหมด
แต่ถ้ามีตัวใดตัวหนึ่ง Error → ถือว่าชุดนี้ไม่สำเร็จ และจะเข้า catch

2. Promise.allSettled() — ขอรู้ผลทุกตัว
สถานการณ์ที่ 2 เป็นการส่งแจ้งเตือน 3 ช่อง
    Email → สำเร็จ
    SMS   → ล้มเหลว
    App   → สำเร็จ
เราไม่ได้ต้องการให้ SMS ล้มเหลวแล้วทำให้ผลของ Email และ App หายไป
จึงใช้
    const results = await Promise.allSettled([
        wait(300, "Email สำเร็จ"),
        wait(500, "SMS", true),
        wait(400, "App สำเร็จ")
    ]);
ตัว true ใน wait(500, "SMS", true)
หมายถึงให้ Promise นี้ ล้มเหลว
allSettled() จะไม่หยุดเมื่อเจอ Error แต่จะรอจน ทุกตัวทำงานเสร็จ

3. Promise.any() — ขอแค่มีตัวหนึ่งสำเร็จ
สถานการณ์ที่ 3 เป็น Mirror Server
    Mirror A → 300ms → ล้มเหลว 
    Mirror B → 600ms → สำเร็จ 
โจทย์ไม่ได้สนใจว่า A ล้มเหลวหรือไม่ ขอแค่ มี Server ตัวหนึ่งที่ให้ข้อมูลได้
จึงใช้
    const result = await Promise.any([
        wait(300, "mirror-A", true),
        wait(600, "mirror-B")
    ]);
ถึง A จะล้มเหลว แต่ B สำเร็จ
ดังนั้นผลคือ mirror-B

4. Promise.race() — ใครเสร็จก่อนชนะ
สถานการณ์ที่ 4 คือ
    ฐานข้อมูล → 1200ms
    Timeout    → 800ms
ผู้ใช้รอได้แค่ 800ms
จึงใช้
    const result = await Promise.race([
        wait(1200, "ผลจากฐานข้อมูล"),
        wait(800, "หมดเวลา")
    ]);
race() จะดูว่า ใครเสร็จก่อน
ดังนั้นผลคือ หมดเวลา
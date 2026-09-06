//สร้างข้อมูลนักศึกษา
เช่น
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
    // ...
];

เป็นการสร้างตัวแปร students ซึ่งเป็น Array ของ Object โดยเก็บข้อมูลนักศึกษาแต่ละคนเอาไว้ และในแต่ละ Object จะมี id, name, major, score และ contact ซึ่ง contact จะเป็น Object ที่เก็บ email กับ phone อีกทีหนึ่ง



//ค้นหานักศึกษาจาก ID
const findById = (students, id) => {
    return students.find(s => s.id === id);
};

ฟังก์ชัน findById ใช้สำหรับ ค้นหานักศึกษาจากรหัส ID โดยใช้ .find() ซึ่งจะคืนข้อมูลนักศึกษาคนแรกที่ตรงกับเงื่อนไขออกมา ถ้าหาไม่เจอ .find() จะคืนค่าเป็น undefined
เช่น findById(students, "1001");



//ค้นหานักศึกษาตามสาขา
const findByMajor = (students, major) => {
    return students.filter(s => s.major === major);
};

ฟังก์ชัน findByMajor ใช้สำหรับ ค้นหานักศึกษาที่อยู่ในสาขาที่กำหนด โดยใช้ .filter() เพราะเราต้องการข้อมูลนักศึกษาที่ตรงเงื่อนไขทั้งหมด ไม่ใช่แค่คนเดียว
เช่น findByMajor(students, "CE");



//ตรวจสอบว่ามีนักศึกษาสอบตกหรือไม่
const hasFailingStudent = (students) => {
    return students.some(s => s.score < 50);
};

ฟังก์ชัน hasFailingStudent ใช้สำหรับ ตรวจสอบว่ามีนักศึกษาที่ได้คะแนนต่ำกว่า 50 อย่างน้อยหนึ่งคนหรือไม่ โดยใช้ .some() ซึ่งจะคืนค่าเป็น true ถ้ามีคนที่ตรงเงื่อนไข และจะคืน false ถ้าไม่มี
เงื่อนไข : s.score < 50 หมายถึงคะแนนต้องน้อยกว่า 50 จึงถือว่าสอบตก



//ดึง Email
const getEmail = (students, id) => {
    const student = findById(students, id);

    return student?.contact?.email ?? "ไม่พบข้อมูลอีเมล";
};

ฟังก์ชัน getEmail ใช้สำหรับ ค้นหา Email ของนักศึกษาจาก ID โดยจะเรียก findById() เพื่อหานักศึกษาก่อน แล้วจึงเข้าถึงข้อมูล contact และ email



//การใช้ ?.
ตรงนี้ใช้ Optional Chaining ?. เพื่อป้องกันไม่ให้โปรแกรมเกิด Error ในกรณีที่ค้นหานักศึกษาไม่เจอ หรือข้อมูล contact ไม่มีอยู่ เช่น ถ้า student เป็น undefined โปรแกรมจะไม่พยายามเข้าไปหา contact ต่อ แต่จะได้ค่า undefined แทน



//การใช้ ??
ตรงนี้ใช้ Nullish Coalescing ?? เพื่อกำหนดข้อความสำรอง โดยถ้าด้านซ้ายไม่มีค่า เช่นเป็น undefined ก็จะแสดงข้อความ "ไม่พบข้อมูลอีเมล" แทน

ดังนั้นถ้าหา ID ไม่เจอ เช่น getEmail(students, "9999");
โปรแกรมจะไม่ Error และจะแสดง ไม่พบข้อมูลอีเมล



//ทดสอบกรณีค้นหา ID ที่ไม่มี
ส่วนนี้ใช้สำหรับ ทดสอบกรณีที่ค้นหา ID ที่ไม่มีอยู่ในข้อมูล โดยกำหนด "9999" ซึ่งไม่มีใน Array ดังนั้น findById() จะคืนค่า undefined ออกมา



//ทดสอบ Email ของ ID ที่ไม่มี
ส่วนนี้เป็นการทดสอบ getEmail() ในกรณีที่ไม่พบ ID "9999" ซึ่งจะเห็นว่าโปรแกรม ไม่เกิด Error เพราะมีการใช้ ?. และ ?? และจะแสดงข้อความว่า ไม่พบข้อมูลอีเมล



//สร้างนักศึกษาใหม่
ส่วนนี้เป็นการสร้าง Object ของนักศึกษาใหม่ โดยกำหนดข้อมูล id, name, major และ score เอาไว้ก่อน



//เพิ่มข้อมูลโดยใช้ Spread
ส่วนนี้เป็นการสร้าง Array ใหม่ชื่อ updatedStudents โดยใช้ Spread Operator ...students เพื่อคัดลอกข้อมูลนักศึกษาทั้งหมดจาก Array เดิม แล้วจึงเพิ่มนักศึกษาใหม่เข้าไป
ที่ต้องใช้ Spread เพราะโจทย์กำหนดว่า ห้ามใช้ push() กับ Array ต้นฉบับ และต้องสร้าง Array ใหม่แทน



//...newStudent ทำอะไร
...newStudent คือการนำข้อมูลทั้งหมดจาก Object newStudent มาใส่ใน Object ใหม่ แล้วเพิ่ม contact เข้าไปอีกที ทำให้เราไม่ต้องเขียน id, name, major, score ซ้ำทั้งหมด
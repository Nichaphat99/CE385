import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("สวัสดี Express!");
});

app.listen(3000, () => {
  console.log("เซิร์ฟเวอร์ทำงานที่ http://localhost:3000");
});

const TOOOS = [
    { id: "1", title: "อ่านสไลด์สัปดาห์ที่ 5", done: true, priorty: "high"},
    { id: "2", title: "ติดตั้ง Express", done: true, proiorty: "high"},
    { id: "3", title: "ทำ Workshop 4", done: false, priorty: "normal"},
    { id: "4", title: "เตรียมสอบกลางภาค", done: false, priorty: "low"},
];

const PRIORITIES = ["high", "normal", "low"];
function validateTodo(req, res ,next) {
    const { title, priorty } = req.body ?? {};

    if (typeof title !== "string" || title.trim() === "") {
        return res.status (400).json ({error: "ต้องมี title เป็นข้อความ"});
    }
    if (priorty !== undefined && !PRIORITIES.includes(priorty)) {
        return res.status(400).json({error: "priorty ไม่ถูกต้อง"});
    }
    return next();
}

const todoRouter = express.Router();
todoRouter.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

todoRouter.get("/", (req, res) => {
    res.json(TOOOS.map((t) => ({ ...t })));
});

todoRouter.get("/:id", (req, res) => {
    const todo = TOOOS.find((t) => t.id === req.params.id);
    if (!todo) {
        return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
    }
    return res.json(todo);
});

todoRouter.post("/todos", validateTodo, (req,res) => {
    const created = {
        id: String(TOOOS.length + 1),
        title: req.body.title,
        done: false,
        priorty: req.body.priorty ?? "normal",
    };
    TOOOS.push(created);
    res.status(201).json({...created});
});

app.use("/api/v1/todos", todoRouter);

app.listen(3000, () => {
  console.log("เซิร์ฟเวอร์ทำงานที่ http://localhost:3000");
});
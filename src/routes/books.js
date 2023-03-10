import { Router } from "express";
const router = Router();



router.get("/", async (req, res) => {
    const db = req.app.db;
    db.books.find({})
    res.render("books");
});



module.exports = router;
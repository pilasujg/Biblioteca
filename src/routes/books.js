import { Router } from "express";
const router = Router();



router.get("/add", async (req, res) => {
    res.render("books/add");
});

router.post("/add", async (req, res) => {
    const { title, author, isbn } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please write a title" });
    }
    if (!author) {
        errors.push({ text: "Please write a author" });
    }
    if (!isbn) {
        errors.push({ text: "Please write a isbn" });
    }
    if (errors.length > 0) {
        res.render("books/add", {
            errors,
            title,
            author,
            isbn,
        });
    } else {
        const newBook = new Book({ title, author, isbn });
        await newBook.save();
        req.flash("success_msg", "Book Added Successfully");
        res.redirect("/books");
    }
});


module.exports = router;
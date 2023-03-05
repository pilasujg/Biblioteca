const booksCtrl = {};
import Book from "../models/Book.js";

booksCtrl.renderFormAdd = (req, res) => {
    res.render("/add")
};

booksCtrl.renderCreateBook = async (req, res) => {
  try {
      const book = Book (req.body)
      await book.save();
      //req.flash("success_msg", "¡Añadido correctamente!");
      res.redirect("/listado");

  }catch (error) {
      console.log(error);
  }
};
      //list books

 booksCtrl.renderListado = async (req, res) => {
    const libro = await Book.find().lean()
    res.render("listado", {libro})
  };
  
      // edit book

  booksCtrl.renderEditBook = async (req,res) => {
    const libro = await Book.findById(req.params.id);
    res.render("books/edit-form", {libro});
  };

  booksCtrl.renderUpdateBook =  async (req, res) => {
   const {libro} = await Book.findByIdAndUpdate(req.params.id, {libro})
    res.redirect("listado");
  };

  
booksCtrl.deleteBook = async (req, res) => {
  const libro = await Book.findByIdAndDelete(req.body.id);
  res.redirect("/listado")
}


module.exports = booksCtrl;
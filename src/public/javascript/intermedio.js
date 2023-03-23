


// para guardar un libro

import { config } from "dotenv";


    $(document).on('click', '#editarBook', function (e) {
        let trama = $('#trama').val();
        let opinion = $('#opinion').val();
        let titulo = $('#titulo').val();
        let autor = $('#autor').val();
        let genero = $('#genero').val();
        let imagen = $('#imagen').val();
        let id = $('#id').val();

        console.log("voy a editar miBIOGRAPHIA " + autor + " ************ " + trama)
    });

 $(document).ready(function () {
        let item, title, author, genre, image, id;
        let outputlist = document.getElementById('results');
        let bookUrl =  "https://www.googleapis.com/books/v1/volumes?q=";
        let placehlr = "https://via.placeholder.com/150";
        let searchData;
        let api = process.env.GOOGLE_API_KEY;

     $(document).on('click', '#search-button', function (e) {

           
           searchData = $('#search-input').val();
            
            if(searchData === "" || searchData === null) {
                    console.log("Please enter a search term");
            } else {
                $.ajax({
                method: 'GET' ,
                    url: bookUrl + searchData + '&key=' + api,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                   
                    if(data.totalItems === 0) {
                        console.log("No results found");
                    }
                    else {

                        displayResults(data);
                    }
                }
                
            });
        }
                 $('search-input').val('')
     });
       

                     function displayResults(data) {
                        let outputlist = document.getElementById('results');
                        for (let i = 0; i < data.items.length; i++) {
                            item = data.items[i];
                            title = item.volumeInfo.title;
                            author = item.volumeInfo.authors;
                            genre = item.volumeInfo.categories;
                            if(item.volumeInfo.industryIdentifiers === undefined) {
                                bookIsbn = "No ISBN";
                            } else {

                            bookIsbn = item.volumeInfo.industryIdentifiers[0].identifier;
                            }
                            if(item.volumeInfo.imageLinks === undefined) {
                                image = placehlr;
                            }  else{

                            image = item.volumeInfo.imageLinks.smallThumbnail;
                        }

                            id = item.accessInfo.id;

                            outputlist.innerHTML += `
                            
                                 <div class="card col-3 mx-2 h-20 my-2">
                                    <div class="well text-center">
                                    <div class="card-header">
                                        <img src="${image}" class="card-img-top img-fluid" style="border-radius: 20px;height:150px;min-width:150px;">
                                    </div>
                                    <div class="card-body overflow-auto" style="border-radius: 20px;height:250px;min-width:150px;">
                                    
                                        <h5 id="title">${title}</h5>
                                        <p>${author}</p>
                                        <p>${genre}</p>

                                        <a onclick="bookSelected('${id}')" id="button" class="btn btn-primary" href="">Book Details</a>
                                        </div>
                                    </div>

                                    </div>
                                
                            `;
                        }
                    }
                    bookSelected(id);

                    getBook();

                    function bookSelected(id) {
                        sessionStorage.setItem('bookId', id);
                        window.location = 'book.html';
                        return false;

                    }
                        
                    
                    function getBook() {
                        let bookId = sessionStorage.getItem('bookId');
                        $.ajax({
                            url: `https://www.googleapis.com/books/v1/volumes/${bookId}`,
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                let book = data;
                             let output = `
                                    <div class="row">
                                        <div class="col-md-4">
                                            <img src="${book.volumeInfo.imageLinks.thumbnail}" class="thumbnail">
                                        </div>
                                        <div class="col-md-8">
                                            <h2>${book.volumeInfo.title}</h2>
                                            <ul class="list-group">
                                                <li class="list-group-item"><strong>Author:</strong> ${book.volumeInfo.authors}</li>
                                                <li class="list-group-item"><strong>Genre:</strong> ${book.volumeInfo.categories}</li>
                                                <li class="list-group-item"><strong>ISBN:</strong> ${book.volumeInfo.industryIdentifiers[0].identifier}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="well">
                                            <h3>Synopsis</h3>
                                            ${book.volumeInfo.description}
                                            <hr>
                                            <a href="https://www.google.com/books/edition/${book.volumeInfo.title}/${book.volumeInfo.industryIdentifiers[0].identifier}" target="_blank" class="btn btn-primary">View Book</a>
                                            <a href="index.html" class="btn btn-default">Go Back To Search</a>
                                        </div>
                                    </div>
                                `;
                                $('#book').html(output);
                            }
                        });
                    }
                });
             
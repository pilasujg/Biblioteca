

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
    let api = "AIzaSyDrdJQPeKcHwdeaOhT2PuyR36su8OX5Gg8";

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
                                    <img src="${image}" class="card-img-top img-fluid" id="photo" style="border-radius: 20px;height:150px;min-width:150px;">
                                </div>
                                <div class="card-body overflow-auto" style="border-radius: 20px;height:250px;min-width:150px;">
                                
                                    <h5 id="title">${title}</h5>
                                    <p id="author">${author}</p>
                                    <p id="genre">${genre}</p>
                                    <p id="id">${id}</p>
                                    <p id="trama">${bookIsbn}</p>
                                    <div class="card-footer">
                                    <a onclick="bookSelec('${id}')" id="button" class="btn btn-primary" href="">Book Details</a>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            
                        `;
                    }
                }
            });
//I want to send the data to the server to save it in the database
//I have tried to do it with the function book but it does not work

          
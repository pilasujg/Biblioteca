      
      $(document).on('click', '#guardarBook', function (e) {
        let trama = $('#trama').val();
        let opinion = $('#opinion').val();
        let titulo = $('#titulo').val();
        let autor = $('#autor').val();
        let genero = $('#genero').val();
        let imagen = $('#imagen').val();

        

        console.log("voy a añadir miBIOGRAPHIA " + autor + " ************ " + trama)

        $.ajax({
                method: 'POST',
                url: '/saveBook',
                data: {
                    trama: trama,
                    opinion: opinion,
                    titulo: titulo,
                    autor: autor,
                    genero: genero,
                    imagen: imagen
                }
            })
            .done(function (msg) {
                showNotification(msg.message, 'success', true);
                
            })
            .fail(function (msg) {
                showNotification(msg.responseJSON.message, 'danger');
            });

    });


    $(document).on('click', '#editarBook', function (e) {
        
        let id = $(this).attr('data-id')
        console.log("voy a añadir miBIOGRAPHIA " + id + " ************ " + trama)

     //show in modal the book on clicked this is the way to do it
        

        



 
        $.ajax({
                method: 'GET',
                url: '/books/view/:id',
                data: {
                    trama: trama,
                    opinion: opinion,
                    titulo: titulo,
                    autor: autor,
                    genero: genero,
                    imagen: imagen,
                    id: id
                }   
            })

             console.log("voy a añadir miBIOGRAPHIA " + id + " ************ " + trama)
     });

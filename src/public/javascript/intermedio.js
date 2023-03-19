// para guardar un libro


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


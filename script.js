$(document).ready(function() {

  chiamaAPITodoList();

  // quando clicco sul tasto Aggiungi parte chiamata API che con metodo POST aggiunge quello che l utente ha scritto nel campo input
  $('.bottone').click(function() {
    var notaScrittaDaUtente = $('.input').val();
    if (notaScrittaDaUtente.length > 1) {
      $.ajax({
        url: 'http://157.230.17.132:3001/todos/',
        method: 'POST',
        data: {
          text: notaScrittaDaUtente
        },
        success: function() {
          chiamaAPITodoList();
          $('.input').val(''); // resetto il campo input
        },
        error: function() {
          alert('errore server');
        }
      })
    }
  })

  // // quando premo Invio parte chiamata API che con metodo POST aggiunge quello che l utente ha scritto nel campo input
  $('.input').keypress(function(event) {
    if (event.which === 13 ) { // dove 13 è il codice numerico attribuito al tasto Invio
      var notaScrittaDaUtente = $('.input').val();
      if (notaScrittaDaUtente.length > 1) {
        $.ajax({
          url: 'http://157.230.17.132:3001/todos/',
          method: 'POST',
          data: {
            text: notaScrittaDaUtente
          },
          success: function() {
            chiamaAPITodoList();
            $('.input').val(''); // resetto il campo input
          },
          error: function() {
            alert('errore server');
          }
        })
      }
    }
  })

  // funzione che cancella il singolo oggetto dalla mia API quando clicco sul bottone Cancellami
  $(document).on('click', '.cancella',
    function() {
      var questoId = $(this).parent().attr('data-id'); // prendo il valore Id dall attributo html
      $.ajax({
        url: 'http://157.230.17.132:3001/todos/' + questoId,
        method: "DELETE",
        success: function() {
          chiamaAPITodoList();
        },
        errror: function() {
          alert('errore server');
        }
      })
    }
  )


  // funzione che fa una chiamata API e restituisce tramite GET tutti i valori "text" presenti nel mio oggetto API
  function chiamaAPITodoList() {
    $('.todolist').html(''); // resetto la mia lista ogni volta che eseguo la chiamata API per evitare ridondanza
    $.ajax({
      url: 'http://157.230.17.132:3001/todos/',
      method: 'GET',
      success: function(data) {
        for (var i = 0; i < data.length; i++) {
          var singolaNota = data[i];
          var source = $('#entry-template').html(); // questo e il path al nostro template html
          var template = Handlebars.compile(source); // passiamo a Handlebars il percorso del template html
          var html = template(singolaNota);
          $('.todolist').append(html);
        }
      },
      error: function() {
        alert('errore server');
      }
    })
  }

})

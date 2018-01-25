const socket = io();

socket.on('connect', function(){
    console.log('connected to backend');
});

socket.on('message', function(message){
    console.log(message.text);
     $('.messages').empty();
    $('.messages').append(`<p>${message.text}</p>`);
});

// let $form = jQUery('#form');

// $form.on('submit', function(e){
//     e.preventDefault();

//     socket.emit('message', {
//         text: $form
//     });
// });

$('#message-form').submit(function(e){
    e.preventDefault();

    socket.emit('message', {
        text: $('input[name="message"]').val()
    });

    $('input[name="message"]').val('');
});


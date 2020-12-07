var socket = io();
const lblDesk = 'lblEscritorio';
const lblTicket = 'lblTicket';

socket.on('connect', function() {

    console.log('Connection successfull!');
});

socket.on('update', function (attended) {

    let lastFour = attended.lastFour;
    if (attended.ok && lastFour) {

        for(let i=0; i<lastFour.length; i++) {
            let ticket = $(`#${lblTicket}${i + 1}`);
            let desk = $(`#${lblDesk}${i + 1}`);

            ticket.html(`Ticket ${lastFour[i].attended}`);
            desk.html(`Escritorio ${lastFour[i].desk}`);
            //desk.html(`Escritorio ${}`);
        }

        const audio = new Audio('audio/new-ticket.mp3');
        audio.play();
    }

});
class TicketControl {

    constructor() {
        this.today = new Date().getDate();
        this.currentTicket = 0;
    }
}

module.exports = TicketControl;
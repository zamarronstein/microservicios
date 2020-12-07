const fs = require('fs');
const path = require('path');

const data_path = path.resolve(__dirname, '../data/data.json');
const MAX_ATTENDED = 4;

class TicketControl {

    constructor() {

        this.lastTicket = 0;
        this.today = 0;
        this.tickets = [];
        this.lastFourAttended = [];
        this.init();
    }

    init() {
        this.getCurrentDataFile();

        if (this.today != new Date().getDay()) {
            this.reset();
        }

        let data = this.getData();
        console.log(data);

        this.save(data, data_path);
    }

    save(data, _path) {


        if (!fs.existsSync(_path)) {
            return {
                ok: false,
                err: {
                    msg: 'Data path does not exists!'
                }
            };
        }

        fs.writeFileSync(data_path, JSON.stringify(data), (err) => {

            if (err) throw err;
            console.log('File has been saved!');
        });
    }

    getCurrentDataFile() {

        try {

            let data = {};

            data = require('../data/data.json');

            this.lastTicket = data.lastTicket;
            this.today = data.today;
            this.tickets = data.tickets;
            this.lastFourAttended = data.lastFourAttended
        } catch (exception) {
            this.reset();
        }

        return this.getData();
    }

    reset() {
        this.today = new Date().getDay();
        this.lastTicket = 0;
        this.tickets = [];
        this.lastFourAttended = [];
    }

    next() {

        this.lastTicket += 1;

        if (this.lastTicket != 0) {
            this.tickets.unshift(this.lastTicket);
        }

        let data = this.getData();

        this.save(data, data_path);
    }

    getLastTicket() {
        return this.lastTicket;
    }

    getTickets() {
        return this.tickets;
    }

    getData() {

        return {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            lastFourAttended: this.lastFourAttended
        };
    }

    attend(desk) {
        
        if (this.getTickets().length > 0) {

            let ticketAttended = this.getTickets().pop(),
                attended = {
                    desk,
                    attended: ticketAttended
                }

            if (this.lastFourAttended.length < MAX_ATTENDED) {

                this.lastFourAttended.unshift(attended);
            } else {
                
                this.lastFourAttended.pop();
                this.lastFourAttended.unshift(attended);
            }

            let data = this.getData();
            this.save(data, data_path);

            return {
                ok: true, 
                attended: ticketAttended,
                lastFour: this.lastFourAttended
            }
        } else {
            return {
                ok: false,
                err: {
                    msg: 'No there are tickets to attend!'
                }
            };
        }
    }
}


module.exports = { TicketControl };
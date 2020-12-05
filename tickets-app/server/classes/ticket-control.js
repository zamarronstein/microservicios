const fs = require('fs');
const path = require('path');

const data_path = path.resolve(__dirname, '../data/data.json');

class TicketControl {

    constructor() {

        this.currentTicket = 0;
        this.today = 0;

        this.init();
    }

    init() {
        this.getCurrentDataFile();
        this.save();
    }

    save() {

        if (this.today != new Date().getDay()) {
            this.reset();
        }

        let data = {
            currentTicket: this.currentTicket,
            today: this.today
        };

        if (!fs.existsSync(data_path)) {
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

            this.currentTicket = data.currentTicket;
            this.today = data.today;
        } catch (exception) {
            this.reset();
        }

        return {
            currentTicket: this.currentTicket,
            today: this.today
        };
    }

    reset() {
        this.today = new Date().getDay();
        this.currentTicket = 0;
    }

    next() {
        this.currentTicket += 1;
        this.save();
    }
}


module.exports = { TicketControl };
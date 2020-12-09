class Users {

    constructor() {
        this.people = [];
    }

    addPerson(person) {
        this.people.push(person);

        return this.people;
    }

    getPerson(id) {

        let person = this.people.filter((p) => {
            return p.id === id
        });

        return (person.length > 0)? person[0] : null;
    }

    getPeople() {
        return this.people;
    }

    getPeoplePerRoom() {
        // No implemented yet!
    }

    deletePerson(id) {
        let deletedPerson = this.getPerson(id);
        console.log('deleted person: ', deletedPerson);

        this.people = this.people.filter((p) => {
            return p.id !== id
        });

        console.log('people: ', this.people);

        return deletedPerson;
    }
}

module.exports = {
    Users
};
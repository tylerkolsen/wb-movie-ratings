const person = {
    name: {
        first: "Bob",
        second: "Smith"
    },
    age: 32,
    bio() {
        console.log(`${this.name.first} ${this.name.second} is ${this.age} years old.`)
    },
    introduceSelf() {
        console.log(`Hi! i'M ${this.name.first}.`)
    }
};

console.log(person.name.first)
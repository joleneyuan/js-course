//================================================================
// Coding Challenge #4

console.log("\n\n\n================================================================");
console.log("Coding Challenge #4\n\n");

function Person(name, mass, height) {
    this.name = name;
    this.mass = mass;
    this.height = height;
    this.bmi = mass/height/height;
}

var people = [
    new Person("Mark", 75.0, 1.8),
    new Person("John", 86.0, 1.78)
]

function highestBMI (people) {
    var recordBMI = 0;
    var recordPeople = ['no one'];
    for (let person of people) {
        if (person.bmi > recordBMI) {
            recordBMI = person.bmi;
            recordPeople.length = 0;
            recordPeople.push(person.name);
        } else if (person.bmi == recordBMI) {
            recordPeople.push(person.name);
        }
    }
    return [recordBMI, recordPeople];
}

console.log("Highest BMI goes to " + highestBMI(people)[1] + " with a BMI of " + highestBMI(people)[0].toFixed(2));

//================================================================
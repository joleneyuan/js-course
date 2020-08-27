// Coding Challenge 8

class TownElement {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends TownElement {
    constructor(name, buildYear, area, noOfTrees) {
        super(name, buildYear);
        this.area = area;
        this.noOfTrees = noOfTrees;
    }

    calcTreeDensity() {
        var density = this.noOfTrees/this.area;
        console.log(`This park ${this.name} has tree density of ${density}`);
        // return this.noOfTrees/this.area;
    }
}

// Park-related functions
function calcParksAvgAge(parks) {
    let sumOfAges=0, currYear=new Date().getFullYear(); // how to get total number of parks?
    for (park of parks) {
        sumOfAges += currYear-park.buildYear;
    }
    console.log(`The average age of all parks is ${sumOfAges/parks.length}`);
    // return sumOfAges/parks.length;
}

function exceedTreeLimit(parks, treeLimit) {
    let parksExceedingLimit = parks.filter(p => p.noOfTrees > treeLimit);
    let parkNames = parksExceedingLimit.map(p => p.name);
    if (parkNames.length == 0){
        parkNames = 'No park';
    }
    console.log(`${parkNames} have more than ${treeLimit} trees`);
}

class Street extends TownElement {
    constructor(name, buildYear, streetLength, sizeClassification=3) {
        super(name, buildYear);
        this.streetLength = streetLength;
        this.sizeClassification = sizeClassification;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');

        console.log(`The street ${this.name}, built in ${this.buildYear}, is a ${classification.get(this.sizeClassification)} street`);
    }
}

// Street-related functions
function calcTotalLeng(streets) {
    let totalLeng=0;
    for (street of streets) {
        totalLeng += street.streetLength;
    }
    // console.log(`Total length of streets is ${totalLeng}`);
    return totalLeng;
}

function calcStreetsAvgLeng(streets) {
    let avgLeng = this.calcTotalLeng(streets)/streets.length;
    console.log(`Average length of streets is ${avgLeng}`);
}


// define parks and streets
const allParks = [
    new Park('Green Park', 1987, 0.2, 215),
    new Park('National Park', 1894, 2.9, 3541),
    new Park('Oak Park', 1953, 0.4, 949)
];

const allStreets = [
    new Street('Ocean Avenue', 1999, 1.1, 4),
    new Street('Evergreen Street', 2008, 2.7, 2),
    new Street('4th Street', 2015, 0.8),
    new Street('Sunset Boulevard', 1982, 2.5, 5)
]

// reports
function reportParks(parks){
    console.log('---Parks Report---');
    parks.forEach(p => p.calcTreeDensity());
    calcParksAvgAge(parks);
    exceedTreeLimit(parks, 800);
}

function reportStreets(streets) {
    console.log('---Streets Report---');
    console.log(`Total length of streets is ${calcTotalLeng(streets)}`);
    calcStreetsAvgLeng(streets);
    streets.forEach(s => s.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);
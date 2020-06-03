//================================================================
// Coding Challenge #5

console.log("\n\n\n================================================================");
console.log("Coding Challenge #5\n\n");

// part 1

function Bill(name, bills, tipRates) {
    this.name = name;
    this.bills = bills;
    this.tips = calcTips(bills, tipRates);
    this.totals = calcTotals(bills, this.tips);
    // this.totals = function () {
    //     return bills.map((t, i) => (parseFloat(t) + parseFloat(this.tips[i])).toFixed(2));
    // }
    this.tipsAvg = calcAvg(this.tips); // part 2
}

function calcTips(bills, tipRates) {
    return bills.map( t => calcTip(t, tipRates).toFixed(2));
}

function calcTotals(bills, tips) {
    return bills.map((t, i) => (parseFloat(t) + parseFloat(tips[i])).toFixed(2));
}

// owen's soln to my qn
// var calcTotals = function (bills, tips) {
//     return bills.map( (x, i=0) => {
//         return x + tips[i]});
// }
// function Bill(name, bills) {
//     this.name = name;
//     this.bills = bills;
//     this.tips = calcTips(bills);
//     this.totals = calcTotals; // this is a function, not a string property
// }
// var JosBill = new Bill('Jo', [50,100,201]);
// console.log(JosBill);
// console.log(JosBill.totals(JosBill.bills, JosBill.tips)); // without the brackets, it'd go back to being a string

function calcAvg(tips) {
    return (tips.reduce((s,t) => s+parseFloat(t), 0) / tips.length).toFixed(2);
}

// tipRates is of the format [low-rate, low-cutoff, mid-rate, high-cutoff, high-rate]
function calcTip(bill, tipRates) {
    if (bill < tipRates[1]) {
        return bill*tipRates[0];
    } else if (bill > [3]) {
        return bill*tipRates[4];
    } else {
        return bill*tipRates[2];
    }
}

var bills = [
    new Bill("John", [124, 48, 268, 180, 42], [0.2, 50, 0.15, 200, 0.1]),
    new Bill("Mark", [77, 375, 110, 45], [0.2, 100, 0.1, 300, 0.25])
]


var highestTipper = ['no one'];
var highestTip = 0;

for (let bill of bills) {
    
    for (let detail in bill) {
        console.log(detail + ": " + bill[detail]);
    }
    if (highestTip < bill.tipsAvg) {
        highestTip = bill.tipsAvg;
        highestTipper.length = 0;
        highestTipper.push(bill.name);
    } else if (highestTipper = bill.tipsAvg) {
        highestTipper.push(bill.name);
    }
    console.log("\n");
}

console.log("Highest avg tipper is " + highestTipper + " with an avg tip of " + highestTip);

//================================================================
//================================================================
// Coding Challenge #2

console.log("\n\n\n================================================================");
console.log("Coding Challenge #2\n\n");

function Team(name, scores) {
    this.name = name,
    this.scores = scores,
    this.avg = calcAvg(scores)
}

var teams = [
    new Team('John', [89, 120, 103]),
    new Team('Mike', [116, 94, 123]),
    new Team('Mike2', [97, 134, 105])
]

function calcAvg (scores) {
    return scores.reduce((s,c) => s+c, 0) / scores.length;
}

// Seong's soln
function getAverage(teams) {
    let avg = 0;
   
    return teams.reduce((acc, item) => item.avg > avg ? item : acc, {}).name
}

// my soln
function highestAvg (teams) {
    var highestName = [];
    var currHighestAvg = 0;
    for (let i=0; i<teams.length; i++) {
        if (teams[i].avg > currHighestAvg) {
            currHighestAvg = teams[i].avg;
            highestName.length = 0;
            highestName.push(teams[i].name);
        } else if (teams[i].avg == currHighestAvg) {
            highestName.push(teams[i].name);
        }
    }
    return highestName;
}

function retAvg (teams, name) {
    for (let i=0; i<teams.length; i++) {
        if (teams[i].name == name) {
            return teams[i].avg;
        }
    }
    return 'Team name not found';
}

console.log("#1:");
console.log("John's average: " + retAvg(teams,'John'));
console.log("Mike's average: " + retAvg(teams,'Mike'));
console.log("Any's average: " + retAvg(teams,'Any'));
console.log("--------------");
console.log("#2:");
console.log("Higher average goes to: " + highestAvg(teams));
console.log("--------------");
console.log("#3:");
console.log("skipped");
console.log("--------------");
console.log("#4:");
teams.push(new Team('Mary', [97, 134, 105]));
console.log("Highest average goes to: " + highestAvg(teams));
console.log("getAverage: " + getAverage(teams));

//================================================================
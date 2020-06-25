/*

Notes:

Architecture:
- Data Module: (BUDGET controller)
    * Add new item to data structure
    * Calculate budget
- UI Module: (UI controller)
    * Get input values
    * Add new item to UI
    * Update UI
- Controller Module: (GLOBAL APP controller)
    * Add event handlers

Module: keep related pieces of code together
- separation of concerns
*/


var Transaction = function(type, description, value) {
    this.type = type,
    this.description = description,
    this.value = value
};

function init() {
    expenses = [];
    incomes = [];
    totalIncome = 0;
    totalExpenses = 0;
    console.log('start');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setDate = function(){
        let date = new Date();
        document.querySelector('.budget_title-month').innerHTML = monthNames[date.getMonth()] + " " + date.getFullYear();
    }
    setDate();
}

init();

// BUDGET controller
var budgetController = (function() {

    var calculatePercentage = function(amount, total) {
        return (amount / total *100).toFixed(0) + '%';
    }

    var updateExpPercent = function() {
        let percents = document.querySelectorAll('.item_percentage');
        for (percent of percents) {
            let thisExp = parseFloat(percent.parentNode.querySelector('.item_value').innerHTML.split(' ')[1]);
            percent.innerHTML = calculatePercentage(thisExp, totalIncome);
        }
    }
    
    return {
        addTransaction: function(transaction) {
            if (transaction.type==='inc') {
                incomes.push(transaction);
                totalIncome += parseFloat(transaction.value);
                updateExpPercent();
            } else {
                expenses.push(transaction);
                totalExpenses += parseFloat(transaction.value);
            }
        },

        getPercentage: function(amount, total) {
            return calculatePercentage(amount, total);
        }
    }

})();


// UI controller
var UIController = (function() {

    var validateInput = function(type, description, value) {
        console.log('transac: '+ type + " " + description + " " + value);
        if (description.trim().length !== 0 && value>0) {
            if (type==='inc' || type==='exp') {
                return true;
            }
        }
        console.log('validation error: please check input values');
        return false;
    }

    var createTransactionElem = function(transaction) {
        let transElem = document.createElement('div');
        transElem.classList.add("item");
        transElem.classList.add("clearfix");

            let desc = document.createElement('div');
            desc.classList.add('item_description');
            desc.innerHTML = transaction.description;

            let rs = document.createElement('div');
            rs.classList.add("right");
            rs.classList.add("clearfix");

                let val = document.createElement('div');
                val.classList.add('item_value');
            

                let percent = document.createElement('div');
                percent.classList.add('item_percentage');
                percent.innerHTML = budgetController.getPercentage(transaction.value, totalIncome);

                let del = document.createElement('div');
                del.classList.add('item_delete');

                    let delBtn = document.createElement('div');
                    delBtn.classList.add('item_delete-btn');

                        let delIcon = document.createElement('i');
                        delIcon.classList.add('ion-ios-close-outline');

                    delBtn.appendChild(delIcon);
                
                del.appendChild(delBtn);

            rs.appendChild(val);
            rs.appendChild(del);

        transElem.appendChild(desc);
        transElem.appendChild(rs);

        if (transaction.type === 'inc') {
            transElem.id = 'inc-' + (incomes.length-1);
            val.innerHTML = '+ ' + transaction.value;
        } else {
            transElem.id = 'exp-' + (expenses.length-1);
            val.innerHTML = '- ' + transaction.value;
            rs.appendChild(percent);
        }
        return transElem;
    }

    return {
        getInput: function() {
            let addType = document.querySelector('.add_type').value;
            let addDescription = document.querySelector('.add_description').value;
            let addValue = document.querySelector('.add_value').value;

            if (validateInput(addType, addDescription, addValue)) {
                return new Transaction(addType, addDescription, addValue);
            } else {
                return false;
            }
        },

        clearInput: function() {
            document.querySelector('.add_description').value = "";
            document.querySelector('.add_value').value = "";
        },

        addToUI: function(transaction) {
            if (transaction.type === 'inc') {
                let incElem = createTransactionElem(transaction);
                console.log(document.querySelector('.income_list'));
                document.querySelector('.income_list').appendChild(incElem);
            } else {
                let expElem = createTransactionElem(transaction);
                document.querySelector('.expenses_list').appendChild(expElem);
            }
        },

        updateTotals: function() {
            document.querySelector('.budget_income-value').innerHTML = "+ " + totalIncome;
            document.querySelector('.budget_expenses-value').innerHTML = "- " + totalExpenses;
            document.querySelector('.budget_expenses-percentage').innerHTML = budgetController.getPercentage(totalExpenses, totalIncome);
            document.querySelector('.budget_value').innerHTML = totalIncome === totalExpenses ? "0.00" : (totalIncome > totalExpenses ? "+ " : "- ") + Math.abs(totalIncome-totalExpenses).toFixed(2);
        },

        getDate: function() {
            document.querySelector('.budget_title-month').innerHTML = "+ " + totalIncome;
        }
    }

})();


// GLOBAL APP controller
var controller = (function(budgetCtrl, UICtrl) {

    var transaction;
    
    var ctrlAddItem = function() {
        // 1. get input
        transaction = UIController.getInput();

        if (transaction) {
            UIController.clearInput();

            // 2. add item to budget controller
            budgetController.addTransaction(transaction);

            // 3. add item to UI
            UIController.addToUI(transaction);

            // 4. update totals (calculate + display budget)
            UIController.updateTotals();
        }
    }

    document.addEventListener('keypress', function(event) {
        if (event.keyCode===13 || event.which===13) {
            console.log('key');
            ctrlAddItem();
        }
    });
    
    document.querySelector('.add_btn').addEventListener('click', ctrlAddItem);

})(budgetController, UIController);
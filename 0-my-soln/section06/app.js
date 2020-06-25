
// BUDGET controller
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round(this.value / totalIncome * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum=0;
        data.allItems[type].forEach((curr) => {
            sum += curr.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: 0
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            ID = data.allItems[type].length;

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map((curr) => {
                return curr.id;
            });

            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculateBudget: function() {

            // calculate totals
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate budget
            data.budget = data.totals.inc - data.totals.exp;

            // calculate percentage
            data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach((curr) => {
                curr.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPercent = data.allItems.exp.map((curr) => {
                return curr.getPercentage();
            });
            return allPercent;
        }
    }
    
})();

// UI controller
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add_type',
        inputDescription: '.add_description',
        inputValue: '.add_value',
        inputBtn: '.add_btn',
        incomeContainer: '.income_list',
        expenseContainer: '.expenses_list',
        budgetLabel: '.budget_value',
        incomeLabel: '.budget_income-value',
        expenseLabel: '.budget_expenses-value',
        percentageLabel: '.budget_expenses-percentage',
        container: '.container',
        deleteBtn: '.item_delete-btn',
        expensePercLabel: '.item_percentage',
        dataLabel: '.budget_title-month'
    };

    var nodeListForEach = function(list, callback) {
        for (let i=0; i<list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); // returns a NodeList (not Array)

            var fieldsArr = Array.prototype.slice.call(fields); // conversion to Array
            // var fieldsArr = fields.slice(); // not Array, so cannot use

            fieldsArr.forEach((curr, ind, arr) => {
                curr.value = '';
            });

            fieldsArr[0].focus();

        },

        addListItem: function(obj, type) {
            var html='', element;

            // create HTML string
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_delete"><button class="item_delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type ==='exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item_description">%description%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="item_percentage">%percent%</div><div class="item_delete"><button class="item_delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace placeholder with text
            html = html.replace('%id%', obj.id);
            html = html.replace('%description%', obj.description);
            html = html.replace('%value%', this.formatNumber(obj.value));

            // insert HTML string into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
            // document.querySelector(element).appendChild(html); // this is not a node, so won't work
        },

        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensePercLabel); // returns NodeListOf<elem>

            nodeListForEach(fields, function(curr, ind) {
                if (percentages[ind] > 10000) {
                    curr.textContent = 'x_x';
                } else if (percentages[ind] > 0) {
                    curr.textContent = percentages[ind] + '%';
                } else {
                    curr.textContent = '---';
                }
            });
        },

        displayBudget: function(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = this.formatNumber(obj.budget);
            document.querySelector(DOMstrings.incomeLabel).textContent = this.formatNumber(obj.totalInc);
            document.querySelector(DOMstrings.expenseLabel).textContent = this.formatNumber(obj.totalExp);
            document.querySelector(DOMstrings.percentageLabel).textContent = (obj.percentage>10000 ? 'x_x' : (obj.percentage>0 ? obj.percentage+'%' : '---'));
        },

        displayMonth: function() {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let date = new Date();
            document.querySelector(DOMstrings.dataLabel).innerHTML = monthNames[date.getMonth()] + " " + date.getFullYear();
        },

        formatNumber: function(num) {
            let n = num.toFixed(2);
            n = new Intl.NumberFormat("en-GB", {
                minimumFractionDigits: 2
            }).format(n);
            return n;
        },

        changedType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(curr) {
                curr.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();


// GLOBAL APP controller
var controller = (function(budgetCtrl, UICtrl) {

    // var eventTransactionCheck = new CustomEvent('transactionCheck', {
    //     bubbles: true,
    //     detail: 
    // });
    
    // function for event listeners
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        // document.querySelector(DOM.container).addEventListener('change', () => {
        //     console.log('ha');
        //     document.querySelector(DOM.deleteBtn).addEventListener('click', ctrlDeleteItem);
        // });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input.description!=='' && !isNaN(input.value) && input.value>0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear input fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

            // 6. Calcualte and update percentages
            updatePercentage();

        } else {
            alert("Please check input");
        }
    };

    var ctrlDeleteItem = function(event) {
        // 'event' is used as target
        // console.log(event.target.closest(".item").id);
        // note: update this part...

        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            // inc-0
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete item from data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete item from UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show new budget
            updateBudget();
        }
    };

    var updateBudget = function() {
        // 1. Calculate budget
        budgetCtrl.calculateBudget();

        // 2. Return budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentage = function() {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentages from BudgetCtrl
        var ps = budgetCtrl.getPercentages();

        // 3. Update UI with new percentages
        UICtrl.displayPercentages(ps);
    };

    return {
        init: function() {
            console.log('start app');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();
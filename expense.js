document.addEventListener('DOMContentLoaded', loadExpenses);

document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;

    if (name && amount) {
        addExpense(name, amount);
        saveExpenseToLocalStorage(name, amount);
        document.getElementById('expense-form').reset();
    }
});

function addExpense(name, amount) {
    const list = document.getElementById('expense-list');
    const listItem = document.createElement('li');

    listItem.innerHTML = `
        ${name} - $${amount}
        <button class="edit" onclick="editExpense(this)">Edit</button>
        <button class="delete" onclick="deleteExpense(this)">Delete</button>
    `;

    list.appendChild(listItem);
}

function editExpense(button) {
    const listItem = button.parentElement;
    const [name, amount] = listItem.firstChild.nodeValue.split(' - $');

    document.getElementById('expense-name').value = name;
    document.getElementById('expense-amount').value = amount;

    listItem.remove();
    removeExpenseFromLocalStorage(name, amount);
}

function deleteExpense(button) {
    const listItem = button.parentElement;
    const [name, amount] = listItem.firstChild.nodeValue.split(' - $');

    listItem.remove();
    removeExpenseFromLocalStorage(name, amount);
}

function saveExpenseToLocalStorage(name, amount) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ name, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function removeExpenseFromLocalStorage(name, amount) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.name !== name || expense.amount !== amount);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => addExpense(expense.name, expense.amount));
}

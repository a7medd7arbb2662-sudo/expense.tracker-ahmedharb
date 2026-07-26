const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues(){

    const amounts = transactions.map(item => item.amount);

    const total = amounts.reduce((a,b)=>a+b,0).toFixed(2);

    const incomeTotal = amounts
    .filter(item=>item>0)
    .reduce((a,b)=>a+b,0)
    .toFixed(2);

    const expenseTotal = (
        amounts
        .filter(item=>item<0)
        .reduce((a,b)=>a+b,0)*-1
    ).toFixed(2);

    balance.innerText="$"+total;
    income.innerText="$"+incomeTotal;
    expense.innerText="$"+expenseTotal;

    localStorage.setItem("transactions",JSON.stringify(transactions));
}

function createTransaction(transaction){

    const li=document.createElement("li");

    li.innerHTML=`
        ${transaction.text}
        <span>$${transaction.amount}</span>
        <button class="delete">X</button>
    `;

    li.querySelector("button").addEventListener("click",()=>{

        transactions=transactions.filter(item=>item.id!==transaction.id);

        render();

    });

    list.appendChild(li);

}

function render(){

    list.innerHTML="";

    transactions.forEach(createTransaction);

    updateValues();

}

form.addEventListener("submit",function(e){

    e.preventDefault();

    const transaction={
        id:Date.now(),
        text:text.value,
        amount:+amount.value
    };

    transactions.push(transaction);

    render();

    text.value="";
    amount.value="";

});

render();
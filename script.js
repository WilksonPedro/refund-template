const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");


amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "");
    // Aplicando a formatação do value para numero e junto para centavos
    value = Number(value) / 100;
    amount.value = formatCurrencyBrl(value);
}

function formatCurrencyBrl(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value 
}

form.onsubmit = (event) =>  {
    event.preventDefault();
}
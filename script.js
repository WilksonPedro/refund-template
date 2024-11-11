const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");

// Formatando o valor do input para moeda
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "");
    // Aplicando a formatação do value para numero e junto para centavos
    value = Number(value) / 100;
    amount.value = formatCurrencyBrl(value);
}

// Função auxiliar para formatar o valor para moeda
function formatCurrencyBrl(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value 
}

// Capturando o evento de submit no formulário
form.onsubmit = (event) =>  {
    event.preventDefault();
    // Criando um objeto dentro do evento com os detalhes do formulario
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    
}


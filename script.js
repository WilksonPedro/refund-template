const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2")
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
    
    expenseAdd(newExpense);
}
// Função para adicionar a despesa na lista
function expenseAdd(newExpense) {
    try {
        // Cria o elemento para adicionar o item (li) na lista(ul)
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        // Cria o icone da categoria e add caminho e alt
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        //cria a div para adicionar o texto
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        // Cria o strong para adicionar o nome da despesa
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        // Cria o span para adicionar o valor da despesa
        const  expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;
        
        // Adicionar o nome e categoria na div das informações
        expenseInfo.append(expenseName, expenseCategory);
        
        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

        // Adiciona as informações no item.
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "img/remove.svg");
        removeIcon.setAttribute("alt", "remover");

        // Adiciona o Icon no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

        // Adiciona o item a lista.
        expenseList.append(expenseItem)

        // Atualiza o total de despesas
        updateTotals();
    } catch (error) {
        alert("Não foi possivel adicionar a despesa")
        console.log(error);
        
    }
}

function updateTotals() {
    try {
        // Recupera todos os itens (li) da lista (ul)
        const items = expenseList.children;
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;
        // Percorrendo cada item da (li)
        let total = 0;
        for(let index = 0; index < items.length; index++) {
            const itemAmount = items[index].querySelector(".expense-amount")
            // Recuperando o valor do item e convertendo para numero
            let value  = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");
            // convertendo um numero com ponto flutuante
            value = parseFloat(value);

            if(isNaN(value)) {
                return alert("Não foi possivel calcular o total.")
            }

            // Incrementando o valor total com value
            total += Number(value);
            expensesTotal.textContent = total;
        }

        // Cria a span para adicionar o R$ formatado.
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";
        // Formata o valor e remove o R$ que seria colocado antes pelo total
        total = formatCurrencyBrl(total).toUpperCase().replace("R$", "");
        // Limpa o conteudo do elemento
        expensesTotal.innerHTML = "";
        // Adiciona o simbolo e o valor formatado
        expensesTotal.append(symbolBRL, total);
    } catch (error) {
        console.log(error);
        alert("Não foi possivel atualizar o total.")
    }
}
// Evento que captura o click no icone de remover
expenseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-icon")) {
        //Obtem a LI pai do elemento clicado
        const item = event.target.closest(".expense")
        item.remove();
    }
    updateTotals();
})
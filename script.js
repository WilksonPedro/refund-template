const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");
const expenseList = document.querySelector("ul")

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

    } catch (error) {
        alert("Não foi possivel adicionar a despesa")
        console.log(error);
        
    }
}
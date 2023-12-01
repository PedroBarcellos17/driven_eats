document.addEventListener("DOMContentLoaded", function () {
    let selectedFoodItem = null;
    let selectedDrinkItem = null;
    let selectedDessertItem = null;

    function updateButtons() {
        const footerButton = document.querySelector(".botao");

        if (selectedFoodItem && selectedDrinkItem && selectedDessertItem) {
            footerButton.textContent = "Fazer pedido";
            footerButton.style.backgroundColor = "green";
            footerButton.style.color = "white";
            footerButton.addEventListener("click", finalizeOrder);
        } else {
            footerButton.textContent = "Selecione os três itens para fechar o pedido";
            footerButton.style.backgroundColor = "";
            footerButton.style.color = "black";
            footerButton.removeEventListener("click", finalizeOrder);
        }
    }

    function finalizeOrder() {
        if (selectedFoodItem && selectedDrinkItem && selectedDessertItem) {


            const foodPrice = parseFloat(selectedFoodItem.querySelector("h3 span").textContent);
            const drinkPrice = parseFloat(selectedDrinkItem.querySelector("h3 span").textContent);
            const dessertPrice = parseFloat(selectedDessertItem.querySelector("h3 span").textContent);

            const total = foodPrice + drinkPrice + dessertPrice;

            const mensagemWhatsApp = encodeURIComponent(`
                Olá, gostaria de fazer o pedido:
                - Prato: ${selectedFoodItem.querySelector("h1").textContent}
                - Bebida: ${selectedDrinkItem.querySelector("h1").textContent}
                - Sobremesa: ${selectedDessertItem.querySelector("h1").textContent}
                Total: R$ ${total.toFixed(2)}
            `);

            const linkWhatsApp = `https://wa.me/5551999999999?text=${mensagemWhatsApp}`;

            window.location.href = linkWhatsApp;
        }
    }

    function selectItem(category, item) {
        if (item === selectedFoodItem || item === selectedDrinkItem || item === selectedDessertItem) {
            item.style.border = "";
            const icon = item.querySelector("i");
            if (icon) {
                icon.style.display = "none";
            }

            if (category === "food") {
                selectedFoodItem = null;
            } else if (category === "drink") {
                selectedDrinkItem = null;
            } else if (category === "dessert") {
                selectedDessertItem = null;
            }
        } else {
            if (category === "food") {
                selectedFoodItem = null;
            } else if (category === "drink") {
                selectedDrinkItem = null;
            } else if (category === "dessert") {
                selectedDessertItem = null;
            }

            if (category === "food") {
                selectedFoodItem = item;
            } else if (category === "drink") {
                selectedDrinkItem = item;
            } else if (category === "dessert") {
                selectedDessertItem = item;
            }

            updateCardsVisual();
        }

        updateButtons();
    }

    function updateCardsVisual() {
        const allOptions = document.querySelectorAll(".opcao");
        allOptions.forEach(option => {
            option.style.border = "";
            const icon = option.querySelector("i");
            if (icon) {
                icon.style.display = "none";
            }
        });

        if (selectedFoodItem) {
            selectedFoodItem.style.border = "2px solid green";
            const foodIcon = selectedFoodItem.querySelector("i");
            if (foodIcon) {
                foodIcon.style.display = "block";
            }
        }
        if (selectedDrinkItem) {
            selectedDrinkItem.style.border = "2px solid green";
            const drinkIcon = selectedDrinkItem.querySelector("i");
            if (drinkIcon) {
                drinkIcon.style.display = "block";
            }
        }
        if (selectedDessertItem) {
            selectedDessertItem.style.border = "2px solid green";
            const dessertIcon = selectedDessertItem.querySelector("i");
            if (dessertIcon) {
                dessertIcon.style.display = "block";
            }
        }
    }

    const foodOptions = document.querySelectorAll(".opcoes:nth-child(2) .opcao");
    foodOptions.forEach(option => {
        option.addEventListener("click", function () {
            selectItem("food", option);
        });
    });

    const drinkOptions = document.querySelectorAll(".opcoes:nth-child(4) .opcao");
    drinkOptions.forEach(option => {
        option.addEventListener("click", function () {
            selectItem("drink", option);
        });
    });

    const dessertOptions = document.querySelectorAll(".opcoes:nth-child(6) .opcao");
    dessertOptions.forEach(option => {
        option.addEventListener("click", function () {
            selectItem("dessert", option);
        });
    });
});


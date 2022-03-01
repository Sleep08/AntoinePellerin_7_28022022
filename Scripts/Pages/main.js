// Ensemble des variables :

const recipeContain = document.getElementById("Recipes");
const ingredientsDropDown = document.getElementById("ingredient");
const appareilsDropDown = document.getElementById("appareils");
const ustensilsDropDown = document.getElementById("ustensils");
const chevronDownIngredients = document.getElementById("chevronIngredients");
const chevronDownAppareils = document.getElementById("chevronAppareils");
const chevronDownUstensils = document.getElementById("chevronUstensils");
const ingredientsTitle = document.getElementById("ingredientsTitle");
const appareilsTitle = document.getElementById("appareilsTitle");
const ustensilsTitle = document.getElementById("ustensilsTitle");

// Affichage de l'ensemble des recettes par défaut :

async function displayData(recipes){
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCard = recipeModel.getRecipCard();
        recipeContain.appendChild(recipeCard);
    }); 
};

// Récupération de l'ensemble des items des recherches avancées :

const allRechercheAvanceeItems = (recipes) => {
    let ingredients = [];
    let appliance = [];
    let ustensils = [];
    recipes.forEach((recipe) => {
        ingredients = [...new Set([...ingredients, ...recipe.ingredients.map((i)=>i.ingredient)])].sort();
        ustensils = [...new Set([...ustensils, ...recipe.ustensils.map((u) => u)])].sort();
        appliance = [...new Set([...appliance, ...[recipe.appliance]])].sort();
    });
    return {ingredients, ustensils, appliance};
};

// Affichage des ingrédients dans les dropdowns :

const listOfItemsDropDown = (recipes) => {
    const { ingredients, ustensils, appliance } = allRechercheAvanceeItems(recipes);

    chevronDownIngredients.addEventListener("click", function(){
        ingredientsTitle.textContent = "";
        chevronDownIngredients.style.display = "none";
        let ingredientsSearch = document.createElement("input");
        ingredientsSearch.setAttribute("placeholder", "Rechercher un ingrédient")
        ingredientsSearch.setAttribute("class", "searchBarAvanceeIngredients")
        ingredientsDropDown.appendChild(ingredientsSearch);
        let chevronUpIngredients = document.createElement("i");
        chevronUpIngredients.setAttribute("class", "fa-solid fa-chevron-up");
        chevronUpIngredients.setAttribute("id", "chevronUpIngredients");
        ingredientsDropDown.appendChild(chevronUpIngredients);
        let sousmenuIngredients = document.createElement("div");
        sousmenuIngredients.setAttribute("class", "sousMenuDropdownIngredients")
        ingredientsDropDown.appendChild(sousmenuIngredients);
        let ingredientList = document.createElement("ul");
        sousmenuIngredients.appendChild(ingredientList);
        ingredients.forEach((ingredient) => {
            let ingredientItem = document.createElement("li");
            ingredientItem.setAttribute("class", "itemDropdown");
            ingredientItem.textContent = ingredient;
            ingredientList.appendChild(ingredientItem);
        });
        chevronUpIngredients.addEventListener("click", function() {
            ingredientsDropDown.removeChild(sousmenuIngredients);
            ingredientsDropDown.removeChild(ingredientsSearch);
            ingredientsTitle.textContent = "Ingrédients";
            chevronDownIngredients.style.display = "flex";
            chevronUpIngredients.style.display = "none";
        });
    });
    
    chevronDownAppareils.addEventListener("click", function(){
        appareilsTitle.textContent = "";
        chevronDownAppareils.style.display = "none";
        let appareilsSearch = document.createElement("input");
        appareilsSearch.setAttribute("placeholder", "Rechercher un appareil")
        appareilsSearch.setAttribute("class", "searchBarAvanceeAppareils")
        appareilsDropDown.appendChild(appareilsSearch);
        let chevronUpAppareils = document.createElement("i");
        chevronUpAppareils.setAttribute("class", "fa-solid fa-chevron-up");
        chevronUpAppareils.setAttribute("id", "chevronUpAppareils");
        appareilsDropDown.appendChild(chevronUpAppareils);
        let sousmenuAppareils = document.createElement("div");
        sousmenuAppareils.setAttribute("class", "sousMenuDropdownAppareils")
        appareilsDropDown.appendChild(sousmenuAppareils);
        let applianceList = document.createElement("ul");
        sousmenuAppareils.appendChild(applianceList);
        appliance.forEach((appliance) => {
            let applianceItem = document.createElement("li");
            applianceItem.setAttribute("class", "itemDropdown");
            applianceItem.textContent = appliance;
            applianceList.appendChild(applianceItem);
        });
        chevronUpAppareils.addEventListener("click", function() {
            console.log("coucou")
            console.log(sousmenuAppareils)
            appareilsDropDown.removeChild(sousmenuAppareils);
            appareilsDropDown.removeChild(appareilsSearch);
            appareilsTitle.textContent = "Appareils";
            chevronDownAppareils.style.display = "flex";
            chevronUpAppareils.style.display = "none";
        });
    });

    chevronDownUstensils.addEventListener("click", function(){
        ustensilsTitle.textContent = "";
        chevronDownUstensils.style.display = "none";
        let ustensilsSearch = document.createElement("input");
        ustensilsSearch.setAttribute("placeholder", "Rechercher un ustensil")
        ustensilsSearch.setAttribute("class", "searchBarAvanceeUstensils")
        ustensilsDropDown.appendChild(ustensilsSearch);
        let chevronUpUstensils = document.createElement("i");
        chevronUpUstensils.setAttribute("class", "fa-solid fa-chevron-up");
        chevronUpUstensils.setAttribute("id", "chevronUpAppareils");
        ustensilsDropDown.appendChild(chevronUpUstensils);
        let sousmenuUstensils = document.createElement("div");
        sousmenuUstensils.setAttribute("class", "sousMenuDropdownUstensils")
        ustensilsDropDown.appendChild(sousmenuUstensils);
        let ustensilList = document.createElement("ul");
        sousmenuUstensils.appendChild(ustensilList);
        ustensils.forEach((ustensil) => {
            let ustensilItem = document.createElement("li");
            ustensilItem.setAttribute("class", "itemDropdown");
            ustensilItem.textContent = ustensil;
            ustensilList.appendChild(ustensilItem);
        });
        chevronUpUstensils.addEventListener("click", function() {
            ustensilsTitle.textContent = "Ustensiles";
            ustensilsDropDown.removeChild(sousmenuUstensils);
            ustensilsDropDown.removeChild(ustensilsSearch);
            chevronDownUstensils.style.display = "flex";
            chevronUpUstensils.style.display = "none";
        });
    });
}

// Récupération JSON - APIT Fetch :

const getRecipes = async () => {
    return await fetch ("/Data/recipes.json")
    .then((res) => res.json());
};

// Lancement des fonctions de la page : 

async function init() {
    const { recipes } = await getRecipes();
    displayData(recipes);
    allRechercheAvanceeItems(recipes);
    listOfItemsDropDown(recipes);
};

init();


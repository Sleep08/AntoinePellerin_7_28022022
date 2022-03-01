// Ensemble des variables :

const recipeContain = document.getElementById("Recipes");
const ingredientsDropDown = document.getElementById("ingredient");
const appareilsDropDown = document.getElementById("appareils");
const ustensilsDropDown = document.getElementById("ustensils");
const chevronDownIngredients = document.getElementById("chevronIngredients");
const chevronDownAppareils = document.getElementById("chevronAppareils");
const chevronDownUstensils = document.getElementById("chevronUstensils");

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
    const { ingredients, ustensils, appliance} = allRechercheAvanceeItems(recipes);

    chevronDownIngredients.addEventListener("click", function(){
        ingredientsDropDown.textContent = "";
        let ingredientsSearch = document.createElement("input");
        ingredientsSearch.setAttribute("placeholder", "Rechercher un ingrédient")
        ingredientsSearch.setAttribute("class", "searchBarAvancee")
        ingredientsDropDown.appendChild(ingredientsSearch);
        chevronDownIngredients.style.display = "none";
        let chevronUp = document.createElement("i");
        chevronUp.setAttribute("class", "fa-solid fa-chevron-up");
        chevronUp.setAttribute("id", "chevronUpIngredients");
        ingredientsDropDown.appendChild(chevronUp);
        let sousmenuIngredients = document.createElement("div");
        sousmenuIngredients.setAttribute("class", "sousMenuDropdownIngredients")
        ingredientsDropDown.appendChild(sousmenuIngredients);
        ingredients.forEach((ingredient) => {
            let ingredientList = document.createElement("ul");
            let ingredientItem = document.createElement("li");
            ingredientItem.setAttribute("class", "itemDropdown");
            ingredientItem.textContent = ingredient;
            sousmenuIngredients.appendChild(ingredientList);
            ingredientList.appendChild(ingredientItem);
        });
        console.log(chevronUp);
        chevronUp.addEventListener("click", function() {
            console.log(sousmenuIngredients);
            ingredientsDropDown.removeChild(sousmenuIngredients);
            ingredientsDropDown.textContent = "Ingrédients";
            chevronUp.style.display = "none";
            console.log(chevronDownIngredients)
            chevronDownIngredients.style.display = "block";
        });
    });
    
    appareilsDropDown.addEventListener("click", function(){
        appareilsDropDown.textContent = "";
        let appareilsSearch = document.createElement("input");
        appareilsSearch.setAttribute("placeholder", "Rechercher un appareil")
        appareilsSearch.setAttribute("class", "searchBarAvancee")
        appareilsDropDown.appendChild(appareilsSearch);
        const sousmenuAppareils = document.createElement("div");
        sousmenuAppareils.setAttribute("class", "sousMenuDropdownAppareils")
        appareilsDropDown.appendChild(sousmenuAppareils);
        appliance.forEach((appliance) => {
            let applianceList = document.createElement("ul");
            let applianceItem = document.createElement("li");
            applianceItem.setAttribute("class", "itemDropdown");
            applianceItem.textContent = appliance;
            sousmenuAppareils.appendChild(applianceList);
            applianceList.appendChild(applianceItem);
        });
    });

    ustensilsDropDown.addEventListener("click", function(){
        ustensilsDropDown.textContent = "";
        let ustensilsSearch = document.createElement("input");
        ustensilsSearch.setAttribute("placeholder", "Rechercher un ustensil")
        ustensilsSearch.setAttribute("class", "searchBarAvancee")
        ustensilsDropDown.appendChild(ustensilsSearch);
        const sousmenuUstensils = document.createElement("div");
        sousmenuUstensils.setAttribute("class", "sousMenuDropdownUstensils")
        ustensilsDropDown.appendChild(sousmenuUstensils);
        ustensils.forEach((ustensil) => {
            let ustensilList = document.createElement("ul");
            let ustensilItem = document.createElement("li");
            ustensilItem.setAttribute("class", "itemDropdown");
            ustensilItem.textContent = ustensil;
            sousmenuUstensils.appendChild(ustensilList);
            ustensilList.appendChild(ustensilItem);
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


// Création d'une fonction Factory car plus maniable pour l'utilisation
// des datas qu'une class / constructor.

function recipeFactory(data) {
    // déclaration des éléments à utiliser dans la recipe Card :
    const { name, description, time, ingredients } = data

    // Fonction de construction de la Card par éléments :
    function getRecipCard() {
        let recipeFiche = document.createElement("article");
        recipeFiche.setAttribute("class", "recipefiche");
        let zoneImage = document.createElement("div");
        zoneImage.setAttribute("class", "zoneimage");
        let zoneLegende = document.createElement("div");
        zoneLegende.setAttribute("class", "zonelegende");
        let enteteRecipe = document.createElement("div");
        enteteRecipe.setAttribute("class", "enteteRecipe");
        let nameRecipe = document.createElement("h2");
        nameRecipe.setAttribute("class", "namerecipe");
        nameRecipe.textContent = name;
        let timeRecipe = document.createElement("p");
        timeRecipe.setAttribute("class", "timerecipe");
        timeRecipe.innerHTML = `<i class="fa-regular fa-clock"></i>` + time + " min";
        let descriptionRecipe = document.createElement("p");
        descriptionRecipe.setAttribute("class", "description");
        descriptionRecipe.textContent = description;
        let allIngredients = document.createElement("ul");

        // Utilisation du forEach pour déclarer le contenu d'ingrédients :
        ingredients.forEach(ingredientLi => {
            let ingredientL = document.createElement("li");
            if(ingredientLi.unit === undefined){
                ingredientLi.unit = "";
            } /*else if (ingredientLi.quantite === undefined){
                ingredientLi.quantity = "";
            } */
            ingredientL.textContent = ingredientLi.ingredient + (ingredientLi.quantity||ingredientLi.quantite) + ingredientLi.unit
            allIngredients.appendChild(ingredientL)
        });

        // Appel des éléments :
        recipeFiche.appendChild(zoneImage);
        recipeFiche.appendChild(zoneLegende);
        zoneLegende.appendChild(enteteRecipe);
        zoneLegende.appendChild(descriptionRecipe);
        zoneLegende.appendChild(allIngredients);
        enteteRecipe.appendChild(nameRecipe);
        enteteRecipe.appendChild(timeRecipe);

        return ( recipeFiche );
    }
    return { getRecipCard };
}
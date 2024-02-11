function Login() {
  var body = document.body;
  body.classList.toggle("opened");
}

function contact() {
  window.location.href = "contact.html"
}

function playVideo() {
  var video = document.getElementById("myVideo");
  video.muted = false;
  video.play();
}

window.onload = () => {
  var video = document.getElementById("myVideo");
  video.click();

  var audio = document.getElementById("myAudio");
  audio.play();
};
// Fetching the recipe
async function generateRandomMeal() {
  const response1 = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const data1 = await response1.json();
  const randmeal = data1.meals[0];
  console.log(randmeal);

  displayTheRandMeal(randmeal);
}

async function getFoodBySearchInput(input) {
  const response2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
  );
  const data2 = await response2.json();

  console.log(data2);
}

generateRandomMeal();

function displayTheRandMeal(randommeal) {
  const mealDiv = document.createElement("div");
  const randomMealDiv = document.getElementById("random-meal-div");
  mealDiv.classList.add("random");

  mealDiv.innerHTML = `
    <img src="${randommeal.strMealThumb}" class="rand-meal-img" style="margin: 0">
    <br>
    <span>${randommeal.strMeal}</span>`;

  randomMealDiv.appendChild(mealDiv);
  mealDiv.addEventListener("click", () => {
    recipeInstructionsModal(randommeal);
  })
}
// Fetching the Search Button and Search Value to search and giving functionality
const searchArea = document.getElementById("search-box");
const submitButton = document.getElementById("search-button");
const searchItemDisplay = document.getElementById("search-food-container");

const handleSearch = async () => {
  const searchInput = searchArea.value.trim();

  if (!searchInput) {
    alert("Please enter a Recipe name.");
    return; // Stop further execution if searchInput is empty
  }

  await fetchRecepieByFirstName(searchInput);

  window.scrollBy({
    top: 850,
    behavior: "smooth",
  });
};

submitButton.addEventListener("click", handleSearch);

searchArea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

const fetchRecepieByFirstName = async (name) => {
  const dataFood = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const foodresponse = await dataFood.json();

  const foodDisplayDiv = document.getElementById("search-food-container");
  foodDisplayDiv.innerHTML = "";

  if (!foodresponse.meals || foodresponse.meals.length === 0) {
    // Display a message when no results are found
    foodDisplayDiv.innerHTML = `<p class="error-message">No search results found!</p>`;
    return;
  }

  const foodImgContainer = document.createElement("div");
  foodImgContainer.classList.add("food-img-container");

  foodresponse.meals.forEach((meal) => {
    const individualImages = document.createElement("div");
    individualImages.classList.add("images");
    individualImages.innerHTML = `<img src="${meal.strMealThumb}" alt="" style="width: 200px;"/>
      <h3>${meal.strMeal}</h3>`;
    foodImgContainer.appendChild(individualImages);

    const viewRecipeButton = document.createElement("button");
    viewRecipeButton.type = "button";
    viewRecipeButton.id = "prev-page-btn";
    viewRecipeButton.innerHTML = '<span class="btn-span"></span>Recipe';

    individualImages.appendChild(viewRecipeButton);
    foodImgContainer.appendChild(individualImages);

    viewRecipeButton.addEventListener("click", () => {
      recipeInstructionsModal(meal);
    });
  });

  foodDisplayDiv.appendChild(foodImgContainer);
};

const closeButton = document.getElementById("close-btn");
const recipeInstructions = document.getElementById("recipe-div-content");
const recipeInstructionsContainer = document.getElementById("recipe-details");
const youtubeTutorial = document.getElementById("youtube-vid");
function recipeInstructionsModal(meal) {
  recipeInstructions.innerHTML = `<h2>${
    meal.strMeal
  }</h2><h3>Ingredients:</h3><ul>${IngredientsDisplay(meal)}</ul> <div>
  <h3>Instructions</h3>
  <p class="instructions">${meal.strInstructions}</p>
</div>`;

youtubeTutorial.addEventListener("click", (e) => {
  const videoUrl = `${meal.strYoutube}`;

  // Open the video URL in a new tab
  window.open(videoUrl, "_blank");
});

  recipeInstructionsContainer.style.display = "block";
}


// Display the recipe details and ingredients
const IngredientsDisplay = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

closeButton.addEventListener("click", () => {
  youtubeTutorial.href = '';
  recipeInstructionsContainer.style.display = "none";
  
});

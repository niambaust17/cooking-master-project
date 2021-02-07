const searchBtn = document.getElementById('search');
const mealSearch = document.getElementById('meal-search');
const mealContainer = document.getElementById('meal-container');
const mealDetail = document.getElementById('meal-full-detail');

searchBtn.addEventListener('click', () =>
{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ mealSearch.value }`)
        .then(res => res.json())
        .then(data => showMatchingMeal(data))
        .catch(error => alert('No Food Found'))

    const showMatchingMeal = data =>
    {
        data.meals.forEach(meal =>
        {
            const mealImgSrc = meal.strMealThumb;
            const mealName = meal.strMeal;
            const mealId = meal.idMeal;

            const mealDiv = document.createElement('div');
            mealDiv.className = 'meal';

            const mealInfo = `
            <img onclick="getMealInfo('${ mealId }')" src="${ mealImgSrc }" alt="">
            <p onclick="getMealInfo('${ mealId }')">${ mealName }</p>
            `;

            mealDiv.innerHTML = mealInfo;
            mealContainer.appendChild(mealDiv);
        });
    }
    mealSearch.value = '';
    mealContainer.innerHTML = '';
    mealDetail.innerHTML = '';
});


const getMealInfo = mealId =>
{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ mealId }`)
        .then(res => res.json())
        .then(data => showMealInfo(data.meals[0]));
}


const showMealInfo = meal =>
{
    mealDetailInfo = `
        <img src="${ meal.strMealThumb }" alt="">
        <div class='info'>
            <h5>${ meal.strMeal }</h5>
            <p>Ingredients</p>
            <ul id="ingredients">
                
            </ul>
        </div>
    `;

    mealDetail.innerHTML = mealDetailInfo;

    for (let i = 1; i < 21; i++)
    {
        let li = document.createElement('li');
        let measure = 'strMeasure' + i;
        let ingredient = 'strIngredient' + i;
        if (meal[ingredient] !== '' && meal[ingredient] !== null)
        {
            const ingredientInfo = meal[measure] + '  ' + meal[ingredient];
            li.innerText = ingredientInfo;
            document.getElementById('ingredients').appendChild(li);
        }
    }
}
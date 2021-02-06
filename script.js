const searchBtn = document.getElementById('search');
const mealSearch = document.getElementById('meal-search');
const mealContainer = document.getElementById('meal-container');
const mealDetail = document.getElementById('meal-full-detail');
searchBtn.addEventListener('click', function ()
{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${ mealSearch.value }`)
        .then(res => res.json())
        .then(data => showMatchingMeal(data))
        .catch(error => alert('Give First Letter Only'))

    const showMatchingMeal = data =>
    {
        for (meal of data.meals)
        {
            const mealImgSrc = meal.strMealThumb;
            const mealName = meal.strMeal;
            const mealId = meal.idMeal;
            // console.log(mealId);
            const mealDiv = document.createElement('div');
            mealDiv.className = 'meal';

            const mealInfo = `
            <img onclick="getMealInfo('${ mealId }')" src="${ mealImgSrc }" alt="">
            <p>${ mealName }</p>
            `;
            mealDiv.innerHTML = mealInfo;
            mealContainer.appendChild(mealDiv);
            // console.log(meal);
            // console.log(meal.strMeal);
        }
        // console.log(data.meals[1].strMeal)
    }
    mealSearch.value = '';
});

const getMealInfo = mealId =>
{
    console.log(mealId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ mealId }`)
        .then(res => res.json())
        // console.log(data.meals[0].strMeal)
        .then(data => showMealInfo(data.meals[0]));
}
const showMealInfo = meal =>
{
    mealDetailInfo = `
        <img src="${ meal.strMealThumb }" alt="">
        <div class='info'>
            <h5>${ meal.strMeal }</h5>
            <p>Ingredients</p>
            <ol id="ingredients">
                <li>${ meal.strMeasure1 } ${ meal.strIngredient1 }</li>
                <li>${ meal.strMeasure2 } ${ meal.strIngredient2 }</li>
                <li>${ meal.strMeasure3 } ${ meal.strIngredient3 }</li>
                <li>${ meal.strMeasure4 } ${ meal.strIngredient4 }</li>
                <li>${ meal.strMeasure5 } ${ meal.strIngredient5 }</li>
                <li>${ meal.strMeasure6 } ${ meal.strIngredient6 }</li>
                <li>${ meal.strMeasure7 } ${ meal.strIngredient7 }</li>
                <li>${ meal.strMeasure8 } ${ meal.strIngredient8 }</li>
            </ol>
        </div>
    `;
    mealDetail.innerHTML = mealDetailInfo;
}

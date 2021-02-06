const searchBtn = document.getElementById('search');
const mealSearch = document.getElementById('meal-search');
const mealContainer = document.getElementById('meal-container');
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
            const mealDiv = document.createElement('div');
            mealDiv.className = 'meal';

            const mealInfo = `
            <img onclick="getMealInfo('${ mealId }')" src="${ mealImgSrc }" alt="">
            <p>${ mealName }</p>
            `;
            mealDiv.innerHTML = mealInfo;
            mealContainer.appendChild(mealDiv);
            console.log(meal);
            // console.log(meal.strMeal);
        }
        // console.log(data.meals[1].strMeal)
    }
    mealSearch.value = '';
});

const getMealInfo = mealId =>
{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ mealId }`)
        .then(res => res.json())
        .then(data => console.log(data));
}

export const fetchRecipes = (ingredient) => {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then((response) => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};
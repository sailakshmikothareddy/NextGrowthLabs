const items = document.querySelector('.items')
const loader = document.querySelector(".loader");
let page = 1;
const limit = 10;
const load = async ()=> {

    loader.style.display = "block";
    //fetch api from themealdb.com
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood&page=${page}&per_page=${limit}`)
    const data = await response.json();
    console.log(data.meals);

    data.meals.forEach(food => {
        const item = document.createElement("div");
        item.classList.add('item')
        item.innerHTML = `<img src="${food.strMealThumb}" alt="">
                          <div class="description">
                          <h1>${food.strMeal}</h1>
                                `;
        items.appendChild(item);
    });
    loader.style.display = "none";
    //load first opening data
    page++;
}

load();
//when scroll the page the loader is loading
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    page++;
    load();
  }
  });

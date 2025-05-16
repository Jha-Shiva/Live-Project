const countriesContainer = document.querySelector('.countries-container');
const FilterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input')

let allCountriesData

fetch('https://restcountries.com/v3.1/all')
 .then((res)=> res.json())
 .then((data)=>{
    renderCountries(data)
    allCountriesData = data
})

FilterByRegion.addEventListener('change', (e)=>{
    fetch(`https://restcountries.com/v3.1/region/${FilterByRegion.value}`)
    .then((res)=> res.json())
    .then(renderCountries)
}) 

function renderCountries(data){
    countriesContainer.innerHTML = ''
    data.forEach((country)=>{
        // console.log(country);

        const countryCard = document.createElement('a');
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.classList.add('country-card');

        countryCard.innerHTML =  `
        <img src=${country.flags.svg} alt="${country.name.common} flag">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${(country.population).toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital || 'Not Available'}</p>
            </div>`
        countriesContainer.append(countryCard)
    })
}

searchInput.addEventListener('input', (e)=>{
    const filterdCountries = allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(filterdCountries);
    renderCountries(filterdCountries)
})



const darkToggle = document.querySelector(".header-content p");
const icon = darkToggle.querySelector("i");

const storedTheme = localStorage.getItem("theme");

if (storedTheme === "dark") {
  document.body.classList.add("dark");
  icon.classList.remove("ri-moon-line");
  icon.classList.add("ri-sun-line");
  document.querySelector('.header-content span').textContent = 'Light Mode'
} else {
  document.body.classList.remove("dark");
  icon.classList.remove("ri-sun-line");
  icon.classList.add("ri-moon-line");
  document.querySelector('.header-content span').textContent = 'Dark Mode'

}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  if (isDark) {
    icon.classList.remove("ri-moon-line");
    icon.classList.add("ri-sun-line");
    document.querySelector('.header-content span').textContent = 'Light Mode'

  } else {
    icon.classList.remove("ri-sun-line");
    icon.classList.add("ri-moon-line");
    document.querySelector('.header-content span').textContent = 'Dark Mode'

  }
});




const countryName = new URLSearchParams(location.search).get('name');
const countryContent = document.querySelector('.country-content');


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
 .then((res)=> res.json())
 .then((data)=>{
    data.forEach((country)=>{
        const countryDetails = `
            <div class="country-img">
                <img src=${country.flags.svg} alt="${country.name.common} flag">
            </div>
            <div class="country-info">
                <h2 class="country-title">${country.name.common}</h2>
                <p><b>Native Name: </b>${country.name.nativeName ? Object.values(country.name.nativeName)[0]?.common : country.name.common}</p>
                <p><b>Population: </b>${(country.population).toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Sub Region: </b>${country.subregion || country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0] || "Not Available"}</p>
                <p><b>Top Level Domain: </b>${country.tld.join(', ')}</p>
                <p><b>Currencies: </b>${Object.values(country.currencies || {})?.map((currency)=> currency.name).join(', ') || "Not Available"}</p>
                <p><b>Languages: </b>${Object.values(country.languages || {}).join(', ') || 'Not Available'}</p>
                <div class="border-countries">
                    <p><b>Border Countries: </b>&nbsp; </p>
                </div>
            </div>
`

        countryContent.innerHTML = countryDetails

        
        const borders = country.borders || [];

        if (borders.length > 0) {
          fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(",")}`)
            .then(res => res.json())
            .then(borderCountriesData => {
              const borderHTML = borderCountriesData.map(borderCountry => {
                return `<a href="?name=${borderCountry.name.common}">${borderCountry.name.common}</a>`;
              }).join(" ");
              document.querySelector('.border-countries p').innerHTML += borderHTML;
            });
        } else {
          document.querySelector('.border-countries p').innerHTML += "None";
        }
    
      });
    
 })


const backButton = document.querySelector('.back');
backButton.addEventListener('click',()=>{
  history.back()
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


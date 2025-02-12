const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// fetch grammar have to be reviewed.
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data)); // ...data --> spread. 이거 찾아봐야함.

function findMatches(wordToMatch, cities){
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched.
    
    // regExp --> usage 정리 요망.
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches(){
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regEx = new RegExp(this.value, "gi");
    // console.log(regEx);
    const cityName = place.city.replace(regEx, `<span class="hl">${this.value}</span>`);
    const stateName = place.city.replace(regEx, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class = "name">${cityName}, ${stateName}</span>
        <span class = "population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  });

  suggestions.innerHTML = html.join("");
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

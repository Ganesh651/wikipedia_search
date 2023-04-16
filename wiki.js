const searchInput = document.getElementById("searchInput");
const spinner = document.getElementById("spinner");
const searchResults = document.getElementById("searchResults");

function createAndAppend(results){
    console.log(results)
    let {title, link, description} = results;

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");

    let heading = document.createElement("a");
    heading.textContent = title;
    heading.href = link;
    heading.target = "_blank"
    heading.classList.add("result-title");
    resultContainer.appendChild(heading);

    let brEl = document.createElement("br");
    resultContainer.appendChild(brEl);

    let urlEl = document.createElement("a");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    resultContainer.appendChild(urlEl);

    let breakEl = document.createElement("br");
    resultContainer.appendChild(breakEl);

    let para = document.createElement("p");
    para.textContent = description;
    para.classList.add("link-description");
    resultContainer.appendChild(para);

    searchResults.appendChild(resultContainer);
};

function displayResults(search_results) {
    spinner.classList.add("d-none");
    for (let results of search_results){
        createAndAppend(results)
    };
};

function wikiSearch(event){
    if (event.key === "Enter"){
        searchResults.textContent = "";
        spinner.classList.remove("d-none");
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput.value;
        let option = {
            Method : "GET"
        };
        fetch(url, option)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let {search_results} = jsonData;
            displayResults(search_results);
            searchInput.value = "";
        });
    }
};

searchInput.addEventListener("keydown", wikiSearch);
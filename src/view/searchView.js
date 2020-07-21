export const elements = {
    searchField: document.querySelector(".search__field"),
    resultList: document.querySelector(".results__list"),
    resultsPages: document.querySelector(".results__pages"),
    recipe:document.querySelector('.recipe'),
    shopping:document.querySelector('.shopping__list'),
    likesMenu:document.querySelector('.likes__field'),
    likesList:document.querySelector('.likes__list')
};
export const recipeTitleLimit = (title, limit = 17) => {
    if (title.length > limit) {
        const newTitle = [];
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length < limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(" ")}...`;
    } else {
        return title;
    }
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};


function renderUI(arr) {
    const element = `
    <li>
                    <a class="results__link" href='#${arr.recipe_id}'>
                        <figure class="results__fig">
                            <img src="${arr.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipeTitleLimit(
        arr.title
    )}</h4>
                            <p class="results__author">${arr.publisher}</p>
                        </div>
                    </a>
                </li>
    
    `;
    elements.resultList.insertAdjacentHTML("beforeend", element);
}
const createBtn = (page, type) => ` 
                <button class="btn-inline results__btn--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
    }>
                  <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
                  <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${
    type === "prev" ? "left" : "right"
    }"></use>
                    </svg>
                </button>`;

const renderBtn = (page, noofres, resperpage) => {
    const pages = Math.ceil(noofres / resperpage);
    let btn;
    if (page === 1 && pages > 1) {
        // create btn for next only
        btn = createBtn(page, "next");
    } else if (page < pages) {
        // create both btn
        btn = `${createBtn(page, "next")}${createBtn(page, "prev")}`;
    } else if (page === pages && pages > 1) {
        // create btn for prev only
        btn = createBtn(page, "prev");
    }

    elements.resultsPages.insertAdjacentHTML("afterbegin", btn);
};
export const renderHtml = (arr, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    // console.log(start, end);
    arr.slice(start, end).forEach(renderUI);
    renderBtn(page, arr.length, resPerPage);
};

export const clearInputField = () => {
    elements.searchField.value = "";
};
export const clearHtml = () => {
    elements.resultList.innerHTML = "";
    elements.resultsPages.innerHTML = "";
};


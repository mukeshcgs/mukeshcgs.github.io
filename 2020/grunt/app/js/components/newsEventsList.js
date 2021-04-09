export default class NewsEventsList {
    constructor(el) {
        this.el = el;

        this.init();
    }

    init() {
        console.log("News/Events module init");
        this.attachEvents();
    }

    attachEvents() {
        const loadMoreButton = this.el.querySelector(".jcb-btn-primary"),
            that = this;
        loadMoreButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log('Load more button click');
            that.handleLoadMoreClick();
        });
    }

    handleLoadMoreClick() {
        const endpoint = this.apiEndpoint,
            that = this;
        fetch(endpoint, { method: "GET", credentials: 'include' })
            .then(response => response.json())
            .then(json => {
                that.renderResults(json);
            })
            .then(() => {
                that.removeEnteringClass();
            });
    }

    renderResults(json) {
        if (json.EndOfList) {
            this.el.querySelector(".jcb-btn-primary").style.visibility = "hidden";
        }
            return new Promise((resolve, reject) => {
                const target = this.el.querySelector(".jcb-news-events-list--list-container"),
                    results = json.Articles,
                    resultStr = document.createRange().createContextualFragment(`${results.map((result, index) => `
                  <a class="jcb-news-events-list--item is-entering" href="${result.Url}">
                    <div class="jcb-news-events-list--item--image">
                      <div class="jcb-news-events-list--item--image--inner">
                        <img src="${result.ImageUrl}" alt="@article.Image.AltName">
                      </div>
                    </div>
                    <p class="jcb-news-events-list--item--date">${result.Date}</p>
                    <h3 class="jcb-news-events-list--item--title">${result.Title}</h3>
                    <p class="jcb-news-events-list--item--copy">${result.Intro}</p>
                  </a>
                `).join("")}`);
                target.appendChild(resultStr);
                resolve(true);
            });
    }

    removeEnteringClass() {
        const els = Array.prototype.slice.call(this.el.querySelectorAll(".is-entering"));

        setTimeout(() => {
            for (let e in els) {
                els[e].classList.remove("is-entering");
            }
        }, 1500);
    }

    get apiEndpoint() {
        const endpointBase = this.el.getAttribute("data-endpoint"),
            offset = this.articleOffset,
            get = 7;

        console.log("Loaded list length (offset):", offset);
        console.log("API endpoint to be fetched:", `${endpointBase}/${offset}/${get}`);
        return `${endpointBase}/${offset}/${get}`;
    }

    get articleOffset() {
        return this.el.querySelectorAll(".jcb-news-events-list--item").length;
    }

}

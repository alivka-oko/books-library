import { DivComponent } from "../../common/div-component";
import "./pagination.css";

export class Pagination extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  render() {
    this.el.classList.add("pagination");
    this.el.innerHTML = `
          <button class="pagination__button" id="pagination-previous">
             Предыдущая страница
          </button>
          <button class="pagination__button" id="pagination-next">
             Следующая страница
          </button>
    `;
    const previousButton = this.el.querySelector("#pagination-previous");
    const nextButton = this.el.querySelector("#pagination-next");

    previousButton.disabled = true;
    if (
      this.state.list.length < this.state.limit ||
      this.state.list.length === this.state.numFound
    ) {
      nextButton.disabled = true;
    }
    if (this.state.page > 1) {
      previousButton.disabled = false;
    }

    this.el.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        return;
      }
      const purposeOfButton = e.target.id;
      if (purposeOfButton === "pagination-previous") {
        this.state.page > 1 ? this.state.page-- : this.state.page;
      } else if (purposeOfButton === "pagination-next") {
        if (this.state.numFound > this.state.limit) {
          this.state.page++;
        }
      }
    });
    return this.el;
  }
}

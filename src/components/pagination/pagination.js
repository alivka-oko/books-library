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
          <button class="pagination__button" id="pagination-before">
             Предыдущая страница
          </button>
          <button class="pagination__button" id="pagination-next">
             Следующая страница
          </button>
    `;
    this.el.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        return;
      }
      const purposeOfButton = e.target.id;
      if (purposeOfButton === "pagination-before") {
        this.state.page > 1 ? this.state.page-- : this.state.page;
      } else if (purposeOfButton === "pagination-next") {
        this.state.page++;
      }
    });
    return this.el;
  }
}

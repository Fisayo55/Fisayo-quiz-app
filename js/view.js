class ResultView {
  _data;
  parentEl = document.querySelector('.container');
  question = document.querySelector('.question-container');
  form = document.querySelector('.start-button');
  error = `😔Sorry, We could not find questions on your preferred category, Please reload
  this page and try again.`;
  spinner = document.querySelector('.loader-container');

  addHandlerClickBegin(handler) {
    document.querySelector('.btn-play').addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerClickNewGame() {
    document
      .querySelector('.container')
      .addEventListener('click', function (e) {
        const reloadPage = e.target.closest('.new-game');
        if (!reloadPage) return;
        location.reload(reloadPage);
      });
  }
  Render(data) {
    this._data = data;
    this.RenderQuestion(data);
  }

  RenderQuestion(response) {
    const markup = response.map(i => {
      return `
      <h2 id="question">${i.question}</h2>
      `;
    });
    this.form.innerHTML = '';
    this.question.innerHTML = '';
    this.question.insertAdjacentHTML('afterbegin', markup);
  }
  RenderError(err = this.error) {
    const markUp = `
    <div class="errorMessage">
    <div class="error">
      <h4 class="error-text">${this.error}</h4>
    </div>
  </div>
    `;
    this.form.innerHTML = '';
    this.parentEl.innerHTML = '';
    this.parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  RenderSpinner() {
    const spinner = ` 
    <div class="loader"></div>
      `;
    this.form.insertAdjacentHTML('afterbegin', spinner);
  }
}
export default new ResultView();

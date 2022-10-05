import * as model from './model.js';
let Score = 0;
class pagination {
  parentEl = document.querySelector('.container');
  answers = document.querySelector('.list-container');
  information = document.querySelector('.info');

  addHandlerClick(handler) {
    this.answers.addEventListener('click', function (e) {
      const btn = e.target.closest('.answer-text');
      if (!btn) return;
      const correctAnswer = model.state.value.answers
        .map((i, v, arr) => arr[model.state.value.page - 1])
        .slice(0, 1)
        .join('');

      btn.textContent === correctAnswer
        ? `${(btn.style.backgroundColor = '#28a745')}  ${(Score += 10)}`
        : (btn.style.backgroundColor = '#dc3545');
      const goToPage = +btn.dataset.set;
      setTimeout(() => {
        handler(goToPage);
      }, 1000);
    });
  }

  RenderAnswer(response) {
    const curPage = model.state.value.page;
    const numPages = Math.ceil(model.state.value.result.length / 1);

    if (curPage > numPages) {
      this.RenderSuccessMessage(numPages);
    }

    this.RenderInformation(curPage, numPages, Score);

    const markup = response.map(i => {
      if (i.answers.length === 2) {
        return `
        <div class="answer-container">
        <p class="answer-prefix">A</p>
        <p class="answer-text" data-set="${curPage + 1}" data-number="1">${
          i.answers[0]
        }</p>
      </div>
      <div class="answer-container">
        <p class="answer-prefix">B</p>
        <p class="answer-text" data-set="${curPage + 1}" data-number="2">${
          i.answers[1]
        }</p>
      </div>
          `;
      } else {
        return `
    
      <div class="answer-container">
            <p class="answer-prefix">A</p>
            <p class="answer-text" data-set="${curPage + 1}" data-number="1">${
          i.answers[0]
        }</p>
          </div>
          <div class="answer-container">
            <p class="answer-prefix">B</p>
            <p class="answer-text" data-set="${curPage + 1}" data-number="2">${
          i.answers[1]
        }</p>
          </div>
          <div class="answer-container">
            <p class="answer-prefix">C</p>
            <p class="answer-text" data-set="${curPage + 1}" data-number="3">${
          i.answers[2]
        }</p>
          </div>
          <div class="answer-container">
            <p class="answer-prefix">D</p>
            <p class="answer-text" data-set="${curPage + 1}" data-number="4">${
          i.answers[3]
        }</p>
          </div>  
      `;
      }
    });
    this.answers.innerHTML = '';
    this.answers.insertAdjacentHTML('afterbegin', markup);
  }
  RenderInformation(cur, num, scr) {
    const Markup = `
  
    <div class="question-number">
      <p class="text-info">Question:</p>
      <p class="question-text">${cur} / ${num}</p>
    </div>
    <div class="Score-number">
      <p class="text-info">Points:</p>
      <p class="score-text">${scr}</p>
    </div>
    `;
    this.information.innerHTML = '';
    this.information.insertAdjacentHTML('afterbegin', Markup);
  }

  RenderSuccessMessage(totalPage) {
    const markup = `
    <div class="success-message">
        <h1>Quiz Result</h1>
        <div class="emoji-container">
          <h1>🏆</h1>
        </div>
        <h2>Congratulations!</h2>
        <p class = "center-page">Congratulations on successfully completing this quiz</p>
        <p>YOUR SCORE</p>
        <p><span class="realscore">${((Score / 10 / totalPage) * 100).toFixed(
          0
        )}%</p>
        <p>${Score / 10} out of ${totalPage}</p>
        <button class="new-game btn-active">New Quiz Game</button>
    </div>
    `;
    this.parentEl.innerHTML = '';
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
export default new pagination();

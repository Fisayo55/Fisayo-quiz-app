export const state = {
  selectedValueCategory() {
    return +document.querySelector('#category').value;
  },
  selectedValueNumber() {
    return +document.querySelector('#form-number').value;
  },
  selectedValueDificulty() {
    return document.querySelector('#form-difficulty').value;
  },
  selectedValueType() {
    return document.querySelector('#form-type').value;
  },
  value: {
    result: [],
    answers: [],
    page: 1,
  },
};

export const loadQuizAPI = async function (number, category, difficulty, type) {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`
    );
    const data = await response.json();
    state.value.result = data.results.map(i => {
      return {
        category: i.category,
        difficulty: i.difficulty,
        incorrectAnswers: i.incorrect_answers,
        correctAnswer: i.correct_answer,
        type: i.type,
        question: i.question,
        answers: [i.correct_answer, ...i.incorrect_answers].sort(),
      };
    });
    state.value.answers = state.value.result.map(i => i.correctAnswer);
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (pages = state.value.page) {
  state.value.page = pages;

  if (state.value.result.length === 0) {
    throw new Error();
  }

  const start = (pages - 1) * 1;
  const end = pages * 1;

  return state.value.result.slice(start, end);
};

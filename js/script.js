import ResultView from './view.js';
import pagination from './pagination.js';
import * as model from './model.js';

const getDataApi = async function () {
  try {
    // displaying spinner
    ResultView.RenderSpinner();

    // loading quiz Api
    await model.loadQuizAPI(
      model.state.selectedValueNumber(),
      model.state.selectedValueCategory(),
      model.state.selectedValueDificulty(),
      model.state.selectedValueType()
    );

    // Render Results
    ResultView.Render(model.getSearchResultsPage());

    //Render results questions
    pagination.RenderAnswer(model.getSearchResultsPage());
  } catch (err) {
    ResultView.RenderError(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  ResultView.Render(model.getSearchResultsPage(goToPage));

  // 2) Render new results questions
  pagination.RenderAnswer(model.getSearchResultsPage(goToPage));
};

const innit = function () {
  ResultView.addHandlerClickBegin(getDataApi);
  pagination.addHandlerClick(controlPagination);
  ResultView.addHandlerClickNewGame();
};
innit();

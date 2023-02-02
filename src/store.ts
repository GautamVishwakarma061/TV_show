import { LOAD_SHOW_ACTION } from "./Actions/Shows";
import createSagaMiddleware from "@redux-saga/core";
import { fetchShowDetail, fetchShows } from "./Sagas/Shows";
import { debounce, takeEvery } from "redux-saga/effects";
import { configureStore } from "@reduxjs/toolkit";
import { showsQueryChangeAction } from "./slices/shows";
import showsReducer from "./slices/shows";

function* rootSaga() {
  yield debounce(200, showsQueryChangeAction, fetchShows);
  yield takeEvery(LOAD_SHOW_ACTION, fetchShowDetail);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { shows: showsReducer },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export type State = ReturnType<typeof store.getState>;

export default store;

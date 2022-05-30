import { put, takeLatest, all } from "redux-saga/effects";
function* fetchNews() {
  const json = yield fetch("https://www.google.lk/").then((response) => response.json());
  yield put({ type: "DATA_RECEIVED", json: json.articles });
}
function* actionWatcher() {
  yield takeLatest("GET_DATA", fetchNews);
}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}

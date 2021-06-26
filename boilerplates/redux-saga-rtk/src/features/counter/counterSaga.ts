import { all, call, put, takeEvery } from 'redux-saga/effects';
import { setCount, setCountSuccess } from './counterSlice';

function sleep(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function* handleSetCount() {
  yield call(sleep, 2000);
  yield put(setCountSuccess(1000));
}

function* watchSetCount() {
  yield takeEvery(setCount.type, handleSetCount);
}

export default function* counterSaga(): Generator {
  yield all([watchSetCount()]);
}

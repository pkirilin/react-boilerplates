import { all } from 'redux-saga/effects';
import counterSaga from '../features/counter/counter.saga';

export default function* rootSaga(): Generator {
  yield all([counterSaga()]);
}

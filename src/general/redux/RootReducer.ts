import { History } from 'history';
import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';
import { AnyAction } from 'redux';

const initialState = {
  user: {},
  assessment: {
    fill: 1
  }
}

export default function createReducer(history: History) {

  const routerWithHistory = connectRouter(history);

  return (state = initialState, action: AnyAction) => {

    if (action.type === LOCATION_CHANGE) {
      return {
        ...state,
        router: routerWithHistory(action.payload, action),
      }
    }

    if (action.meta && action.meta.reducer) {
      return action.meta.reducer(state, action);
    }

    return state;

  }

}
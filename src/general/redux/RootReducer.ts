import { History } from 'history';
import { connectRouter, LOCATION_CHANGE } from 'connected-react-router';
import { AnyAction } from 'redux';

export type StoreType = {
  user: object;
  menuOptions: { context: string; active: boolean }[];
};

const initialState = {
  user: {},
  menuOptions: [
    { context: 'Produto', active: true },
    { context: 'Estagio do Produto', active: false },
    { context: 'Avaliação', active: false },
  ],
};

export default function createReducer(history: History) {
  const routerWithHistory = connectRouter(history);

  return (state: StoreType = initialState, action: AnyAction) => {
    if (action.type === LOCATION_CHANGE) {
      return {
        ...state,
        router: routerWithHistory(action.payload, action),
      };
    }

    if (action.meta && action.meta.reducer) {
      return action.meta.reducer(state, action);
    }

    return state;
  };
}

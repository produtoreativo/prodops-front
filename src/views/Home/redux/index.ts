import { AnyAction, Dispatch, bindActionCreators } from 'redux';

export const stages = [
  { name: 'Ideation', value: 1},
  { name: 'Operation', value: 2},
  { name: 'Traction', value: 3},
]

export interface RootStateAssessment {
  assessment: {
    fill: number
  },
  stages: [],
  stageValue: number,
  stageChange: any
}

interface Payload {

}

export function reducer(state: RootStateAssessment, action: AnyAction) {

  return state;
}

const stageChange = (payload: Payload) => {
  return {
    type: '',
    payload,
    meta: {
      reducer,
    }
  }
}

export const createActions = (dispatch: Dispatch) => {
  return bindActionCreators({stageChange}, dispatch);
}



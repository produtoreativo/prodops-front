import { AnyAction, Dispatch, bindActionCreators } from 'redux';

const ASSESSMENT_CHANGE_VALUE = 'ASSESSMENT_CHANGE_VALUE';

export const stages = [
  { name: 'Ideation', value: 1},
  { name: 'Operation', value: 2},
  { name: 'Traction', value: 3},
]

export type RootStateAssessment = {
  assessment: {
    fill: number
  },
  stages: {name: string, value: number}[],
  stageValue: number,
  stageChange: any,
  goNext: any,
}

type Payload = {

}

const defaultState: RootStateAssessment = {
  assessment: { fill: 1 },
  stages: stages,
  stageValue: 1,
  stageChange: null,
  goNext: null,
}

export function reducer(state: RootStateAssessment, action: AnyAction) {
  switch (action.type) {
    case ASSESSMENT_CHANGE_VALUE:
      //debugger;
      return {
        ...state,
        ...defaultState,
        ...action.payload,
      }
      break;
  
    default:
      break;
  }
  return state;
}

export const mapAssessmentToProps = (state: RootStateAssessment) => state.assessment || { fill: 1};
export const mapStagesToProps = (state: RootStateAssessment) => state.stages || stages;
export const mapStageValueToProps = (state: RootStateAssessment) => state.stageValue || 1;

const stageChange = (payload: Payload) => {
  return {
    type: ASSESSMENT_CHANGE_VALUE,
    payload,
    meta: {
      reducer,
    }
  }
}

export const createActions = (dispatch: Dispatch) => {
  return bindActionCreators({stageChange}, dispatch);
}



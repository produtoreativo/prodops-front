import { AnyAction, Dispatch, bindActionCreators } from 'redux';
export const ASSESSMENT_CHANGE_VALUE = 'ASSESSMENT_CHANGE_VALUE';
export const ASSESSMENT_SAVE_STEP = 'ASSESSMENT_SAVE_STEP';


export const stages = [
  { name: '-', value: 100},
  { name: 'Ideation', value: 1},
  { name: 'Operation', value: 2},
  { name: 'Traction', value: 3},
  { name: 'Scaling', value: 4},
  { name: 'Establishing', value: 5},
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
  stages: { name: string, value: number}[],
  stageValue: number,
  stageChange: any,
  goNext: any,
}

const defaultState: RootStateAssessment = {
  stages,
  assessment: { fill: 0.5 },
  stageValue: 100,
  stageChange: null,
  goNext: null,
}

export const mapAssessmentToProps = (state: RootStateAssessment) => state.assessment || defaultState.assessment;
export const mapStagesToProps = (state: RootStateAssessment) => state.stages || stages;
export const mapStageValueToProps = (state: RootStateAssessment) => state.stageValue ||  1;


type Transform = {
  stageValue: number
}

export function reducer(state: RootStateAssessment, action: AnyAction) {
  switch (action.type) {
    case ASSESSMENT_CHANGE_VALUE:
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

const stageChange = (payload: Payload) => {
  return {
    type: ASSESSMENT_CHANGE_VALUE,
    payload,
    meta: {
      reducer,
    }
  }
}

const goNext = () => {
  return {
    type: ASSESSMENT_SAVE_STEP
  }
}

export const createActions = (dispatch: Dispatch) => {
  return bindActionCreators({
    stageChange,
    goNext,
  }, dispatch);
}



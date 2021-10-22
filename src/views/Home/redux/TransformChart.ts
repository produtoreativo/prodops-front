import { RootStateAssessment } from '../redux';

type Transform = {
  stageValue: number
}


function TransformChart(defaultState: RootStateAssessment, payload : Transform) {

  if (payload.stageValue === 3) {

    return {
      fill: 1
    }
  }

  return defaultState.assessment;

}
import { useSelector, useDispatch } from 'react-redux';
import Assessment from './Assessment';
import { RootStateAssessment, createActions } from './redux';

const mapStateToProps = (state: RootStateAssessment) => state.assessment;

export default function Container() {

  const assessment = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const actions = createActions(dispatch);

  return (
    <div>
      <Assessment 
        stageValue={1}
        stages={[]} 
        assessment={assessment} 
        stageChange={actions.stageChange} 
      />
    </div>
  )
}

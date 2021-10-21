import React from 'react';
import { useStore, useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { History } from 'history';
import { Task, Saga } from 'redux-saga';
import Assessment from './Assessment';
import {
  createActions,
  mapAssessmentToProps,
  mapStagesToProps,
  mapStageValueToProps,
} from './redux';
import watchSave from './redux/sagas/save';
import { StoreApp } from 'general/Store';

interface HistoryProps {
  history: History
}

//

export default function Container(props: HistoryProps) {
  const store = useStore();
  const [task, setTask] = React.useState<Task>();

  const history = props.history;
  function goNext() {
    history.push('/modb')
  }

  const assessment = useSelector(mapAssessmentToProps);
  const stageValue = useSelector(mapStageValueToProps);
  const stages = useSelector(mapStagesToProps);
  const dispatch = useDispatch();
  const actions = createActions(dispatch);
/*
  React.useEffect(() => {
    console.log('componentDidMount', store);
    const taskNew = store.runSaga(watchSave);
    setTask(taskNew);
    return () => {
      console.log('componentWillUnmount');
      //dispatch( unmount() )
      if(task) {
        console.log('o que eh task', task)
        task.cancel();
      }
    }

  }, []);
  */

  return (
    <div>
      <Assessment 
        goNext={goNext}
        stageValue={stageValue}
        stages={stages} 
        assessment={assessment} 
        stageChange={actions.stageChange} 
      />
    </div>
  )
}

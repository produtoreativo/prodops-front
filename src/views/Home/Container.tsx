import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStore } from 'general/hooks/useStore';
import Assessment from './Assessment';
import { 
  createActions,
  mapAssessmentToProps,
  mapStagesToProps,
  mapStageValueToProps,
} from './redux';

import watchSave from './redux/sagas/save';
import { StoreApp } from 'general/Store';

import rootSaga from './redux/sagas/root';
import { HistoryProps } from 'general/types/HistoryType';
import { Task } from '@redux-saga/types';

export default function Container(props: HistoryProps) {
  const [task, setTask] = useState<Task>();
  const store = useStore();

  const assessment = useSelector(mapAssessmentToProps);
  const stages = useSelector(mapStagesToProps);
  const stageValue = useSelector(mapStageValueToProps);

  const dispatch = useDispatch();
  const actions = createActions(dispatch);

  useEffect(() => {
    console.log('componentDidMount', store);
    const taskRunning = store.runSaga(rootSaga);
    //debugger
    setTask(taskRunning);
    return () => {
      console.log('componentWillUnmount');
      if(task) {
        console.log('o que eh task', task)
        task.cancel();
      }
    };
  }, [store]);

  return (
    <div>
      <Assessment 
        stageValue={stageValue}
        stages={stages} 
        assessment={assessment} 
        stageChange={actions.stageChange}
        goNext={actions.goNext} 
      />
    </div>
  )
}

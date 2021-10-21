import { Button } from '@mui/material'
import { History } from 'history';

interface HistoryProps {
  history: History
}

export default function Container(props: HistoryProps) {
  const history = props.history;
  function goHome() {
    history.push('/home')
  }
  return (
    <div>
      Container do mod B
      <Button onClick={goHome}>Voltar pra Home</Button>
    </div>
  )
}

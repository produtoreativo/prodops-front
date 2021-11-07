import { Button } from '@mui/material'
import { HistoryProps } from 'general/types/HistoryType';

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

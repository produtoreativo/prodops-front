import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stages from 'components/Stages';
import Sidebar from './Sidebar';

import { RootStateAssessment } from './redux';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Assessment(props: RootStateAssessment) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <Sidebar {...props} />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <Stages stage={props.stageValue} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

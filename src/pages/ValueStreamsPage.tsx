import { Box, Typography } from '@mui/material';

import ValueStreams from '../components/ValueStream';

const ValueStreamsPage = () => {
  return (
    <Box sx={{ height: 'inherit', width: 'inherit' }}>
      <Typography variant="h3" gutterBottom>
        Value Streams
      </Typography>
      <Box sx={{ height: '90%' }}>
        <ValueStreams />
      </Box>
    </Box>
  );
};

export default ValueStreamsPage;

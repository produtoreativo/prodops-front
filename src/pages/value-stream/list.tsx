import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getValueStreamsRequest, removeValueStreamsRequest } from '../../api';
import TableCellActions from '../../components/TableCellActions';

const ValueStreamsListPage = () => {
  const history = useHistory()
  const [valueStreams, setValueStreams] = useState<Array<{ id: string; name: string }>>([]);

  async function getValuesStreams() {
    try {
      const list = await getValueStreamsRequest();
      setValueStreams(list);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteRecord(id: string) {
    try {
      const response = await removeValueStreamsRequest(id);
      getValuesStreams();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditRecord(id: string) {
    try {
      history.push(`/value_streams/${id}/edit`)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getValuesStreams();
  }, []);

  return (
    <Box sx={{ height: 'inherit', width: 'inherit' }}>
      <Typography variant="h3" gutterBottom>
        Value Streams
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Button variant="contained" component={Link} to="/value_streams/new">
          New
        </Button>
      </Box>
      <Box sx={{ height: '90%' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="value stream table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {valueStreams.map((valueStream) => (
                <TableRow
                  key={valueStream.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {valueStream.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {valueStream.name || 'No name defined'}
                  </TableCell>
                  <TableCellActions
                    id={valueStream.id}
                    handleEditRecord={handleEditRecord}
                    handleDeleteRecord={handleDeleteRecord}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ValueStreamsListPage;
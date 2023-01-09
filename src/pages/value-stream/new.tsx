import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MarkerType } from 'reactflow';
import { getValueStreamsRequest } from '../../api';
import ValueStreamForm from '../../components/ValueStreamForm';

const ValueStreamsPage = () => {
  const params = useParams<{ id: string }>();

  const [valueStream, setValueStream] = useState({ name: '', nodes: [], edges: [] });

  async function getValueStream() {
    if (params.id) {
      const vs = await getValueStreamsRequest(params.id);
      // map vs to canvas
      vs.nodes = vs.nodes.map((node: any) => ({
        id: node.id,
        position: node.position,
        className: node.type,
        data: { label: node.label },
      }));
      vs.edges = vs.edges.map((edge: any) => ({
        id: edge.id,
        source: edge.source.id,
        target: edge.target.id,
        type: 'step',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#000',
        },
        style: {
          stroke: '#000',
        },
      }));
      setValueStream(vs)
    }
  }

  useEffect(() => {
    getValueStream();
  }, []);

  if(params.id && !valueStream.name) return <p>Loading...</p>

  return (
    <Box sx={{ height: 'inherit', width: 'inherit' }}>
      <Typography variant="h3" gutterBottom>
        Value Streams
      </Typography>
      <Box sx={{ height: '80%' }}>
        <ValueStreamForm valueStream={valueStream} />
      </Box>
    </Box>
  );
};

export default ValueStreamsPage;

import { Box, Typography } from '@mui/material';
import React from 'react';
import { Edge, MarkerType, Node } from 'reactflow';
import { getScan } from '../api';

import ValueStreamsShow from '../components/ValueStreamShow';

const mapToFlow = (data: any) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const generatePosition = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  });

  nodes.push({
    width: 150,
    height: 130,
    id: '' + data.provider.id,
    data: {
      label: data.provider.name,
    },
    className: 'contact_point',
    position: generatePosition(),
  });
  for (const resource of data.resources) {
    const { Region, ResourceType, Service } = resource.scanContent;
    nodes.push({
      width: 150,
      height: 130,
      id: resource.scanContent.Arn,
      data: {
        label: `[${Region}] (${Service}) {${ResourceType}}`,
      },
      className: 'service',
      position: generatePosition(),
    });
    edges.push({
      source: '' + data.provider.id,
      sourceHandle: null,
      target: resource.scanContent.Arn,
      targetHandle: null,
      type: 'step',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#000',
      },
      style: {
        stroke: '#000',
      },
      id: `${data.provider.id}_${resource.scanContent.Arn}`,
    });
  }

  return {
    nodes,
    edges,
  };
};

const ValueStreamsPage = () => {
  const [data, setData] = React.useState({ edges: [], nodes: [] });
  const [loading, setLoading] = React.useState(true);

  async function getData() {
    try {
      const data = await getScan(1);
      setData(mapToFlow(data) as any);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getData()
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Box sx={{ height: 'inherit', width: 'inherit' }}>
      <Typography variant="h3" gutterBottom>
        Value Streams
      </Typography>
      <Box sx={{ height: '90%' }}>
        <ValueStreamsShow edgesParam={data.edges} nodesParam={data.nodes} />
      </Box>
    </Box>
  );
};

export default ValueStreamsPage;

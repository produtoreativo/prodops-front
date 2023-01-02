import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from 'reactflow';

import 'reactflow/dist/style.css';
import './ValueStream.css';

// const flowKey = 'example-flow';

const getNodeId = () => `node_${+new Date()}`;

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const ComponentDialogForm = ({ addNodeCb }: { addNodeCb: (params: any) => void }) => {
  const initState = { component: '', label: '' };

  const [open, setOpen] = useState(false);
  const [componentData, setComponentData] = useState(initState);

  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const handleComponentCreation = () => {
    addNodeCb({ ...componentData });
    setComponentData(initState);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        + Component
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{'Component Info'}</DialogTitle>
        <DialogContent>
          <Box component="form">
            <Box>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <RadioGroup
                  value={componentData.component}
                  onChange={(e) => {
                    setComponentData((prev) => ({ ...prev, component: e.target.value }));
                  }}
                >
                  <FormControlLabel
                    value="contact_point"
                    control={<Radio />}
                    label="Contact Point"
                  />
                  <FormControlLabel value="service" control={<Radio />} label="Service" />
                  <FormControlLabel value="application" control={<Radio />} label="Application" />
                  <FormControlLabel value="product" control={<Radio />} label="Product" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Text"
                variant="outlined"
                onChange={(e) => {
                  setComponentData((prev) => ({ ...prev, label: e.target.value }));
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleComponentCreation} autoFocus>
            Add
          </Button>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const ValueStream = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();
  // const { setViewport } = useReactFlow();

  function createComponent(params: { component: string; label: string }) {
    const newNode: Node = {
      id: getNodeId(),
      data: { label: params.label },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    newNode.className = params['component'] || '';
    return newNode;
  }

  function customEdge() {
    return {
      type: 'step',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#000',
      },
      style: {
        stroke: '#000',
      },
    };
  }

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            ...customEdge(),
          },
          eds
        )
      ),
    [setEdges]
  );

  const addNode = useCallback(
    (params: any) => {
      const newNode: Node = createComponent(params);
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // const onSave = useCallback(() => {
  //   if (rfInstance) {
  //     const flow = rfInstance.toObject();
  //     localStorage.setItem(flowKey, JSON.stringify(flow));
  //   }
  // }, [rfInstance]);

  return (
    <Grid style={{ height: '100%' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setRfInstance}
          deleteKeyCode={'Delete'}
        >
          <div className="save__controls">
            <Box sx={{ display: 'flex' }}>
              <Box>
                <ComponentDialogForm addNodeCb={addNode} />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (rfInstance) {
                      const flow = rfInstance.toObject();
                      console.log(JSON.stringify(flow, null, 2));
                    }
                  }}
                >
                  + Save
                </Button>
              </Box>
            </Box>
          </div>
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </Grid>
  );
};

export default ValueStream;

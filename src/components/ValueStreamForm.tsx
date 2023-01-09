import {
  Box,
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
  RadioGroup,
  TextField,
} from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  Node,
  ReactFlow,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { saveValueStreamRequest, updateValueStreamRequest } from '../api';

import './ValueStreamForm.css';

const DialogForm = ({ addNodeCb }: { addNodeCb: (params: any) => void }) => {
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
                autoComplete="true"
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

type ValueStreamFormInput = {
  valueStream?: {
    id?: string;
    name: string;
    nodes: Array<Node>;
    edges: Array<Edge>;
  };
};

const ValueStreamForm: FC<ValueStreamFormInput> = ({ valueStream }) => {
  const history = useHistory();

  const [canvasName, setCanvasName] = useState(valueStream?.name || '');

  const [nodes, setNodes, onNodesChange] = useNodesState(valueStream?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(valueStream?.edges || []);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();
  // const { setViewport } = useReactFlow();

  function createComponent(params: { component: string; label: string }) {
    const newNode: Node = {
      id: uuidv4(),
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

  const onSave = async () => {
    if (rfInstance) {
      try {
        const flow = rfInstance.toObject();

        if (!canvasName.trim()) return false;
        if (!flow.nodes.length) return false;

        const params = { name: canvasName, ...flow };

        if (valueStream && valueStream.id) {
         // update req
         await updateValueStreamRequest({id: valueStream.id, ...params})
        }else{
          await saveValueStreamRequest(params);
        }

        setNodes([]);
        setEdges([]);
        history.push('/value_streams');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid style={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TextField
          label="Canvas name"
          value={canvasName}
          variant="outlined"
          onChange={(e) => {
            setCanvasName(e.target.value);
          }}
        />
      </Box>
      <ReactFlowProvider>
        <ReactFlow
          fitView
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
                <DialogForm addNodeCb={addNode} />
              </Box>
              <Box>
                <Button variant="contained" onClick={onSave}>
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

export default ValueStreamForm;

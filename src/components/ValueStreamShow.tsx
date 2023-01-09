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
  RadioGroup,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { FC, useCallback, useState } from 'react';
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
  useNodesState,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './ValueStreamForm.css';

// const flowKey = 'example-flow';

const req_data = {
  id: 1,
  name: 'jack-doe-scan-1',
  provider: {
    id: 1,
    name: 'amazon',
    content: '',
  },
  resourceView: {
    id: 1,
    name: 'jack-doe-rv-1234',
    arn: 'arn:aws:resource-explorer-2:us-east-1:513154394236:view/jack-doe-rv-1234/c6353db8-42db-4196-9f72-aa40c9697227',
  },
  resources: [
    {
      id: 1,
      name: 'arn:aws:ec2:ap-northeast-1:513154394236:security-group-rule/sgr-0c77edd5bfded7377',
      scanContent: {
        Arn: 'arn:aws:ec2:ap-northeast-1:513154394236:security-group-rule/sgr-0c77edd5bfded7377',
        LastReportedAt: '2022-12-31T12:53:03.000Z',
        OwningAccountId: '513154394236',
        Properties: [],
        Region: 'ap-northeast-1',
        ResourceType: 'ec2:security-group-rule',
        Service: 'ec2',
      },
    },
    {
      id: 2,
      name: 'arn:aws:ec2:ap-southeast-2:513154394236:subnet/subnet-022a491b94a4d9253',
      scanContent: {
        Arn: 'arn:aws:ec2:ap-southeast-2:513154394236:subnet/subnet-022a491b94a4d9253',
        LastReportedAt: '2023-01-01T13:59:23.000Z',
        OwningAccountId: '513154394236',
        Properties: [],
        Region: 'ap-southeast-2',
        ResourceType: 'ec2:subnet',
        Service: 'ec2',
      },
    },
    {
      id: 3,
      name: 'arn:aws:ec2:us-west-1:513154394236:subnet/subnet-09480c69c6c7b1c6f',
      scanContent: {
        Arn: 'arn:aws:ec2:us-west-1:513154394236:subnet/subnet-09480c69c6c7b1c6f',
        LastReportedAt: '2023-01-02T03:21:12.000Z',
        OwningAccountId: '513154394236',
        Properties: [],
        Region: 'us-west-1',
        ResourceType: 'ec2:subnet',
        Service: 'ec2',
      },
    },
    {
      id: 4,
      name: 'arn:aws:ec2:us-east-1:513154394236:security-group/sg-0469140e79015ce38',
      scanContent: {
        Arn: 'arn:aws:ec2:us-east-1:513154394236:security-group/sg-0469140e79015ce38',
        LastReportedAt: '2023-01-02T01:52:59.000Z',
        OwningAccountId: '513154394236',
        Properties: [],
        Region: 'us-east-1',
        ResourceType: 'ec2:security-group',
        Service: 'ec2',
      },
    },
  ],
};



const getNodeId = () => `node_${+new Date()}`;

const initialNodes: Node[] =

  [
    // {
    //   "width": 150,
    //   "height": 130,
    //   "id": "node_1672840143984",
    //   "data": {
    //     "label": "start here"
    //   },
    //   "position": {
    //     "x": 743.0840131136266,
    //     "y": 442.59902753052006
    //   },
    //   "className": "contact_point",
    //   "positionAbsolute": {
    //     "x": 743.0840131136266,
    //     "y": 442.59902753052006
    //   }
    // },
    // {
    //   "width": 150,
    //   "height": 66,
    //   "id": "node_1672840202005",
    //   "data": {
    //     "label": "EC2"
    //   },
    //   "position": {
    //     "x": 564.0285833545963,
    //     "y": 642.6122019085728
    //   },
    //   "className": "service",
    //   "selected": true,
    //   "positionAbsolute": {
    //     "x": 564.0285833545963,
    //     "y": 642.6122019085728
    //   },
    //   "dragging": false
    // }
  ];

const initialEdges: Edge[] =   [
  // {
  //   "source": "node_1672840143984",
  //   "sourceHandle": null,
  //   "target": "node_1672840202005",
  //   "targetHandle": null,
  //   "type": "step",
  //   "markerEnd": {
  //     type: MarkerType.ArrowClosed,
  //     "color": "#000"
  //   },
  //   "style": {
  //     "stroke": "#000"
  //   },
  //   "id": "reactflow__edge-node_1672840143984-node_1672840202005"
  // }
];

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

interface ValueStreamParams {
  edgesParam: Array<Edge>;
  nodesParam: Array<Node>;
}

const ValueStreamShow: FC<ValueStreamParams> = ({edgesParam, nodesParam}) => {


  const [nodes, setNodes, onNodesChange] = useNodesState(nodesParam );
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesParam);
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

export default ValueStreamShow;

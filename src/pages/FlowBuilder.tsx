import React, { useCallback, useState } from 'react';
import { Button, Input, message, Space } from 'antd';
import { SaveOutlined, CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNodeComponent from '@/container/FlowBuilder/ReactFlowCustomNode';
import { NODE_TYPES } from '@/types/flow.types';

interface FlowNode extends Node {
  data: {
    label: string;
    type: string;
  };
}

const nodeTypes: NodeTypes = {
  custom: CustomNodeComponent as any,
};

const initialNodes: FlowNode[] = [
  {
    id: 'start-1',
    type: 'custom',
    position: { x: 250, y: 50 },
    data: { label: 'Start Flow', type: 'start' },
  },
  {
    id: 'trigger-1',
    type: 'custom',
    position: { x: 50, y: 200 },
    data: { label: 'trigger node', type: 'trigger' },
  },
  {
    id: 'question-1',
    type: 'custom',
    position: { x: 450, y: 200 },
    data: { label: 'question node', type: 'ask_question' },
  },
  {
    id: 'condition-1',
    type: 'custom',
    position: { x: 250, y: 400 },
    data: { label: 'condition node', type: 'condition' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'start-1', target: 'trigger-1', animated: true },
  { id: 'e1-3', source: 'start-1', target: 'question-1', animated: true },
  { id: 'e3-4', source: 'question-1', target: 'condition-1', animated: true },
];

const FlowBuilder: React.FC = () => {
  const [flowName, setFlowName] = useState('Sales Bot Flow #1');
  const [triggers, setTriggers] = useState('hello, hi');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds: Edge[]) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!event.dataTransfer.getData('application/reactflow')) return;

      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const position = { x: event.clientX - 400, y: event.clientY - 200 };

      const newNode: FlowNode = {
        id: `${data.type}-${Date.now()}`,
        type: 'custom',
        position,
        data: {
          label: `${data.type.replace(/_/g, ' ')} node`,
          type: data.type,
        },
      };

      setNodes((nds: Node[]) => [...nds, newNode]);
      message.success('Node added');
    },
    [setNodes]
  );

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds: Node[]) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds: Edge[]) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    message.success('Node deleted');
  };

  const handleSave = () => {
    const flow = {
      name: flowName,
      triggers: triggers.split(',').map((t) => t.trim()),
      nodes,
      edges,
    };
    console.log('Saving flow:', flow);
    message.success('Flow saved successfully');
  };

  const handlePublish = () => {
    if (nodes.length < 2) {
      message.error('Add at least 2 nodes before publishing');
      return;
    }
    const flow = {
      name: flowName,
      triggers: triggers.split(',').map((t) => t.trim()),
      nodes,
      edges,
    };
    console.log('Publishing flow:', flow);
    message.success('Flow published successfully');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{flowName}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Triggers: <span className="font-medium">{triggers}</span>
            </p>
          </div>
          <Space size="middle">
            <Button
              icon={<SaveOutlined />}
              onClick={handleSave}
              size="large"
            >
              Save
            </Button>
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={handlePublish}
              size="large"
              style={{ backgroundColor: '#10b981' }}
            >
              Publish
            </Button>
          </Space>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Node Palette */}
        <div className="w-56 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-gray-700 font-semibold mb-4 text-sm">Available Nodes</h3>
          
          <div className="space-y-2">
            {NODE_TYPES.map((node) => (
              <div
                key={node.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData(
                    'application/reactflow',
                    JSON.stringify({ type: node.id })
                  );
                }}
                className={`
                  ${node.color} p-3 rounded-lg cursor-grab active:cursor-grabbing
                  border border-gray-300 hover:border-gray-400
                  transition-all hover:shadow-md flex items-center gap-2
                `}
              >
                <span className="text-xl">{node.icon}</span>
                <span className="font-medium text-sm text-gray-700">{node.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              💡 Drag nodes to the canvas to build your flow.
            </p>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#aaa" gap={16} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* Right Sidebar - Info Panel */}
        <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4">Flow Info</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Flow Name
              </label>
              <Input
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                placeholder="Enter flow name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Triggers
              </label>
              <Input
                value={triggers}
                onChange={(e) => setTriggers(e.target.value)}
                placeholder="Enter triggers (comma separated)"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Nodes:</span> {nodes.length}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Connections:</span> {edges.length}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <label className="block text-xs font-semibold text-gray-700 mb-3">
                Node Options
              </label>
              <div className="space-y-2">
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded text-xs"
                  >
                    <span className="text-gray-700">{node.data.label}</span>
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteNode(node.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;

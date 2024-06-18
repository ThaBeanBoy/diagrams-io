import { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node<any, string | undefined>[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'World' },
  },
];

const initalEdges: Edge<any>[] = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

export default function Diagram() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initalEdges);

  const onNodesChange = useCallback<(changes: NodeChange[]) => void>(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback<(changes: EdgeChange[]) => void>(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback<(connection: Connection) => void>(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

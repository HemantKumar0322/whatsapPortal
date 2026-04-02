import React, { useRef, useState } from 'react';
import FlowNode from './FlowNode';
import { FlowNode as FlowNodeType, FlowEdge } from '@/types/flow.types';

interface FlowCanvasProps {
  nodes: FlowNodeType[];
  edges: FlowEdge[];
  selectedNodeId?: string | null;
  onNodeSelect?: (id: string) => void;
  onNodeDelete?: (id: string) => void;
  onNodeMove?: (id: string, x: number, y: number) => void;
  onDrop?: (e: React.DragEvent, x: number, y: number) => void;
}

const FlowCanvas: React.FC<FlowCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onNodeSelect,
  onNodeDelete,
  onNodeMove,
  onDrop,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 96; // Center the node
    const y = e.clientY - rect.top - 40;

    onDrop?.(e, x, y);
  };

  const handleNodeMouseDown = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(id);
    
    if (canvasRef.current && e.currentTarget instanceof HTMLElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    onNodeMove?.(isDragging, Math.max(0, x), Math.max(0, y));
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // Draw connection lines
  const drawConnections = () => {
    if (!canvasRef.current) return null;

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);

          if (!sourceNode || !targetNode) return null;

          const x1 = sourceNode.x + 192;
          const y1 = sourceNode.y + 42;
          const x2 = targetNode.x;
          const y2 = targetNode.y + 42;

          return (
            <g key={edge.id}>
              <defs>
                <marker
                  id={`arrowhead-${edge.id}`}
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#666" />
                </marker>
              </defs>
              <path
                d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2} ${x2} ${y2}`}
                stroke="#999"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                markerEnd={`url(#arrowhead-${edge.id})`}
              />
              {edge.label && (
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 10}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      } as React.CSSProperties}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {drawConnections()}

      {nodes.map((node) => (
        <div
          key={node.id}
          onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
          className="group"
        >
          <FlowNode
            id={node.id}
            type={node.type}
            label={node.label}
            x={node.x}
            y={node.y}
            isSelected={selectedNodeId === node.id}
            onSelect={onNodeSelect}
            onDelete={onNodeDelete}
          />
        </div>
      ))}

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
          <p className="text-lg font-semibold">Drag nodes from sidebar</p>
          <p className="text-sm">to build your flow. Connect them to define the logic.</p>
        </div>
      )}
    </div>
  );
};

export default FlowCanvas;

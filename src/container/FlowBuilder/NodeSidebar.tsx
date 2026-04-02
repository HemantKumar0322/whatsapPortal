import React from 'react';
import { NODE_TYPES } from '@/types/flow.types';

interface NodeSidebarProps {
  onNodeDragStart?: (e: React.DragEvent, nodeType: string) => void;
}

const NodeSidebar: React.FC<NodeSidebarProps> = ({ onNodeDragStart }) => {
  const handleDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify({ type: nodeType }));
    onNodeDragStart?.(e, nodeType);
  };

  return (
    <div className="w-56 bg-white border-r border-gray-200 p-4 overflow-y-auto h-full">
      <h3 className="text-gray-700 font-semibold mb-4 text-sm">Available Nodes</h3>
      
      <div className="space-y-2">
        {NODE_TYPES.map((node) => (
          <div
            key={node.id}
            draggable
            onDragStart={(e) => handleDragStart(e, node.id)}
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
          💡 Drag nodes to the canvas to build your flow. Connect them to define the logic.
        </p>
      </div>
    </div>
  );
};

export default NodeSidebar;

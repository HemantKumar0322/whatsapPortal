import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const nodeColors: Record<string, string> = {
  start: '#dbeafe',
  trigger: '#fce7f3',
  ask_question: '#dcfce7',
  condition: '#fef08a',
  action: '#e9d5ff',
  end: '#f3e8ff',
};

const nodeIcons: Record<string, string> = {
  start: '▶️',
  trigger: '⚡',
  ask_question: '❓',
  condition: '🔀',
  action: '✋',
  end: '⏹️',
};

const CustomNode: React.FC<NodeProps> = ({ data, selected, isConnectable }) => {
  const bgColor = nodeColors[data.type] || '#f3f4f6';
  const icon = nodeIcons[data.type] || '📦';

  return (
    <div
      className={`
        px-6 py-4 rounded-lg shadow-md border-2 min-w-[180px]
        transition-all ${selected ? 'border-blue-500 shadow-lg' : 'border-gray-300'}
      `}
      style={{ backgroundColor: bgColor }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />

      {/* Node Content */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <span className="font-semibold text-gray-800 text-center text-sm">
          {data.label}
        </span>
        <span className="text-xs text-gray-500 capitalize">
          {data.type.replace(/_/g, ' ')}
        </span>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
    </div>
  );
};

export default CustomNode;

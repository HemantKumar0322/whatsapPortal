import React from 'react';

interface FlowNodeProps {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  isSelected?: boolean;
  onSelect?: ((id: string) => void) | undefined;
  onDelete?: ((id: string) => void) | undefined;
  onDragStart?: (e: React.DragEvent, id: string) => void;
}

const getNodeIcon = (type: string) => {
  const icons: Record<string, string> = {
    trigger: '▶',
    send_message: '💬',
    ask_question: '❓',
    condition: '⚡',
    delay: '⏱',
    start: '🟢',
  };
  return icons[type] || '◆';
};

const getNodeColor = (type: string) => {
  const colors: Record<string, string> = {
    trigger: 'border-green-500 bg-green-50',
    send_message: 'border-blue-500 bg-blue-50',
    ask_question: 'border-purple-500 bg-purple-50',
    condition: 'border-yellow-500 bg-yellow-50',
    delay: 'border-orange-500 bg-orange-50',
    start: 'border-green-500 bg-green-100',
  };
  return colors[type] || 'border-gray-500 bg-gray-50';
};

const FlowNode: React.FC<FlowNodeProps> = ({
  id,
  type,
  label,
  x,
  y,
  isSelected,
  onSelect,
  onDelete,
}) => {
  const isStartNode = type === 'start';

  return (
    <div
      className={`
        absolute w-48 p-3 rounded-lg border-2 cursor-pointer 
        transition-all shadow-md hover:shadow-lg
        ${getNodeColor(type)}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isStartNode ? 'rounded-full w-32 h-32 flex items-center justify-center' : ''}
      `}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      } as React.CSSProperties}
      onClick={() => onSelect?.(id)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getNodeIcon(type)}</span>
          <span className={`font-semibold text-sm ${isStartNode ? 'text-center w-full' : ''}`}>
            {label}
          </span>
        </div>
        {!isStartNode && (
          <button
            className="hidden group-hover:block ml-auto text-red-500 hover:text-red-700"
            title="Delete node"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Connection points */}
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-600 rounded-full" />
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-600 rounded-full" />
    </div>
  );
};

export default FlowNode;

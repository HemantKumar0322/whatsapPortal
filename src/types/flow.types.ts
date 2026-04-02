export interface FlowNode {
  id: string;
  type: 'trigger' | 'send_message' | 'ask_question' | 'condition' | 'delay' | 'start';
  label: string;
  x: number;
  y: number;
  data?: Record<string, any>;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Flow {
  name: string;
  triggers: string[];
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export const NODE_TYPES = [
  { id: 'trigger', label: 'Trigger', icon: '▶', color: 'bg-green-100' },
  { id: 'send_message', label: 'Send Message', icon: '💬', color: 'bg-blue-100' },
  { id: 'ask_question', label: 'Ask Question', icon: '❓', color: 'bg-purple-100' },
  { id: 'condition', label: 'Condition', icon: '⚡', color: 'bg-yellow-100' },
  { id: 'delay', label: 'Delay', icon: '⏱', color: 'bg-orange-100' },
];

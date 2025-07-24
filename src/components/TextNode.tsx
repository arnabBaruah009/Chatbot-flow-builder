import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageCircle } from 'lucide-react';

interface TextNodeData {
  label: string;
  onTextChange?: (nodeId: string, text: string) => void;
}

/**
 * TextNode component represents a message node in the chatbot flow
 * Features:
 * - Single source handle (bottom) for outgoing connections
 * - Single target handle (top) for incoming connections  
 * - Displays message text with chat icon
 * - Styled to match the design specifications
 */
const TextNode: React.FC<NodeProps<TextNodeData>> = ({ data, selected }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 min-w-[200px] ${
      selected ? 'border-blue-400 shadow-lg' : 'border-gray-200'
    }`}>
      {/* Target handle - allows incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white hover:bg-gray-600 transition-colors"
      />
      
      {/* Node header with icon and title */}
      <div className="bg-teal-300 px-4 py-2 rounded-t-lg flex items-center gap-2">
        <MessageCircle size={16} className="text-teal-800" />
        <span className="text-teal-800 font-medium text-sm">Send Message</span>
      </div>
      
      {/* Node body with message text */}
      <div className="p-4">
        <div className="text-gray-700 text-sm whitespace-pre-wrap break-words">
          {data.label || 'Enter your message here...'}
        </div>
      </div>
      
      {/* Source handle - allows outgoing connections */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white hover:bg-gray-600 transition-colors"
      />
    </div>
  );
};

export default TextNode;
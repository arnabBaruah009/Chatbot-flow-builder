import React from 'react';
import { MessageCircle } from 'lucide-react';

/**
 * NodesPanel component displays available node types for drag-and-drop
 * Currently supports:
 * - Text/Message nodes
 * 
 * Designed to be extensible - new node types can be easily added to the nodeTypes array
 */

interface NodeType {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

// Define available node types - easily extensible for future node types
const nodeTypes: NodeType[] = [
  {
    id: 'message',
    type: 'textNode',
    label: 'Message',
    icon: <MessageCircle size={20} className="text-blue-600" />,
    description: 'Send a text message'
  }
  // Future node types can be added here:
  // {
  //   id: 'condition',
  //   type: 'conditionNode', 
  //   label: 'Condition',
  //   icon: <GitBranch size={20} className="text-green-600" />,
  //   description: 'Add conditional logic'
  // }
];

const NodesPanel: React.FC = () => {
  // Handle drag start for node creation
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Nodes Panel</h2>
        <p className="text-sm text-gray-600 mt-1">Drag and drop nodes to create your flow</p>
      </div>
      
      {/* Available node types */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {nodeTypes.map((nodeType) => (
            <div
              key={nodeType.id}
              className="border border-gray-300 rounded-lg p-4 cursor-grab active:cursor-grabbing hover:border-blue-400 hover:shadow-md transition-all duration-200 bg-white"
              draggable
              onDragStart={(event) => onDragStart(event, nodeType.type)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {nodeType.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{nodeType.label}</div>
                  <div className="text-sm text-gray-600">{nodeType.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Help text */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Drag a node from above and drop it on the canvas to add it to your flow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;
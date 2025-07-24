import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Node } from '@xyflow/react';

interface SettingsPanelProps {
  node: Node;
  onBack: () => void;
  onTextChange: (nodeId: string, text: string) => void;
}

/**
 * SettingsPanel component allows editing of selected node properties
 * Features:
 * - Back button to return to nodes panel
 * - Text area for editing message content
 * - Real-time text updates
 * - Responsive design matching the overall theme
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({
  node,
  onBack,
  onTextChange,
}) => {
  const [text, setText] = useState(node.data.label || '');

  // Update local text state when node changes
  useEffect(() => {
    setText(node.data.label || '');
  }, [node.data.label]);

  // Handle text changes with real-time updates
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    onTextChange(node.id, newText);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Panel header with back button */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
            aria-label="Back to nodes panel"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Message</h2>
        </div>
        <p className="text-sm text-gray-600">Edit the message content</p>
      </div>
      
      {/* Settings content */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {/* Text field label */}
          <div>
            <label 
              htmlFor="message-text" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Text
            </label>
            
            {/* Message text area */}
            <textarea
              id="message-text"
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your message here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              style={{ fontSize: '14px', lineHeight: '1.5' }}
            />
          </div>
          
          {/* Character count */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{text.length} characters</span>
            {text.length > 1000 && (
              <span className="text-amber-600">Consider shorter messages for better user experience</span>
            )}
          </div>
        </div>
        
        {/* Help text */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This message will be sent to users when they reach this point in the conversation flow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
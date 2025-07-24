import React from 'react';

interface SaveButtonProps {
  onSave: () => void;
}

/**
 * SaveButton component provides a persistent save action
 * Features:
 * - Fixed positioning in top-right corner
 * - Hover and active states
 * - Consistent styling with the overall design
 */
const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return (
    <button
      onClick={onSave}
      className="text-sm mx-6 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-medium shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
    >
      Save Changes
    </button>
  );
};

export default SaveButton;
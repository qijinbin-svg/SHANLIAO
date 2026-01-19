import { useState } from "react";

interface TagSelectorProps {
  title: string;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  color?: string;
}

const TagSelector = ({ 
  title, 
  tags, 
  selectedTags, 
  onTagToggle,
  color = "orange"
}: TagSelectorProps) => {
  const getColorClasses = (isSelected: boolean) => {
    const colorMap = {
      orange: {
        selected: "bg-orange-500 text-white border-orange-500",
        unselected: "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
      },
      blue: {
        selected: "bg-blue-500 text-white border-blue-500",
        unselected: "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
      },
      green: {
        selected: "bg-green-500 text-white border-green-500",
        unselected: "bg-white text-gray-700 border-gray-300 hover:border-green-300"
      }
    };
    
    return colorMap[color as keyof typeof colorMap]?.[isSelected ? 'selected' : 'unselected'] || 
           colorMap.orange[isSelected ? 'selected' : 'unselected'];
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 text-sm font-medium ${
                getColorClasses(isSelected)
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelector;
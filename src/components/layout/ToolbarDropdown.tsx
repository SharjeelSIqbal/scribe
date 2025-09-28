import { useRef, useState, ReactNode } from 'react';
import { HOVERED } from '../../libs/styles-constants';

interface ToolbarDropdownProps {
  children: ReactNode;
}

// State managing drop down to avoid hover flickering
function ToolbarDropdown({ children }: ToolbarDropdownProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleDropDownHoverEffectEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleDropDownHoverEffectLeave = () => {
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setIsHovered(false);
    }, 250);
  };

  return (
    <div
      className={`dropdown button-hover ${isHovered ? HOVERED : ''}`}
      onMouseEnter={handleDropDownHoverEffectEnter}
      onMouseLeave={handleDropDownHoverEffectLeave}
    >
      {children}
    </div>
  );
}

export default ToolbarDropdown;

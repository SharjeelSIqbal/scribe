import { useState } from 'react';
import { PanelLeftOpenIcon, PanelLeftCloseIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SidebarToggleButton({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) {
  const [isRotating, setIsRotating] = useState(false);
  const [iconToShow, setIconToShow] = useState<'open' | 'close'>(collapsed ? 'open' : 'close');
  const [nextCollapsed, setNextCollapsed] = useState(collapsed);

  const handleClick = () => {
    if (isRotating) return;
    const target = !collapsed;
    setNextCollapsed(target);
    setIsRotating(true);
  };

  const IconComponent = iconToShow === 'open' ? PanelLeftOpenIcon : PanelLeftCloseIcon;

  return (
    <button
      onClick={handleClick}
      className="btn btn-ghost hover:bg-transparent focus:outline-none focus:ring-0"
      aria-label="Toggle Sidebar"
      disabled={isRotating}
      type="button"
    >
      <motion.div
        animate={isRotating ? { rotate: 180 } : { rotate: 0 }}
        initial={false}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          setCollapsed(nextCollapsed);
          setIconToShow(nextCollapsed ? 'open' : 'close');
          setIsRotating(false);
        }}
      >
        <IconComponent className="w-5 h-5" />
      </motion.div>
    </button>
  );
}

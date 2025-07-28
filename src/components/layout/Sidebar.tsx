import { useState } from 'react';
import SidebarToggleButton from './SidebarToggleButton';
import ThemeDropDown from '../theme/ThemeDropDown';

export default function Sidebar(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-base-100">
      <aside
        className={`bg-base-200 text-base-content border-r border-base-300 h-full p-0 pt-4 pb-4 ${collapsed ? 'w-16' : 'w-64'} transition-all`}
      >
        <div
          className={`flex ${collapsed ? 'justify-center' : 'justify-end'} mb-6 tooltip tooltip-right`}
          data-tip="Toggle sidebar"
        >
          <SidebarToggleButton collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        <ul className="menu space-y-2 p-0 w-full">
          <li>
            <div className="tooltip tooltip-right" data-tip="Dashboard">
              <span className={`${collapsed ? 'hidden' : 'inline'}`}>Dashboard</span>
            </div>
          </li>
          <li>
            <div className="tooltip tooltip-right" data-tip="Settings">
              <span className={`${collapsed ? 'hidden' : 'inline'}`}>Settings</span>
            </div>
          </li>
          <li>
            <div className="tooltip tooltip-right" data-tip="Profile">
              <span className={`${collapsed ? 'hidden' : 'inline'}`}>Profile</span>
            </div>
          </li>
        </ul>
        <div className={`mt-2 ${collapsed ? 'hidden' : ''}`}>
          <ThemeDropDown />
        </div>
      </aside>
    </div>
  );
}

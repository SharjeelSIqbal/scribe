import { Edit3 } from 'lucide-react';
import { USER_ROLE_OPTIONS_LABEL, USER_ROLES_OPTIONS } from '@src/libs/constants';
import { useUserRole } from '../../contexts/UserRoleContext';
import ToolbarDropdown from '../layout/ToolbarDropdown';

function UserRoleDropdown() {
  const { userRole, setUserRole } = useUserRole();

  return (
    <div className="user-role-dropdown-menu">
      <ToolbarDropdown>
        <button
          type="button"
          className="btn btn-sm btn-ghost p-2 button-hover"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded="false"
          aria-label={USER_ROLE_OPTIONS_LABEL}
          onClick={(e) => e.preventDefault()}
        >
          {USER_ROLES_OPTIONS.find((opt) => opt.value === userRole)?.icon ?? (
            <Edit3 className="w-5 h-5" />
          )}
        </button>

        <ul className="dropdown-content toolbar-dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-40">
          {USER_ROLES_OPTIONS.map((option, index) => (
            <li key={option.value} tabIndex={index}>
              <button
                type="submit"
                className={`flex items-center gap-2 sidebar-hover px-2 py-1 rounded hover:bg-base-300 ${
                  userRole === option.value ? 'bg-base-300 rounded active' : ''
                }`}
                onClick={() => setUserRole(option.value)}
              >
                {option.icon}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </ToolbarDropdown>
    </div>
  );
}

export default UserRoleDropdown;

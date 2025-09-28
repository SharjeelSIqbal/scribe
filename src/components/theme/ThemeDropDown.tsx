import { useTheme } from '../../contexts/ThemeContext';
import themes from '../../libs/themes.json';

function ThemeDropDown(): JSX.Element {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown mb-72">
      <div tabIndex={0} role="button" className="btn m-1 button-hover">
        {theme[0].toUpperCase() + theme.slice(1)}
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
        </svg>
      </div>
      <ul className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-0 shadow-2xl">
        {themes.map((themeName) => {
          return (
            <li key={themeName}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start button-hover"
                aria-label={themeName[0].toUpperCase() + themeName.slice(1)}
                value={themeName}
                onClick={() => setTheme(themeName)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ThemeDropDown;

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function SidebarItem({ to, icon, label, isHiddenOnSmall, className }) {
  const location = useLocation();
  return (
    <li className={`${isHiddenOnSmall ? "hidden sm:block" : ""} ${className}`}>
      <Link to={to}>
        <button
          className={`flex flex-col items-center justify-center rounded-xl border-slate-800 py-1 text-slate-300 focus:text-cyan-300 sm:w-full sm:flex-row sm:border sm:bg-slate-900/35 sm:p-2 sm:hover:border-cyan-400/60 sm:hover:bg-cyan-400/10 sm:hover:text-cyan-200 sm:focus:border-cyan-400 sm:focus:bg-cyan-400/10 sm:focus:text-cyan-200 sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4 ${
            location.pathname == to &&
            "border-cyan-400/60 bg-cyan-400/15 text-cyan-200 sm:text-cyan-200"
          }`}
        >
          <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
            {icon}
          </span>
          <span className="block sm:hidden sm:group-hover:inline lg:inline">
            {label}
          </span>
        </button>
      </Link>
    </li>
  );
}

SidebarItem.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.any,
  label: PropTypes.string,
  isHiddenOnSmall: PropTypes.bool,
  className: PropTypes.string,
};

export default SidebarItem;

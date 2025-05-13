const Tab = ({ label, onClick, isActive,id }) => (
    <li
        className={`tab tab-nav-list ${isActive ? "active" : ""}`}
        onClick={onClick}
        id={id}
    >
        <a className="tab-nav-link nav-link-ltr" >
        {label}
        </a>
    </li>
);

export default Tab;

const Sidebar = ({
  complaints,
  onAddComplaint,
  onDeleteComplaint,
  activeComplaint,
  setActiveComplaint,
}) => {
  const sortedcomplaints = complaints.sort(
    (a, b) => b.lastModified - a.lastModified
  );

  // get the date and time now

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Drafts...</h1>
        <button onClick={onAddComplaint}>Lodge</button>
      </div>
      <div className="app-sidebar-complaints">
        {sortedcomplaints.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-complaint ${
              id === activeComplaint && "active"
            }`}
            onClick={() => setActiveComplaint(id)}
          >
            <div className="sidebar-complaint-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteComplaint(id)}>Delete</button>
            </div>

            <p>{body && body.substr(0, 100) + "..."}</p>
            <small className="complaint-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

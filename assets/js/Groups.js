import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Groups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get("/api/rooms").then((res) => {
      setGroups(res.data.data);
    });
  }, []);

  return (
    <div>
      <div className="mt-5 container">
        {groups.length > 0 ? (
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Room Name</th>
                <th scope="col">Room Description</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => {
                return (
                  <tr key={group.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Link style={{ color: "white" }} to={`/${group.id}`}>
                        {group.name}
                      </Link>
                    </td>
                    <td>{group.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}

export default Groups;

import React, { useState, useEffect } from "react";
import axios from "axios";

function DetailsTable() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/names")
      .then((response) => setNames(response.data))
      .catch((error) => console.error("Error fetching names", error));
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {names.map((item) => (
          <tr key={item._id}>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DetailsTable;

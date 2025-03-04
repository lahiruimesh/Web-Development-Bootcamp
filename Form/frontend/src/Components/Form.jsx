import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/names", { name });
      alert("Name submitted successfully");
      setName("");
    } catch (error) {
      alert("Error submitting name");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;

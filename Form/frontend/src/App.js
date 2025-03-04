import React from 'react';
import Form from './Components/Form';
import DetailsTable from './Components/DetailsTable';
function App() {
  return (
    <div>
      <h1>Submit Name</h1>
      <Form />
      <h2>Stored Names</h2>
      <DetailsTable />
    </div>
  );
}

export default App;

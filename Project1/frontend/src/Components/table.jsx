import React from 'react';

 
const Table = ({ users }) => {
    return(
        <div>
            <h3>Details Table ...</h3>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((users) => (
                        <tr key={users.id}>
                            <td>{users.id}</td>
                            <td>{users.name}</td>
                            <td>
                                <button onClick={() => {}}>Delete</button>
                                <button onClick={() => {}}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
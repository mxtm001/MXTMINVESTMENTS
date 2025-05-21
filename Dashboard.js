
import { db } from './firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const updateBalance = async (id, amount) => {
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, {
      balance: amount
    });
    alert('Balance updated');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Balances</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Balance</th>
            <th>New Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.balance}</td>
              <td>
                <input type="number" id={`balance-${user.id}`} className="border p-1" />
              </td>
              <td>
                <button onClick={() => {
                  const value = document.getElementById(`balance-${user.id}`).value;
                  updateBalance(user.id, parseFloat(value));
                }} className="bg-green-500 text-white px-2 py-1">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

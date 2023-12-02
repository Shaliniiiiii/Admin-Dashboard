import React, { useState } from 'react';
import Login from './Components/Login';
import AdminDashboard from './Components/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // Assuming the login logic sets the user to some non-null value
    setUser("username");
  };

  // Example response object (replace this with actual data fetched from your API)
  const exampleResponse = {
    name: 'Social',
    location: 'Hebbal',
    charge_customers: true,
    category_6: 150,
    category_7: 100,
    category_8: 75,
    category_9: 50,
    category_10: 25,
  };

  console.log('User:', user); // Check if the user is being set correctly

  return (
    <div className="container">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        
          <AdminDashboard response={exampleResponse} />
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const AdminDashboard = ({ response }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [chargeCustomers, setChargeCustomers] = useState(false);
  const [customSongRequestAmount, setCustomSongRequestAmount] = useState(99);
  const [regularSongRequestAmounts, setRegularSongRequestAmounts] = useState({
    category_7: 79,
    category_8: 59,
    category_9: 39,
    category_10: 19,
  });
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (response) {
      setName(response.name || '');
      setLocation(response.location || '');
      setChargeCustomers(response.charge_customers || false);
      setCustomSongRequestAmount(response.category_6 || 99);

      const regularAmounts = {
        category_7: response.category_7 || 79,
        category_8: response.category_8 || 59,
        category_9: response.category_9 || 39,
        category_10: response.category_10 || 19,
      };
      setRegularSongRequestAmounts(regularAmounts);
      checkSaveButtonStatus(chargeCustomers, customSongRequestAmount, regularAmounts);
    }
  }, [response]);

  const handleChargeCustomersChange = (event) => {
    const newValue = event.target.checked;
    setChargeCustomers(newValue);

    if (!newValue) {
      setSaveButtonDisabled(true);
    } else {
      checkSaveButtonStatus(newValue, customSongRequestAmount, regularSongRequestAmounts);
    }
  };

  const handleCustomSongRequestAmountChange = (event) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setCustomSongRequestAmount(newValue);
    checkSaveButtonStatus(chargeCustomers, newValue, regularSongRequestAmounts);
  };

  const handleRegularSongRequestAmountChange = (event, category) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    const updatedRegularAmounts = { ...regularSongRequestAmounts, [category]: newValue };
    setRegularSongRequestAmounts(updatedRegularAmounts);
    checkSaveButtonStatus(chargeCustomers, customSongRequestAmount, updatedRegularAmounts);
  };

  const checkSaveButtonStatus = (chargeCustomers, customAmount, regularAmounts) => {
    const isCustomAmountValid = customAmount >= 99;
    const areRegularAmountsValid = Object.values(regularAmounts).every((amount, index) => amount >= [79, 59, 39, 19][index]);
  
    const saveButtonStatus = chargeCustomers && isCustomAmountValid && areRegularAmountsValid;
    setSaveButtonDisabled(!saveButtonStatus);
  };
  

  const handleSave = () => {
    // Handle save logic here
    console.log('Settings saved:', {
      name,
      location,
      chargeCustomers,
      customSongRequestAmount,
      regularSongRequestAmounts,
    });
  
    // Destroy existing chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    // Create a new chart instance
    const newChartInstance = new Chart('your-chart-canvas-id', {
      type: 'bar',
      data: {
        // Chart data configuration
      },
      options: {
        // Chart options configuration
      },
    });
  
    setChartInstance(newChartInstance);
  };
  

  const chartData = {
    labels: Object.keys(regularSongRequestAmounts),
    datasets: [
      {
        label: 'Regular Song Request Amounts',
        data: Object.values(regularSongRequestAmounts),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Social, Hebbal on Dhun</h1>
      <p>Location: {location}</p>
      <div>
      <label style={{ display: 'flex', alignItems: 'center',marginRight:'10px' }}>
        <span>Charge Customers for Song Requests:</span>
          <input
          type="checkbox"
          checked={chargeCustomers}
          onChange={handleChargeCustomersChange}
        />
      </label>
    </div>



      <div className='customSongs'>
        <label >Custom Song Request Amount:</label>
        <input
          type="number"
          value={customSongRequestAmount}
          onChange={handleCustomSongRequestAmountChange}
          disabled={!chargeCustomers}
        />
      </div>

      <div className='regularSongs'>
        <p>Regular Song Request Amounts:</p>
        {Object.entries(regularSongRequestAmounts).map(([category, value]) => (
          <div key={category} >
            <input
              type="number"
              value={value}
              onChange={(e) => handleRegularSongRequestAmountChange(e, category)}
              disabled={!chargeCustomers}
              
            />
          </div>
        ))}
      </div>

      {chargeCustomers && (
        <div style={{ height: '300px', marginTop: '20px' }}>
          <p>Graph:</p>
          {chartData && <Bar data={chartData} id="your-chart-canvas-id" />}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saveButtonDisabled || !chargeCustomers}
        className={saveButtonDisabled ? 'disabled-button' : ''}
      >
        Save
      </button>
    </div>
  );
};

export default AdminDashboard;


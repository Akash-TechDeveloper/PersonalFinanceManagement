import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { UserContext } from './UserContext';
import './Expense.css';
Chart.register(...registerables);

const Expenses = () => {
  const [transaction, setTransaction] = useState([]);
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const { username } = useContext(UserContext);

  const generateMonthsInRange = (start, end) => {
    const months = [];
    let current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
      const monthYear = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
      months.push(monthYear);
      current.setMonth(current.getMonth() + 1); 
    }

    return months;
  };

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/home/transaction?username=${username}`);
        const transactions = response.data;
        setTransaction(transactions);

        
        const monthlyTotals = {};
        let startDate = new Date();
        let endDate = new Date();

        transactions.forEach((transaction) => {
          const date = new Date(transaction.date);
          const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

          
          if (date < startDate) startDate = date;
          if (date > endDate) endDate = date;

          if (!monthlyTotals[monthYear]) {
            monthlyTotals[monthYear] = { credit: 0, debit: 0 };
          }

          if (transaction.creditOrDebit === 'credit') {
            monthlyTotals[monthYear].credit += parseFloat(transaction.amount);
          } else {
            monthlyTotals[monthYear].debit += parseFloat(Math.abs(transaction.amount));
          }
        });

        
        const allMonths = generateMonthsInRange(startDate, endDate);

        
        const labels = allMonths;
        const creditData = labels.map((label) => (monthlyTotals[label]?.credit || 0));
        const debitData = labels.map((label) => (monthlyTotals[label]?.debit || 0));

        setMonthlyData({
          labels: labels, 
          datasets: [
            {
              label: 'Credit',
              data: creditData,
              backgroundColor: 'rgba(0, 123, 255, 0.6)',
            },
            {
              label: 'Debit',
              data: debitData,
              backgroundColor: 'rgba(255, 148, 0, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    if (username) {
      fetchExpense();
    }
  }, [username]);

 
  const dataValues = monthlyData.datasets.flatMap((dataset) => dataset.data);
  const minValue = Math.min(0, ...dataValues); 
  const maxValue = Math.max(...dataValues);
  const range = maxValue - minValue;
  const stepSize = Math.ceil(range / 10); 

  return (
    <div className='expense-container'>
      <h1>Expense Breakdown</h1>
      <Bar
        data={monthlyData}
        options={{
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              min: minValue,
              max: maxValue,
              ticks: {
                stepSize: stepSize,
              },
            },
          },
        }}
        height={500}
        width={900}
      />
    </div>
  );
};

export default Expenses;

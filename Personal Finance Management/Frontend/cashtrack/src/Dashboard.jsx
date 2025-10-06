import React, { useState, useEffect, useContext } from 'react';
import './Dashboard.css';
import { UserContext } from './UserContext';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

const Dashboard = () => {
  const { username } = useContext(UserContext);
  const [totalBalance, setTotalBalance] = useState(0);
  const [expenseBreakdown, setExpenseBreakdown] = useState({ credit: 0, debit: 0 });
  const [upcomingBills, setUpcomingBills] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceResponse = await axios.get(`http://localhost:9000/home/balance?username=${username}`);
        const totalAmount = balanceResponse.data.reduce((acc, account) => acc + account.amount, 0);
        setTotalBalance(totalAmount);

        const transactionResponse = await axios.get(`http://localhost:9000/home/transaction?username=${username}`);
        const breakdown = transactionResponse.data.reduce((acc, transaction) => {
          const amount = parseFloat(transaction.amount);
          if (transaction.creditOrDebit === 'debit') {
            acc.debit += amount;
          } else {
            acc.credit += amount;
          }
          return acc;
        }, { credit: 0, debit: 0 });
        setExpenseBreakdown(breakdown);

        const billResponse = await axios.get(`http://localhost:9000/home/bill?username=${username}`);
        const bills = billResponse.data.filter(
          bill => new Date(bill.billDate) >= new Date()).sort(
            (a, b) => new Date(a.billDate) - new Date(b.billDate)).slice(0, 3);
        setUpcomingBills(bills);

        const recentTransactions = await axios.get(`http://localhost:9000/home/transaction?username=${username}`);
        const recentTransaction = recentTransactions.data.sort((a, b) => b.id - a.id).slice(0, 3);
        setTransactions(recentTransaction);

        const monthlyTotals = {};
        transactionResponse.data.forEach((transaction) => {
          const date = new Date(transaction.date);
          const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-MM

          if (!monthlyTotals[monthYear]) {
            monthlyTotals[monthYear] = { credit: 0, debit: 0 };
          }

          if (transaction.creditOrDebit === 'credit') {
            monthlyTotals[monthYear].credit += parseFloat(transaction.amount);
          } else {
            monthlyTotals[monthYear].debit += parseFloat(Math.abs(transaction.amount));
          }
        });

        
        const labels = Object.keys(monthlyTotals).sort();
        const creditData = labels.map(label => monthlyTotals[label].credit);
        const debitData = labels.map(label => monthlyTotals[label].debit);

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
        console.error('Failed to fetch data:', error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  
  const dataValues = monthlyData.datasets.flatMap(dataset => dataset.data);
  const minValue = Math.min(0, ...dataValues); 
  const maxValue = Math.max(...dataValues);
  const range = maxValue - minValue;
  const stepSize = Math.ceil(range / 10); 

  return (
    <div className='dashboard-container'>
      <div className='balance-board'>
        <h1>Total Balance</h1>
        <h3>&#129297;</h3>
        <p>₹{totalBalance}</p>
      </div>
      <div className='expense-board'>
        <h1 >Expense Breakdown</h1>
        <Pie
            data={{
              labels: ['Credit', 'Debit'],
              datasets: [
                {
                  data: [expenseBreakdown.credit, expenseBreakdown.debit],
                  backgroundColor: ['rgba(0, 123, 255, 0.6)', 'rgba(255, 148, 0, 0.6)'],
                },
              ],
            }}
            options={{
              responsive: false,
              maintainAspectRatio: false,
            }}
            width={200}
            height={200}
          />
      </div>
      <div className='bill-board'>
        <h1>Upcoming Bills</h1>
        {upcomingBills.length > 0 ? (
          <ul>
            <marquee behavior="" direction="up" scrollamount="5px">
            {upcomingBills.map((bill, index) => (
              <li key={index}>
                <div className="col1">
                <strong>{bill.billName}</strong>
                <span>₹{bill.billAmount}</span>
                </div>
                <p>{new Date(bill.billDate).toDateString()}</p>
              </li>
              
            ))}
            </marquee>
          </ul>
          
        ) : (
          <p>No upcoming bills</p>
        )}
      </div>
      <div className='transaction-board'>
        <h1>Recent Transactions</h1>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((transaction, index) => (
              <li className=  {transaction.amount < 0 ? 'amount-spent' : 'amount-credit'} key={index}>

                <strong>{transaction.goal}</strong>
                <p>
                  ₹{transaction.amount}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found</p>
        )}
      </div>
      <div className='monthly-board'>
        <h1>Monthly Bar Graph</h1>
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
          height={200}
          width={250}
        
        />
      </div>
    </div>
  );
};

export default Dashboard;
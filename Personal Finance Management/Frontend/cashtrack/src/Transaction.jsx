import React, { useContext, useState, useEffect } from 'react';
import './Transaction.css';
import { UserContext } from './UserContext';
import axios from 'axios';

const Transaction = () => {
  const [transactionDetails, setTransactionDetails] = useState({
    date: '',
    goal: '',
    accountNumber: '',
    transactionType: '',
    amount: ''
  });

  const [isFormVisible, setFormVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [error, setError] = useState('');
  const { username } = useContext(UserContext);
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const toggleOverlay = () => {
    setFormVisible(!isFormVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetails({ ...transactionDetails, [name]: value });
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/home/transaction?username=${username}`);
        if (response.status === 200) {
          const sortedTransactions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setTransactions(sortedTransactions); 
        } else {
          setError('No transaction found.');
        }
      } catch (error) {
        setError('Failed to fetch transactions. Please try again later.');
      }
    };

    const fetchAccountNumbers = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/home/balance?username=${username}`);
        if (response.status === 200) {
          const accountNumbersList = response.data.map(account => account.accountNumber);
          setAccountNumbers(accountNumbersList);
        } else {
          setError('Failed to fetch account numbers.');
        }
      } catch (error) {
        setError('Error fetching account numbers. Please try again later.');
      }
    };

    if (username) {
      fetchTransactions();
      fetchAccountNumbers();
    }
  }, [username]);

  const updateCardAmountsInBackend = async (totals) => {
    const updatePromises = Object.entries(totals).map(([accountNumber, totalAmount]) =>
      axios.put('http://localhost:9000/home/balance/update', null, {
        params: { accountNumber, amount: totalAmount },
      })
    );
    await Promise.all(updatePromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adjustedAmount = transactionDetails.creditOrDebit === 'debit' ? -Math.abs(parseFloat(transactionDetails.amount)) : parseFloat(transactionDetails.amount);
    
    const response = await axios.post('http://localhost:9000/home/transaction/add', {
      ...transactionDetails,
      username: username,
      amount: adjustedAmount
    });
    if (response.status === 200) {
      setSuccessMessage('Transaction added successfully!');
      const newlyAdded = { [transactionDetails.accountNumber]: parseFloat(adjustedAmount) };
      updateCardAmountsInBackend(newlyAdded);
      setError('');
      setTransactionDetails({
        date: '',
        goal: '',
        accountNumber: '',
        transactionType: '',
        creditOrDebit: '',
        amount: ''
      });
      setFormVisible(false);
      const updatedResponse = await axios.get(`http://localhost:9000/home/transaction?username=${username}`);
      const sortedTransactions = updatedResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sortedTransactions);
    }
  };

  // Pagination Logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = transactions.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(transactions.length / entriesPerPage);

  return (
    <React.Fragment>
      <div className="transaction-container">
        <h1>Transaction Table</h1>

        {isFormVisible && (
          <div className="overlay">
            <div className="overlay-content">
              <div>
                <h2>Add Transaction</h2>
                <button onClick={toggleOverlay}>X</button>
              </div>
              <form onSubmit={handleSubmit}>
                <label htmlFor='transactionDate'>Date:</label>
                <input 
                  type="date" 
                  name="date" 
                  value={transactionDetails.date}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="transactionGoal">Goal:</label>
                <input 
                  type="text" 
                  name="goal" 
                  value={transactionDetails.goal} 
                  onChange={handleChange}
                  placeholder='Enter the Goal' 
                  required
                />
                 <label htmlFor="transactionAccNumber">Account Number:</label>
                <select
                  name="accountNumber"
                  value={transactionDetails.accountNumber}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Account Number</option>
                  {accountNumbers.map((account, index) => (
                    <option key={index} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
                <label htmlFor="transactionType">Transaction Type:</label>
                <input 
                  type="text" 
                  name="transactionType" 
                  value={transactionDetails.transactionType}
                  onChange={handleChange}
                  placeholder='Enter Transaction Type'
                  required 
                />
                <label htmlFor="creditOrDebit">Credit or Debit:</label>
                <select 
                  name="creditOrDebit" 
                  value={transactionDetails.creditOrDebit} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
                <label htmlFor="transactionAmount">Amount:</label>
                <input 
                  type="number" 
                  name="amount" 
                  value={transactionDetails.amount}
                  onChange={handleChange}
                  placeholder='Enter Amount (in Rupees)' 
                  required
                />
                <button type='submit'>Submit</button>
              </form>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Goal</th>
              <th>Account Number</th>
              <th>Type of Transaction</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.length > 0 ? (
              currentEntries.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.goal}</td>
                  <td>{transaction.accountNumber}</td>
                  <td>{transaction.transactionType}</td>
                  <td className={`${transaction.creditOrDebit === 'debit' ? 'money-spent' : 'money-received'}`}>
                    {transaction.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <p>No transactions added</p>
              </tr>
            )}
          </tbody>
        </table>
        <div className='bottom'>
        <div className="pagination">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        <button onClick={toggleOverlay} className='control-btn'>
          {isFormVisible ? 'Cancel' : 'Add Transaction'}
        </button>
        </div>
        {successMessage && <p className="success">{successMessage}</p>}
        {error && <p className="error">{error}</p>}
        
      </div>

    </React.Fragment>
  );
};

export default Transaction;
import React, { useState, useEffect } from 'react';
import Savings from "./Savings"
const App = () => {
  const [totalExpense, setTotalExpense] = useState({
    CurrentBalance: 0,
    TotalIncome: 0,
    TotalExpense: 0,
  });

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [transaction, setTransaction] = useState({
    amount: 0,
    type: 'income',
    description: '',
  });

  const [savingTarget, setsavingTarget] = useState(0)
  // Load data from localStorage on initial load
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('transactionHistory'));
    const savedExpense = JSON.parse(localStorage.getItem('totalExpense'));

    const savedTarget = JSON.parse(localStorage.getItem('SavingTarget'));
    if (savedTarget) {
      setSavingTarget(savedTarget);
    }

    if (savedHistory) setTransactionHistory(savedHistory);
    if (savedExpense) setTotalExpense(savedExpense);
    let savings = totalExpense.TotalIncome - totalExpense.TotalExpense;
  }, []);

  useEffect(() => {
    if (totalExpense.TotalExpense > totalExpense.TotalIncome) {
      alert("Expense Exceeded");
    }
    
  }, [totalExpense.TotalExpense, totalExpense.TotalIncome]);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  // Function to handle adding new transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();

    const newTransaction = {
      ...transaction,
      amount: parseFloat(transaction.amount), // Ensure amount is a number
    };

    // Update transaction history
    const updatedHistory = [...transactionHistory, newTransaction];
    setTransactionHistory(updatedHistory);

    // Update totals based on transaction type
    let updatedExpense = { ...totalExpense };
    if (transaction.type === 'income') {
      updatedExpense.TotalIncome += newTransaction.amount;
      updatedExpense.CurrentBalance += newTransaction.amount;
    } else if (transaction.type === 'expense') {
      updatedExpense.TotalExpense += newTransaction.amount;
      updatedExpense.CurrentBalance -= newTransaction.amount;
    }
    setTotalExpense(updatedExpense);

    // Save updated data to localStorage
    localStorage.setItem('transactionHistory', JSON.stringify(updatedHistory));
    localStorage.setItem('totalExpense', JSON.stringify(updatedExpense));

    // Clear form after adding transaction
    setTransaction({
      amount: 0,
      type: 'income',
      description: '',
    });
  };

  const clearTransactionHistory = () => {
    // Reset the transaction history and total expense states
    setTransactionHistory([]);
    setTotalExpense({
      CurrentBalance: 0,
      TotalIncome: 0,
      TotalExpense: 0,
    });
  
    // Remove the data from localStorage
    localStorage.removeItem('transactionHistory');
    localStorage.removeItem('totalExpense');
  };

  const [SavingTarget, setSavingTarget] = useState(0)

  useEffect(() => {
    localStorage.setItem('SavingTarget', JSON.stringify(SavingTarget));
    
  }, [SavingTarget]);
  
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800 p-4 sm:p-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 text-center rounded-lg shadow-lg">
        <a href="https://img.icons8.com/?size=100&id=3096&format=png&color=000000"></a>
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">FiTek</h1>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4 mt-4 rounded-lg shadow-lg bg-white">
        {/* Dashboard */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 shadow-md rounded-lg text-center hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="text-lg font-medium text-gray-500">Current Balance</h3>
              <div className={`text-2xl font-bold ${totalExpense.CurrentBalance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                ₹{totalExpense.CurrentBalance}
              </div>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg text-center hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="text-lg font-medium text-gray-500">Total Income</h3>
              <p className="text-2xl font-bold text-green-500">₹{totalExpense.TotalIncome}</p>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg text-center hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="text-lg font-medium text-gray-500">Total Expenses</h3>
              <p className="text-2xl font-bold text-red-500">₹{totalExpense.TotalExpense}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl my-4 font-semibold text-gray-700">Add New Transaction</h2>
          <form className="bg-white p-4 rounded-lg shadow-lg space-y-4" onSubmit={handleAddTransaction}>
            <div>
              <label className="block text-sm font-medium text-gray-600">Description</label>
              <select
                name="description"
                value={transaction.description}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Description</option>
                <option value="Stationary">Stationary</option>
                <option value="Grocery">Grocery</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Amount</label>
              <input
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Type</label>
              <select
                name="type"
                value={transaction.type}
                onChange={handleInputChange}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-md shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transition duration-300 ease-in-out"
            >
              Add Transaction
            </button>
          </form>
        </section>

        {/* Transaction History */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700">Transaction History</h2>
          <ul className="bg-white p-4 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {transactionHistory.length > 0 ? (
              transactionHistory.map((t, index) => (
                <li
                  key={index}
                  className="flex justify-between mb-4 px-4 py-2 border-b-2 border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-300 ease-in-out"
                >
                  <span className="text-gray-700">{t.description}</span>
                  <span className={t.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                    {t.type === 'income' ? `+ ₹${t.amount}` : `- ₹${t.amount}`}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No transactions yet.</p>
            )}
          </ul>
        </section>

        <button
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-md shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transition duration-300 ease-in-out"
          onClick={clearTransactionHistory}
        >
          Clear Transaction
        </button>
      </div>
    </div>

    <div className='p-4'>
      <label className="block text-sm font-medium text-gray-600">Enter your Saving Target</label>
      <input
        type="number"
        name="amount"
        value={SavingTarget}
        onChange={(e) => setSavingTarget(Number(e.target.value))}
        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter amount"
        min="0"
        step="any"
      />
    </div>
  
    <Savings totalIncome={totalExpense.TotalIncome} totalExpense={totalExpense.TotalExpense} savingTarget={SavingTarget} />

    </>


                
  );
};

export default App;

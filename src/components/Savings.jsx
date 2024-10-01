import React, { useEffect } from 'react';

const SavingsTracker = ({ totalIncome, totalExpense, savingTarget }) => {
  const savings = totalIncome - totalExpense;

  // Save the saving target in local storage whenever it changes
  useEffect(() => {
    if (savingTarget > 0) {
      localStorage.setItem('savingTarget', savingTarget);
    }
  }, [savingTarget]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800 p-4 sm:p-6">
      <h3 className="container mx-auto p-4 mt-4 rounded-lg shadow-lg bg-white">Savings Tracker</h3>

      <div className="mt-4 text-center">
  <div className="flex flex-col items-center">
    <h4 className="text-2xl font-bold">
      ₹{savings < 0 ? <span className="text-red-500">{savings}</span> : <span className="text-green-500">{savings}</span>}
    </h4>
    <p className="text-sm text-gray-500">Your current savings</p>
  </div>

  <div className="flex flex-col items-center mt-4">
    <h4 className="text-2xl font-bold">
      ₹{savingTarget < 0 ? <span className="text-red-500">{savingTarget}</span> : <span className="text-green-500">{savingTarget}</span>}
    </h4>
    <p className="text-sm text-gray-500">Saving Target</p>
  </div>
</div>

      

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded-lg shadow-md">
          <h5 className="text-lg font-medium text-blue-600">Total Income</h5>
          <p className="text-2xl font-bold text-blue-800">₹{totalIncome}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg shadow-md">
          <h5 className="text-lg font-medium text-red-600">Total Expenses</h5>
          <p className="text-2xl font-bold text-red-800">₹{totalExpense}</p>
        </div>
      </div>

      {/* Savings Progress Bar */}
      <div className="mt-6">
        <h5 className="text-lg font-medium text-gray-700">Savings Progress</h5>
        <div className="w-full bg-gray-300 rounded-full">
          {/* Prevent division by zero */}
          <div
            className={`bg-green-500 h-4 rounded-full`}
            style={{ width: savingTarget > 0 ? `${(savings / savingTarget) * 100}%` : '0%' }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">
          {savings >= 0 ? 'You are saving!' : "You're overspending!"}
        </p>
      </div>
    </div>
  );
};

export default SavingsTracker;

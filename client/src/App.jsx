import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginScreen onLoginSuccess={setUser} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-8">🎓 EduSwap</h2>
          <nav className="space-y-2 text-sm">
            <div className="px-3 py-2 rounded bg-blue-600 font-medium">Explore Skills</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800 cursor-pointer">My Sessions</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800 cursor-pointer">Credit Wallet</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800 cursor-pointer">My Profile</div>
          </nav>
        </div>
        <button
          onClick={() => setUser(null)}
          className="text-xs text-slate-400 hover:text-white text-left"
        >
          Sign out ({user.email})
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-slate-800">
            Welcome, {user.full_name}
          </h1>
          <span className="px-4 py-1.5 rounded-full bg-slate-800 text-white text-sm font-medium">
            ⏳ {user.credit_balance} {user.credit_balance === 1 ? 'Credit' : 'Credits'}
          </span>
        </header>
        <main className="p-8 text-slate-600">
          Dashboard ready. Next step: build the Explore Skills grid and Booking Modal.
        </main>
      </div>
    </div>
  );
}

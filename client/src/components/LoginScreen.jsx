import React, { useState } from 'react';

export default function LoginScreen({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.toLowerCase().endsWith('@uoc.edu')) {
      setError('Please use your official university email (@uoc.edu).');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegister
        ? { full_name: fullName, email, password }
        : { email, password };

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed.');

      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navbar */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
          <span>🎓</span>
          <span>EduSwap</span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#about" className="hover:text-slate-900">About</a>
          <a href="#faq" className="hover:text-slate-900">FAQ</a>
          <button
            onClick={() => setIsRegister(false)}
            className="text-blue-600 hover:text-blue-700"
          >
            Login
          </button>
        </nav>
      </header>

      {/* Two-tone background matching the mockup */}
      <main className="relative flex-1 flex items-center justify-center px-4">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-slate-600" />

        {/* Auth Card */}
        <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <span>🎓</span> EduSwap
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              University Time-Credit Skill Sharing Platform
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Lucas Neto"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">
                University Email
              </label>
              <input
                type="email"
                placeholder="lneto@uoc.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition"
            >
              {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="text-center space-y-2 pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              New verified students automatically receive <strong>1 Introductory Time Credit</strong> on onboarding.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              {isRegister
                ? 'Already have an account? Sign In'
                : 'New student? Register & get 1 Free Credit'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

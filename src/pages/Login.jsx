import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Tractor, Stethoscope, ArrowRight, Lock, Mail } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('farmer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    localStorage.setItem('user_role', role);
    if (role === 'farmer') {
      navigate('/farmer');
    } else {
      navigate('/veterinarian');
    }
  };

  const handleQuickDemo = (demoRole) => {
    localStorage.setItem('user_role', demoRole);
    if (demoRole === 'farmer') {
      navigate('/farmer');
    } else {
      navigate('/veterinarian');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-200">
            <ShieldCheck className="w-7 h-7" />
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">
          Sign in to MastiGuard AI
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          AI-Based Early Mastitis Risk Monitoring
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200/90 rounded-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Role Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    role === 'farmer'
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-800 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white font-medium'
                  }`}
                >
                  <Tractor className={`w-5 h-5 ${role === 'farmer' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className="text-xs">Farmer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('veterinarian')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    role === 'veterinarian'
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-800 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white font-medium'
                  }`}
                >
                  <Stethoscope className={`w-5 h-5 ${role === 'veterinarian' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span className="text-xs">Veterinarian</span>
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'farmer' ? 'farmer@dairyfarm.com' : 'dr.jenkins@vetclinic.com'}
                  className="block w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to registered email address (simulated)."); }} className="text-xs font-semibold text-emerald-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 ${
                  role === 'veterinarian' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <span>Login as {role === 'farmer' ? 'Farmer' : 'Veterinarian'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-center text-xs text-slate-500 font-medium mb-3">
              Quick Prototype Demo Access (No password required)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('farmer')}
                className="px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition"
              >
                Enter Farmer Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('veterinarian')}
                className="px-3 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition"
              >
                Enter Vet Demo
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-emerald-600 hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


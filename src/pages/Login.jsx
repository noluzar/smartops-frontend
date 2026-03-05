import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/auth/login', data);
      setAuth(res.data.token, { email: res.data.email, role: res.data.role });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4 lg:p-0 bg-slate-100">
      <div className="flex w-full max-w-[1200px] flex-col lg:flex-row bg-white overflow-hidden shadow-2xl rounded-xl lg:h-[720px]">
        
        {/* Left Side */}
        <div className="relative hidden w-1/2 lg:flex flex-col justify-between p-12 bg-[#2b8dee]">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2b8dee] text-3xl">hub</span>
              </div>
              <span className="text-white text-2xl font-black tracking-tight">SmartOps</span>
            </div>
            <h1 className="text-white text-5xl font-black leading-tight tracking-tight mt-12">
              Precision in every <br />project detail.
            </h1>
            <p className="text-white/80 text-lg mt-6 max-w-md font-medium">
              The ultimate platform for managing your operations, tasks, and team collaboration.
            </p>
          </div>
          <div className="relative z-10 mt-auto">
            <p className="text-white/70 text-sm font-medium">Join over 2,000+ teams optimizing their workflow.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center p-8 md:p-16 lg:p-24 bg-white">
          <div className="max-w-[400px] w-full mx-auto lg:mx-0">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
              <p className="text-slate-500">Please enter your details to sign in.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                  <input
                    {...register('email', { required: 'Email is required' })}
                    className="w-full pl-12 pr-4 h-14 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#2b8dee] focus:border-transparent transition-all outline-none"
                    placeholder="name@company.com"
                    type="email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                  <input
                    {...register('password', { required: 'Password is required' })}
                    className="w-full pl-12 pr-12 h-14 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#2b8dee] focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2b8dee] hover:bg-[#2b8dee]/90 text-white font-bold h-14 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                <span className="material-symbols-outlined text-xl">login</span>
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-[#2b8dee] hover:text-[#2b8dee]/80">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
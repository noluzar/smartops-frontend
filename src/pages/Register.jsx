import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/auth/register', data);
      setAuth(res.data.token, { email: res.data.email, role: res.data.role });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
              Start managing <br />smarter today.
            </h1>
            <p className="text-white/80 text-lg mt-6 max-w-md font-medium">
              Create your account and get your team up and running in minutes.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center p-8 md:p-16 lg:p-24 bg-white">
          <div className="max-w-[400px] w-full mx-auto lg:mx-0">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Create an account</h2>
              <p className="text-slate-500">Fill in your details to get started.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                  <input
                    {...register('fullName', { required: 'Full name is required' })}
                    className="w-full pl-12 pr-4 h-14 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#2b8dee] focus:border-transparent transition-all outline-none"
                    placeholder="Noluthando"
                    type="text"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
              </div>

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
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                    className="w-full pl-12 pr-4 h-14 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-[#2b8dee] focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2b8dee] hover:bg-[#2b8dee]/90 text-white font-bold h-14 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Create Account'}
                <span className="material-symbols-outlined text-xl">person_add</span>
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#2b8dee] hover:text-[#2b8dee]/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
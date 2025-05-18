import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

interface RegisterFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState<Partial<RegisterFormData>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (formErrors[name as keyof RegisterFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const errors: Partial<RegisterFormData> = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await register(
        formData.username,
        formData.email,
        formData.phone,
        formData.password
      );
      navigate('/');
    } catch (error) {
      // Error is handled in the AuthContext
      console.error('Registration error:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Your Account
            </h1>
            <p className="mt-2 text-gray-600">
              Join our community and start discovering local events
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <Input
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                  fullWidth
                  className="pl-10"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={formErrors.username}
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  fullWidth
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  fullWidth
                  className="pl-10"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={formErrors.phone}
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  fullWidth
                  className="pl-10"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={formErrors.password}
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  fullWidth
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={formErrors.confirmPassword}
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
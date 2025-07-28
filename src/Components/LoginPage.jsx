import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  // Yup validation schemas
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Too short!').required('Required'),
  });

  const SignupSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Too short!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Too short!').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const payload = isLogin
        ? { email: values.email, password: values.password }
        : values;

      const url = isLogin
        ? 'https://shop-swift-back-end-6.onrender.com/api/login'
        : 'https://shop-swift-back-end-6.onrender.com/api/register';

      const res = await axios.post(url, payload);

      if (res.data.access_token) {
        localStorage.setItem('access_token', res.data.access_token);
      }
      if (res.data.refresh_token) {
        localStorage.setItem('refresh_token', res.data.refresh_token);
      }
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      navigate('/mainpage');
    } catch (err) {
      setErrors({
        email: err.response?.data?.error || 'Invalid credentials or user already exists',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      {/* Header */}
      <div className="loginpage-header">
        <h2 className="text-sm font-semibold text-gray-700">The children’s home collective</h2>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          Find the Perfect <span className="text-purple-600">Children's Home</span> in Your Area
        </h1>
        <p className="mt-4 text-gray-600 font-medium">
          Connect with trusted children's homes that provide safe, nurturing environments for children
          in need.
        </p>
        <div className="loginpage-icons">
          <div className="flex items-center gap-2 text-red-600">📍 Local facilities</div>
          <div className="flex items-center gap-2 text-gray-700">🛡 Verified & trusted</div>
          <div className="flex items-center gap-2 text-purple-700">👥 Community support</div>
        </div>
      </div>

      {/* Login/Signup Card */}
      <div className="logincard">
        <div className="loginform">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </h2>

          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={isLogin ? LoginSchema : SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                {!isLogin && (
                  <div>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="border border-gray-300 rounded-md px-4 py-2"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                  </div>
                )}

                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                >
                  {isSubmitting
                    ? isLogin ? 'Logging in...' : 'Signing up...'
                    : isLogin ? 'Login Now' : 'Create Account'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p>{isLogin ? 'Don’t have an account?' : 'Already have an account?'}</p>
            <button
              onClick={toggleForm}
              className="mt-2 block w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {isLogin ? 'Sign up' : 'Back to Login'}
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="loginimage">
          <div className="text-center">
            <p className="mt-4 text-sm text-gray-600 font-semibold">
              Coming together to assist each other
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="choose-section">
        <h3 className="font-bold text-lg text-gray-700 mb-2">Why Choose Our Platform?</h3>
        <p className="text-gray-600 font-medium">
          We're committed to connecting children with the right care facilities through our comprehensive platform.
        </p>

        <div className="features">
          <div className="loginblock">
            <p className="feature-header">📍 Local search</p>
            <p>Find children's homes in your specific area with detailed location info and directions.</p>
          </div>
          <div className="loginblock">
            <p className="feature-header">🛡 Verified Facilities</p>
            <p>All facilities are verified and meet our strict safety and care standards.</p>
          </div>
          <div className="loginblock">
            <p className="feature-header">👥 Community Reviews</p>
            <p>Read real reviews from families and caseworkers to make informed decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

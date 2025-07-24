import React from 'react';

const LoginPage = () => {
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
          in need. Our platform makes it easy to find, compare, and contact facilities near you.
        </p>
        {/* Icons + Text */}
        <div className="loginpage-icons">
          <div className="flex items-center gap-2 text-red-600">
            📍 Local facilities
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            🛡 Verified & trusted
          </div>
          <div className="flex items-center gap-2 text-purple-700">
            👥 Community support
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="logincard">
        {/* Login Form */}
        <div className="loginform">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">LOGIN</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Login Now
            </button>
          </form>

          {/* Sign Up */}
          <div className="mt-6 text-center">
            <p>or</p>
            <button className="mt-2 block w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              Sign up
            </button>
          </div>
        </div>

        {/* Image Side */}
        <div className="loginimage">
          <div className="text-center">
            <p className="mt-4 text-sm text-gray-600 font-semibold">Coming together to assist each other</p>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="choose-section">
        <h3 className="font-bold text-lg text-gray-700 mb-2">Why Choose Our Platform?</h3>
        <p className="text-gray-600 font-medium">
          We're committed to connecting children with the right care facilities through our comprehensive platform.
        </p>

        {/* Features */}
        <div className="features">
          <div className='loginblock'>
            <p className="feature-header">📍 Local search</p>
            <p>Find children's homes in your specific area with detailed location info and directions.</p>
          </div>
          <div className='loginblock'>
            <p className="feature-header">🛡 Verified Facilities</p>
            <p>All facilities are verified and meet our strict safety and care standards.</p>
          </div>
          <div className='loginblock'>
            <p className="feature-header">👥 Community Reviews</p>
            <p>Read real reviews from families and caseworkers to make informed decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

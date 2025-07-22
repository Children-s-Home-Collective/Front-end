import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#f2f2fc] flex flex-col items-center justify-center px-4 py-8">
      <h2 className="text-center text-sm font-semibold text-gray-700 mb-1">
        The children’s home collective
      </h2>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Find the Perfect <span className="text-purple-600">Children's Home</span> in Your Area
      </h1>
      <p className="text-center text-gray-700 max-w-2xl mb-6">
        Connect with trusted children's homes that provide safe, nurturing environments for children
        in need. Our platform makes it easy to find, compare, and contact facilities near you.
      </p>

      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <span role="img" aria-label="location">📍</span> Local facilities
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <span role="img" aria-label="verified">🛡️</span> Verified & trusted
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <span role="img" aria-label="community">👥</span> Community support
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl flex flex-col md:flex-row overflow-hidden max-w-3xl w-full">
        <div className="w-full md:w-1/2 p-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">LOGIN</h3>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Login Now
            </button>
          </form>
          <div className="text-center my-4 text-sm text-gray-600">or</div>
          <button
            type="button"
            className="w-full bg-blue-100 text-blue-800 font-semibold py-2 rounded-md hover:bg-blue-200 transition"
          >
            Sign up
          </button>
        </div>

        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
          <div className="text-center text-gray-700 text-sm font-medium">
            <p>Coming together to assist each other</p>
            <img
              src="https://i.imgur.com/R1zbiKx.png" // Placeholder for the hand image
              alt="Helping Hands"
              className="mt-4 max-h-48 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center max-w-4xl">
        <h3 className="font-bold text-lg mb-3">Why Choose Our Platform?</h3>
        <p className="mb-6 text-gray-700">
          We're committed to connecting children with the right care facilities through our comprehensive platform.
        </p>
        <div className="flex flex-col md:flex-row justify-around gap-6 text-gray-800 text-sm">
          <div>
            <div className="font-semibold mb-1">📍 Local search</div>
            <p>Find children's homes in your specific area with detailed location information and directions.</p>
          </div>
          <div>
            <div className="font-semibold mb-1">🛡️ Verified Facilities</div>
            <p>All listed facilities are verified and meet our strict safety and care standards.</p>
          </div>
          <div>
            <div className="font-semibold mb-1">👥 Community Reviews</div>
            <p>Read reviews from families and caseworkers to make informed decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

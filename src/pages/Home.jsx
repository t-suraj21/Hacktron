import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-4"
      >
        Welcome to Sheild Her
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg mb-6"
      >
        A platform to ensure your safety with emergency alerts, harassment reporting, and safety resources.
      </motion.p>
      <div className="flex space-x-4">
        <Link to="/register">
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-500 py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
          >
            Register
          </motion.button>
        </Link>
        <Link to="/login">
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-green-500 py-2 px-6 rounded-lg shadow-md hover:bg-green-600"
          >
            Login
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

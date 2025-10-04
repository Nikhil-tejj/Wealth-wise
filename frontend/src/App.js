import React, { useState, useEffect } from 'react';
import { Routes, Route ,useNavigate} from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import { auth} from "./firebase";
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Wallet, Users } from 'lucide-react';
import HashLoader from "react-spinners/HashLoader";
import Psinfo from './components/Psinfo';
import ChatBot from './components/ChatBot';
import FileUpload from './components/FileUpload';
import InvestmentRecommendationForm from './components/personalMF';
import PageNotFound from './components/PageNotFound';
import PersonalFDRecommendation from './components/personalFD';
import ExpenseDate from './components/ExpenseDate';

const App = () => {
  const [log, setLog] = useState(false);
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { 
            y: 20, 
            opacity: 0,
            scale: 0.8
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    const spinVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const iconList = [
        { icon: <Coins className="text-blue-400 w-12 h-12" />, color: "bg-blue-500/10" },
        { icon: <TrendingUp className="text-green-400 w-12 h-12" />, color: "bg-green-500/10" },
        { icon: <Wallet className="text-purple-400 w-12 h-12" />, color: "bg-purple-500/10" },
        { icon: <Users className="text-indigo-400 w-12 h-12" />, color: "bg-indigo-500/10" }
    ];




 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log(user.email);
      try {
        setLoading(true); 
        if (user) {
          setMail(user.email);
          console.log("AFADF : ",auth.currentUser);
        } else {
          // setMail('');
          // await auth.signOut();
        }
        setLoading(false);
      } catch (error) {
        console.error('Error during authentication state change:', error);
        setLoading(false); 
      }
    });
  
    return () => unsubscribe(); 
  }, []);
  

  if (loading) {
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900/70 to-purple-900/70 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                }}
                className="w-full max-w-md bg-white/15 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 text-center"
            >
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-6 text-white"
                >
                    Generating Recommendation
                </motion.h2>
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center space-x-4 mb-6"
                >
                    {[1, 2, 3, 4].map((_, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`w-4 h-4 rounded-full ${iconList[index].color}`}
                        />
                    ))}
                </motion.div>
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center space-x-4 mb-6"
                >
                    {iconList.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            variants={spinVariants}
                            animate="animate"
                            className={`p-4 rounded-xl ${item.color} flex items-center justify-center`}
                        >
                            {item.icon}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: {
                            delay: 0.5
                        }
                    }}
                    className="text-white/70 text-lg"
                >
                    Analyzing your financial profile...
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ 
                        opacity: [0.1, 0.3, 0.1],
                        transition: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10"
                />
            </motion.div>
        </div>
    );
  }



  return (
    <div className="App">
      <style>
        {`
            .grecaptcha-badge {
            visibility: hidden;
            }
        `}
      </style>
      <Routes>
        <Route path="/" element={<Login user1={setLog} email={setMail} />} />
        <Route path="*" element={ <PageNotFound /> } />
        <Route path="/home" element={ <Home mail={mail} /> } />
        <Route path="/foam" element={ <Psinfo mail={mail} />} />
        <Route path="/chatbot" element={<ChatBot mail={mail} /> } />
        <Route path="/fileupload" element={ <FileUpload mail={mail} /> } />
        <Route path="/personal-MF" element={ <InvestmentRecommendationForm mail={mail} /> } />
        <Route path="/fd-recommendations" element={ <PersonalFDRecommendation mail={mail} /> } />
        <Route path="/expensedate" element={ <ExpenseDate mail={mail} /> } />
      </Routes>
    </div>
  );
};

export default App;

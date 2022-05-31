/*global chrome*/

import React, { useState } from 'react';
import Home from "./home/Home";
import Auth from './auth/auth';
import { useLocalStorage } from './CustomHooks/UseLocalStorage';
import { motion, AnimatePresence } from "framer-motion"

const App = () => {
    const [token, setToken] = useLocalStorage("token", null);
    const [search, setSearch] = useState("")
    const [response, setResponse] = useState("")

    // If token is found, that means the user is logged in and we can re-direct to the home page
    return (
        <AnimatePresence exitBeforeEnter>
            {token?
                <div>
                    <Home token={token} />
                </div>:
                <motion.div
                    key='auth'
                    initial={ false }
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}>
                    <Auth setToken={setToken} />
                </motion.div>
            }
        </AnimatePresence>
    )
}
export default App;
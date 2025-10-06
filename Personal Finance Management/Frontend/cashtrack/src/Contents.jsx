import React from 'react'
import Dashboard from "./Dashboard";
import Balance from "./Balance";
import Transaction from "./Transaction";
import Bills from "./Bill";
import Expense from "./Expenses";
import Goals from "./Goals";
import { Routes,Route } from "react-router-dom";
const Contents = ({ onNotificationAdded, onClearNotifications }) => {
  return (<React.Fragment>
    <Routes>
            <Route path='dashboard' element={<Dashboard/>}></Route>
            <Route path='balance' element={<Balance/>}></Route>
            <Route path='transaction' element={<Transaction/>}></Route>
            <Route path='bills' element={<Bills 
            onNotificationAdded={onNotificationAdded}
            onClearNotifications={onClearNotifications}  
            />}></Route>
            <Route path='expenses' element={<Expense/>}></Route>
            <Route path='goals' element={<Goals/>}></Route>
    </Routes>
    </React.Fragment>
  )
}

export default Contents

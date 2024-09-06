import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { auth } from './firebase';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Recurring from './components/Recurring';
import Spending from './components/Spending';
import Profile from './components/Profile';
import BudgetAndSavings from './components/BudgetAndSavings';
import SideNav from './components/SideNav';
import { CardDetails, Transaction, updateCardWithRealtimeTransactions } from './components/financialTypes';

const { Content } = Layout;

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [cards, setCards] = useState<CardDetails[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prevCards => prevCards.map(updateCardWithRealtimeTransactions));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCardAdded = (newCard: CardDetails) => {
    setCards([...cards, newCard]);
  };

  const handleExpenseAdded = (cardId: string, transaction: Transaction) => {
    setCards(prevCards => prevCards.map(card => 
      card.id === cardId 
        ? { ...card, transactions: [...card.transactions, transaction], balance: card.balance + transaction.amount }
        : card
    ));
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {user && <SideNav />}
        <Layout>
          <Content>
            <Routes>
              <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/dashboard" />} />
              <Route 
                path="/dashboard" 
                element={user ? <Dashboard cards={cards} onCardAdded={handleCardAdded} /> : <Navigate to="/signin" />} 
              />
              <Route 
                path="/recurring" 
                element={user ? <Recurring cards={cards} /> : <Navigate to="/signin" />} 
              />
              <Route 
                path="/spending" 
                element={user ? <Spending cards={cards} onExpenseAdded={handleExpenseAdded} /> : <Navigate to="/signin" />} 
              />
              <Route 
                path="/budget-and-savings" 
                element={user ? <BudgetAndSavings /> : <Navigate to="/signin" />} 
              />
              <Route 
                path="/profile" 
                element={user ? <Profile /> : <Navigate to="/signin" />} 
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
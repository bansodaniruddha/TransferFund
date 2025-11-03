import React, {useState, useEffect} from 'react';
import { fetchTransactions } from './api';

export default function Transactions({setMessage}){
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount] = useState('');

  async function load(accountFilter=''){
    setMessage('');
    try{
      const data = await fetchTransactions(accountFilter);
      setTransactions(data || []);
    }catch(err){
      setMessage('Error: ' + err.message);
    }
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <input value={account} onChange={e=>setAccount(e.target.value)} placeholder="Optional account filter (ACC1001)" />
        <button className="btn" onClick={()=>load(account)}>Refresh</button>
      </div>
      <table className="table">
        <thead><tr><th>ID</th><th>Sender</th><th>Receiver</th><th>Amount</th><th>Time</th></tr></thead>
        <tbody>
          {transactions.length === 0 && <tr><td colSpan="5">No transactions</td></tr>}
          {transactions.map(t => (
            <tr key={t.id}><td>{t.id}</td><td>{t.senderAccount}</td><td>{t.receiverAccount}</td><td>{t.amount}</td><td>{t.transactionTime || t.transaction_time || t.timestamp}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
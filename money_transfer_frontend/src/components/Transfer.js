import React, {useState} from 'react';
import { initiateTransfer } from './api';

export default function Transfer({setMessage, setPendingOtpInfo}){
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try{
      const data = await initiateTransfer(fromAccount, toAccount, Number(amount));
      // Backend in this project returns dummy OTP in response.
      setMessage(JSON.stringify(data));
      if(data.otp){
        setPendingOtpInfo({fromAccount, amount, otp: data.otp});
      } else {
        setPendingOtpInfo(null);
      }
    }catch(err){
      setMessage('Error: ' + err.message);
    }finally{ setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="inputRow">
        <label>From Account</label>
        <input value={fromAccount} onChange={e=>setFromAccount(e.target.value)} placeholder="ACC1001" required />
      </div>
      <div className="inputRow">
        <label>To Account</label>
        <input value={toAccount} onChange={e=>setToAccount(e.target.value)} placeholder="ACC1002" required />
      </div>
      <div className="inputRow">
        <label>Amount</label>
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="1000" type="number" min="1" required />
      </div>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Please wait...' : 'Initiate Transfer'}</button>
      <p className="small">After initiating, use Verify OTP tab to confirm transfer.</p>
    </form>
  );
}
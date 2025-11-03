import React, {useState, useEffect} from 'react';
import { verifyOtp } from './api';

export default function VerifyOtp({setMessage, pendingOtpInfo, setPendingOtpInfo}){
  const [fromAccount, setFromAccount] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(pendingOtpInfo){
      setFromAccount(pendingOtpInfo.fromAccount || '');
      // If backend returned otp (dummy), show it to user as hint (for demo only)
      if(pendingOtpInfo.otp){
        setOtp(pendingOtpInfo.otp);
        setMessage('Dummy OTP provided by backend: ' + pendingOtpInfo.otp);
      }
    }
  },[pendingOtpInfo, setMessage]);

  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try{
      const data = await verifyOtp(fromAccount, otp);
      setMessage(JSON.stringify(data));
      if(data.status === 'SUCCESS') setPendingOtpInfo(null);
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
        <label>OTP</label>
        <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="123456" required />
      </div>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
    </form>
  );
}
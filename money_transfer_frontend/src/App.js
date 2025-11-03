import React, {useState, useEffect} from 'react';
import AddBeneficiary from './components/AddBeneficiary';
import Transfer from './components/Transfer';
import VerifyOtp from './components/VerifyOtp';
import Transactions from './components/Transactions';
import './styles.css';

function App(){
  const [tab, setTab] = useState('transfer');
  const [message, setMessage] = useState('');
  const [pendingOtpInfo, setPendingOtpInfo] = useState(null); // {fromAccount, amount}

  useEffect(()=>{
    document.title = 'Money Transfer App';
  },[]);

  return (
    <div className="container">
      <h1>Money Transfer (OTP) — Demo</h1>
      <div className="nav">
        <button onClick={()=>setTab('transfer')}>Transfer</button>
        <button onClick={()=>setTab('verify')}>Verify OTP</button>
        <button onClick={()=>setTab('beneficiary')}>Add Beneficiary</button>
        <button onClick={()=>setTab('transactions')}>Transactions</button>
      </div>

      <div className="content">
        {message && <div className="message">{message}</div>}

        {tab === 'transfer' && <Transfer setMessage={setMessage} setPendingOtpInfo={setPendingOtpInfo} />}
        {tab === 'verify' && <VerifyOtp setMessage={setMessage} pendingOtpInfo={pendingOtpInfo} setPendingOtpInfo={setPendingOtpInfo} />}
        {tab === 'beneficiary' && <AddBeneficiary setMessage={setMessage} />}
        {tab === 'transactions' && <Transactions setMessage={setMessage} />}
      </div>

      <footer style={{marginTop:20,fontSize:12, color:'#666'}}>
        Backend assumed at <code>http://localhost:8080</code>. Make sure Spring Boot app is running.
      </footer>
    </div>
  );
}

export default App;
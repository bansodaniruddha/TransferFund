import React, {useState} from 'react';
import { addBeneficiary } from './api';

export default function AddBeneficiary({setMessage}){
  const [ownerAccount, setOwnerAccount] = useState('');
  const [beneficiaryAccount, setBeneficiaryAccount] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try{
      const data = await addBeneficiary(ownerAccount, beneficiaryAccount);
      setMessage(JSON.stringify(data));
    }catch(err){
      setMessage('Error: ' + err.message);
    }finally{ setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="inputRow">
        <label>Owner Account</label>
        <input value={ownerAccount} onChange={e=>setOwnerAccount(e.target.value)} placeholder="ACC1001" required />
      </div>
      <div className="inputRow">
        <label>Beneficiary Account</label>
        <input value={beneficiaryAccount} onChange={e=>setBeneficiaryAccount(e.target.value)} placeholder="ACC1002" required />
      </div>
      <button className="btn" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Beneficiary'}</button>
    </form>
  );
}
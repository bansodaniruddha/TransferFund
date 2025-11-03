const BASE = 'http://localhost:8080';

export async function addBeneficiary(ownerAccount, beneficiaryAccount){
  const res = await fetch(`${BASE}/addBeneficiary`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ ownerAccount, beneficiaryAccount })
  });
  return res.json();
}

export async function initiateTransfer(fromAccount, toAccount, amount){
  const res = await fetch(`${BASE}/transfer`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ fromAccount, toAccount, amount })
  });
  return res.json();
}

export async function verifyOtp(fromAccount, otp){
  const res = await fetch(`${BASE}/verifyOtp`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ fromAccount, otp })
  });
  return res.json();
}

export async function fetchTransactions(account){
  const url = account ? `${BASE}/transactions/${account}` : `${BASE}/transactions`;
  const res = await fetch(url);
  return res.json();
}
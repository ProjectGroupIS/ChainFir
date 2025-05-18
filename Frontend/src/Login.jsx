import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import './Login.css';

function Login() {
  const [account, setAccount] = useState('');
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask.");
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      setAccount(address);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const message = `Sign to login at ${new Date().toISOString()}`;
      await signer.signMessage(message);

      console.log("Navigating to /select...");
      navigate('/select'); // ✅ This should now work
    } catch (error) {
      
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-heading">🔐 ChainFIR Login</h1>
        <button onClick={connectWallet} className="login-button">
          Connect Wallet with MetaMask
        </button>
        {account && (
          <p className="login-wallet">
            Wallet: <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
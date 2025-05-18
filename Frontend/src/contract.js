import { ethers } from "ethers";
import contractABI from "./FIR_ABI.json";

const contractAddress = "0xYourSmartContractAddress"; // 🔁 Replace with real address

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};
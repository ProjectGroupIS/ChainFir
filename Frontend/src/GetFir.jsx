import { useState } from "react";
import { ethers } from "ethers";
import abi from "./FIR_ABI.json"; // Adjust the path to your ABI file
import DisplayFir from "./displayFir.jsx"; // Adjust the path to your displayFir component

export default function ViewFir() {
  const [firId, setFirId] = useState("");
  const [firData, setFirData] = useState(null);
  const [loading, setLoading] = useState(false);
  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

   async function getFirHashFromContract(firId) {

        if (!window.ethereum) throw new Error("MetaMask not found");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);
        const firCount = await contract.getFIRCount();
        if (firId < firCount) {
          const {complaiantName,ipfsHash,filedBy,timestamp} = await contract.getFIRByIndex(ethers.toBigInt(firId)); // Assumes getFir(id) returns a string
          console.log("Hash from contract:", complaiantName,ipfsHash,filedBy,timestamp);
          return ipfsHash;
        }
        else throw new Error("FIR ID does not exist"); 
   }

  const handleViewFir = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFirData(null);

    try {
      // Step 1: Get IPFS hash from contract
      const hash = await getFirHashFromContract(firId);
      console.log("Hash from contract:", hash);

      // Step 2: Fetch JSON from IPFS via your backend (or use public gateway)
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
      const data = await response.json();

      // console.log("FIR data from IPFS:", await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`));
      setFirData(data);
    } catch (err) {
      alert("❌ Error fetching FIR: " + err.message);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>🔍 View FIR</h2>
      <form onSubmit={handleViewFir}>
        <input
          type="number"
          placeholder="Enter FIR ID"
          value={firId}
          onChange={(e) => setFirId(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: "8px" }}>
          {loading ? "Loading..." : "View"}
        </button>
      </form>

      {firData && (
        <div style={{ marginTop: "1rem", padding: "1rem", background: "#222", color: "#fff" }}>
          <h3>📄 FIR Details</h3>
          <DisplayFir initialFIR={firData} />
        </div>
      )}
    </div>
  );
}
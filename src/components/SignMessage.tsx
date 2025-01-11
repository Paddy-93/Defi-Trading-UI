import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import axios from "axios";

const SignMessage: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [nonce, setNonce] = useState<string | null>(null);

  // Fetch the nonce from the backend
  useEffect(() => {
    const fetchNonce = async () => {
      const response = await axios.get(
        `https://api.tacotrade.io/getNonce/${address}`
      );
      setNonce(response.data.nonce);
    };

    if (address) {
      fetchNonce();
    }
  }, [address]);

  const signMessage = async () => {
    if (isConnected && address && nonce) {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create the dynamic message with the nonce
      const message = `Please sign this message to authenticate your wallet. Nonce: ${nonce}`;

      try {
        // Sign the dynamic message
        const signature = await signer.signMessage(message);

        // Send the signed message to the backend for verification
        const response = await axios.post(
          "https://api.tacotrade.io/authenticate",
          {
            address,
            message,
            signature,
          }
        );

        console.log("Authenticated:", response.data);
      } catch (error) {
        console.error("Error signing message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {isConnected ? (
        <div>
          <p>Connected: {address}</p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full"
            onClick={signMessage}
            disabled={loading || !nonce}
          >
            {loading ? "Signing..." : "Sign Message to Authenticate"}
          </button>
        </div>
      ) : (
        <p>Connect your wallet to sign the message.</p>
      )}
    </div>
  );
};

export default SignMessage;

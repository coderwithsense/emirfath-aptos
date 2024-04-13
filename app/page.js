"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import Moralis from "moralis";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { data } from "autoprefixer";
import toast, { Toaster } from "react-hot-toast";
import { AptosTransaction } from "@/components/aptos-transactions";

// {
//   "amount": "1",
//   "collection_data_id_hash": "6ab63f37e659b52c4842b863b63f6182c4ae3cccc1ec8a4b60a87f0a4813eb5f",
//   "collection_name": "Souffl3 BakeOff - Egg",
//   "creator_address": "0x6b6228a95251e3c54fec68f591012bf928ae76b5ad99602af2ef5cd399d3c69f",
//   "last_transaction_timestamp": "2024-01-26T17:11:12.133Z",
//   "last_transaction_version": "421360376",
//   "name": "Egg #21077",
//   "owner_address": "0x722f3b116ef1d62a9acc5ba4a08d334e461c0c1245f19d2cbd2ef835ec42ecca",
//   "property_version": "1",
//   "table_type": "0x3::token::TokenStore",
//   "token_data_id_hash": "00763c8d8e50a5f77a6ad90200b8585489fc65726039314a0b6e751fdb9ce433",
//   "token_properties": {
//       "HP": "10",
//       "PRODUCTION_DATE": "1672045614",
//       "TOKEN_PROPERTY_MUTATBLE": "true",
//       "WAV3_STANDARD_PROPERTY_KEYS": "HP/PRODUCTION_DATE/"
//   }
// }

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');
  const {
    connect,
    account,
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signAndSubmitBCSTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();

  const getNfts = async () => {
    try {
      const nfts = await Moralis.AptosApi.wallets.getNFTByOwners({
        "limit": 100,
        "ownerAddresses": [
          address
        ],
        "network": network.name
      });
      console.log(nfts.result);
      setNfts(nfts.result);
    } catch (e) {
      console.error(e);
    }
  }

  const sendTokens = async () => {
    try {
      const payload = {
        function: "0x3::token_transfers::offer_script",
        type_arguments: [],
        arguments: [
          "0x98de31bbf89204ac208f75329c883cd91a6e1f859f02ee6871cce89808941f9c",
          "0xabf3630d0532fef81dfe610dd4def095070d91e344d475051e1c49da5e6d51c3",
          "Aptos Zero",
          "Aptos Zero: 98571",
          "0",
          "1",
        ],
        type: "entry_function_payload"
      }
      const option = {
        sequence_number: "1",
        max_gas_amount: "4000",
        gas_unit_price: "100",
        // Unix timestamp, in seconds + 30 days
        expiration_timestamp_secs: (Math.floor(Date.now() / 1000) + 30 * 24 * 3600).toString(),
      }
      const response = await signTransaction({ payload });
      console.log(`Transaction sent successfully: ${response}`);
      toast.success("Transaction sent successfully");
    } catch (e) {
      errorToast(e);
    }
  }

  const errorToast = (error) => {
    toast.error(error);
  }


  const signingBaaji = async () => {
    const payload = {
      message: "Hello from Aptos Wallet Adapter",
      nonce: "random_string",
    };
    const signature = await signMessage(payload);
  }

  useEffect(() => {
    if (connected) {
      setAddress(account.address);
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {connected ? (
          <div>
            <div>
              <p>Connected to {network.name} as {address}</p>
            </div>
            <div>
              <Button onClick={() => disconnect()}>Disconnect</Button>
              <Button onClick={getNfts}>Get NFTs</Button>
            </div>
            <div>
              <ul>
                {nfts.map((nft, index) => (
                  <li key={index}>
                    <p>{nft.collectionName} : {nft.name}</p>
                    <Button>Transfer</Button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Button onClick={getNfts}>Send Tokens</Button>
              <AptosTransaction />
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => connect('Petra')}>Connect</button>
          </div>
        )}
      </div>
      <Toaster />
    </main>
  );
}

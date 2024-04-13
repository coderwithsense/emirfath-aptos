import { useWallet } from "@aptos-labs/wallet-adapter-react";

import React from 'react'

const AptosTransaction = () => {
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

      const sendAptosTransaction = async (toAddress, amount) => {
        const payload = {
            function:"0x1::aptos_account::transfer_coins",
            type_arguments:[
                "0x1::aptos_coin::AptosCoin"
            ],
            arguments:[
                "0x98de31bbf89204ac208f75329c883cd91a6e1f859f02ee6871cce89808941f9c",
                "10000"
            ],
            type:"entry_function_payload"
            }
        signAndSubmitTransaction(payload);
    }

    
  return (
    <button onClick={() => sendAptosTransaction}>HUHH</button>
  )
}

export {AptosTransaction};

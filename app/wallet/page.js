"use client";

import { WalletProvider, OpenBlockWalletAdapter, useWallet } from '@manahippo/aptos-wallet-adapter';

const wallets = [
    new OpenBlockWalletAdapter(),
  ];

const Wallet = () => {
    const {connect, disconnect, connected} = useWallet();
    return (
        <div>
            <WalletProvider
                wallets={wallets}
                autoConnect={true}
                onError={(error) => {
                    console.error(`WalletProvider error: ${error.message}`);
                }}    
            >
                <div>
                    <button onClick={() => connect('petra')}>Connect</button>
                    {connected ? 'Connected' : 'Not connected'}
                    <button onClick={() => {disconnect();}}>Disconnect</button>
                </div>
            </WalletProvider>
        </div>
    )
}

export default Wallet;
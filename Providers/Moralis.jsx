import Moralis from 'moralis';
import MoralisContext from '@/Component/Context/Moralis';
import { useEffect, useState } from 'react';

const MoralisProvider = ({children}) => {
    const [moralis, setMoralis] = useState(null);

    useEffect(async () => {
        if(!moralis) {
            await Moralis.start({
                apiKey: "OGCQpmMcK10EmtmRK51f9fK3qGSZzgrOP0HxnR0j3lddYd0iSeFPnMAtqsi99E4n"
            })
                .then(() => setMoralis(Moralis))
                .catch(console.error);;
            }
    }, [moralis]);

    return (
        <MoralisContext.Provider value={moralis}>
            {children}
        </MoralisContext.Provider>
    )
}

export default MoralisProvider;
import React, { useCallback, useEffect, useState } from "react";
import {
    ContractKitProvider,
    useContractKit,
} from "@celo-tools/use-contractkit";

import { Cards, Header, SearchBar } from "../components";
import { useToast } from "../components/SnackBarContext";
import LegacyFactoryJson from "../build/contracts/LegacyFactory.json";
import { LEGACY_FACTORY } from "../constants";
import blockchain_png from "../public/blockchain.png";

function App() {
    const [legacies, setLegacies] = useState([]);
    const { address, performActions } = useContractKit();
    const [addressState, setAddressState] = useState();
    const showToast = useToast();

    useEffect(() => {
        performActions(async (kit) => {
            // get factory contract instance
            const factory = new kit.web3.eth.Contract(
                LegacyFactoryJson.abi,
                LEGACY_FACTORY
            );

            // get all legacies owned by current address
            const allLegacies = await factory.methods.getLegacy(address).call();

            // set to state
            setLegacies(allLegacies);
        }).catch((err) => {
            console.log("App => ", err);
            showToast(err.message, "error");
        });

        setAddress(address);
    }, [addressState]);

    const addLegacy = (legacy) => {
        setLegacies([legacy, ...legacies]);
    };

    const setAddress = (addr) => {
        console.log(addr, addressState);
        if (addr !== addressState) setAddressState(addr);
    };

    return (
        <main
            className="container"
            style={{
                //backgroundImage: `url(/blockchain.png)`,
                backgroundPositionX: "-23%",
                backgroundPositionY: "-9%",
                backgroundRepeat: "repeat-x",
                backgroundSize: "900px",
            }}
        >
            <Header setAddress={setAddress} addressState={addressState} />
            <Cards addLegacy={addLegacy} />
            <SearchBar legacies={legacies} />
        </main>
    );
}

function WrappedApp() {
    return (
        <ContractKitProvider
            dapp={{
                name: "My awesome dApp",
                description: "My awesome description",
                url: "https://example.com",
            }}
        >
            <App />
        </ContractKitProvider>
    );
}
export default WrappedApp;

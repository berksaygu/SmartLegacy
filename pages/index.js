import React, { useEffect, useState } from "react";
import {
    ContractKitProvider,
    useContractKit,
} from "@celo-tools/use-contractkit";

import { Cards, Header, SearchBar } from "../components";
import { useToast } from "../components/SnackBarContext";
import LockerFactoryJson from "../build/contracts/LockerFactory.json";
import { LOCKER_FACTORY } from "../constants";

function App() {
    const [lockers, setLockers] = useState([]);
    const { address, performActions } = useContractKit();
    const [addressState, setAddressState] = useState();
    const showToast = useToast();

    useEffect(() => {
        performActions(async (kit) => {
            // get factory contract instance
            const factory = new kit.web3.eth.Contract(
                LockerFactoryJson.abi,
                LOCKER_FACTORY
            );

            // get all lockers owned by current address
            const allLockers = await factory.methods.getLocker(address).call();

            // set to state
            setLockers(allLockers);
        }).catch((err) => {
            console.log("App => ", err);
            showToast(err.message, "error");
        });

        setAddress(address);
    }, [addressState]);

    const addLocker = (locker) => {
        setLockers([locker, ...lockers]);
    };

    const setAddress = (addr) => {
        console.log(addr, addressState);
        if (addr !== addressState) setAddressState(addr);
    };

    return (
        <main
            className="container"
            style={{
              backgroundColor: "#0f0e13",
              backgroundImage: `
                radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%),
                radial-gradient(at 50% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%),
                radial-gradient(at 100% 0%, hsla(339, 49%, 30%, 1) 0, transparent 50%)
              `,
              backgroundSize: "cover"
            }}
        >
            <Header setAddress={setAddress} addressState={addressState} />
            <Cards addLocker={addLocker} />
            <SearchBar lockers={lockers} />
        </main>
    );
}

function WrappedApp() {
    return (
        <ContractKitProvider
            dapp={{
                name: "Smart Legacy",
                url: "https://example.com",
            }}
        >
            <App />
        </ContractKitProvider>
    );
}
export default WrappedApp;

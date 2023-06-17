import React, { useEffect, useState } from "react";
import { Typography, InputBase, Grid, TextField } from "@mui/material";
import ContractCard from "./ContractCard";
import styles from "../styles/SearchBar.module.css";
import Image from "next/image";
import "../styles/SearchBar.module.css";

const SearchBar = ({ lockers }) => {
    const [contractName, setContractName] = useState("");

    return (
        <>
            <Typography variant="h4">Your Legacies</Typography>
            <TextField
                variant="standard"
                placeholder="Enter Contract Name"
                className={styles.searchbar}
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
            />

            {!lockers.length ? (
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <Image
                        src="/undraw_Vault_re_s4my.svg"
                        alt="No Will Contracts"
                        width="500"
                        height="250"
                    />
                    <Typography
                        variant="h4"
                        padding="15px"
                        color="#FFFFFF"
                    >
                        Sorry, there is no legacy to show.
                    </Typography>
                </div>
            ) : (
                lockers.map((addr) => (
                    <ContractCard key={addr} lockerAddr={addr} />
                ))
            )}
        </>
    );
};
export default SearchBar;

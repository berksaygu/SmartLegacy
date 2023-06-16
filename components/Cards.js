import React, { useEffect, useRef, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Tabs,
    Tab,
    TextField,
    Button,
} from "@mui/material";
import { useContractKit } from "@celo-tools/use-contractkit";
import LegacyJson from "../build/contracts/Legacy.json";
import LegacyFactoryJson from "../build/contracts/LegacyFactory.json";
import { useToast } from "../components/SnackBarContext";
import { LEGACY_FACTORY } from "../constants";
import cx from "classnames";

import styles from "../styles/Cards.module.css";

const TabPanel = ({ children, value, index }) => {
    return <div className={styles.tabpanel}>{value === index && children}</div>;
};

const CreateWillForm = ({ addLegacy }) => {
    const { address, performActions } = useContractKit();
    const heirAddressRef = useRef();
    const nameRef = useRef();

    const showToast = useToast();

    const minutes = useRef();
    const hours = useRef();
    const days = useRef();
    const months = useRef();
    const years = useRef();

    const createNewWill = async () => {
        await performActions(async (kit) => {
            // check if name provided
            const name = nameRef.current.value;
            if (!name) {
                showToast("Invalid Name", "error");
                return;
            }

            // check if locking time is valid or not
            const lockingPeriod = calculteLockingPeriod();
            if (lockingPeriod <= 0) {
                showToast("Invalid Locking Period", "error");
                return;
            }

            // validate if address entered has correct checksum
            const heirAddr = heirAddressRef.current.value;
            if (!kit.web3.utils.isAddress(heirAddr)) {
                showToast("Invalid Beneficiary Address", "error");
                return;
            }

            // create Legacy Factory contract instance
            const factory = new kit.web3.eth.Contract(
                LegacyFactoryJson.abi,
                LEGACY_FACTORY
            );

            console.log(name, address, lockingPeriod, heirAddr);
            // send transaction to create new legacy
            const recipt = await factory.methods
                .newLegacy(name, address, lockingPeriod, heirAddr)
                .send({ from: address });

            console.log("Recipt => ", recipt);

            // add newly created legacy in legacies
            addLegacy(recipt.events.NewLegacy.returnValues.legacy);
        }).catch((err) => {
            console.log("CreateWill => ", err);
            showToast(err.message, "error");
        });
    };

    const calculteLockingPeriod = () => {
        const minVal = !parseInt(minutes.current.value)
            ? 0
            : parseInt(minutes.current.value);

        const hourVal = !parseInt(hours.current.value)
            ? 0
            : parseInt(hours.current.value);

        const daysVal = !parseInt(days.current.value)
            ? 0
            : parseInt(days.current.value);
        const monthsVal = !parseInt(months.current.value)
            ? 0
            : parseInt(months.current.value);
        const yearVal = !parseInt(years.current.value)
            ? 0
            : parseInt(years.current.value);

        return (
            ((((yearVal * 12 + monthsVal) * 30 + daysVal) * 24 + hourVal) * 60 +
                minVal) *
            60
        );
    };

    return (
        <Grid
            item
            component={Card}
            md={12}
            className={cx(styles.card, styles.green)}
        >
            <CardContent>
                <Typography
                    variant="h4"
                    component="h2"
                    color="textSecondary"
                    gutterBottom
                >
                    Create New Will Contract
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item md={3}>
                        <TextField
                            label="Name for Will"
                            sx={{ m: 1, width: "90%" }}
                            required
                            inputRef={nameRef}
                        />
                    </Grid>
                    <Grid item md={9}>
                        <TextField
                            inputRef={heirAddressRef}
                            label="Beneficiary Address"
                            sx={{ m: 1, width: "90%" }}
                            required
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                        md={3}
                    >
                        <Typography
                            component="span"
                            variant="h6"
                            align="center"
                            paddingLeft="10px"
                            paddingRight="11px"
                        >
                            {"Locking Period  →"}
                        </Typography>
                    </Grid>
                    <Grid>
                        <TextField
                            label="Minutes"
                            sx={{ m: 1, width: "10ch" }}
                            type="number"
                            inputRef={minutes}
                        />
                        <TextField
                            label="Hours"
                            sx={{ m: 1, width: "10ch" }}
                            type="number"
                            inputRef={hours}
                        />
                        <TextField
                            label="Days"
                            sx={{ m: 1, width: "10ch" }}
                            type="number"
                            inputRef={days}
                        />
                        <TextField
                            label="Months"
                            sx={{ m: 1, width: "10ch" }}
                            type="number"
                            inputRef={months}
                        />
                        <TextField
                            label="Years"
                            sx={{ m: 1, width: "10ch" }}
                            type="number"
                            inputRef={years}
                        />
                    </Grid>
                </Grid>
                <Grid textAlign="center" paddingTop="10px">
                    <Button
                        size="large"
                        variant="contained"
                        className={styles.createbtn}
                        onClick={(e) => {
                            createNewWill();
                        }}
                    >
                        Create
                    </Button>
                </Grid>
            </CardContent>
        </Grid>
    );
};

const ClaimWillForm = ({ addLegacy }) => {
    const addrRef = useRef();
    const { performActions } = useContractKit();
    const showToast = useToast();

    const addWill = () => {
        const address = addrRef.current.value;
        performActions(async (kit) => {
            // validate address
            if (!kit.web3.utils.isAddress(address)) {
                showToast("Invalid Contract Address", "error");
                return;
            }

            // check if address is Will contract
            try {
                const contract = new kit.web3.eth.Contract(
                    LegacyJson.abi,
                    address
                );

                // fetch name to check if valid or not
                const _ = await contract.methods.name().call();

                // if name got fetched then it's a valid contract
                // add legacy address to legacy list
                addLegacy(address);
            } catch (err) {
                console.log(err);
                showToast("Address Not Valid Will Contract", "error");
            }
        }).catch((err) => {
            console.log("ClaimWill => ", err);
            showToast(err.msg, "error");
        });
    };

    return (
        <Grid
            item
            component={Card}
            xs={12}
            md={12}
            className={cx(styles.card, styles.yellow)}
        >
            <CardContent>
                <Typography
                    variant="h4"
                    component="h2"
                    color="textSecondary"
                    gutterBottom
                >
                    Claim Will
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item md={9}>
                        <TextField
                            label="Contract Address"
                            sx={{ m: 1, width: "100%" }}
                            inputRef={addrRef}
                        />
                    </Grid>
                </Grid>
                <Grid textAlign="center" paddingTop="10px">
                    <Button
                        size="large"
                        variant="contained"
                        className={styles.claimbtn}
                        onClick={(e) => {
                            addWill();
                        }}
                    >
                        Add
                    </Button>
                </Grid>
            </CardContent>
        </Grid>
    );
};

const Cards = ({ addLegacy }) => {
    const [tabVal, setTabVal] = useState("create");

    return (
        <div className={styles.container}>
            <Tabs
                value={tabVal}
                onChange={(event, newValue) => {
                    setTabVal(newValue);
                }}
            >
                <Tab label="Create" value="create"></Tab>
                <Tab label="Claim" value="claim"></Tab>
            </Tabs>
            <TabPanel value="create" index={tabVal}>
                <CreateWillForm addLegacy={addLegacy} />
            </TabPanel>
            <TabPanel value="claim" index={tabVal}>
                <ClaimWillForm addLegacy={addLegacy} />
            </TabPanel>
        </div>
    );
};

export default Cards;

import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Refresh } from "@material-ui/icons";
import { useToast } from "./SnackBarContext";
import Image from "next/image";
import "../styles/Header.module.css";

const Header = ({ addressState, setAddress }) => {
    const { address, connect, destroy, kit, performActions, getConnectedKit } =
        useContractKit();

    const showToast = useToast();

    useEffect(() => {
        setAddress(address);
    }, [kit]);

    return (
        <Grid
            container
            style={{
                marginTop: "200px",
                width: "50%",
            }}
            justify="center"
            // alignItems="flex-end"
        >
            <Grid
                item
                md={12}
                xs={12}
                justifyContent="center"
                textAlign="center"
            >
                <Typography variant="h2" >
                    Smart Legacy
                </Typography>
                <Typography
                    variant="h6"
                    padding="10px"
                >
                    Write your heir into the blockchain
                </Typography>
            </Grid>
            
            <Grid item md={12} xs={12} justify="center" textAlign="center">
                {!address ? (
                    <Button
                        onClick={(e) => {
                            connect().catch((err) => {
                                console.log(err);
                                showToast(err.message, "error");
                            });
                        }}
                        style={{
                            margin: "20px",
                        }}
                    >
                        Connect Wallet
                    </Button>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "20px",
                        }}
                    >
                        <Typography
                            color="textSecondary"
                            variant="h6"
                            gutterBottom
                        >
                            Your wallet address: {address}
                        </Typography>
                        <IconButton
                            style={{ padding: "0 0 5px 0" }}
                            onClick={(e) =>
                                connect().catch((err) => {
                                    console.log("Reconnect Button => ", err);
                                    showToast(err.message);
                                })
                            }
                            title="Refresh Account"
                        >
                            <Refresh />
                        </IconButton>
                    </div>
                )}
            </Grid>
        </Grid>
    );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, IconButton, Card, CardContent } from "@mui/material";
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
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Grid
                item
                xs={12}
                justifyContent="left"
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    padding: "20px",
                }}
            >
                <Typography variant="h2" style={{ color: "#FFFFFF" }}>
                    Smart Legacy
                </Typography>

                <Typography
                    variant="h6"
                    padding="10px"
                    style={{ color: "#FFFFFF" }}
                >
                    Secure your legacy on the blockchain
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
                            fontSize: "20px",
                            padding: "10px 20px",
                            width: "300px",
                            height: "50px",
                            borderRadius: "25px",
                            backgroundColor: "blue",
                            color: "white",
                        }}
                    >
                        Connect Wallet
                    </Button>
                ) : (
                    <Grid container 
                    style={{
                        marginTop: "50px",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Grid item>
                            <Card
                                style={{
                                    borderRadius: "20px",
                                    backgroundColor: "#a099ff",
                                    backgroundImage: "radial-gradient(at 83% 67%, rgb(152, 231, 156) 0, transparent 58%), radial-gradient(at 67% 20%, hsla(357, 94%, 71%, 1) 0, transparent 59%), radial-gradient(at 88% 35%, hsla(222, 81%, 65%, 1) 0, transparent 50%), radial-gradient(at 31% 91%, hsla(9, 61%, 61%, 1) 0, transparent 52%), radial-gradient(at 27% 71%, hsla(336, 91%, 65%, 1) 0, transparent 49%), radial-gradient(at 74% 89%, hsla(30, 98%, 65%, 1) 0, transparent 51%), radial-gradient(at 53% 75%, hsla(174, 94%, 68%, 1) 0, transparent 45%)",
                                    width: "400px",
                                    height: "175px",
                                    
                                    
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        color="#000"
                                        variant="h6"
                                        gutterBottom
                                        style={{ textAlign: "center" }}
                                    >
                                        Your wallet address:
                                    </Typography>

                                    <Typography
                                        color="#000"
                                        variant="h6"
                                        gutterBottom
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            wordWrap: "break-word",
                                        }}
                                    >
                                        {`${address.slice(0, 6)}...${address.slice(-4)}`}
                                    </Typography>

                                    <IconButton
                                        style={{
                                            position: "center",
                                            top: "5px",
                                            right: "10px",
                                            
                                        }}
                                        onClick={(e) =>
                                            connect().catch((err) => {
                                                console.log(
                                                    "Reconnect Button => ",
                                                    err
                                                );
                                                showToast(err.message);
                                            })
                                        }
                                        title="Refresh Account"
                                    >
                                        <Refresh />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default Header;

import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function ServerError() {
    return (
        <div>
            <Container component={Paper}>
                <Typography variant="h5" gutterBottom>
                    Server Error
                </Typography>
            </Container>
        </div>
    );
}

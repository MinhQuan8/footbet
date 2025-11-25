import React from "react";
import { CircularProgress, Box } from "@mui/material";

export default function LoadingSpinner() {
    return (
        <Box className="loadingSpinner-root">
            <CircularProgress className="loadingSpinner-spinner" />
        </Box>
    );
}

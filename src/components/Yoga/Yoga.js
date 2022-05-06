import React from "react";
import aasans from "./aasans";

// MUI Components
import { Grid, Stack } from "@mui/material";
import { Typography } from "@mui/material";
const Yoga = () => {
  return (
    <Grid container spacing={2} sx={{ padding: "16px 24px" }}>
      {aasans.map((aasan) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack
            sx={{
              border: "1px solid rgba(0,0,0,0.2)",
              height: 400,
              borderRadius: "10px",
            }}
          >
            <img
              src={`/images/yoga/${aasan.name}.gif`}
              alt={aasan.name}
              width="100%"
            />
            <Typography
              variant="h5"
              sx={{
                padding: "10px",
                fontFamily: "Anton",
                color: "rgba(0,0,0,0.8)",
              }}
            >
              {aasan.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                padding: "10px",
              }}
            >
              {aasan.description}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default Yoga;

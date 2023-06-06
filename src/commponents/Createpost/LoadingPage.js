import React from 'react';
import { CircularProgress } from "@mui/material";

const LoadingPage = ({ isLoading, loadingPercentage }) => {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',position:"absolute" }}>
        <CircularProgress variant="determinate" value={loadingPercentage} />
        <div style={{ marginLeft: 20 }}>{loadingPercentage}%</div>
      </div>
    );
  } else {
    return null;
  }
};

export default LoadingPage;

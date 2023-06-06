import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
    <Stack spacing={1} sx={{ backgroundColor: "var(--color-white)", margin: "1rem 0rem", padding: "1.1rem", borderRadius: "10px" }}>
      <Skeleton variant="circular" width={40} height={40}
        sx={{ backgroundColor: "var(--color-light)" }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem',backgroundColor: "var(--color-light)" }} />
      <Skeleton variant="rectangular" width={"100%"} height={200} sx={{ backgroundColor: "var(--color-light)" }} />
      <Skeleton variant="rounded" width={"100%"} height={60} sx={{ backgroundColor: "var(--color-light)" }} />
    </Stack>
  );
}
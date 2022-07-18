import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';

export default function LinearColor() {
    return (
        <Box
            sx={{
                height: "150px",
                width: "200px",
                top: "50%",
                left: "50%",
                position: "absolute"
            }}
        >
            <Stack sx={{ width: '150%', color: 'grey.500', }} spacing={2}>
                <LinearProgress color="secondary" sx={{
                    height: "7px",
                    width: "350px",
                    borderRadius: "10px"
                }} />
            </Stack>
        </Box>
    );
}

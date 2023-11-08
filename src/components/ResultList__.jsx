import React from 'react'
import { Skeleton, Box, List, ListItem, ListItemAvatar } from '@mui/material'

const ResultList = () => {
  return (
    <>
        <List sx={{ width: '100%', maxWidth: 360, marginTop: "20px" }}>
            <ListItem>
                <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <Box width="100%">
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <Box width="100%">
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
            </ListItem>
        </List>
    </>
  )
}

export default ResultList
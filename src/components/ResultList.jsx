import React from 'react'
import { useEffect, useState } from  'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios'
import { useTelegram } from '../hooks/useTelegram';

const {tg, onToggleButton} = useTelegram();

const getURL = "http://95.216.214.131:8000/directions/";

const ResultList = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios.get(getURL)
        .then((res) => {setData(res.data)})
        .catch((err) => {console.log(err)})
    }, [])
  
    if (!data) return null;

    const boxStyles = {
        background: "#fdfdfd",
        textAlign: "center",
        fontSize: "24px",
        position: "relative"
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent sx={boxStyles}>
            {
                data.map((d, i) => {
                    return <p key={i}><a target='_blank' href="{d.partner_link}"><br />{d.exchange_name}<br /></a></p>
                })
            }
            </CardContent>
        </Card>
    )
}

export default ResultList
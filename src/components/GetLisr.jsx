import React from 'react'
import { useEffect, useState } from  'react'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import ListSubheader from '@mui/material/ListSubheader'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useTelegram } from '../hooks/useTelegram';

const {tg, onToggleButton} = useTelegram();

const getURL = "https://wttonline.ru/valutes/no_cash/";

const GetLisr = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios.get(getURL)
        .then((res) => {setData(res.data)})
        .catch((err) => {console.log(err)})
    }, [])
  
    if (!data) return null;

    const dataKeys = Object.entries(data)
    console.log(dataKeys)

    const title1 = JSON.stringify(dataKeys[0][0]).replaceAll('"', '')
    const title2 = JSON.stringify(dataKeys[1][0]).replaceAll('"', '')
    const title3 = JSON.stringify(dataKeys[2][0]).replaceAll('"', '')
    const title4 = JSON.stringify(dataKeys[3][0]).replaceAll('"', '')
    const title5 = JSON.stringify(dataKeys[4][0]).replaceAll('"', '')

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
                <InputLabel htmlFor="grouped-select">ОТДАЮ</InputLabel>
                <Select defaultValue="" id="grouped-select" label="Grouping">
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <ListSubheader>{title1}</ListSubheader>
                    <MenuItem value={dataKeys[0][1][0].name}>{dataKeys[0][1][0].name}</MenuItem>
                    <MenuItem value={dataKeys[0][1][1].name}>{dataKeys[0][1][1].name}</MenuItem>
                    <MenuItem value={dataKeys[0][1][2].name}>{dataKeys[0][1][2].name}</MenuItem>
                    <MenuItem value={dataKeys[0][1][3].name}>{dataKeys[0][1][3].name}</MenuItem>
                    <MenuItem value={dataKeys[0][1][4].name}>{dataKeys[0][1][4].name}</MenuItem>
                    <ListSubheader>{title2}</ListSubheader>
                    <MenuItem value={dataKeys[1][1][0].name}>{dataKeys[1][1][0].name}</MenuItem>
                    <MenuItem value={dataKeys[1][1][1].name}>{dataKeys[1][1][1].name}</MenuItem>
                    <MenuItem value={dataKeys[1][1][2].name}>{dataKeys[1][1][2].name}</MenuItem>
                    <MenuItem value={dataKeys[1][1][3].name}>{dataKeys[1][1][3].name}</MenuItem>
                    <MenuItem value={dataKeys[1][1][4].name}>{dataKeys[1][1][4].name}</MenuItem>
                    <ListSubheader>{title3}</ListSubheader>
                    <MenuItem value={dataKeys[2][1][0].name}>{dataKeys[2][1][0].name}</MenuItem>
                    <MenuItem value={dataKeys[2][1][1].name}>{dataKeys[2][1][1].name}</MenuItem>
                    <ListSubheader>{title4}</ListSubheader>
                    <MenuItem value={dataKeys[3][1][0].name}>{dataKeys[3][1][0].name}</MenuItem>
                    <MenuItem value={dataKeys[3][1][1].name}>{dataKeys[3][1][1].name}</MenuItem>
                    <MenuItem value={dataKeys[3][1][2].name}>{dataKeys[3][1][2].name}</MenuItem>
                    <MenuItem value={dataKeys[3][1][3].name}>{dataKeys[3][1][3].name}</MenuItem>
                    <MenuItem value={dataKeys[3][1][4].name}>{dataKeys[3][1][4].name}</MenuItem>
                    <ListSubheader>{title5}</ListSubheader>
                    <MenuItem value={dataKeys[4][1][0].name}>{dataKeys[4][1][0].name}</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
                <InputLabel htmlFor="grouped-select">ПОЛУЧАЮ</InputLabel>
                <Select defaultValue="" id="grouped-select" label="Grouping" onChange={onToggleButton}>
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <ListSubheader>{title1}</ListSubheader>
                    <MenuItem value={dataKeys[0][1][0].name}>{dataKeys[0][1][0].name}</MenuItem>
                    <MenuItem value={dataKeys[0][1][1].name}>{dataKeys[0][1][1].name}</MenuItem>
                    <MenuItem value={dataKeys[0][1][2].name}>{dataKeys[0][1][2].name}</MenuItem>
                    <MenuItem value={dataKeys[0][1][3].name}>{dataKeys[0][1][3].name}</MenuItem>
                    <MenuItem value={dataKeys[0][1][4].name}>{dataKeys[0][1][4].name}</MenuItem>
                    <ListSubheader>{title2}</ListSubheader>
                    <MenuItem value={dataKeys[1][1][0].name}>{dataKeys[1][1][0].name}</MenuItem>
                    <MenuItem value={dataKeys[1][1][1].name}>{dataKeys[1][1][1].name}</MenuItem>
                    <MenuItem value={dataKeys[1][1][2].name}>{dataKeys[1][1][2].name}</MenuItem>
                    <MenuItem value={dataKeys[1][1][3].name}>{dataKeys[1][1][3].name}</MenuItem>
                    <MenuItem value={dataKeys[1][1][4].name}>{dataKeys[1][1][4].name}</MenuItem>
                    <ListSubheader>{title3}</ListSubheader>
                    <MenuItem value={dataKeys[2][1][0].name}>{dataKeys[2][1][0].name}</MenuItem>
                    <MenuItem value={dataKeys[2][1][1].name}>{dataKeys[2][1][1].name}</MenuItem>
                    <ListSubheader>{title4}</ListSubheader>
                    <MenuItem value={dataKeys[3][1][0].name}>{dataKeys[3][1][0].name}</MenuItem>
                    <MenuItem value={dataKeys[3][1][1].name}>{dataKeys[3][1][1].name}</MenuItem>
                    <MenuItem value={dataKeys[3][1][2].name}>{dataKeys[3][1][2].name}</MenuItem>
                    <MenuItem value={dataKeys[3][1][3].name}>{dataKeys[3][1][3].name}</MenuItem>
                    <MenuItem value={dataKeys[3][1][4].name}>{dataKeys[3][1][4].name}</MenuItem>
                    <ListSubheader>{title5}</ListSubheader>
                    <MenuItem value={dataKeys[4][1][0].name}>{dataKeys[4][1][0].name}</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default GetLisr
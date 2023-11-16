import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material';
import { useTelegram } from '../hooks/useTelegram';

const GetList = ({ onSelect }) => {
  const { tg, onToggleButton } = useTelegram();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [selectedDonate, setSelectedDonate] = useState('');
  const [selectedReceive, setSelectedReceive] = useState('');

  useEffect(() => {
    axios
      .get("https://wttonline.ru/api/valute/no_cash")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  }, []);

  const renderMenuItems = (category) => {
    const categoryData = data[category];

    if (!categoryData) {
      return null;
    }

    return [
      <ListSubheader key={`subheader-${category}`}>{category}</ListSubheader>,
      ...categoryData.map((item) => (
        <MenuItem key={item.code_name} value={item.code_name}>
          {item.name}
        </MenuItem>
      )),
    ];
  };

  const handleDonateChange = (event) => {
    const selectedValue = event.target.value;
    console.log("Selected Donate:", selectedValue);
    setSelectedDonate(selectedValue);
    checkAndSendData(selectedValue, selectedReceive, 'from');
  };
  
  const handleReceiveChange = (event) => {
    const selectedValue = event.target.value;
    console.log("Selected Receive:", selectedValue);
    setSelectedReceive(selectedValue);
    checkAndSendData(selectedDonate, selectedValue, 'to');
  };

  const checkAndSendData = (from, to, type) => {
    if (from && to && from !== to) {
      onSelect(type === 'from' ? from : to, type === 'to' ? to : from);
      onToggleButton();
      console.log("From:", from, "To:", to);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 320 }}>
        <InputLabel htmlFor="donate-select">ОТДАЮ</InputLabel>
        <Select
          value={selectedDonate}
          id="donate-select"
          label="Donate"
          onChange={handleDonateChange}
        >
          {renderMenuItems("Балансы криптобирж")}
          {renderMenuItems("Интернет-банкинг")}
          {renderMenuItems("Криптовалюта")}
          {renderMenuItems("Электронные деньги")}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 320 }}>
        <InputLabel htmlFor="receive-select">ПОЛУЧАЮ</InputLabel>
        <Select
          value={selectedReceive}
          id="receive-select"
          label="Receive"
          onChange={handleReceiveChange}
        >
          {renderMenuItems("Балансы криптобирж")}
          {renderMenuItems("Интернет-банкинг")}
          {renderMenuItems("Криптовалюта")}
          {renderMenuItems("Электронные деньги")}
        </Select>
      </FormControl>
    </div>
  );
};

export default GetList;

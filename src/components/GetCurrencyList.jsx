// GetCurrencyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, ListSubheader, MenuItem, Select, CircularProgress } from '@mui/material';

const GetCurrencyList = ({ onSelect, type }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');

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

  const handleValueChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onSelect(selectedValue, type);
  };

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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 320 }}>
      <InputLabel htmlFor={`${type}-select`}>{type === 'from' ? 'Отдаю' : 'Получаю'}</InputLabel>
      <Select
        value={selectedValue}
        id={`${type}-select`}
        label={type === 'from' ? 'From' : 'To'}
        onChange={handleValueChange}
      >
        {renderMenuItems("Балансы криптобирж")}
        {renderMenuItems("Интернет-банкинг")}
        {renderMenuItems("Криптовалюта")}
        {renderMenuItems("Электронные деньги")}
      </Select>
    </FormControl>
  );
};

export default GetCurrencyList;

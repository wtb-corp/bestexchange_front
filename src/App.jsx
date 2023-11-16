// App.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useTelegram } from './hooks/useTelegram';
import GetCurrencyList from './components/GetCurrencyList';
import ResultList from './components/ResultList';

const { tg, onToggleButton } = useTelegram();

function App() {
  const [isShown, setIsShown] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');

  const handleClick = () => {
    setIsShown((current) => !current);
  
    // Add a timeout for 3 seconds (3000 milliseconds)
    setTimeout(() => {
      // Code to execute after the timeout
      console.log('Timeout completed after 6 seconds');

      // Place your additional code here, e.g., sending data to Telegram
      tg.sendData("Additional data after timeout");
    }, 6000);
  };

  const handleSelect = (value, type) => {
    if (type === 'from') {
      setSelectedFrom(value);
    } else if (type === 'to') {
      setSelectedTo(value);
    }
  };
  
  useEffect(() => {
    // Check if both fields are selected and not equal
    const isValidSelection = selectedFrom !== '' && selectedTo !== '' && selectedFrom !== selectedTo;
  
    if (isValidSelection) {
      onToggleButton(); // Enable the button
    }
  }, [selectedFrom, selectedTo]);

  useEffect(() => {
    tg.ready();
    tg.MainButton.onClick(() => {
      tg.sendData("Моя какая-то дата неизвестная");
      tg.MainButton.setText("Теперь приложение работает на лету");
      tg.MainButton.color = "#FDFDFD";
      tg.MainButton.textColor = "#CCCCCC";
      tg.MainButton.disable();
      handleClick();
    });
  }, []);

  const boxStyles = {
    background: "#fdfdfd",
    margin: "2rem 0",
    textAlign: "center",
    color: "#222",
    padding: "2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
    width: "100%",
  };

  return (
    <>
      <Container sx={boxStyles}>
        <Typography variant="h6" component="h2" gutterBottom>
          BestExChanger beta v.0.5
        </Typography>
        <GetCurrencyList onSelect={(value) => handleSelect(value, 'from')} type="from" />
        <GetCurrencyList onSelect={(value) => handleSelect(value, 'to')} type="to" />
        {/* <Button variant="contained" onClick={handleClick}>
          TELEGRAMMED
        </Button> */}
      </Container>
      {isShown && <ResultList from={selectedFrom} to={selectedTo} />}
    </>
  );
}

export default App;

import { useEffect, useState } from 'react'
import { Container, Typography, Button } from '@mui/material'
import { useTelegram } from './hooks/useTelegram'
import SuperSelect from './components/SuperSelect'
import GetLisr from './components/GetLisr'
import ResultList from './components/ResultList'

const {tg, onToggleButton} = useTelegram();

function App() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

  useEffect( () => { 
    tg.ready();
    tg.MainButton.onClick(() => {
      tg.sendData("Привет бэкенд!"); 
      //при клике на основную кнопку отправляем данные в строковом виде
      tg.MainButton.setText("Спасибо за работу с ботом");
      tg.MainButton.color = "#FDFDFD";
      tg.MainButton.textColor = "#CCCCCC";
      tg.MainButton.disable();
      handleClick();
    })
  }, []);

  const boxStyles = {
    background: "#fdfdfd",
    margin: "2rem 0",
    textAlign: "center",
    color: "#222",
    padding: "2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
    with: "100%"
  }

  return (
    <>
      <Container sx={boxStyles}>
        <Typography variant="h6" component="h2" gutterBottom>BestExChanger beta v.0.4</Typography>
        <GetLisr />
        {/* <Button variant="contained" onClick={() => {handleClick()}}>TELEGRAMMED</Button> */}
      </Container>
      {isShown && <ResultList from="BTC" to="SBERRUB" />}
    </>
  )
}

export default App

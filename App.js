import {useState} from 'react'
import { StyleSheet,ImageBackground , SafeAreaView} from "react-native";
import GameScreen from './screens/GameScreen';
import GameOverScreen from "./screens/GameOverScreen"
import { LinearGradient } from "expo-linear-gradient"
import StartGameScreen from './screens/StartGameScreen';
//import {useFonts} from 'expo-font';
//import {AppLoading} from 'expo-app-loading';

function App() {
const [userNumber , setUserNumber]=useState(null)
const[gameIsOver,setGameIsOver]=useState(true)
const[guessRounds,setGuessRounds]=useState(0)

/*const [fontsLoaded]=useFonts({
  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
});

if(!fontsLoaded){
  return <AppLoading/>
}*/

function pickedNumberHandler(pickedNumber){
  setUserNumber(pickedNumber);
  setGameIsOver(false)
}

function gameOverHandler(numberOfRounds){
  setGameIsOver(true)
  setGuessRounds(numberOfRounds)
}

function startNewGameHandler(){
  setUserNumber(null);
  setGuessRounds(0); 

}

let screen=<StartGameScreen onPickNumber={pickedNumberHandler}/>

if(userNumber){
  screen=(
  <GameScreen onGameOver={gameOverHandler} userNumber={userNumber}/>)
};
if(gameIsOver && userNumber){
  screen=<GameOverScreen userNumber={userNumber} roundsNumber={guessRounds}  onStartNewGame={startNewGameHandler}/>
}
 
  return (
    <LinearGradient colors={['#4e0329','#ddb52f']} style={styles.rootScreen}>
      <ImageBackground 
      imageStyle={styles.backgroundImage} 
      style={styles.rootScreen} 
       source={require('./assets/images/background.jpg')} resizeMode="cover">
      <SafeAreaView style={styles.rootScreen} >{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

export default App

const styles = StyleSheet.create({
  rootScreen:{
    flex:1,
  },
  backgroundImage:{
    opacity:0.15,
  }
})

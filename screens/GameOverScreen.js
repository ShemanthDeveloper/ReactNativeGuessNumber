import { Text,View,StyleSheet,Image,Dimensions } from "react-native";
import Title from '../components/game/ui/Title'
import PrimaryButton from "../components/game/ui/PrimaryButton";

function GameOverScreen({roundsNumber,userNumber,onStartNewGame}){
    
    const onStartNewGameHandler=()=>{
        onStartNewGame()
    }
    
    return(
        <View style={styles.rootContainer}>
            <Title>Game Over!</Title>
            <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../assets/images/success.png')}/>
            </View>
            <Text style={styles.summeryText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
            <PrimaryButton onPress={onStartNewGameHandler}>Start New Game</PrimaryButton>
            
        </View>
    )
}

export default GameOverScreen

const deviceWidth = Dimensions.get('window').width;

const styles= StyleSheet.create({
    rootContainer:{
        flex:1,
        padding:24,
        justifyContent:'center',
        alignItems:'center'

    },
    imageContainer:{
        width:deviceWidth <380 ? 150 : 300,
        height:deviceWidth <380 ? 150 : 300,
        borderRadius:deviceWidth <380 ? 75: 150,
        borderWidth:3,
        borderColor:'#ffffff',
        overflow:'hidden',
        margin:36,

    },
    image:{
        height:'100%',
        width:'100%'
    },
    highlight:{
        color:'#4e0329',
        color:'red',
        fontSize:28,
    },
    summeryText:{
        fontSize:24,
        marginVertical:24,
    }
})
import {Text,View,StyleSheet,Alert, FlatList, useWindowDimensions} from 'react-native';
import Title from '../components/game/ui/Title'
import { useState ,useEffect} from 'react';
import {Ionicons} from "@expo/vector-icons"
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../components/game/ui/Card';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/game/ui/PrimaryButton';
import InstructionText from '../components/game/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min,max,exclude){
    const rndNum = Math.floor(Math.random()*(max-min))+min;

    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude);
    }else{
        return rndNum;
    }
}

let minBoundry=1;
let maxBoundry=100;


function GameScreen({userNumber,onGameOver}){
    const initialGuess= generateRandomBetween(1,100,userNumber)
    const[currentGuess,setCurrentGuess]=useState(initialGuess);
    const [guessRounds,setGuessRounds]=useState([initialGuess])
    useEffect(()=>{
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    },[currentGuess,userNumber,onGameOver])

    useEffect(()=>{
        minBoundry=1;
        maxBoundry=100;
    },[])
    
    function nextGuessHandler(direction){
    
        if((direction === 'lower' && currentGuess < userNumber)||
        (direction === 'greater' && currentGuess > userNumber)){
            Alert.alert("Don't lie!", 'You Know that this is wrong...',[{
                text:'Sorry!',style:'cancel'},]);
                return;
            }
        
        if(direction==='lower'){
            maxBoundry = currentGuess;
            
        }else{
            minBoundry = currentGuess + 1 ;
        }
        const newRndNumber=generateRandomBetween(minBoundry,maxBoundry,currentGuess);
        setCurrentGuess(newRndNumber)
        setGuessRounds(prevGuessRounds=>[newRndNumber,...prevGuessRounds])
    }

    const guessRoundsListLength=guessRounds.length
    const {width,height}=useWindowDimensions()
    let content=(
    <>
        <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                    <MaterialIcons name="remove" size={24} color="white" />
                    </PrimaryButton>
                    </View><View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="add-sharp" size={24} color="white" />
                    </PrimaryButton>
                    </View>
                </View>
            </Card>
    </>)

    if(width >500){
        content=(
            <>
                
                 <View style={styles.buttonContainerWide}>
                    <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                    <MaterialIcons name="remove" size={24} color="white" />
                    </PrimaryButton>
                    </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="add-sharp" size={24} color="white" />
                    </PrimaryButton>
                    </View>
                    </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/*{guessRounds.map(guessRound=><Text key={guessRound}>{guessRounds}</Text>)}*/}
             <FlatList data={guessRounds} renderItem={(itemData)=>
            <GuessLogItem roundNumber={guessRoundsListLength- itemData.index} guess={itemData.item}/>}
            keyExtractor={(item)=>item}
            />
            </View>
        </View>
    );
}

export default GameScreen

const styles= StyleSheet.create({
    screen:{
        flex:1,
        padding:24,
        alignItems:'center'
    },
    instructionText:{
        marginBottom:12,
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    buttonContainer:{
        flex:1,
    },
    listContainer:{
        flex:1,
        padding:16
    },
    buttonContainerWide:{
        flexDirection:'row',
        alignItems:'center'
    }
})
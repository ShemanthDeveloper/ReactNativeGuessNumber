import {useState} from 'react'
import {KeyboardAvoidingView, TextInput,View,StyleSheet,Alert, Dimensions, useWindowDimensions, ScrollView} from "react-native"
import PrimaryButton from "../components/game/ui/PrimaryButton"
import Title from '../components/game/ui/Title'
import InstructionText from '../components/game/ui/InstructionText'
import Card from '../components/game/ui/Card'


function StartGameScreen({onPickNumber}){
    const[entredNumber, setEntredNumber]=useState('')

    const {width,height}= useWindowDimensions();

    function numberInputHandler(entredText){
        setEntredNumber(entredText)
    }

    function resetInputHandler(){
        setEntredNumber('')
    }

    function confirmInputHandler(){
        const chosenNumber=parseInt(entredNumber)

        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99 ){
            //show alert....
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 to 99',
                [{text:'Okay',style:'destructive',onPress:resetInputHandler}]
            );
            return;
        }
        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 380 ? 30 : 100;
    return(
        <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior='position' >
        <View style={[styles.rootContainer ,{marginTop: marginTopDistance}]}>
            <Title>Guess My Number</Title>
        <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
             keyboardType="number-pad"
              maxLength={2} 
              value={entredNumber}
              onChangeText={numberInputHandler}
              style={styles.numberInput}/>

           <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
            </View>
            </View>
        </Card>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen

const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        //marginTop:deviceHeight <400 ? 30 : 100,
        alignItems:'center'

    },
    screen:{
         flex:1,
    },
    
    
    numberInput:{
        height:50,
        width:50,
        fontSize:32,
        borderBottomColor: '#ddb52f',
        borderBottomWidth:2,
        color:'#ddb52f',
        marginVertical:8,
        fontWeight:'bold',
        textAlign:'center'
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    buttonContainer:{
        flex:1,
    }
})
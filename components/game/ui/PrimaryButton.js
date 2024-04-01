import {View,Text,Pressable,StyleSheet} from "react-native"

function PrimaryButton({children,onPress}){
    function pressHandler(){
        console.log('Pressed!')
    }
    return(
        <View style={styles.buttonOuterContainer}>
        <Pressable 
        style={({pressed})=> pressed?[styles.buttonInnerContainer , styles.pressed] : styles.buttonInnerContainer}
        android_ripple={{color:'#644202'}} onPress={onPress}>
        
            <Text style={styles.buttonText}>{children}</Text>
        
        </Pressable>
        </View>
    )


}

export default PrimaryButton


const styles = StyleSheet.create({
    buttonInnerContainer:{
        backgroundColor:'#72063c',
        paddingVertical:8,
        paddingHorizontal:16,
        elevation:2
    },
    buttonOuterContainer:{
        borderRadius:28,
        margin:4,
        overflow:'hidden'
    },
    buttonText:{
        color:'white',
        textAlign:'center'
    },
    pressed:{
        opacity:0.75
    }
})
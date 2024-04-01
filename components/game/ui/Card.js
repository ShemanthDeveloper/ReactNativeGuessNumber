import {StyleSheet,View} from 'react-native'

function Card({children}){
    return<View style={styles.card}>{children}</View>
}

export default Card;

const styles=StyleSheet.create({
    card:{
        marginHorizontal:24,
        justifyContent:'center',
        alignItems:'center',
        marginTop:36,
        padding:16,
        backgroundColor:'#4e0329',
        borderRadius:8,
        elevation:4,
        shadowColor:'black',
        shadowOffset:{width:0, height:3},
        shadowRadius:6,
        shadowOpacity:0.25,
    },
})
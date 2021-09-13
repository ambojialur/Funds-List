/* eslint-disable comma-dangle */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const deviceWidth=Dimensions.get('window').width;
const deviceHeight=Dimensions.get('window').height;

const SplashScreen = ({navigation}) => {

    return (
      <View style={styles.container}>
<StatusBar barStyle = "light" hidden = {false} backgroundColor = "#021030" translucent = {true}/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={{uri:"https://play-lh.googleusercontent.com/-zv3A8oBRPpdGcQT3H2z6CyGvy3iBTuqCNDTTLsZVI471WqiIZ63WsCXA948ZHhaovI"}}
                style={styles.logo}
                resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor:'#021030'}]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color:'#51CEA2'
            }]}>Stay connected with everyone!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={()=>navigation.navigate('SignInScreen')}>
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#000"
                        size={20}
                    />
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#51CEA2'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: deviceWidth*0.6,
      height: deviceWidth*0.6,
      borderRadius:1000
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: '#8fdcc0',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
      backgroundColor:'#51CEA2'
  },
  textSign: {
      color: '#021030',
      fontWeight: 'bold'
  }
});


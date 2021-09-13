/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable react/self-closing-comp */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React,{useState ,useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,Alert,Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { openDatabase } from 'react-native-sqlite-storage';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";

var db = openDatabase({ name: 'UserDatabase.db' });

const deviceWidth=Dimensions.get('window').width;
const deviceHeight=Dimensions.get('window').height;

const ProfileScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  let [userName, setUserName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [userDob, setUserDob] = useState('');

  let [emailerror,setUserEmailError]=useState(false);
  let [emailerrors,setUserEmailErrors]=useState(true);
  let [nameerror,setUserNameError]=useState(true);
  let [passerror,setUserPassError]=useState(true);
  let [doblerror,setUserDOBlError]=useState(true);

  const [checked, setChecked] = React.useState('Male');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    let DOB="   "+date.getDate() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getFullYear();
    setUserDob(DOB);
    hideDatePicker();
  };

  const textInputChange = val => {
    setUserName(val);
    if (val.length> 3) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setUserPassword(val);
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

 const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setUserEmailError(false);

      return false;
    }
    else {
      setUserEmail(text);
      setUserEmailError(true);
      console.log("Email is Correct");
    }
  }

  const Update = ()=>{

    if(userName.length < 3 || userPassword.length <8 || userDob.length < 3){
console.log("Message11##"+emailerror);
    if(userName.length < 3){
      setUserNameError(false);
    }else{
      setUserNameError(true);
    }   
    
    if(userPassword.length <8){
      setUserPassError(false);
    }else{
      setUserPassError(true);
    }  

    if(userDob.length < 3){
      setUserDOBlError(false);
    }else{
      setUserDOBlError(true);
    }  
  }else{
    console.log("Message22");

    setUserNameError(true);
    setUserPassError(true);
    setUserDOBlError(true);
    setUserEmailErrors(true);

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE UserDetails set username=?, email=? , password=? , dateofbirth=? where id=?',
        [userName, userEmail, userPassword, userDob, 1],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.goBack(),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
        }
      );
    });

  }
  // navigation.goBack();

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(userEmail) === false) {
      setUserEmailErrors(false);
      return false;
    }
    else {
      setUserEmailErrors(true);
    }


  };

  useEffect(() =>{
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM UserDetails where id = ?',
        [1], (tx, res) => {
                for (let i = 0; i < res.rows.length; ++i) {
                    setUserName(res.rows.item(0).username);
                    setUserEmail(res.rows.item(0).email)
                    setUserPassword(res.rows.item(0).password)
                    setUserDob(res.rows.item(0).dateofbirth)
                   }
              });
            });
},[]);

  return (
    <View style={styles.container}>
<StatusBar barStyle = "light" hidden = {false} backgroundColor = "#021030" translucent = {true}/>
      <View style={styles.header}>
        <Text style={styles.text_header}>Edit Your Profile!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView 
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}>

 <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={{uri:"https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc5NjY5ODU0NjQzMzIy/gettyimages-3091504.jpg"}}
                style={styles.logo}
                resizeMode="stretch"
            />

          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#7d7d7d" size={20} />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
              value={userName}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
           
          </View>
          {/* { data.isValidPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            } */}
          { nameerror == false ? (
           <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={styles.errorMsg}>*Please enter valid username</Text>
           </Animatable.View>
            ) : null  }

          <Text style={[styles.text_footer,{marginTop: 30,},]}>email</Text>
            <View style={styles.action}>
            <Feather name="mail" color="#7d7d7d" size={20} />
            <TextInput
              placeholder="Your Email"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => validate(text)}
              value={userEmail}
            />
            { emailerror == true ? (
            <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
            ) : null  }
          </View>
          { emailerrors == false ? (
           <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={styles.errorMsg}>*Please enter valid email</Text>
           </Animatable.View>
            ) : null  }

          <Text style={[styles.text_footer,{marginTop: 30,},]}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#7d7d7d" size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
              value={userPassword}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          { passerror == false ? (
           <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={styles.errorMsg}>*Password must be 8 characters long</Text>
           </Animatable.View>
            ) : null  }

          <Text style={[styles.text_footer,{marginTop: 30,},]}>Date Of Birth</Text>
          <View style={styles.action}>
          <FontAwesome name="calendar" color="#7d7d7d" size={20} />
      <TouchableOpacity onPress={showDatePicker}>
      { userDob.length<2 ? (
                    <Text style={{color:"#666666",paddingHorizontal:10}}>Your Date Of Birth</Text>
            ) : null  }
        <Text style={{color:"#7d7d7d",paddingHorizontal:10}}>{userDob}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
 { doblerror == false ? (
           <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={styles.errorMsg}>*Please select valid Date of Birth</Text>
           </Animatable.View>
            ) : null  }

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={Update}>
              <LinearGradient
                colors={['#51CEA2', '#51CEA2']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#021030',
                    },
                  ]}>
                  Update
                </Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51CEA2',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#021030',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#021030',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#7d7d7d',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  gender: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  radio:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:10,
    paddingHorizontal:10,
    color:"#7d7d7d"},
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#7d7d7d',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
logo: {
  width: deviceWidth*0.2,
  height: deviceWidth*0.2,
  borderRadius:1000
},
});

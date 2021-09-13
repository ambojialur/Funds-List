/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
//React Native FlatList
//https://aboutreact.com/react-native-flatlist/

//import React in our code
import React, {useState, useEffect} from 'react';

//import all the components we are going to use
import {
    FlatList,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    StatusBar
} from 'react-native';

const deviceWidth=Dimensions.get('window').width;
const deviceHeight=Dimensions.get('window').height;

const SupportScreen = ({ route}) => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [fund_house, setfund_house] = useState('');
  const [scheme_type, setscheme_type] = useState('');
  const [scheme_category, setscheme_category] = useState('');
  const [scheme_code, setscheme_code] = useState('');
  const [scheme_name, setscheme_name] = useState('');
  const { itemId} = route.params;

  useEffect(() => {
    fetch(itemId)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson.data);
        setfund_house(JSON.stringify(responseJson.meta.fund_house));
        setscheme_type(JSON.stringify(responseJson.meta.scheme_type));
        setscheme_category(JSON.stringify(responseJson.meta.scheme_category));
        setscheme_code(JSON.stringify(responseJson.meta.scheme_code));
        setscheme_name(JSON.stringify(responseJson.meta.scheme_name));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const ItemView = ({item}) => {
    return (    
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Text style={styles.item}>
      {item.date}
      </Text>
      <Text style={styles.item}>
      {item.nav}
      </Text>
    </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
          style={{
              height:1,
              width: '100%',
              backgroundColor: '#021030'
          }}
      />
    );
  };
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:"#021030",alignItems:'center',justifyContent:'center'}}>
<StatusBar barStyle = "light" hidden = {false} backgroundColor = "#021030" translucent = {true}/>
      <View style={styles.views}>
      <Text style={styles.textStyle}>
      Fund House : {fund_house}
          </Text>
          <Text style={styles.textStyle}>
          Scheme Type : {scheme_type}
          </Text>
          <Text style={styles.textStyle}>
          Scheme Category : {scheme_category}
          </Text>
          <Text style={styles.textStyle}>
          Scheme Code : {scheme_code}
          </Text>
          <Text style={styles.textStyle}>
          Scheme Name : {scheme_name}
          </Text>
        </View>
        <View style={styles.headerView}>
        <View style={styles.headerViewstyle}>
          <Text style={styles.textHeadStyle}>
            Date
          </Text>
          <Text style={styles.textHeadStyle}>
            nav
          </Text>
        </View>
        <FlatList
          data={filteredDataSource}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    paddingVertical:10,
    paddingHorizontal:10,
  },
  item: {
    padding: 10,
    fontSize: 14,
    height: 44,
    paddingHorizontal:25,
    color:'#021030'

  },
  textStyle:{
    paddingHorizontal:20,
    fontSize:14,
    color:'#021030'

  },
  textHeadStyle:{
    paddingHorizontal:50,
    fontSize:14,
    fontWeight:'bold',
    color:'#021030'
  },
  views:{
    backgroundColor:"#51CEA4",
    borderRadius:16,width:deviceWidth*0.9,
    marginTop:20,height:deviceHeight*0.25,
    justifyContent:'space-around'
  },
  headerView:{
    backgroundColor:'#51CEA4',
    borderRadius:16,marginTop:10,
    marginBottom:10,width:deviceWidth*0.9,
    height:deviceHeight*0.65
  },
  headerViewstyle:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:40}
});

export default SupportScreen;
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';

import { View, Text, StyleSheet, StatusBar,Dimensions,SafeAreaView,
  FlatList,
  TextInput, } from 'react-native';

const deviceWidth=Dimensions.get('window').width;
const deviceHeight=Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://api.mfapi.in/mf')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.schemeName
            ? item.schemeName.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.schemeName}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#021030',
        }}
      />
    );
  };

  const getItem = (item) => {
    var url='https://api.mfapi.in/mf/'+item.schemeCode;
    navigation.navigate('SupportScreen',{itemId: url,});
  };

    return (
      <SafeAreaView style={styles.safearea}>
<StatusBar barStyle = "light" hidden = {false} backgroundColor = "#021030" translucent = {true}/>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safearea:{flex: 1,backgroundColor:"#021030",alignItems:'center'},
  container: {
    backgroundColor: '#51CEA4',
    width:deviceWidth,
  },
  itemStyle: {
    padding: 10,
    color:'#021030',
    height:deviceHeight/7
  },
  textInputStyle: {
    height: 45,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#021030',
    backgroundColor: '#FFFFFF',
    borderRadius:16,
  },
});


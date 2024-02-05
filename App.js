import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:4000';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Apartments" component={Apartments} />
        <Stack.Screen name="ApartmentDetails" component={ApartmentDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ApartmentDetailsScreen ({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const ApartmentItem = ({ item, onPress, navigation }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.title}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );
};

function Apartments ({ navigation }) {
  const [apartments, setApartments] = useState([]);
  const fetchApartments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/apartments`);
      setApartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handlePress = (item) => {
    navigation.navigate('ApartmentDetails', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Apartment Finder</Text>
      <FlatList
        data={apartments}
        renderItem={({ item }) => (
          <ApartmentItem item={item} onPress={() => handlePress(item)} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  price: {
    fontSize: 20,
    color: '#00f',
  },
  description: {
    fontSize: 16,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 8
  },
});

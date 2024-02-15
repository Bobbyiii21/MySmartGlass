import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import a native scroll view
import { ScrollView } from "react-native-gesture-handler";
//add firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://projectsmartglass-aee0e-default-rtdb.firebaseio.com/",
};
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

function Objects() {

  const [data, setData] = useState([]);

  useEffect(() => {
    //reference to the data in the database
    const dbRef = ref(database,"/");
    //get the data from the database
    onValue(dbRef, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
    });
    return () => {
      off(dbRef);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'rgb(25,25,25)'}}>
      {/* <Text>Objects!</Text> */}
      <ScrollView contentContainerStyle={{flex:1, width:"auto",alignContent:'center'}}>
      <Text style={objectStyles.text}></Text>
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Headphones:</Text>
        <Text style={objectStyles.text}> {data?.headphones}</Text>
      </View>
      <View style={objectStyles.separator} />
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Laptop:</Text>
        <Text style={objectStyles.text}> {data?.laptop}</Text>
      </View>
      <View style={objectStyles.separator} />
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Phone:</Text>
        <Text style={objectStyles.text}> {data?.phone}</Text>
      </View>
      <View style={objectStyles.separator} />
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Water Bottle:</Text>
        <Text style={objectStyles.text}> {data?.waterBottle}</Text>
      </View>
      <View style={objectStyles.separator} />
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Tablet:</Text>
        <Text style={objectStyles.text}> {data?.tablet}</Text>
      </View>
      <View style={objectStyles.separartor} />
      </ScrollView>
    </View>
  );
}

//create stylesheet for the scroll view
const objectStyles = StyleSheet.create({
  text: {
    fontSize: 22,
    textAlign: "center",
    color: "#fff",
  },
  separator: {
    marginVertical: 12,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const ViewStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(25,25,25)",
  },
});

function Device() {
  return (
    <View style={ViewStyle.view}>
      <Text style={objectStyles.text}>Not Ready Yet!</Text>
      <View style={objectStyles.separator} />
      <View style={objectStyles.separator} />
      <MaterialCommunityIcons name="traffic-cone" color='rgb(255,255,255)' size= "100"  />
    </View>
  );
}

function About() {
  return (
    <View style={[ViewStyle.view]}>
      <Text style={objectStyles.text}></Text>
      <View>
        <Text style={[objectStyles.text,{ fontWeight: 'bold' }]}>App:</Text>
        <Text style={objectStyles.text}>MySmartGlass</Text>
      </View>
      <View style={objectStyles.separator} />
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Description:</Text>
        <Text style={objectStyles.text}>This App is intended to serve as an off-device telemetry reciever for the SmartGlass Device using Google Firebase</Text>
      </View>
      <View style={objectStyles.separator} />
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Created By:</Text>
        <Text style={objectStyles.text}>Bobby R. Stephens III & Nucleotide Network</Text>
      </View>
      <View style={objectStyles.separator} />
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Institution:</Text>
        <Text style={objectStyles.text}>Newton College and Career Academy</Text>
      </View>
      <View style={objectStyles.separator} />
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Build Date:</Text>
        <Text style={objectStyles.text}>12 December 2023</Text>
      </View>
      <View style={objectStyles.separator} />
      <View>
        <Text style={[objectStyles.text, { fontWeight: 'bold' }]}>Build Version:</Text>
        <Text style={objectStyles.text}>0.1.0</Text>
      </View>
      <View style={objectStyles.separator} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Objects"
      screenOptions={{
        tabBarActiveTintColor: "rgb(181,168,214)",
        tabBarStyle: { backgroundColor: "rgb(25,25,25)", },
        headerStyle: { backgroundColor: "rgb(181,168,214)" , height: 125},
        headerTitleStyle: { fontWeight: "bold", color: "#000", fontSize: 35 },
        headerTitleAlign: "left",
        
      }}
    >
      <Tab.Screen
        name="Objects"
        component={Objects}
        options={{
          tabBarLabel: "Objects",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Device"
        component={Device}
        options={{
          tabBarLabel: "Device",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chip" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

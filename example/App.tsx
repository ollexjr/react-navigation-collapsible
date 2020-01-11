import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationNativeContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/core';
import 'react-native-gesture-handler';
import {
  CollapsibleStack,
  CollapsibleProps,
  useCollapsibleStack,
} from 'react-navigation-collapsible';

import {S1RegularScreen} from './src/S1-RegularHeaderScreen';
import {DetailScreen} from './src/DetailScreen';

export type StackParamList = {
  Home: undefined;
  Detail: undefined;
  'S1-Regular': CollapsibleProps;
};

export type ScreenProps = {
  navigation: StackNavigationProp<StackParamList>;
};

function HomeScreen({navigation}: ScreenProps) {
  console.log('----------------- c2', useCollapsibleStack);
  return (
    <View style={{flex: 1, paddingTop: 50, alignItems: 'center'}}>
      <Text
        onPress={() => {
          navigation.navigate('S1-Regular');
        }}>
        Sample1: Regular Header
      </Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'react-navigation-collapsible',
          }}
        />
        {CollapsibleStack(
          <Stack.Screen
            name="S1-Regular"
            component={S1RegularScreen}
            options={{
              headerStyle: {backgroundColor: 'green'},
              headerTintColor: 'white',
              title: 'Regular Header',
            }}
          />,
          {
            iOSCollapsedColor: 'red',
          },
        )}
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: 'Detail Screen',
          }}
        />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

export default App;

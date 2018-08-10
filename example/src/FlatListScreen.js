import React, {Component} from 'react';
import { Text, FlatList, View, Animated, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import { 
  CollapsibleHeaderBackView, 
  createCollapsibleParams, 
  collapsibleOptions, 
  getCollapsibleHeaderHeight,
  getCollapsibleTabHeight
} from 'react-navigation-collapsible';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class FlatListScreen extends Component{
  static navigationOptions = (props) => {
    const {navigationOptions, navigation} = props;

    const userOptions = {
      title: 'Flatlist'
    };
    return collapsibleOptions(navigationOptions, userOptions, navigation);
  }

  constructor(props){
    super(props);

    const data = [];
    for(let i = 0 ; i < 60 ; i++){
      data.push(i);
    }

    this.state = {
      data: data
    }

    this.scrollY = new Animated.Value(0);
    // enable Collapsible Header
    this.props.navigation.setParams(createCollapsibleParams(this.scrollY));
  }

  renderItem = ({item}) => (
    <TouchableOpacity 
      onPress={() => {
        this.props.navigation.navigate('DetailScreen');
      }}
      style={{width: '100%', height: 50, borderBottomColor: '#0002', borderBottomWidth: 0.5, paddingHorizontal: 20, justifyContent: 'center'}}>
      <Text style={{fontSize: 22}}>{item}</Text>
    </TouchableOpacity>
  )

  render(){
    const { navigation } = this.props;

    return (
      <View style={{flex: 1}}>
        <CollapsibleHeaderBackView iOSCollapsedColor={'#031'} navigation={navigation} />
        <SafeAreaView style={{flex: 1}} forceInset={{bottom: 'never'}}>
          <AnimatedFlatList 
            style={{flex: 1}}
            contentContainerStyle={{paddingTop: getCollapsibleHeaderHeight(navigation) + getCollapsibleTabHeight(navigation)}}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => String(index)}

            collapsibleTrigger_mustAddThis={this.scrollY}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
              {useNativeDriver: true})
            } 
            />
        </SafeAreaView>
      </View>
    )
  }
}
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

class SplashScreen extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigation.replace('Login');
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_640.png',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDA43',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

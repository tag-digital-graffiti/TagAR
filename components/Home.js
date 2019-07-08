import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../store/user';
import { Text, View, StyleSheet, Image, AsyncStorage } from 'react-native';

let styles = StyleSheet.create({
  outer: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
    //this.getUser = this.getUser.bind(this);
  }
  async componentDidMount() {
    //this.props.loginUser();
    try {
      let userData = await AsyncStorage.getItem('id_token');
      let data = JSON.parse(userData);
      if (data.username) {
        let username = data.username;
        this.setState({ username });
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
  render() {
    console.log(this.props.user);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.outer}>
          <Image
            style={{
              width: 315,
              height: 315,
              borderRadius: 25,
              backgroundColor: '#FFFFFF',
            }}
            source={require('./tagLogo.png')}
          />
        </View>
        {this.props.username && !this.props.logOut ? null : (
          <Text>Welcome {this.props.username}</Text>
        )}
      </View>
    );
  }
}
// const mapStateToProps = state => ({
//   user: state.user.user,
// });
// const mapDispatchToProps = dispatch => ({
//   loginUser: () => dispatch(loginUser()),
// });
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);

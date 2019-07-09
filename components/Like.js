import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { getAddedLike } from '../store/graffiti';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

class Like extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   like: false,
    // };
  }
  _toLike = id => this.props.getAddedLike(id);
  render() {
    return (
      <View>
        <Icon
          name="heart"
          type="font-awesome"
          onPress={() => this._toLike(this.props.tag.id)}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  tag: state.graffiti.selectedTag,
});
const mapDispatchToProps = dispatch => ({
  getAddedLike: id => dispatch(getAddedLike(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Like);

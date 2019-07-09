import React, { Component } from 'react';
import { View, AsyncStorage, Alert, Text } from 'react-native';
import { getAddedLike } from '../store/graffiti';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.item.likeCount
    };
  }
  _toLike = id => {
    this.props.getAddedLike(id);
    this.setState({ likes: this.state.likes + 1 });
  };
  render() {
    if (this.props.selectedTag) {
      console.log(this.props, 'props', this.props.selectedTag, 'selected tag');
      return (
        <View>
          <Icon
            name='heart'
            type='font-awesome'
            onPress={() => this._toLike(this.props.item.id)}
          />
          <Text>{`${this.state.likes} Likes`}</Text>
        </View>
      );
    }
  }
}
const mapStateToProps = state => ({
  selectedTag: state.graffiti.selectedTag
});

const mapDispatchToProps = dispatch => ({
  getAddedLike: id => dispatch(getAddedLike(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Like);

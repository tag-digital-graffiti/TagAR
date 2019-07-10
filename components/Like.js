import React, { Component } from 'react';
import { View, AsyncStorage, Alert, Text } from 'react-native';
import { getAddedLike, getRemoveLike } from '../store/graffiti';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.item.likeCount,
    };
  }

  _toDisLike = id => {
    this.props.getRemoveLike(id);
    this.setState({ likes: this.state.likes - 1 });
  };
  _toLike = id => {
    if (this.state.likes < 1) {
      this.props.getAddedLike(id);
      this.setState({ likes: this.state.likes + 1 });
    } else {
      this._toDisLike(id);
    }
  };
  render() {
    if (this.props.selectedTag) {
      console.log(this.props, 'props', this.props.selectedTag, 'selected tag');
      return (
        <View>
          <Icon
            name="heart"
            type="font-awesome"
            onPress={() => this._toLike(this.props.item.id)}
          />
          <Text>{`${this.state.likes} Likes`}</Text>
        </View>
      );
    }
  }
}
const mapStateToProps = state => ({
  selectedTag: state.graffiti.selectedTag,
});

const mapDispatchToProps = dispatch => ({
  getAddedLike: id => dispatch(getAddedLike(id)),
  getRemoveLike: id => dispatch(getRemoveLike(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Like);

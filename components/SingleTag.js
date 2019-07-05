// import React, { Component } from 'react';
// import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
// import { NavigationActions } from 'react-navigation';
// import { connect } from 'react-redux';
// import { getSelectedTag } from '../store/graffiti';

// let styles = StyleSheet.create({
//   outer: {
//     fontSize: 20,
//     fontWeight: 'bold'
//   },
//   text: {
//     fontSize: 40,
//     fontWeight: 'bold'
//   }
// });
// const navigateAction = NavigationActions.navigate({
//   routeName: 'EntryARScene'
// });

// export default class SingleTag extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <View
//         style={{
//           flexDirection: 'row',
//           padding: 25,
//           backgroundColor: '#F0F0F0'
//         }}
//       >
//         <TouchableHighlight onPress={() => this.props._toAR(this.props.id)}>
//           <View>
//             <Image
//               style={{
//                 width: 280,
//                 height: 280,
//                 borderRadius: 25,
//                 backgroundColor: '#FFFFFF'
//               }}
//               source={{ uri: `${this.props.image}` }}
//             />
//           </View>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }
// const mapDispatchToProps = dispatch => ({
//   getSelectedTag: id => dispatch(getSelectedTag(id))
// });

// module.exports = connect(
//   null,
//   mapDispatchToProps
// )(SingleTag);

import React, {
  Component,
  Dimensions,
  Linking,
  ListView,
  Modal,
  ProgressBarAndroid,
  Text,
  ToastAndroid,
  View
} from 'react-native';
import ActButton from '../components/common/ActButton';
import Color from '../resource/color'; //Importa a palheta de cores

// class HitPoint extends Component {
//
//   render() {
//     let lastPoint = this.props.points.slice(-1)[0];
//     let pointItem = {
//       color: '#1abc9c',
//       title: 'Entrada',
//       icon: 'arrow-right-c',
//       type: 'in'
//     };
//
//     // Se o último ponto foi de entrada, altera o botão para saída
//     if(lastPoint && lastPoint.type === 'in') {
//       pointItem = {
//         color: '#ff004c',
//         title: 'Saída',
//         icon: 'arrow-left-c',
//         type: 'out'
//       };
//     }
//
//     let actionItem = {
//       buttonColor: pointItem.color,
//       title: pointItem.title,
//       iconName: pointItem.icon,
//       onPress: this._hitPoint.bind(this, pointItem.type)
//     }
//
//     return (
//       <ActButton
//         buttonColor={Color.color.AccentColor}
//         actionItems={[actionItem]}
//       />
//     );
//   }
// }

import EStyleSheet from 'react-native-extended-stylesheet'
import {Dimensions} from 'react-native'

let {width} = Dimensions.get('window')
// always call EStyleSheet.build() even if you don't use global variables!
export default ({ theme, primaryColor }) => {
  EStyleSheet.build({
    $theme: theme,
    $primaryColor: primaryColor,

    $primaryBlue: '#4F6D7A',
    $primaryOrange: '#D57A66',
    $primaryGreen: '#00BD9D',
    $primaryPurple: '#9E768F',

    $white: '#fff',
    $border: '#E2E2E2',
    $inputText: '#797979',
    $lightGray: '#D9D9D9',
    $slightGray: '#F4F4F4',

    $rem: width > 340 ? 18 : 16,

    // $outline: 1, // outline all components that are using EStyleSheet
  })
}

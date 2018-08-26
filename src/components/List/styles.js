import EStyleSheet from 'react-native-extended-stylesheet'
import {StyleSheet} from 'react-native'

const styles = EStyleSheet.create({
  $underlayColor: '$lightGray',
  $blue: '$primaryBlue',

  listContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '1rem',
    height: '3rem',
  },
  listText: {
    fontSize: '1rem',
  },
  separator: {
    width: '100%',
    backgroundColor: '$primaryBlue',
    height: StyleSheet.hairlineWidth,
  },
  iconContainer: {
    width: '1.5rem',
    height: '1.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.75rem',
  },
  icon: {
    width: '1rem',
    height: '1rem',
  }
})

export default styles

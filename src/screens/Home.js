import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { User } from 'leancloud-storage'
import {
  Item,
  Input,
  connectStyle,
  Button,
  Text,
} from 'native-base'

import { ListItem as MyListItem, Separator } from '../components/List'
import { logOut } from '../actions/user'
import { DropDownHolder }from '../utils/DropDownHolder'


class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      TEMP_ITEMS: [
        { id: '1', name: 'Simon Mignolet', complete: true },
        { id: '2', name: 'Nathaniel Clyne', complete: false },
        { id: '3', name: 'Dejan Lovren', complete: true },
        { id: '4', name: 'Mama Sakho', complete: true },
        { id: '5', name: 'Emre Can', complete: false },
      ]
    }
  }
  static propTypes = {
    userInfo: PropTypes.object,
    username: PropTypes.string,
    // createdAt: PropTypes.date,
    // updatedAt: PropTypes.date,
    emailVerified: PropTypes.bool,
    mobilePhoneVerified: PropTypes.bool,
    sessionToken: PropTypes.string,
    logOut: PropTypes.func,
  }

  static navigationOptions = ({ navigation }) => {
    const logOut = navigation.getParam('logOut', () => null)
    return {
      title: 'LeanTodo',
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerRight: (
        <Button transparent
          onPress={() => {
            logOut()
            navigation.navigate('Login')
          }}>
          <Text>退出登陆</Text>
        </Button>
      ),
    }
  }

  handleLogout = () => {
    this.props.logOut()
    this.props.navigation.navigate('Login')
  }

  logInWithSessionToken = async (sessionToken) => {
    try {
      await User.become(sessionToken)
    } catch (e) {
      DropDownHolder.getDropDown().alertWithType('error', '错误', e.message)
      this.props.navigation.navigate('Login')
    }
  }

  componentDidMount() {
    this.logInWithSessionToken(this.props.sessionToken)
    this.props.navigation.setParams({ logOut: this.props.logOut })
  }

  handlePress = id => {
    this.setState({
      TEMP_ITEMS: this.state.TEMP_ITEMS.map(item => {
        if(item.id === id) {
          return {
            ...item,
            complete: !item.complete
          }
        } else {
          return item
        }
      })
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Item>
          <Input placeholder='你想完成什么?'/>
        </Item>

        <FlatList
          ItemSeparatorComponent={() => (<Separator />)}
          keyExtractor={item => item.id}
          data={this.state.TEMP_ITEMS}
          renderItem={({item, separators}) => (
            <MyListItem
              text={item.name}
              separators={separators}
              selected={item.complete}
              onPress={() => this.handlePress(item.id)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
              iconBackground='blue'
            />
          )}
        />

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
})

const mapStateToProps = state => {
  const {
    username,
    createdAt,
    updatedAt,
    emailVerified,
    mobilePhoneVerified,
    sessionToken,
  } = state.user.userInfo

  return {
    username,
    createdAt,
    updatedAt,
    emailVerified,
    mobilePhoneVerified,
    sessionToken,
  }
}

const mapDispatchToProps = dispatch => ({
  logOut: () => {
    dispatch(logOut())
  },
})

const StyledHomeScreen = connectStyle('')(HomeScreen)
export default connect(mapStateToProps, mapDispatchToProps)(StyledHomeScreen)

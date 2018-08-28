import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { User } from 'leancloud-storage'
import uuidv4 from 'uuid/v4'
import {
  Item,
  ListItem,
  Icon,
  Input,
  connectStyle,
  Button,
  Text,
} from 'native-base'

import { Separator } from '../components/List'
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
      ],
      newTodoName: null,
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

  handleTodoItemPress = id => {
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

  changeNewTodoName = newTodoName => {
    this.setState({ newTodoName })
  }

  createNewTodo = () => {
    const newTodoName = this.state.newTodoName
    if (newTodoName === null) {
      return
    }
    this.setState({
      TEMP_ITEMS: [
        { id: uuidv4(), name: newTodoName, complete: false },
        ...this.state.TEMP_ITEMS,
      ],
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Item>
          <Input
            onSubmitEditing={this.createNewTodo}
            onChangeText={this.changeNewTodoName}
            placeholder='你想完成什么?'
          />
        </Item>

        <FlatList
          style={{ width: '100%' }}
          ItemSeparatorComponent={() => (<Separator />)}
          keyExtractor={item => item.id}
          data={this.state.TEMP_ITEMS}
          renderItem={({ item }) => (
            <ListItem
              style={{ alignItems: 'center' }}
              onPress={() => this.handleTodoItemPress(item.id)}
            >
              <Icon
                style={{ fontSize: 20, paddingRight: 10 }}
                name={`ios-checkmark-circle${item.complete ? '' : '-outline'}`}
              />
              <Text>{item.name}</Text>
            </ListItem>
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

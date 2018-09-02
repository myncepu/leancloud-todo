import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { User } from 'leancloud-storage'
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
import { logOutClearAllTodos } from '../actions/todos'
import { toggleTodo, fetchAll, createTodo } from '../actions/todos'
import { DropDownHolder }from '../utils/DropDownHolder'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodoName: null,
    }
  }
  static propTypes = {
    sessionToken: PropTypes.string,
    todos: PropTypes.array,
    fetchTodoError: PropTypes.string,

    logOut: PropTypes.func,
    fetchAll: PropTypes.func,
    createTodo: PropTypes.func,
    toggleTodo: PropTypes.func,
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
    this.props.fetchAll()
    this.logInWithSessionToken(this.props.sessionToken)
    this.props.navigation.setParams({ logOut: this.props.logOut })
  }

  handleTodoItemPress = id => {
    this.props.toggleTodo(id)
  }

  changeNewTodoName = newTodoName => {
    this.setState({ newTodoName })
  }

  createNewTodo = () => {
    const newTodoName = this.state.newTodoName
    if (newTodoName === null) {
      return
    }
    this.props.createTodo(newTodoName)
    this.setState({ newTodoName: null })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Item>
          <Input
            onSubmitEditing={this.createNewTodo}
            onChangeText={this.changeNewTodoName}
            value={this.state.newTodoName}
            placeholder='你想完成什么?'
          />
        </Item>

        <FlatList
          style={{ width: '100%' }}
          ItemSeparatorComponent={() => (<Separator />)}
          keyExtractor={item => item.id}
          data={this.props.todos}
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
    alignItems: 'center',
  },
})

const mapStateToProps = state => {
  return {
    sessionToken: state.user.userInfo.sessionToken,
    todos: state.todos.items,
    fetchTodoError: state.todos.error,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAll: () => { dispatch(fetchAll()) },
  createTodo: (newTodoName) => { dispatch(createTodo(newTodoName)) },
  logOut: () => {
    dispatch(logOut())
    dispatch(logOutClearAllTodos())
  },
  toggleTodo: (id) => { dispatch(toggleTodo(id)) },
})

const StyledHomeScreen = connectStyle('')(HomeScreen)
export default connect(mapStateToProps, mapDispatchToProps)(StyledHomeScreen)

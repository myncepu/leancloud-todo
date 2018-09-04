import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { User } from 'leancloud-storage/live-query'
import Accordion from 'react-native-collapsible/Accordion'
import { ifIphoneX } from 'react-native-iphone-x-helper'
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
import { logOutClearAllTodos, clearFinishedTodos } from '../actions/todos'
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
      title: 'LEAN代办事项',
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
    const { finishedTodosNumber, totalTodosNumber } = this.props

    const TodoList = ({ todos }) => (
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={{ justifyContent: 'space-between' }}
        ItemSeparatorComponent={() => (<Separator />)}
        keyExtractor={item => item.id}
        data={todos}
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
    )

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

        <ScrollView style={{ width: '100%' }}>
          <TodoList todos={this.props.unfinishedTodos} />

          <Accordion
            sections={[{ title: '已完成', content: '....' }]}
            underlayColor='#999'
            renderHeader={(section, _, isActive) => (
              <View style={styles.collapsibleHeader}>
                <Text>{section.title}</Text>
                <Icon name={`ios-arrow-${isActive ? 'up' : 'down'}`} />
              </View>
            )}
            renderContent={() => (
              <TodoList todos={this.props.finishedTodos} />
            )}
          />
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.footer}>
            <Text>{`${finishedTodosNumber} / ${totalTodosNumber}`}</Text>
            <Button transparent onPress={this.props.clearFinishedTodos}>
              <Text>{`清除已完成 (${finishedTodosNumber})`}</Text>
            </Button>
          </View>
        </View>

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
  collapsibleHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    height: 50,
    borderTopColor: '#999',
    borderTopWidth: 0.5,
    flexDirection: 'row',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: ifIphoneX(34, 0),
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    height: 50,
    borderTopColor: '#999',
    borderTopWidth: 0.5,
    flexDirection: 'row',
  }
})

const mapStateToProps = state => {
  const todos = state.todos.items.filter(todo => todo.cleared === false)
  const totalTodosNumber = todos.length
  const finishedTodos = todos.filter(todo => todo.complete === true)
  const unfinishedTodos = todos.filter(todo => todo.complete === false)
  const finishedTodosNumber = finishedTodos.length
  return {
    sessionToken: state.user.userInfo.sessionToken,
    fetchTodoError: state.todos.error,
    finishedTodos,
    unfinishedTodos,
    totalTodosNumber,
    finishedTodosNumber,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAll: () => { dispatch(fetchAll()) },
  createTodo: (newTodoName) => { dispatch(createTodo(newTodoName)) },
  logOut: () => {
    dispatch(logOut())
    dispatch(logOutClearAllTodos())
  },
  clearFinishedTodos: () => { dispatch(clearFinishedTodos()) },
  toggleTodo: (id) => { dispatch(toggleTodo(id)) },
})

const StyledHomeScreen = connectStyle('')(HomeScreen)
export default connect(mapStateToProps, mapDispatchToProps)(StyledHomeScreen)

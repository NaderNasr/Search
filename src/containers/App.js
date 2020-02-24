import React, {Component} from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Loader from 'react-loader-spinner'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({robots: users}))

  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});

  }
  render() {
    const {robots, searchfield} = this.state;
    const filterRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    if (robots === 0) {
      return <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={3000}/>
    } else {
      return (<div className='tc'>
        <h1>RoboFriends</h1>

        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
          <CardList robots={filterRobots}/>
          </ErrorBoundry>
        </Scroll>
      </div>)
    }
  }
}

export default App;

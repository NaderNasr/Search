import React, {Component} from 'react'
import CardList from './CardList'
import {robots} from './robots';
import SearchBox from './SearchBox'
import Loader from 'react-loader-spinner'
import Scroll from './Scroll'


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      robots: [],
      searchfield: '',
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users =>this.setState({robots:users}))

  }

  onSearchChange = (event) => {
  this.setState({ searchfield: event.target.value});

  }
  render(){
    const filterRobots = this.state.robots.filter(robots =>{
      return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    })
    if(this.state.robots === 0){
      return   <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={3000} //3 secs

      />
    } else {
    return (
      <div className='tc'>
      <h1>RoboFriends</h1>

      <SearchBox  searchChange = {this.onSearchChange}/>
      <Scroll>
      <CardList robots={filterRobots} />
    </Scroll>
      </div>
    )
  }
}
}

export default App;

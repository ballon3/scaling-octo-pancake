import React, {Component} from 'react'
import ReactMapGL from 'react-map-gl'

class App extends Component {

  state = {
    viewport: {
      width: 1500,
      height: 750,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onClick={this.onClick}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    )
  }
}

export default App

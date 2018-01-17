import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import DeckGL, { LineLayer } from 'deck.gl'
import drawPolygon from './polygon-drawing'
import { cloneDeep as _cloneDeep } from 'lodash'
import autobind from 'react-autobind'

class App extends Component {
  constructor(props) {
    super(props)

    autobind(this)
  }

  state = {
    viewport: {
      width: 1500,
      height: 750,
      latitude: 39.7392,
      longitude: -104.9903,
      zoom: 15
    },
    paths: []
  }

  updatePaths(lngLat, event) {
    const paths = _cloneDeep(this.state.paths)

    return drawPolygon(paths, lngLat, event === 'click')
  }

  onClick({ lngLat }) {
    this.setState({ paths: this.updatePaths(lngLat, 'click') })
  }

  onHover({ lngLat }) {
    const { paths } = this.state

    paths.length && this.setState({ paths: this.updatePaths(lngLat) })
  }

  render() {
    const { viewport, paths } = this.state
    const layer = new LineLayer({
      id: 'line-layer',
      data: paths,
      strokeWidth: 5,
      getSourcePosition: ({ start }) => start,
      getTargetPosition: ({ end }) => end,
      getColor: () => [255, 0, 0, 100]
    })

    console.log(paths)

    return (
      <ReactMapGL
        {...viewport}
        onClick={this.onClick}
        onHover={this.onHover}
        onViewportChange={(viewport) => this.setState({viewport})}>

        <DeckGL layers={[layer]} {...viewport} />

      </ReactMapGL>
    )
  }
}

export default App

const drawPolygon = (paths, lngLat, setPoint) => {
  const isFirstPoint = setPoint && !paths.length

  return isFirstPoint ? startPaths(paths, lngLat) : endPath(paths, lngLat, setPoint)
}

const endPath = (paths, end, setPoint) => {
  paths.forEach((path, index) => {
    const isFirst = index === 0
    const isLast = (index === paths.length - 1)

    isFirst && (path.start = end)
    isLast && (path.end = end)
  })

  return setPoint ? startPaths(paths, end) : paths
}

const startPaths = (paths, start) => {
  const newPath = () => {
    return {
      end: start,
      start
    }
  }
  const newPaths = paths.length ? newPath() : [newPath(), newPath()]

  return paths.concat(newPaths)
}

export default drawPolygon

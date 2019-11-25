import React, { useEffect } from 'react'
import r from 'rithmic'
import Attach from './Attach'

import Node from './Node.js'
import Edge from './Edge.js'

const Graph = ({ nodes, edges }) => {

  useEffect(() => {
    r.send({event: 'startGraph'})
    r.send({event: 'createNode', payload: { id: 1, x: 0, y: 0, width: 50, height: 50 }})
    r.send({event: 'createNode', payload: { id: 2, x: 100, y: 100, width: 100, height: 100 }})
  }, [])

  return <div
    tabIndex="0"
    onKeyDown={(e) => {
      r.send(e.ctrlKey && {event: 'multiselectOn'})
      r.send(e.keyCode === 27 && {event: 'esc'})
    }}
    onKeyUp={(e) => {
      r.send({event: 'multiselectOff'})
    }}
  >
    <svg
      width="500"
      height="500"
      onMouseDown={e => r.send({event:'graphMouseDown', payload: e})}
      onMouseMove={e => r.send({event:'mouseMove', payload: e})}
      onMouseUp={e => r.send({event:'mouseUp', payload: e})}
    >
      {
        nodes && nodes.map((node) => <Node
          key={node.id}
          id={'node'+node.id}
        />)
      }
      {
        edges && edges.map(edge => <Edge
          key={edge.id}
          id={edge.id}
        />)
      }
    </svg>
  </div>

}

export default Attach(Graph)
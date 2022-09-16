import { Network, DataSet } from 'vis-network'
import { useEffect, useRef } from 'react'

import styles from './Graph.module.css'
import { GraphData } from '../../../types/graph'

interface GraphProps {
  data: GraphData
  groups?: any
}

const Graph = ({ data, groups }: GraphProps) => {
  const nodes = data.nodes
  const edges = data.edges

  const options = {
    clickToUse: false,
    // configure: { enabled: true, filter: 'nodes,edges', showButton: true },
    nodes: {
      shape: 'dot',
    },
    edges: {
      arrows: {
        to: {
          scaleFactor: 0.5,
        },
      },
      arrowStrikethrough: false,
      scaling: {
        min: 0.1,
        max: 5,
        label: false,
      },
    },
    interaction: {
      hover: true,
    },
    groups: groups,
  }

  const visJsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const network =
      visJsRef.current &&
      new Network(visJsRef.current, { nodes, edges }, options)

    // Use `network` here to configure events, etc
  }, [visJsRef, nodes, edges])

  return (
    <div className={styles.container}>
      <div ref={visJsRef} className={styles.graph} />
    </div>
  )
}

export default Graph

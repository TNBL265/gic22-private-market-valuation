// ---------------- styles -------------------------
import styles from './Dashboard.module.css'

// ---------------- components -------------------------
import Section from '../common/Section/Section'

// ---------------- types -------------------------
import { Node, Edge } from '../../types/graph'
import Graph from '../common/Graph/Graph'

const Dashboard = () => {
  var nodes: Node[] = [
    { id: 1, label: 'Node 1', value: 1 },
    { id: 2, label: 'Node 2', value: 1 },
    { id: 3, label: 'Node 3', value: 1 },
    { id: 4, label: 'Node 4', value: 1 },
    { id: 5, label: 'Node 5', value: 1 },
  ]

  // create an array with edges
  var edges: Edge[] = [
    { from: 1, to: 3, value: 2 },
    { from: 1, to: 2, value: 1 },
    { from: 2, to: 4, value: 1 },
    { from: 2, to: 5, value: 1 },
    { from: 3, to: 3, value: 1 },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.section}>
          <Section title={'Fancy Graph'} size={'L'}>
            <Graph data={{ nodes, edges }} />
          </Section>
        </div>
        <div className={styles.section}>
          <Section title={'Title'} size={'M'} height={'30vh'} />
          <Section title={'Title'} size={'M'} height={'30vh'} />
        </div>
        <div className={styles.section}>
          <Section title={'Title'} size={'S'} height={'30vh'} />
          <Section title={'Title'} size={'S'} height={'30vh'} />
          <Section title={'Title'} size={'S'} height={'30vh'} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

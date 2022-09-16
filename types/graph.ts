export interface Node {
    id: number
    x?: number
    y?: number
    value: number
    label: string
    group?: string
    fixed?: boolean
  }
  
  export interface Edge {
    from: number
    to: number
    value: number
    title?: string
    arrows?: any
    font?: any
    label?: any
  }
  
  export interface GraphData {
    nodes: Node[]
    edges: Edge[]
  }
  
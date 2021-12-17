import fsInput from './input'

interface NodeVertex {
  nameOfVertex: string;
  weight: number;
}

class Vertex {
  name: string;
  nodes: NodeVertex[];
  weight: number;

  constructor(theName: string, theNodes: NodeVertex[], theWeight: number) {
    this.name = theName;
    this.nodes = theNodes;
    this.weight = theWeight;
  }
}

class Dijkstra {
  vertices: any;
  sortedVertices: any
  constructor() {
    this.vertices = {};
  }

  addVertex(vertex: Vertex): void {
    this.vertices[vertex.name] = vertex;
  }

  findPointsOfShortestWay(start: string, finish: string, weight: number): string[] {

    let nextVertex: string = finish;
    const arrayWithVertex: string[] = [];
    while (nextVertex !== start) {
      let minWeigth: number = Number.MAX_VALUE;
      let minVertex = "";
      for (const i of this.vertices[nextVertex].nodes) {
        if (i.weight + this.vertices[i.nameOfVertex].weight < minWeigth) {
          minWeigth = this.vertices[i.nameOfVertex].weight;
          minVertex = i.nameOfVertex;
        }
      }
      arrayWithVertex.push(minVertex);
      nextVertex = minVertex;
    }
    return arrayWithVertex;
  }

  findShortestWay(start: string, finish: string): number {
    const nodes: any = new Map()
    this.sortedVertices = Object.entries(this.vertices).sort(([,a]:any,[,b]:any) => a.weight - b.weight)

    for (const i in this.vertices) {
      if (this.vertices[i].name === start) {
        this.vertices[i].weight = 0;
      } else {
        this.vertices[i].weight = Number.MAX_VALUE;
      }
      nodes.set(this.vertices[i].name, this.vertices[i].weight);
    }

    // console.log(this.sortedVertices)

    while (nodes.size !== 0) {
      if(nodes.size % 10000 === 0) { console.log(nodes.size) }

      const currentVertex: Vertex = this.vertices[this.sortedVertices[0][0]];
      for (const j of currentVertex.nodes) {
        const calculateWeight: number = currentVertex.weight + j.weight;
        if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
          this.vertices[j.nameOfVertex].weight = calculateWeight
          
          if(this.sortedVertices.length > 2) {
            const indexToMove = this.sortedVertices.findIndex(([k,v]:any) => k === j.nameOfVertex)
            const indexToMoveTo = this.sortedVertices.findIndex(([k,v]:any) => v.weight > calculateWeight) - 1
            if(indexToMove > 1) {
              arraymove(this.sortedVertices, indexToMove, Math.max(indexToMoveTo,1))
            }
          }
        }
      }
      nodes.delete(this.sortedVertices[0][0])
      this.sortedVertices.shift()
    }
    const finishWeight: number = this.vertices[finish].weight;
    return finishWeight
  }
}
const arraymove = (arr: any[], fromIndex: number, toIndex: number) => {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
const enlargeRow = (map:number[], add: number) => {
  return map.map(col => {
    const newVal = col+add
    return (newVal >= 10 ? newVal+1 : newVal) % 10
  })
}
const enlargeMap = (map:number[][], add: number) => {
  return map.map(row => row.map(col => {
    const newVal = col+add
    return (newVal >= 10 ? newVal+1 : newVal) % 10
  }))
}

const fn = (input: string[]) => {
  const _map = input.map(s => s.split('').map(Number))
  const map1 = _map.map(row => ([...row,...enlargeRow(row,1),...enlargeRow(row,2),...enlargeRow(row,3),...enlargeRow(row,4)]))
  const map = [...map1,...enlargeMap(map1,1),...enlargeMap(map1,2),...enlargeMap(map1,3),...enlargeMap(map1,4)]
  const dijkstra = new Dijkstra();
  
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      const nodes = [
        // x > 0 ? { nameOfVertex: `${x-1},${y}`, weight: map[y][x-1] } : undefined,
        // y > 0 ? { nameOfVertex: `${x},${y-1}`, weight: map[y-1][x] } : undefined,
        x < map[0].length-1 ? { nameOfVertex: `${x+1},${y}`, weight: map[y][x+1] } : undefined,
        y < map.length-1 ? { nameOfVertex: `${x},${y+1}`, weight: map[y+1][x] } : undefined
      ].filter(s => s !== undefined) as NodeVertex[]
      
      dijkstra.addVertex(new Vertex(
        `${x},${y}`,
        nodes,
        1
      ))
    }
  }
  const res = dijkstra.findShortestWay(`0,0`, `${map[0].length-1},${map.length-1}`)
  return res
}
// console.log(fn(fsInput))

export default fn


// ! 2965
// ! 2949

//2948 var rätt svar

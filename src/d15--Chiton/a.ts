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

  findShortestWay(start: string, finish: string): string[] {
    const nodes: any = {};
    const visitedVertex: string[] = [];

    for (const i in this.vertices) {
      if (this.vertices[i].name === start) {
        this.vertices[i].weight = 0;
      } else {
        this.vertices[i].weight = Number.MAX_VALUE;
      }
      nodes[this.vertices[i].name] = this.vertices[i].weight;
    }

    while (Object.keys(nodes).length !== 0) {
      const sortedVisitedByWeight: string[] = Object.keys(nodes).sort((a, b) => this.vertices[a].weight - this.vertices[b].weight);
      const currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]];
      for (const j of currentVertex.nodes) {
        const calculateWeight: number = currentVertex.weight + j.weight;
        if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
          this.vertices[j.nameOfVertex].weight = calculateWeight;
        }
      }
      delete nodes[sortedVisitedByWeight[0]];
    }
    const finishWeight: number = this.vertices[finish].weight;
    return [finishWeight.toString()]
    const arrayWithVertex: string[] = this.findPointsOfShortestWay(start, finish, finishWeight).reverse();
    arrayWithVertex.push(finish, finishWeight.toString());
    return arrayWithVertex;
  }
}

const fn = (input: string[]) => {
  const map = input.map(s => s.split('').map(Number))
  const dijkstra = new Dijkstra();

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      const nodes = [
        x > 0 ? { nameOfVertex: `${x-1},${y}`, weight: map[y][x-1] } : undefined,
        y > 0 ? { nameOfVertex: `${x},${y-1}`, weight: map[y-1][x] } : undefined,
        x < input[0].length-1 ? { nameOfVertex: `${x+1},${y}`, weight: map[y][x+1] } : undefined,
        y < input.length-1 ? { nameOfVertex: `${x},${y+1}`, weight: map[y+1][x] } : undefined
      ].filter(s => s !== undefined) as NodeVertex[]

      dijkstra.addVertex(new Vertex(
        `${x},${y}`,
        nodes,
        1
      ))
    }    
  }
  
  const res = dijkstra.findShortestWay(`0,0`, `${map[0].length-1},${map.length-1}`)
  return parseInt(res[res.length-1],10)
}
console.log(fn(fsInput))

export default fn

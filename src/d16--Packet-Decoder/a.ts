import fsInput from './input'

const hex2binary = (str:string) => {
    return str.split('').map(char => {
    const dec = parseInt(char,16)
    const binary = (dec >>> 0).toString(2)
    const padPlace = 4-binary.length
  
    return `${'0'.repeat(padPlace)}${binary}`
  }).join('')
}

const decodePayload = (payload:string) => {
  const bits = payload.match(/.{1,5}/g) ?? []
  let stoppedAtIndex: number|undefined = undefined
  let res = ''

  for (let i = 0; i < bits.length; i++) {
    res = `${res}${bits[i].substring(1)}`

    if(bits[i].charAt(0) === '0') {
      stoppedAtIndex = (i+1)*5
      i = bits.length
    }
  }

  return { value: parseInt(res,2), nextPackage: stoppedAtIndex ? payload.substring(stoppedAtIndex) : '' }
}

interface IPacket {
  version: number
  typeId: number
  subPackets: IPacket[]
  payload: number|undefined
}

const decodePacket = (packet:string): { thisPackage: IPacket, nextPackage: string } => {
  const version = parseInt(packet.substring(0,3),2)
  const typeId = parseInt(packet.substring(3,6),2)
  const subPackets: IPacket[] = []
  let payload: number|undefined
  let nextPackage = ''

  // literal value
  if(typeId === 4) {
    const { value, nextPackage:_nextPackage } = decodePayload(packet.substring(6))
    nextPackage = _nextPackage
    payload = value
  } else {
    const lengthTypeId = parseInt(packet.substring(6,7), 2)

    if(lengthTypeId === 0) {
      const subPacketLengths = parseInt(packet.substring(7,22), 2)
      let subpackets = packet.substring(22,22+subPacketLengths)
      nextPackage = packet.substring(22+subPacketLengths)

      while(subpackets.length > 6) {
        const { thisPackage, nextPackage:_nextPackage } = decodePacket(subpackets)
        subPackets.push(thisPackage)
        subpackets = _nextPackage
      }
    } else if (lengthTypeId === 1) {
      const noOfSubPackets = parseInt(packet.substring(7,18), 2)
      let subpackets = packet.substring(18)
      for (let i = 0; i < noOfSubPackets; i++) {
        const { thisPackage, nextPackage:_nextPackage } = decodePacket(subpackets)
        subPackets.push(thisPackage)
        subpackets = _nextPackage
      }

      nextPackage = subpackets
    } else {
      throw new Error('invalid type length id')
    }
  }
  return {
    thisPackage: {
      version,
      typeId,
      subPackets,
      payload
    },
    nextPackage
  }
}

const calcVersion = (pkg: IPacket): number => {
  return pkg.version + pkg.subPackets.reduce((acc, v) => acc + calcVersion(v), 0)
}

const fn = (input: string) => {
  const binary = hex2binary(input)
  const decodedPacket = decodePacket(binary)
  console.dir(decodedPacket, { depth: null })

  return calcVersion(decodedPacket.thisPackage) 
}
console.log('RES: ', fn(fsInput))

export default fn

import fsInput from './input'

const fn = (input: string[]) => {
  const scanners = new Map()
  let scannerKey = ''

  input.forEach(s => {
    if(s === '') return
    if(s.startsWith('--- scanner ')){
      const match = s.match(/\d/)
      scannerKey = match?.[0] ?? ''
    } else {
      scanners.set(scannerKey, [...(scanners.get(scannerKey) ?? []), s])
    }     
  })

  return scanners
}
// fn(fsInput)

export default fn

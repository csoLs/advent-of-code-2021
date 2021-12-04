import fsInput from './input'

const fn = (input: string) => {
  let modifiedInput = input
  let i=0

  while (i<modifiedInput.length) {
    if(modifiedInput.charCodeAt(i) < 97) { //first is Uppercase
      if(modifiedInput[i].toLowerCase()=== modifiedInput[i+1]) {
        modifiedInput = `${modifiedInput.slice(0,i)}${modifiedInput.slice(i+2)}`
        if(i >0)i--
      } else {
        i++
      }
    } else { //first is lowecase
      if(modifiedInput[i].toUpperCase()=== modifiedInput[i+1]) {
        modifiedInput = `${modifiedInput.slice(0,i)}${modifiedInput.slice(i+2)}`
        if(i >0)i--
      } else {
        i++
      }
    }
  }

  return modifiedInput.length
}
console.log(fn(fsInput))

export default fn

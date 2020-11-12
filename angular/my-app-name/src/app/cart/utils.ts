export const padEnd = (text: string, no: number, pad: string): string => {
  let returnStr = text
  let num = no - text.length
  while (num > 0) {
    text += pad
  }
  return returnStr
}

export const padStart = (text: string, no: number, pad: string): string => {
  let returnStr = text
  let num = no - text.length
  while (num > 0) {
    text = pad + text
  }
  return returnStr
}
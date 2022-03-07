export function isImageFile(name: string) {
  let fT = name.substring(name.lastIndexOf('.') + 1)
  return ['jpg', 'jpeg', 'bmp', 'png', 'gif'].includes(fT)
}

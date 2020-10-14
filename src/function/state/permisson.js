import state from './state'

const check = (...codes) => {
  if (codes.includes('*')) {
    return true
  }
  for (let code of codes) {
    if (state.permissons.includes(code)) {
      return true
    }
  }
  return false
}

export default { check }

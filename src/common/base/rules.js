const createPattern = pattern => {
  return (label, required = true) => ({
    required,
    pattern,
    message: `${label} format error`,
  })
}

export default {
  required: (label, required = true) => ({ required, message: `${label} is required` }),
  number: createPattern(/^\d+$/),
  price: createPattern(/^\d+(\.\d{1,2})?$/),
  phone: createPattern(/^1\d{10}$/),
  email: createPattern(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
}

const ClickHandlerAsProp = {
  default: function () {
    console.log('clicked in nested handler')
    return
  },
  type: Function,
  required: false
}

export { ClickHandlerAsProp }
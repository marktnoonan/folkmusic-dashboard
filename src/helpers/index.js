const ClickHandlerAsProp = {
  default: function() {
    console.log("default clicked in nested handler");
    return;
  },
  type: Function,
  required: false
};

export { ClickHandlerAsProp };

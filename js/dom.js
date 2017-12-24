window.DOM = (function () {
  function createNode(element) {
    return document.createElement(element)
  }

  function append(parent, el) {
    return parent.appendChild(el)
  }

  return {
    append,
    createNode
  }
})()

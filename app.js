let menu = document.getElementById("toggle-icon")
let panel = document.getElementById("data-panel")
let list = document.getElementById("data-list")
let one = document.getElementById("one")
let two = document.getElementById("two")
let three = document.getElementById("three")

const clickFunction = () => {
  menu.classList.toggle("rotate-icon")
}

window.addEventListener("load", function () {
  let direction = ""
  list.classList.add("list-items")

  menu.addEventListener("click", function () {
    list.classList.remove("list-items")
    panel.classList.remove("disp")
    list.classList.remove("data-list")
    one.classList.remove("one")
    two.classList.remove("two")
    three.classList.remove("three")

    panel.offsetWidth = panel.offsetWidth

    if (direction === "toRight") {
      direction = "toLeft"
      panel.style.animationDirection = "reverse"
      list.style.animationDirection = "reverse"

      one.style.animationDirection = "reverse"
      two.style.animationDirection = "reverse"
      three.style.animationDirection = "reverse"
    } else {
      direction = "toRight"
      panel.style.animationDirection = ""
      list.style.animationDirection = ""

      one.style.animationDirection = ""
      two.style.animationDirection = ""
      three.style.animationDirection = ""
    }

    panel.classList.add("disp")
    list.classList.add("data-list")

    one.classList.add("one")
    two.classList.add("two")
    three.classList.add("three")
  })
})

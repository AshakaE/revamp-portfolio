let menu = document.getElementById("toggle-icon")
let panel = document.getElementById("data-panel")
let list = document.getElementById("data-list")
let one = document.getElementById("one")
let two = document.getElementById("two")
let three = document.getElementById("three")
let rev = [panel, list, one, two, three]

const clickFunction = () => {
  menu.classList.toggle("rotate-icon")
}

window.addEventListener("load", function () {
  let direction = ""
  list.classList.add("list-items")

  menu.addEventListener("click", function () {
    list.classList.remove("list-items")
    list.classList.remove("data-list")

    panel.classList.remove("disp")

    one.classList.remove("one")
    two.classList.remove("two")
    three.classList.remove("three")

    panel.offsetWidth = panel.offsetWidth

    if (direction === "toRight") {
      direction = "toLeft"
      rev.forEach((el) => (el.style.animationDirection = "reverse"))
    } else {
      direction = "toRight"
      rev.forEach((el) => (el.style.animationDirection = ""))
    }

    list.classList.add("data-list")
    panel.classList.add("disp")

    one.classList.add("one")
    two.classList.add("two")
    three.classList.add("three")
  })
})

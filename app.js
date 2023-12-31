document.getElementById("quas").addEventListener("click", () => addOrb("Q"))
document.getElementById("wex").addEventListener("click", () => addOrb("W"))
document.getElementById("exort").addEventListener("click", () => addOrb("E"))
document.getElementById("invoke").addEventListener("click", invokeSpell)

// Event listeners for keyboard shortcuts
document.addEventListener("keydown", (event) => {
  switch (event.key.toLowerCase()) {
    case "q":
      addOrb("Q")
      break
    case "w":
      addOrb("W")
      break
    case "e":
      addOrb("E")
      break
    case "r":
      invokeSpell()
      break
    case "d":
      triggerSpell(0)
      break
    case "f":
      triggerSpell(1)
      break
  }
})

let currentOrbs = []
let spellTray = [null, null]
let lastInvokedSpell = null

function addOrb(orb) {
  if (currentOrbs.length < 3) {
    currentOrbs.push(orb)
  } else {
    currentOrbs.shift()
    currentOrbs.push(orb)
  }
  updateDisplay()
}

function orbToFilename(orb) {
  switch (orb) {
    case "Q":
      return "quas.png"
    case "W":
      return "wex.png"
    case "E":
      return "exort.png"
    default:
      return ""
  }
}

function updateDisplay() {
  const combinationContainer = document.getElementById("combination")
  combinationContainer.innerHTML = "" // Clear existing images

  currentOrbs.forEach((orb) => {
    let img = document.createElement("img")
    img.src = orbToFilename(orb) // Get the correct image filename
    img.alt = orb
    img.classList.add("orb-image") // Class for styling the images
    combinationContainer.appendChild(img)
  })
}

function invokeSpell() {
  const spell = getSpell(currentOrbs)
  if (spell !== "None" && spell !== lastInvokedSpell) {
    updateSpellTray(spell)
    lastInvokedSpell = spell
  }
}

function updateSpellTray(spell) {
  spellTray.shift()
  spellTray.push(spell)
  updateTrayDisplay()
}

function updateTrayDisplay() {
  document.getElementById("spell1").children[0].src = getImageForSpell(
    spellTray[0]
  )
  document.getElementById("spell1").children[0].alt = spellTray[0] || ""
  document.getElementById("spell2").children[0].src = getImageForSpell(
    spellTray[1]
  )
  document.getElementById("spell2").children[0].alt = spellTray[1] || ""
}

function triggerSpell(slot) {
  if (spellTray[slot]) {
    const spellElement = document.getElementById(`spell${slot + 1}`)
    spellElement.classList.add("spell-animation")
    setTimeout(() => spellElement.classList.remove("spell-animation"), 500)
  }
}

function getImageForSpell(spellName) {
  if (!spellName) return "" // Return empty string if no spell
  return `${spellName.toLowerCase().replace(/ /g, "_")}.png` // Replace spaces with underscores and convert to lowercase
}

function getSpell(orbs) {
  const combo = orbs.join("")
  switch (combo) {
    case "QQQ":
      return "Cold Snap"
    case "QQW":
      return "Ghost Walk"
    case "QQE":
      return "Ice Wall"
    case "WWW":
      return "EMP"
    case "WWQ":
      return "Tornado"
    case "WWE":
      return "Alacrity"
    case "EEE":
      return "Sun Strike"
    case "EEQ":
      return "Forge Spirit"
    case "EEW":
      return "Chaos Meteor"
    case "QWE":
      return "Deafening Blast"
    default:
      return "None"
  }
}

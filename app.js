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
  document.getElementById("combination").textContent = currentOrbs.join("")
}

function invokeSpell() {
  const spell = getSpell(currentOrbs)
  if (spell !== lastInvokedSpell) {
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
  document.getElementById("spell1").textContent = spellTray[0] || "Empty"
  document.getElementById("spell2").textContent = spellTray[1] || "Empty"
}

function triggerSpell(slot) {
  if (spellTray[slot]) {
    const spellElement = document.getElementById(`spell${slot + 1}`)
    spellElement.classList.add("spell-animation")
    setTimeout(() => spellElement.classList.remove("spell-animation"), 500)
  }
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

import { getDatabase, ref, get } from "firebase/database"

import { adjectives } from "./adjectives"
import { nouns } from "./nouns"

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

export const generateDescriptiveId = () => {
  const database = getDatabase()
  let descriptiveId = ''

  return new Promise((resolve, reject) => {
    get(ref(database, "checklists_index"))
      .then((snap) => {
        if (!snap.exists()) reject("Unable to read from database")

        const idsInUse = Object.keys(snap.val())
  
        do {
          const firstNounPos = getRandomInt(0, nouns.length)
          const firstAdjPos = getRandomInt(0, adjectives.length)
          let secondAdjPos = null
          while (secondAdjPos === null || secondAdjPos === firstAdjPos) {
            secondAdjPos = getRandomInt(0, adjectives.length)
          }
          descriptiveId = `${adjectives[firstAdjPos]}-${adjectives[secondAdjPos]}-${nouns[firstNounPos]}`
        } while (idsInUse.includes(descriptiveId))

        resolve(descriptiveId)
      })
      .catch((error) => {
        reject("Error generating checklist ID")
      })
  })
}

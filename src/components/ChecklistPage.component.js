import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDatabase } from "firebase/database";

import { Box, CircularProgress } from "@mui/material"

const ChecklistPage = () => {
  const { listId } = useParams()
  const database = getDatabase()

  const [loading, setLoading] = useState(true)
  // const [checklist, setChecklist] = useState(null)

  // useEffect(() => {
  //   const loadChecklist = () => {
  //     if (listId) {
  //       // get user saved info from firebase and send to store
  //       database.ref(`checklists/${listId}`).once('value').then(snap => {
  //         const data = snap.val()
  //         if (data) {
  //           // Set user info in store
  //           setChecklist({
  //             listId,
  //             ...(data.starChartMastery && { starChartMastery: data.starChartMastery }),
  //             ...(data.steelPathMastery && { steelPathMastery: data.steelPathMastery }),
  //             ...(data.intrinsics && { intrinsics: data.intrinsics }),
  //             ...(data.owned && { owned: data.owned }),
  //             ...(data.mastered && { mastered: data.mastered }),
  //             ...(data.levels && { levels: data.levels }),
  //           })
    
  //           // Calculate and set user mastery value in store
  //           if (data.mastered && data.mastered.length) {
  //             // for each item, add mastery if item id is in 'mastered' array
  //             let itemsMastery = 0
  //             items.forEach(item => {
  //               if (data.mastered.includes(item.id)) {
  //                 const masteryPerLevel = (
  //                   ['Necramech', 'Warframe'].includes(item.category) ||
  //                   ['Archwing', 'Companion', 'K-Drive'].includes(item.slot)
  //                 ) ? 200 : 100
    
  //                 const newMastery = item.maxLevel === 30 ? (
  //                   30 * masteryPerLevel
  //                 ) : (
  //                   data.levels ? (
  //                     data.levels[item.id] ? data.levels[item.id] * masteryPerLevel : 30 * masteryPerLevel
  //                   ) : (
  //                     30 * masteryPerLevel
  //                   )
  //                 )
    
  //                 itemsMastery += newMastery
  //               }
  //             })
            
  //             addItemMastery(itemsMastery)
  //           }
    
  //           // Set user preferences in store
  //           if (data.preferences) {
  //             setHideOwned(data.preferences.hideOwned)
  //             setHideMastered(data.preferences.hideMastered)
  //           }

  //           setLoading(false)
  //         }
  //       })
  //     }
  //   }

  //   loadChecklist()
  // // eslint-disable-next-line
  // }, [user, items])

  return (
    <>
      {loading ? (
        <Box sx={{ alignItems: "center", display: "flex", height: "80%", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          
        </Box>
      )}
    </>
  )
}

export default ChecklistPage

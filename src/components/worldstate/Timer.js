import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Duration } from 'luxon'

import { Chip } from "@mui/material"

const Timer = ({ timeDiff }) => {
  const [currentTimeDiff, setCurrentTimeDiff] = useState(timeDiff)     // millseconds remaining in cycle

  useEffect(() => {
    if (currentTimeDiff) {
      let timer = setTimeout(() => setCurrentTimeDiff(currentTimeDiff - 1000), 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [currentTimeDiff])

  return (
    <Chip
      color={currentTimeDiff > 1200000 ? 'success' : currentTimeDiff > 300000 ? 'warning' : 'error'}
      label={Duration.fromMillis(timeDiff).toFormat(timeDiff >= 86400000 ? "d'd' h'h'" : timeDiff >= 3600000 ? "h'h' mm'm'" : "mm'm' ss's'" )}
      size="small"
    />
  )
}
 
export default Timer

Timer.propTypes = {
  // Luxon time difference object contaning milliseconds to expiration
  timeDiff: PropTypes.object.isRequired
}

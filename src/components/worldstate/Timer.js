import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Duration } from 'luxon'

import { Chip } from "@mui/material"

const Timer = props => {
  const [timeDiff, setTimeDiff] = useState(props.timeDiff)     // millseconds remaining in cycle

  useEffect(() => {
    if (timeDiff) {
      let timer = setTimeout(() => setTimeDiff(timeDiff - 1000), 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [timeDiff])

  return (
    <Chip
      color={timeDiff > 1200000 ? 'success' : timeDiff > 300000 ? 'warning' : 'error'}
      label={Duration.fromMillis(timeDiff).toFormat(timeDiff < 3600000 ? "mm'm' ss's'" : "h'h' mm'm' ss's'")}
      size="small"
    />
  )
}
 
export default Timer

Timer.propTypes = {
  // Luxon time difference object contaning milliseconds to expiration
  timeDiff: PropTypes.object.isRequired
}

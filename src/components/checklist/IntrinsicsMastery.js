import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Input } from 'semantic-ui-react'

import {
  startEditIntrinsics
} from '../actions/user'

const IntrinsicsMastery = ({ listId, intrinsics, startEditIntrinsics }) => {
  const [tacticalRank, setTacticalRank] = useState(intrinsics.tactical || 0)
  const [pilotingRank, setPilotingRank] = useState(intrinsics.piloting || 0)
  const [gunneryRank, setGunneryRank] = useState(intrinsics.gunnery || 0)
  const [engineeringRank, setEngineeringRank] = useState(intrinsics.engineering || 0)
  const [commandRank, setCommandRank] = useState(intrinsics.command || 0)
  

  const handleTacticalRank = e => {
    const value = e.target.value
    if (value >= 0 && value <= 10) {
      setTacticalRank(parseInt(value))
    }
  }
  const increaseTacticalRank = (value = null) => {
    if (!value) value = tacticalRank < 10 ? tacticalRank + 1 : tacticalRank
    setTacticalRank(value)
  }

  useEffect(() => {
    startEditIntrinsics(listId, { tactical: tacticalRank })
  }, [listId, tacticalRank, startEditIntrinsics])

  const handlePilotingRank = e => {
    const value = e.target.value
    if (value >= 0 && value <= 10) {
      setPilotingRank(parseInt(value))
    }
  }
  const increasePilotingRank = (value = null) => {
    if (!value) value = pilotingRank < 10 ? pilotingRank + 1 : pilotingRank
    setPilotingRank(value)
  }

  useEffect(() => {
    startEditIntrinsics(listId, { piloting: pilotingRank })
  }, [listId, pilotingRank, startEditIntrinsics])

  const handleGunneryRank = e => {
    const value = e.target.value
    if (value >= 0 && value <= 10) {
      setGunneryRank(parseInt(value))
    }
  }
  const increaseGunneryRank = (value = null) => {
    if (!value) value = gunneryRank < 10 ? gunneryRank + 1 : gunneryRank
    setGunneryRank(value)
  }

  useEffect(() => {
    startEditIntrinsics(listId, { gunnery: gunneryRank })
  }, [listId, gunneryRank, startEditIntrinsics])

  const handleEngineeringRank = e => {
    const value = e.target.value
    if (value >= 0 && value <= 10) {
      setEngineeringRank(parseInt(value))
    }
  }
  const increaseEngineeringRank = (value = null) => {
    if (!value) value = engineeringRank < 10 ? engineeringRank + 1 : engineeringRank
    setEngineeringRank(value)
  }

  useEffect(() => {
    startEditIntrinsics(listId, { engineering: engineeringRank })
  }, [listId, engineeringRank, startEditIntrinsics])

  const handleCommandRank = e => {
    const value = e.target.value
    if (value >= 0 && value <= 10) {
      setCommandRank(parseInt(value))
    }
  }
  const increaseCommandRank = (value = null) => {
    if (!value) value = commandRank < 10 ? commandRank + 1 : commandRank
    setCommandRank(value)
  }

  useEffect(() => {
    startEditIntrinsics(listId, { command: commandRank })
  }, [listId, commandRank, startEditIntrinsics])

  return (
    <div style={{ margin: '50px 0 20px' }}>
      <Header as="h3">Railjack Intrinsics</Header>
      <Grid stackable>
        <Grid.Column width="2" textAlign="center">
          <p style={{ marginBottom: 5 }}>Tactical</p>
          <Input
            placeholder="0"
            autoComplete="off"
            fluid
            name="tactical-rank"
            value={tacticalRank}
            onChange={handleTacticalRank}
            action={{
              inverted: true,
              color: "blue",
              icon: "plus",
              onClick: () => increaseTacticalRank(),
              disabled: tacticalRank === 10 ? true : false
            }}
          />
        </Grid.Column>
        <Grid.Column width="2" textAlign="center">
          <p style={{ marginBottom: 5 }}>Piloting</p>
          <Input
            placeholder="Mastery Value"
            autoComplete="off"
            fluid
            name="piloting-rank"
            value={pilotingRank}
            onChange={handlePilotingRank}
            action={{
              inverted: true,
              color: "blue",
              icon: "plus",
              onClick: () => increasePilotingRank(),
              disabled: pilotingRank === 10 ? true : false
            }}
          />
        </Grid.Column>
        <Grid.Column width="2" textAlign="center">
          <p style={{ marginBottom: 5 }}>Gunnery</p>
          <Input
            placeholder="Mastery Value"
            autoComplete="off"
            fluid
            name="gunnery-rank"
            value={gunneryRank}
            onChange={handleGunneryRank}
            action={{
              inverted: true,
              color: "blue",
              icon: "plus",
              onClick: () => increaseGunneryRank(),
              disabled: gunneryRank === 10 ? true : false
            }}
          />
        </Grid.Column>
        <Grid.Column width="2" textAlign="center">
          <p style={{ marginBottom: 5 }}>Engineering</p>
          <Input
            placeholder="Mastery Value"
            autoComplete="off"
            fluid
            name="engineering-rank"
            value={engineeringRank}
            onChange={handleEngineeringRank}
            action={{
              inverted: true,
              color: "blue",
              icon: "plus",
              onClick: () => increaseEngineeringRank(),
              disabled: engineeringRank === 10 ? true : false
            }}
          />
        </Grid.Column>
        <Grid.Column width="2" textAlign="center">
          <p style={{ marginBottom: 5 }}>Command</p>
          <Input
            placeholder="Mastery Value"
            autoComplete="off"
            fluid
            name="command-rank"
            value={commandRank}
            onChange={handleCommandRank}
            action={{
              inverted: true,
              color: "blue",
              icon: "plus",
              onClick: () => increaseCommandRank(),
              disabled: commandRank === 10 ? true : false
            }}
          />
        </Grid.Column>
      </Grid>
      <p style={{ marginTop: 20, color: 'grey' }}>
        Each intrinsic rank awards 1500 mastery for a total of 75000
      </p>
    </div>
  )
}

const mapStateToProps = state => ({
  intrinsics: state.user.intrinsics
})

export default connect(mapStateToProps, {
  startEditIntrinsics
})(IntrinsicsMastery)

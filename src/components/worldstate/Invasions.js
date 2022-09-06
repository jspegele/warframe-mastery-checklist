import React, { useState, useEffect } from 'react'
import { Segment, Grid } from 'semantic-ui-react'

import Skeleton from '../Skeleton'

import styles from './styles/invasions.module.css'

const Invasions = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [invasionList, setInvasionList] = useState(null)

  useEffect(() => {
    let isSubscribed = true 
    
    fetch("https://api.warframestat.us/pc/invasions")
      .then(res => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            const activeInvasions = result.filter(invasion => !invasion.completed)
            setInvasionList(activeInvasions)
            setIsLoaded(true)
          }
        },
        (error) => {
          if (isSubscribed) {
            setError(error)
            setIsLoaded(true)
          }
        }
      )
      
    return () => isSubscribed = false
  }, [])

  return (
    <Segment>
      <h3>Invasions</h3>
      <Grid>
        {isLoaded ? (
          error ? (
            <Grid.Column width={16} verticalAlign="middle">
              {error}
            </Grid.Column>
          ) : (
            invasionList.map((invasion, i) => {
              const attackFill = invasion.attackingFaction === 'Grineer' ? '#db2828' : (
                invasion.attackingFaction === 'Corpus' ? '#2185d0' : '#21ba45'
              )
              const defendFill = invasion.defendingFaction === 'Grineer' ? '#db2828' : (
                invasion.defendingFaction === 'Corpus' ? '#2185d0' : '#21ba45'
              )
              return (
                <Grid.Row key={i} className={styles.invasionRow}>
                  <Grid.Column width={16} verticalAlign="middle">
                    <div className={styles.description}>
                      <span>{`${invasion.node} ${invasion.desc}`}</span>
                    </div>
                    <div
                      className={styles.completion}
                      style={{
                        background: `linear-gradient(
                          90deg,
                          ${attackFill} 0%,
                          ${attackFill} ${invasion.completion}%,
                          ${defendFill} ${invasion.completion}%,
                          ${defendFill} 100%)
                        `
                      }}
                    >
                      {Math.round(invasion.completion * 100) / 100} %
                    </div>
                    <div className={styles.rewards}>
                      <span>{invasion.attackerReward.asString}</span>
                      <span>{invasion.defenderReward.asString}</span>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              )
            })
          )
        ) : (
          <Grid.Column width={16}>
              <Skeleton width={'100%'} height={60} margin='7px 0' />
              <Skeleton width={'100%'} height={60} margin='7px 0' />
              <Skeleton width={'100%'} height={60} margin='7px 0' />
              <Skeleton width={'100%'} height={60} margin='7px 0' />
              <Skeleton width={'100%'} height={60} margin='7px 0' />
          </Grid.Column>
        )}
      </Grid>
    </Segment>
  )
}
 
export default Invasions

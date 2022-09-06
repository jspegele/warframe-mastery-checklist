import React, { useState, useEffect } from 'react'

import { Card, Chip, Grid, Skeleton, Tooltip, Typography } from "@mui/material"

const News = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [newsList, setNewsList] = useState(null)

  useEffect(() => {
    let isSubscribed = true 

    fetch("https://api.warframestat.us/pc/news")
      .then(res => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            console.log(result)
            setNewsList(result)
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

  const skeletonWidths = ['90%','70%','88%','82%','75%','94%','85%','92%','78%','87%']

  return (
    <Card sx={{ p: 2 }}>
      <Typography component="h3" fontWeight="500" pb={2}>News</Typography>
      <Grid container fontSize=".875rem" spacing={2}>
        {isLoaded ? (
          error ? (
            <Grid.Column width={12} verticalAlign="middle">
              {error}
            </Grid.Column>
          ) : (
            newsList
              .slice(0,10)
              .sort((a, b) => a.date < b.date ? 1 : -1)
              .map(item => (
                <React.Fragment key={item.id}>
                  {item.eta.split(' ')[0] === 'in' ? (
                    <Grid item xs={3} md={2}>
                      <Tooltip title={`ends ${item.eta}`}>
                        <Chip
                          color="success"
                          label="Live"
                          size="small"
                        />
                      </Tooltip>
                    </Grid>
                  ) : (
                    <Grid item xs={3} md={2}>
                      <span>{item.eta.split(' ')[0]} ago</span>
                    </Grid>
                  )}
                  <Grid item xs={9} md={10}>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.message}
                    </a>
                  </Grid>
                </React.Fragment>
              ))
          )
        ) : (
          <Grid item xs={12}>
            {skeletonWidths.map((width, i) => (
              <Skeleton key={width} variant="text" sx={{ color: "grey.400", fontSize: "1rem", maxWidth: "8rem", width: "100%" }} />
            ))}
          </Grid>
        )}
      </Grid>
    </Card>
  )
}
 
export default News

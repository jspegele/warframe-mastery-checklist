import React from "react"

import { Stack } from "@mui/material"

import StarChartMastery from "./StarChartMastery"
import IntrinsicsMastery from "./IntrinsicsMastery"

const OtherMastery = () => (
  <Stack spacing={5}>
    <StarChartMastery />
    <IntrinsicsMastery />
  </Stack>
)
 
export default OtherMastery

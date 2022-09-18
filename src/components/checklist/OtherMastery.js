import React from "react"

import { Stack } from "@mui/material"

import StarChartMastery from "./StarChartMastery"
import RailjackMastery from "./RailjackMastery"

const OtherMastery = () => (
  <Stack spacing={5}>
    <StarChartMastery />
    <RailjackMastery />
  </Stack>
)
 
export default OtherMastery

import React from "react"

import { Stack } from "@mui/material"

import StarChartMastery from "./StarChartMastery"
import RailjackMastery from "./RailjackMastery"
import DrifterMastery from "./DrifterMastery"

const OtherMastery = () => (
  <Stack spacing={5}>
    <StarChartMastery />
    <RailjackMastery />
    <DrifterMastery />
  </Stack>
)
 
export default OtherMastery

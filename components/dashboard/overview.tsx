"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan 1", auditCount: 240, droneCount: 238 },
  { name: "Jan 2", auditCount: 300, droneCount: 298 },
  { name: "Jan 3", auditCount: 200, droneCount: 200 },
  { name: "Jan 4", auditCount: 278, droneCount: 275 },
  { name: "Jan 5", auditCount: 189, droneCount: 190 },
  { name: "Jan 6", auditCount: 239, droneCount: 240 },
  { name: "Jan 7", auditCount: 349, droneCount: 344 },
  { name: "Jan 8", auditCount: 231, droneCount: 230 },
  { name: "Jan 9", auditCount: 219, droneCount: 220 },
  { name: "Jan 10", auditCount: 258, droneCount: 255 },
  { name: "Jan 11", auditCount: 300, droneCount: 298 },
  { name: "Jan 12", auditCount: 268, droneCount: 265 },
  { name: "Jan 13", auditCount: 200, droneCount: 200 },
  { name: "Jan 14", auditCount: 350, droneCount: 349 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Legend />
        <Bar dataKey="auditCount" name="Audit Data" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="droneCount" name="Drone Scans" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


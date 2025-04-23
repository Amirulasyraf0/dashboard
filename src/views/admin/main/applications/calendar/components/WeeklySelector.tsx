// WeeklySelector.tsx
import React from 'react'
import { HStack } from '@chakra-ui/react'
import { CheckboxCard } from './RecurringOption' // Assuming this is defined elsewhere

export function WeekdaySelector() {
  const [selectedDays, setSelectedDays] = React.useState<string[]>([])

  const toggleDay = (day: string) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day]

    setSelectedDays(newSelectedDays)
  }

  const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat','Sun']

  return (
    <HStack spacing={4}>
      {days.map((day) => (
        <CheckboxCard
          key={day}
          isChecked={selectedDays.includes(day)}
          onChange={() => toggleDay(day)}
        >
          {day}
        </CheckboxCard>
      ))}
    </HStack>
  )
}

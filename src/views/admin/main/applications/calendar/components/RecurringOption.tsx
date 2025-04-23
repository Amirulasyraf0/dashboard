import { Box, useCheckbox, UseCheckboxProps } from '@chakra-ui/react'

type CheckboxCardProps = UseCheckboxProps & {
  children: React.ReactNode
}

export function CheckboxCard(props: CheckboxCardProps) {
  const { getInputProps, getCheckboxProps } = useCheckbox(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="sm"
        boxShadow="md"
        
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={4}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

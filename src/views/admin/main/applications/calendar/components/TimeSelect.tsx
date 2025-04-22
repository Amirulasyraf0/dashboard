import React from 'react';
import { FormControl, Select, Flex } from '@chakra-ui/react';

interface TimeSelectProps {
  valueHour: string;
  valueMinute: string;
  valuePeriod: string;
  onChangeHour: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeMinute: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangePeriod: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({
  valueHour,
  valueMinute,
  valuePeriod,
  onChangeHour,
  onChangeMinute,
  onChangePeriod,
}) => {
  return (
    <Flex direction="row" justify="space-between" gap={2}>
      <FormControl>
      <Select value={valueHour} onChange={onChangeHour} w="80px" className="time-select">
  <option value="--">--</option> {/* Default unselected value */}
  {[...Array(12)].map((_, i) => {
    const hour = (i + 1).toString().padStart(2, '0'); // 01–12
    return (
      <option key={hour} value={hour}>
        {hour}
      </option>
    );
  })}
</Select>

      </FormControl>

      <FormControl>
      <Select value={valueMinute} onChange={onChangeMinute} w="80px" className="time-select">
  <option value="--">--</option> {/* Default unselected value */}
  {['00', '15', '30', '45'].map((minute) => (
    <option key={minute} value={minute}>
      {minute}
    </option>
  ))}
</Select>

      </FormControl>

      <FormControl>
      <Select value={valuePeriod} onChange={onChangePeriod} w="80px" className="time-select">
  <option value="--">--</option> {/* Default option */}
  {['AM', 'PM'].map((period) => (
    <option key={period} value={period}>
      {period}
    </option>
  ))}
</Select>
      </FormControl>

      {/* You should place style like this only in global scope, but this works temporarily */}
      <style>
        {`
          .time-select .chakra-select__menu {
            top: auto !important;
            bottom: 100% !important;
          }
        `}
      </style>
    </Flex>
  );
};

export default TimeSelect;

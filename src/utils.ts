export const MonthIndexToMonthNameMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
} as const;

export const DayLabelFormatOptionToLabelMap = {
  d: {
    MONDAY: "M",
    TUESDAY: "T",
    WEDNESDAY: "W",
    THURSDAY: "T",
    FRIDAY: "F",
    SATURDAY: "S",
    SUNDAY: "S",
  },
  ddd: {
    MONDAY: "Mon",
    TUESDAY: "Tue",
    WEDNESDAY: "Wed",
    THURSDAY: "Thu",
    FRIDAY: "Fri",
    SATURDAY: "Sat",
    SUNDAY: "Sun",
  },
} as const;

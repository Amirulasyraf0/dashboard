import { mode } from "@chakra-ui/theme-tools";

export const calendarStyles = {
  styles: {
    global: (props: any) => ({
      ".rbc-calendar": {
        background: mode("white", "gray.800")(props),
        borderRadius: "8px",
        boxShadow: "md",
        padding: "10px",
      },
      ".rbc-toolbar": {
        background: mode("brand.500", "gray.700")(props),
        color: "white",
        padding: "10px",
        borderRadius: "8px",
        fontWeight: "bold",
      },
      ".rbc-event": {
        backgroundColor: mode("brand.400", "brand.500")(props),
        color: "white",
        borderRadius: "4px",
        padding: "4px",
      },
      ".rbc-today": {
        backgroundColor: mode("secondaryGray.200", "gray.600")(props),
      },
      ".rbc-month-view": {
        borderColor: mode("gray.200", "gray.600")(props),
      },
      ".rbc-day-bg": {
        backgroundColor: mode("gray.50", "gray.700")(props),
      },
      ".rbc-selected": {
        backgroundColor: mode("brand.500", "brand.600")(props),
        color: "white",
      },
    }),
  },
};

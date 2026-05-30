import React from "react";
import { createComponent, type EventName } from "@lit/react";

import { CustomEventsIDs, type OnDateSelectDetail } from "./constants";
import { DateRangePickerWc } from "./date-range-picker-wc";

export { DateRangePickerWc };

export const DateRangePickerWcReact = createComponent({
  tagName: "date-range-picker-wc",
  elementClass: DateRangePickerWc,
  react: React,
  events: {
    onDateSelect: CustomEventsIDs.ON_DATE_SELECT as EventName<
      CustomEvent<OnDateSelectDetail>
    >,
  },
});

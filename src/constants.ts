const ComponentExposedAttributes = {
  START_DATE: "start-date",
  END_DATE: "end-date",
  LABEL_FORMAT_FOR_DAYS: "label-format-for-days",
  RANGE_PREVIEW_BORDER_COLOR: "range-preview-border-color",
  HIDE_CLEAR_BUTTON: "hide-clear-button",
};

interface OnDateSelectDetail {
  startDate?: string;
  endDate?: string;
}
const CustomEventsIDs = {
  ON_DATE_SELECT: "date-range-picker-wc:on-date-select",
};

export { ComponentExposedAttributes, CustomEventsIDs, type OnDateSelectDetail };

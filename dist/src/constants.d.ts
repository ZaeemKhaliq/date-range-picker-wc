declare const ComponentExposedAttributes: {
    START_DATE: string;
    END_DATE: string;
    LABEL_FORMAT_FOR_DAYS: string;
    RANGE_PREVIEW_BORDER_COLOR: string;
    HIDE_CLEAR_BUTTON: string;
};
interface OnDateSelectDetail {
    startDate?: string;
    endDate?: string;
}
declare const CustomEventsIDs: {
    ON_DATE_SELECT: string;
};
export { ComponentExposedAttributes, CustomEventsIDs, type OnDateSelectDetail };

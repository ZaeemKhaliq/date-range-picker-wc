import { EventName } from '@lit/react';
import { OnDateSelectDetail } from './constants';
import { DateRangePickerWc } from './date-range-picker-wc';
export { DateRangePickerWc };
export declare const DateRangePickerWcReact: import('@lit/react').ReactWebComponent<DateRangePickerWc, {
    onDateSelect: EventName<CustomEvent<OnDateSelectDetail>>;
}>;

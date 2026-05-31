import { LitElement, PropertyValues } from 'lit';
import { Ref } from 'lit/directives/ref.js';
export declare class DateRangePickerWc extends LitElement {
    static styles: import('lit').CSSResult[];
    calendarPopoverRef: Ref<HTMLElement>;
    _segmentDigits: string[];
    _activeSegmentIdx: number;
    _activeSegmentTypedCount: number;
    startDate?: string;
    endDate?: string;
    minDate?: string;
    maxDate?: string;
    labelFormatForDays: "ddd" | "d";
    rangePreviewBorderColor?: string;
    hideClearButton?: boolean;
    _currentSelectedDate: string;
    _mouseOveredDate?: string;
    _dateInputFieldElem: HTMLInputElement;
    _calendarGridDaysContainerElem: HTMLElement;
    _yearSelectorContainerPopoverElem: HTMLElement;
    private _emitCustomEvent;
    private _toLocalMidnight;
    get _parsedDates(): {
        startDate: Date | null;
        endDate: Date | null;
        minDate: Date | null;
        maxDate: Date | null;
        mouseOveredDate: Date | null;
    };
    get _currentSelectedDateDetails(): {
        currentYear: number;
        currentMonthIndex: number;
        currentDayNumber: number;
        currentSelectedYear: number;
        currentSelectedMonthIndex: number;
        currentSelectedMonthName: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
        startDayOfMonth: number;
        totalDaysInSelectedDate: number;
    };
    _moveToNextMonth(): void;
    _moveToPreviousMonth(): void;
    _buildInputValue(): string;
    _getSegmentIndex(cursorPos: number): number;
    _getFirstIncompleteSegmentIndex(): number;
    _setSelection(inputElem: HTMLInputElement, segIdx: number): void;
    _activateSegment(inputElem: HTMLInputElement, segIdx: number): void;
    _parseDateFromSegments(yearDigits: string, monthDigits: string, dayDigits: string): Date | null;
    _handleInputFocus(event: Event): void;
    _handleInputBlur(event: Event): void;
    _handleInputClick(event: MouseEvent): void;
    _handleInputKeydown(event: KeyboardEvent): void;
    protected willUpdate(_changedProperties: PropertyValues): void;
    updated(changedProperties: PropertyValues): void;
    _renderCurrentMonthGrid(): import('lit-html').TemplateResult<1>;
    _handleCalendarPopoverToggle(event: ToggleEvent): void;
    _onClearClick(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "date-range-picker-wc": DateRangePickerWc;
    }
}

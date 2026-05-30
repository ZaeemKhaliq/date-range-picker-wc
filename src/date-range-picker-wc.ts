import { LitElement, type PropertyValues, html, nothing, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { createRef, type Ref, ref } from "lit/directives/ref.js";

import {
  DayLabelFormatOptionToLabelMap,
  MonthIndexToMonthNameMap,
} from "./utils";
import { mainStyles } from "./mainStyles";
import { ComponentExposedAttributes } from "./constants";

const INPUT_PLACEHOLDER = "YYYY/MM/DD - YYYY/MM/DD";

// Character positions (start inclusive, end exclusive for setSelectionRange):
// YYYY/MM/DD - YYYY/MM/DD
// 0123/56/89   13 16/18 19/21 22
const SEGMENTS = [
  { start: 0, end: 4, length: 4, placeholder: "YYYY" },
  { start: 5, end: 7, length: 2, placeholder: "MM" },
  { start: 8, end: 10, length: 2, placeholder: "DD" },
  { start: 13, end: 17, length: 4, placeholder: "YYYY" },
  { start: 18, end: 20, length: 2, placeholder: "MM" },
  { start: 21, end: 23, length: 2, placeholder: "DD" },
];

@customElement("date-range-picker-wc")
export class DateRangePickerWc extends LitElement {
  static styles = [mainStyles];

  calendarPopoverRef: Ref<HTMLElement> = createRef();

  _segmentDigits: string[] = ["", "", "", "", "", ""];
  _activeSegmentIdx: number = -1;
  _activeSegmentTypedCount: number = 0;

  @property({ type: String, attribute: ComponentExposedAttributes.START_DATE })
  startDate?: string = undefined;

  @property({ type: String, attribute: ComponentExposedAttributes.END_DATE })
  endDate?: string = undefined;

  @property({
    type: String,
    attribute: ComponentExposedAttributes.LABEL_FORMAT_FOR_DAYS,
  })
  labelFormatForDays: "ddd" | "d" = "ddd";

  @property({
    type: String,
    attribute: ComponentExposedAttributes.RANGE_PREVIEW_BORDER_COLOR,
  })
  rangePreviewBorderColor?: string = "black";

  @property({
    type: Boolean,
    attribute: ComponentExposedAttributes.HIDE_CLEAR_BUTTON,
  })
  hideClearButton?: boolean = false;

  @state()
  _currentSelectedDate: string = this.startDate || new Date().toISOString();

  @state()
  _mouseOveredDate?: string = undefined;

  @query(".date-input-field")
  _dateInputFieldElem!: HTMLInputElement;

  @query("#calendar-grid-days-container")
  _calendarGridDaysContainerElem!: HTMLElement;

  @query("#year-selector-container")
  _yearSelectorContainerPopoverElem!: HTMLElement;

  private _emitCustomEvent({
    name,
    detail,
  }: {
    name: string;
    detail?: object;
  }) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail,
      }),
    );
  }

  get _currentSelectedDateDetails() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const currentDayNumber = currentDate.getDate();

    const currentSelectedDate = new Date(this._currentSelectedDate);
    const currentSelectedYear = currentSelectedDate.getFullYear();
    const currentSelectedMonthIndex = currentSelectedDate.getMonth();
    const currentSelectedMonthName =
      MonthIndexToMonthNameMap[
        currentSelectedMonthIndex as keyof typeof MonthIndexToMonthNameMap
      ];
    const startDayOfMonth = new Date(currentSelectedDate.setDate(1)).getDay();
    const totalDaysInSelectedDate = new Date(
      currentSelectedYear,
      currentSelectedMonthIndex + 1,
      0,
    ).getDate();

    return {
      currentYear,
      currentMonthIndex,
      currentDayNumber,

      currentSelectedYear,
      currentSelectedMonthIndex,
      currentSelectedMonthName,
      startDayOfMonth,
      totalDaysInSelectedDate,
    };
  }

  _moveToNextMonth() {
    const newDate = new Date(
      this._currentSelectedDateDetails.currentSelectedYear,
      this._currentSelectedDateDetails.currentSelectedMonthIndex + 1,
    );

    this._currentSelectedDate = newDate.toISOString();

    const calendarGridElem = this._calendarGridDaysContainerElem;
    if (calendarGridElem) {
      calendarGridElem.style.animation = "slide-left 0.15s ease-out";

      calendarGridElem.addEventListener(
        "animationend",
        () => {
          calendarGridElem.style.animation = "";
        },
        { once: true },
      );
    }
  }

  _moveToPreviousMonth() {
    const newDate = new Date(
      this._currentSelectedDateDetails.currentSelectedYear,
      this._currentSelectedDateDetails.currentSelectedMonthIndex - 1,
    );

    this._currentSelectedDate = newDate.toISOString();

    const calendarGridElem = this._calendarGridDaysContainerElem;
    if (calendarGridElem) {
      calendarGridElem.style.animation = "slide-right 0.15s ease-out";

      calendarGridElem.addEventListener(
        "animationend",
        () => {
          calendarGridElem.style.animation = "";
        },
        { once: true },
      );
    }
  }

  _buildInputValue(): string {
    const fmt = (digits: string, len: number, ph: string) =>
      digits.length ? digits.padStart(len, "0") : ph;
    const [sY, sM, sD, eY, eM, eD] = this._segmentDigits;
    return `${fmt(sY, 4, "YYYY")}/${fmt(sM, 2, "MM")}/${fmt(sD, 2, "DD")} - ${fmt(eY, 4, "YYYY")}/${fmt(eM, 2, "MM")}/${fmt(eD, 2, "DD")}`;
  }

  _getSegmentIndex(cursorPos: number): number {
    for (let i = 0; i < SEGMENTS.length; i++) {
      const seg = SEGMENTS[i];
      if (cursorPos >= seg.start && cursorPos < seg.end) return i;
    }
    // Cursor is in a separator — snap to the next segment
    for (let i = 0; i < SEGMENTS.length; i++) {
      if (cursorPos < SEGMENTS[i].start) return i;
    }
    return SEGMENTS.length - 1;
  }

  _getFirstIncompleteSegmentIndex(): number {
    for (let i = 0; i < SEGMENTS.length; i++) {
      if (this._segmentDigits[i].length < SEGMENTS[i].length) return i;
    }
    return 0;
  }

  // Just moves the visual selection — does NOT reset the typed-count.
  // Use this when staying on the same segment while typing.
  _setSelection(inputElem: HTMLInputElement, segIdx: number): void {
    const seg = SEGMENTS[segIdx];
    requestAnimationFrame(() => {
      inputElem.setSelectionRange(seg.start, seg.end);
    });
  }

  // Activates a segment for fresh entry: resets the typed-count so the next
  // keystroke starts the slot over from scratch (even if it already had digits).
  // Use this for all navigation: focus, click, arrow keys, and auto-advance.
  _activateSegment(inputElem: HTMLInputElement, segIdx: number): void {
    this._activeSegmentTypedCount = 0;
    this._activeSegmentIdx = segIdx;
    this._setSelection(inputElem, segIdx);
  }

  _parseDateFromSegments(
    yearDigits: string,
    monthDigits: string,
    dayDigits: string,
  ): Date | null {
    // YYYY must be exactly 4 typed digits to be unambiguous.
    // MM and DD accept any non-empty buffer — a single '5' means 05, same as typing '05'.
    if (
      yearDigits.length !== 4 ||
      monthDigits.length === 0 ||
      dayDigits.length === 0
    ) {
      return null;
    }
    const year = parseInt(yearDigits, 10);
    const month = parseInt(monthDigits, 10); // 1-based
    const day = parseInt(dayDigits, 10);

    if (year < 1000 || year > 9999) return null;
    if (month < 1 || month > 12) return null;
    if (day < 1) return null;

    // new Date(y, m-1, 0) gives the last day of the previous month,
    // so new Date(y, m, 0).getDate() = number of days in month m of year y
    const maxDay = new Date(year, month, 0).getDate();
    if (day > maxDay) return null;

    return new Date(year, month - 1, day);
  }

  _handleInputFocus(event: Event) {
    const inputElem = event.target as HTMLInputElement;
    if (!inputElem.value) {
      inputElem.value = this._buildInputValue();
    }
    this._activateSegment(inputElem, this._getFirstIncompleteSegmentIndex());
  }

  _handleInputBlur(event: Event) {
    const inputElem = event.target as HTMLInputElement;

    const [sY, sM, sD, eY, eM, eD] = this._segmentDigits;
    const parsedStart = this._parseDateFromSegments(sY, sM, sD);
    let parsedEnd = this._parseDateFromSegments(eY, eM, eD);

    // Enforce end strictly after start; nudge end to start + 1 day if violated
    if (parsedStart && parsedEnd && parsedEnd <= parsedStart) {
      parsedEnd = new Date(parsedStart);
      parsedEnd.setDate(parsedEnd.getDate() + 1);
      this._segmentDigits[3] = String(parsedEnd.getFullYear());
      this._segmentDigits[4] = String(parsedEnd.getMonth() + 1).padStart(
        2,
        "0",
      );
      this._segmentDigits[5] = String(parsedEnd.getDate()).padStart(2, "0");
    }

    // Clear segments for any invalid date directly — cannot rely on updated()
    // when the property was already undefined, because assigning undefined→undefined
    // is not a change and Lit will not call updated(), leaving invalid text on screen.
    if (!parsedStart) {
      this._segmentDigits[0] = "";
      this._segmentDigits[1] = "";
      this._segmentDigits[2] = "";
    }
    if (!parsedEnd) {
      this._segmentDigits[3] = "";
      this._segmentDigits[4] = "";
      this._segmentDigits[5] = "";
    }

    const anyDigits = this._segmentDigits.some((d) => d.length > 0);
    inputElem.value = anyDigits ? this._buildInputValue() : "";

    this.startDate = parsedStart ? parsedStart.toISOString() : undefined;
    this.endDate = parsedEnd ? parsedEnd.toISOString() : undefined;
  }

  _handleInputClick(event: MouseEvent) {
    const inputElem = event.target as HTMLInputElement;
    if (!inputElem.value) return;
    const cursorPos = inputElem.selectionStart ?? 0;
    this._activateSegment(inputElem, this._getSegmentIndex(cursorPos));
  }

  _handleInputKeydown(event: KeyboardEvent) {
    if (event.key === "Tab") return;

    const inputElem = event.target as HTMLInputElement;
    const cursorPos = inputElem.selectionStart ?? 0;
    const segIdx = this._getSegmentIndex(cursorPos);

    if (/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      const seg = SEGMENTS[segIdx];

      // Fresh entry (segment just activated): replace buffer instead of shifting.
      // This ensures every focus/navigation always demands a full seg.length digits.
      if (this._activeSegmentTypedCount === 0) {
        this._segmentDigits[segIdx] = event.key;
      } else {
        this._segmentDigits[segIdx] = (
          this._segmentDigits[segIdx] + event.key
        ).slice(-seg.length);
      }
      this._activeSegmentTypedCount++;
      inputElem.value = this._buildInputValue();

      if (this._activeSegmentTypedCount >= seg.length) {
        if (segIdx < SEGMENTS.length - 1) {
          this._activateSegment(inputElem, segIdx + 1); // advance; resets count
        } else {
          this._setSelection(inputElem, segIdx); // last segment, stay
        }
      } else {
        this._setSelection(inputElem, segIdx); // not full yet, stay without resetting count
      }
    } else if (event.key === "Backspace") {
      event.preventDefault();
      if (this._activeSegmentTypedCount > 0) {
        this._segmentDigits[segIdx] = this._segmentDigits[segIdx].slice(0, -1);
        this._activeSegmentTypedCount--;
        inputElem.value = this._buildInputValue();
        this._setSelection(inputElem, segIdx);
      } else if (segIdx > 0) {
        this._activateSegment(inputElem, segIdx - 1);
      } else {
        this._setSelection(inputElem, segIdx);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      this._activateSegment(inputElem, Math.max(0, segIdx - 1));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      this._activateSegment(
        inputElem,
        Math.min(SEGMENTS.length - 1, segIdx + 1),
      );
    } else {
      event.preventDefault();
    }
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);

    const handleInvalidLabelFormatForDaysValue = () => {
      const isLabelFormatForDaysUpdated =
        _changedProperties.has("labelFormatForDays");
      if (!isLabelFormatForDaysUpdated) {
        return;
      }

      const isInvalidValue = !Object.keys(
        DayLabelFormatOptionToLabelMap,
      ).includes(this.labelFormatForDays);
      if (isInvalidValue) {
        this.labelFormatForDays = "ddd";
      }
    };
    handleInvalidLabelFormatForDaysValue();
  }

  updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    const hasStart = changedProperties.has("startDate");
    const hasEnd = changedProperties.has("endDate");
    if (!hasStart && !hasEnd) return;

    if (hasStart) {
      if (this.startDate) {
        const d = new Date(this.startDate);
        this._segmentDigits[0] = String(d.getFullYear());
        this._segmentDigits[1] = String(d.getMonth() + 1).padStart(2, "0");
        this._segmentDigits[2] = String(d.getDate()).padStart(2, "0");

        this._currentSelectedDate = this.startDate;
      } else {
        this._segmentDigits[0] = "";
        this._segmentDigits[1] = "";
        this._segmentDigits[2] = "";
      }
    }

    if (hasEnd) {
      if (this.endDate) {
        const d = new Date(this.endDate);
        this._segmentDigits[3] = String(d.getFullYear());
        this._segmentDigits[4] = String(d.getMonth() + 1).padStart(2, "0");
        this._segmentDigits[5] = String(d.getDate()).padStart(2, "0");
      } else {
        this._segmentDigits[3] = "";
        this._segmentDigits[4] = "";
        this._segmentDigits[5] = "";
      }
    }

    if (!this._dateInputFieldElem) return;

    const anyDigits = this._segmentDigits.some((d) => d.length > 0);
    this._dateInputFieldElem.value = anyDigits ? this._buildInputValue() : "";
  }

  _renderCurrentMonthGrid() {
    const { currentDayNumber, startDayOfMonth, totalDaysInSelectedDate } =
      this._currentSelectedDateDetails;

    return html`
      <div class="calendar-grid-wrapper">
        <div class="calendar-grid">
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${DayLabelFormatOptionToLabelMap[this.labelFormatForDays].MONDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${DayLabelFormatOptionToLabelMap[this.labelFormatForDays].TUESDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${DayLabelFormatOptionToLabelMap[this.labelFormatForDays].WEDNESDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${DayLabelFormatOptionToLabelMap[this.labelFormatForDays].THURSDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${DayLabelFormatOptionToLabelMap[this.labelFormatForDays].FRIDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${DayLabelFormatOptionToLabelMap[this.labelFormatForDays].SATURDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${DayLabelFormatOptionToLabelMap[this.labelFormatForDays].SUNDAY}
          </div>
        </div>

        <div id="calendar-grid-days-container" class="calendar-grid">
          ${Array.from({
            length: startDayOfMonth === 0 ? 6 : startDayOfMonth - 1,
          }).map(() => {
            return html`
              <div class="calendar-grid-cell calendar-grid-cell--empty"></div>
            `;
          })}
          ${Array.from({ length: totalDaysInSelectedDate }).map(
            (_value, index) => {
              const dayNumber = index + 1;
              const currentCellDate = new Date(
                this._currentSelectedDateDetails.currentSelectedYear,
                this._currentSelectedDateDetails.currentSelectedMonthIndex,
                dayNumber,
              );
              const mouseOveredDateInDateFormat = this._mouseOveredDate
                ? new Date(this._mouseOveredDate)
                : null;
              const startDateInDateFormat = this.startDate
                ? new Date(this.startDate)
                : null;
              const endDateInDateFormat = this.endDate
                ? new Date(this.endDate)
                : null;

              const isCurrentCellDateTodaysDate =
                currentDayNumber === dayNumber &&
                this._currentSelectedDateDetails.currentMonthIndex ===
                  this._currentSelectedDateDetails.currentSelectedMonthIndex &&
                this._currentSelectedDateDetails.currentSelectedYear ===
                  this._currentSelectedDateDetails.currentYear;
              const isCurrentCellDateSelected = (() => {
                if (!this.startDate && !this.endDate) {
                  return false;
                }

                const startDate = startDateInDateFormat;
                const startDateYear = startDate?.getFullYear?.();
                const startDateMonthIndex = startDate?.getMonth?.();
                const startDateDay = startDate?.getDate?.();

                const endDate = endDateInDateFormat;
                const endDateYear = endDate?.getFullYear?.();
                const endDateMonthIndex = endDate?.getMonth?.();
                const endDateDay = endDate?.getDate?.();

                const isStartDateSelected =
                  startDateYear ===
                    this._currentSelectedDateDetails.currentSelectedYear &&
                  startDateMonthIndex ===
                    this._currentSelectedDateDetails
                      .currentSelectedMonthIndex &&
                  dayNumber === startDateDay;

                const isEndDateSelected =
                  endDateYear ===
                    this._currentSelectedDateDetails.currentSelectedYear &&
                  endDateMonthIndex ===
                    this._currentSelectedDateDetails
                      .currentSelectedMonthIndex &&
                  dayNumber === endDateDay;

                return isStartDateSelected || isEndDateSelected;
              })();
              const isCurrentCellDateStartDate =
                currentCellDate.getTime() ===
                startDateInDateFormat?.getTime?.();
              const isCurrentCellDateEndDate =
                currentCellDate.getTime() === endDateInDateFormat?.getTime?.();
              const isCurrentCellDateFirstCellOfRow =
                currentCellDate.getDay() === 1;
              const isCurrentCellDateLastCellOfRow =
                currentCellDate.getDay() === 0;
              const isCurrentCellDateStartOfPreviewRange = (() => {
                if (startDateInDateFormat && endDateInDateFormat) {
                  if (!mouseOveredDateInDateFormat) {
                    return false;
                  }

                  if (mouseOveredDateInDateFormat > endDateInDateFormat) {
                    return (
                      currentCellDate.getTime() ===
                      endDateInDateFormat.getTime()
                    );
                  }

                  if (mouseOveredDateInDateFormat < startDateInDateFormat) {
                    return (
                      currentCellDate.getTime() ===
                      mouseOveredDateInDateFormat.getTime()
                    );
                  }
                }

                if (!startDateInDateFormat) return false;
                return (
                  currentCellDate.getTime() === startDateInDateFormat.getTime()
                );
              })();
              const isCurrentCellDateEndOfPreviewRange = (() => {
                if (!mouseOveredDateInDateFormat) {
                  return false;
                }

                if (startDateInDateFormat && endDateInDateFormat) {
                  if (mouseOveredDateInDateFormat > endDateInDateFormat) {
                    return (
                      currentCellDate.getTime() ===
                      mouseOveredDateInDateFormat.getTime()
                    );
                  }

                  if (mouseOveredDateInDateFormat < startDateInDateFormat) {
                    return (
                      currentCellDate.getTime() ===
                      startDateInDateFormat.getTime()
                    );
                  }
                }

                return (
                  currentCellDate.getTime() ===
                  mouseOveredDateInDateFormat.getTime()
                );
              })();

              const isCurrentCellBetweenSelectedStartAndEndDate = (() => {
                if (!startDateInDateFormat || !endDateInDateFormat) {
                  return false;
                }

                return (
                  currentCellDate >= startDateInDateFormat &&
                  currentCellDate <= endDateInDateFormat
                );
              })();

              const enableMouseOverCellsHighlight = (() => {
                if (!mouseOveredDateInDateFormat || !startDateInDateFormat) {
                  return false;
                }

                if (startDateInDateFormat && endDateInDateFormat) {
                  if (mouseOveredDateInDateFormat > endDateInDateFormat) {
                    return (
                      currentCellDate >= endDateInDateFormat &&
                      currentCellDate <= mouseOveredDateInDateFormat
                    );
                  }

                  if (mouseOveredDateInDateFormat < startDateInDateFormat) {
                    return (
                      currentCellDate <= startDateInDateFormat &&
                      currentCellDate >= mouseOveredDateInDateFormat
                    );
                  }

                  return false;
                }

                if (!startDateInDateFormat) {
                  return false;
                }
                if (mouseOveredDateInDateFormat > startDateInDateFormat) {
                  return (
                    currentCellDate >= startDateInDateFormat &&
                    currentCellDate <= mouseOveredDateInDateFormat
                  );
                }

                return false;
              })();

              const onCellClick = () => {
                const selectedDateToSet = new Date(
                  this._currentSelectedDateDetails.currentSelectedYear,
                  this._currentSelectedDateDetails.currentSelectedMonthIndex,
                  dayNumber,
                );
                const selectedDateToSetISO = selectedDateToSet.toISOString();

                if (startDateInDateFormat && endDateInDateFormat) {
                  if (isCurrentCellBetweenSelectedStartAndEndDate) {
                    this.startDate = selectedDateToSetISO;
                    this.endDate = undefined;

                    this._emitCustomEvent({
                      name: "date-range-picker-wc:on-date-select",
                      detail: {
                        startDate: selectedDateToSetISO,
                        endDate: null,
                      },
                    });
                    return;
                  }

                  if (selectedDateToSet < startDateInDateFormat) {
                    this.startDate = selectedDateToSetISO;

                    this._emitCustomEvent({
                      name: "date-range-picker-wc:on-date-select",
                      detail: {
                        startDate: selectedDateToSetISO,
                        endDate: this.endDate,
                      },
                    });

                    return;
                  }

                  if (selectedDateToSet > endDateInDateFormat) {
                    this.endDate = selectedDateToSetISO;

                    this._emitCustomEvent({
                      name: "date-range-picker-wc:on-date-select",
                      detail: {
                        endDate: selectedDateToSetISO,
                        startDate: this.startDate,
                      },
                    });
                    return;
                  }
                }

                if (!startDateInDateFormat) {
                  this.startDate = selectedDateToSetISO;

                  this._emitCustomEvent({
                    name: "date-range-picker-wc:on-date-select",
                    detail: {
                      startDate: selectedDateToSetISO,
                      endDate: this.endDate,
                    },
                  });

                  return;
                }

                if (selectedDateToSet < startDateInDateFormat) {
                  this.startDate = selectedDateToSetISO;

                  this._emitCustomEvent({
                    name: "date-range-picker-wc:on-date-select",
                    detail: {
                      startDate: selectedDateToSetISO,
                      endDate: this.endDate,
                    },
                  });
                  return;
                }

                this.endDate = selectedDateToSetISO;

                this._emitCustomEvent({
                  name: "date-range-picker-wc:on-date-select",
                  detail: {
                    startDate: this.startDate,
                    endDate: selectedDateToSetISO,
                  },
                });
              };

              const onCellMouseOver = () => {
                this._mouseOveredDate = currentCellDate.toISOString();
              };
              const onCellMouseOut = () => {
                this._mouseOveredDate = undefined;
              };

              return html`
                <div
                  part=${`calendar-date-cell${isCurrentCellDateSelected ? " calendar-grid-cell--selected" : ""}${isCurrentCellBetweenSelectedStartAndEndDate ? " calendar-date-cell--highlighted" : ""}`}
                  class=${classMap({
                    "calendar-grid-cell": true,
                    "calendar-grid-cell--current-day":
                      isCurrentCellDateTodaysDate,
                    "calendar-grid-cell--selected": isCurrentCellDateSelected,
                    "calendar-date-cell--highlighted":
                      isCurrentCellBetweenSelectedStartAndEndDate,
                    "calendar-date-cell--highlighted-row-cell-first":
                      isCurrentCellBetweenSelectedStartAndEndDate &&
                      (isCurrentCellDateFirstCellOfRow ||
                        isCurrentCellDateStartDate),
                    "calendar-date-cell--highlighted-row-cell-last":
                      isCurrentCellBetweenSelectedStartAndEndDate &&
                      (isCurrentCellDateLastCellOfRow ||
                        isCurrentCellDateEndDate),
                    "calendar-date-cell--preview-range":
                      enableMouseOverCellsHighlight,
                    "calendar-date-cell--preview-range-row-cell-first":
                      enableMouseOverCellsHighlight &&
                      (isCurrentCellDateFirstCellOfRow ||
                        isCurrentCellDateStartOfPreviewRange),
                    "calendar-date-cell--preview-range-row-cell-last":
                      enableMouseOverCellsHighlight &&
                      (isCurrentCellDateLastCellOfRow ||
                        isCurrentCellDateEndOfPreviewRange),
                  })}
                  @click=${onCellClick}
                  @mouseover=${onCellMouseOver}
                  @mouseout=${onCellMouseOut}
                  tabindex="0"
                  @keydown=${(event: KeyboardEvent) => {
                    console.log({ event });
                    if (["Space", "Enter"].includes(event?.code)) {
                      onCellClick();
                    }
                  }}
                >
                  ${dayNumber}
                </div>
              `;
            },
          )}
        </div>
      </div>
    `;
  }

  _handleCalendarPopoverToggle(event: ToggleEvent) {
    const isClosed = event?.newState === "closed";

    if (isClosed) {
      this._currentSelectedDate = this.startDate || new Date().toISOString();
    }
  }

  _onClearClick() {
    this.startDate = undefined;
    this.endDate = undefined;

    this._emitCustomEvent({
      name: "date-range-picker-wc:on-date-select",
      detail: {
        startDate: this.startDate,
        endDate: this.endDate,
      },
    });
  }

  render() {
    return html`
      <style>
        .calendar-date-cell--preview-range {
          position: relative;
        }
        .calendar-date-cell--preview-range::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-top: 1px dashed ${unsafeCSS(this.rangePreviewBorderColor)};
          border-bottom: 1px dashed ${unsafeCSS(this.rangePreviewBorderColor)};
        }
        .calendar-date-cell--preview-range-row-cell-first::before {
          border-left: 1px dashed ${unsafeCSS(this.rangePreviewBorderColor)};
          border-top-left-radius: 1.5rem;
          border-bottom-left-radius: 1.5rem;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
        .calendar-date-cell--preview-range-row-cell-last::before {
          border-right: 1px dashed ${unsafeCSS(this.rangePreviewBorderColor)};
          border-top-right-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
        }
      </style>

      <div>
        <div class="input-container" part="input-container">
          <slot name="input-field">
            <input
              type="text"
              inputmode="numeric"
              class="date-input-field"
              part="date-input-field"
              placeholder=${INPUT_PLACEHOLDER}
              @focus=${this._handleInputFocus}
              @blur=${this._handleInputBlur}
              @click=${this._handleInputClick}
              @keydown=${this._handleInputKeydown}
            />
          </slot>

          <button class="calendar-icon-button" popovertarget="calendar-popover">
            <slot name="calendar-trigger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path
                  d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"
                />
              </svg>
            </slot>
          </button>
        </div>

        <div
          ${ref(this.calendarPopoverRef)}
          id="calendar-popover"
          class="calendar-popover"
          popover
          @toggle=${this._handleCalendarPopoverToggle}
        >
          <slot name="left-sidebar"> </slot>

          <div>
            <div class="calendar-header" part="calendar-header">
              <slot
                name="step-to-previous-month-button"
                @click=${this._moveToPreviousMonth}
              >
                <button class="calendar-month-change-icon-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                  >
                    <path
                      d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"
                    />
                  </svg>
                </button>
              </slot>

              <div style="display:flex; align-items:center;gap:0.5rem;">
                <p>
                  ${this._currentSelectedDateDetails.currentSelectedMonthName}
                </p>

                <button
                  class="year-button"
                  popovertarget="year-selector-container"
                  @click=${() => {
                    setTimeout(() => {
                      const yearsContainerElem =
                        this.shadowRoot?.querySelector(".years-container");
                      const yearOptionElem = yearsContainerElem?.querySelector(
                        `.year-option--${this._currentSelectedDateDetails.currentSelectedYear}`,
                      ) as HTMLElement;

                      if (yearsContainerElem) {
                        yearsContainerElem.scrollTop = yearOptionElem?.offsetTop
                          ? yearOptionElem?.offsetTop - 50
                          : 0;
                      }
                    }, 0);
                  }}
                >
                  ${this._currentSelectedDateDetails.currentSelectedYear}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                  >
                    <path
                      d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
                    />
                  </svg>
                </button>

                <div id="year-selector-container" popover>
                  <div class="years-container">
                    ${Array.from({ length: 2999 - 1800 }).map(
                      (_value, index) => {
                        const yearValue = 1800 + index;
                        const isSelected =
                          String(yearValue) ===
                          String(
                            this._currentSelectedDateDetails
                              .currentSelectedYear,
                          );

                        return html`
                          <button
                            class=${`year-option year-option--${yearValue}${isSelected ? " year-option--selected" : ""}`}
                            @click=${() => {
                              const newDateToSet = new Date(
                                yearValue,
                                this._currentSelectedDateDetails
                                  .currentSelectedMonthIndex,
                                this._currentSelectedDateDetails
                                  .currentDayNumber,
                              );

                              this._currentSelectedDate =
                                newDateToSet.toISOString();

                              if (this._yearSelectorContainerPopoverElem) {
                                this._yearSelectorContainerPopoverElem.hidePopover();
                              }
                            }}
                          >
                            ${yearValue}
                          </button>
                        `;
                      },
                    )}
                  </div>
                </div>
              </div>

              <slot
                name="step-to-next-month-button"
                @click=${this._moveToNextMonth}
              >
                <button class="calendar-month-change-icon-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                  >
                    <path
                      d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"
                    />
                  </svg>
                </button>
              </slot>
            </div>

            <div class="calendar-main">${this._renderCurrentMonthGrid()}</div>

            ${this.hideClearButton
              ? nothing
              : html`
                  <div class="clear-button-container">
                    <button
                      class="clear-selections-button"
                      ?disabled=${!this.startDate && !this.endDate}
                      @click=${this._onClearClick}
                    >
                      Clear
                    </button>
                  </div>
                `}

            <slot name="calendar-footer"></slot>
          </div>

          <slot name="right-sidebar"> </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "date-range-picker-wc": DateRangePickerWc;
  }
}

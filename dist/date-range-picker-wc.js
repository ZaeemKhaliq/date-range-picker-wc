import e from "react";
import { createComponent as t } from "@lit/react";
import { LitElement as n, css as r, html as i, nothing as a, unsafeCSS as o } from "lit";
import { customElement as s, property as c, query as l, state as u } from "lit/decorators.js";
import { classMap as d } from "lit/directives/class-map.js";
import { createRef as f, ref as p } from "lit/directives/ref.js";
//#region src/constants.ts
var m = {
	START_DATE: "start-date",
	END_DATE: "end-date",
	LABEL_FORMAT_FOR_DAYS: "label-format-for-days",
	RANGE_PREVIEW_BORDER_COLOR: "range-preview-border-color",
	HIDE_CLEAR_BUTTON: "hide-clear-button"
}, h = { ON_DATE_SELECT: "date-range-picker-wc:on-date-select" }, g = {
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
	11: "December"
}, _ = {
	d: {
		MONDAY: "M",
		TUESDAY: "T",
		WEDNESDAY: "W",
		THURSDAY: "T",
		FRIDAY: "F",
		SATURDAY: "S",
		SUNDAY: "S"
	},
	ddd: {
		MONDAY: "Mon",
		TUESDAY: "Tue",
		WEDNESDAY: "Wed",
		THURSDAY: "Thu",
		FRIDAY: "Fri",
		SATURDAY: "Sat",
		SUNDAY: "Sun"
	}
}, v = r`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif, serif;
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: max-content;
    border: 1px solid black;
    border-radius: 0.25rem;
    padding-inline: 8px;
    margin-left: 5rem;
  }

  .date-input-field {
    border: none;
    outline: none;
    min-width: 15rem;
    font-size: 0.875rem;
  }

  .calendar-icon-button {
    all: unset;
    display: flex;
    padding: 6px;
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .calendar-icon-button:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .calendar-popover {
    border-radius: 0.5rem;
    width: max-content;
    box-shadow:
      0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14),
      0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border: none;
    padding: 8px;
    overflow: hidden;
  }
  .calendar-popover:popover-open {
    display: flex;
  }

  #calendar-popover {
    margin: 0;
    inset: auto;
    top: calc(anchor(bottom) + 0.5rem);
    justify-self: anchor-center;
    position-try-fallbacks: flip-block, flip-inline;
    opacity: 0;
    transition: all 0.2s allow-discrete;
  }
  #calendar-popover:popover-open {
    opacity: 1;
  }

  @starting-style {
    #calendar-popover:popover-open {
      opacity: 0;
    }
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .year-button {
    all: unset;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid transparent;
  }
  .year-button:focus {
    border: 1px solid black;
  }

  #year-selector-container {
    top: anchor(bottom);
    left: anchor(left);
    border: 1px solid silver;
    padding: 8px 0px;
  }

  .years-container {
    display: flex;
    flex-direction: column;
    max-height: 20rem;
    overflow-y: auto;
    gap: 0.25rem;
  }

  .year-option {
    all: unset;
    padding: 8px;
    cursor: pointer;
    transition: all 0.1s ease;
    border: 1px solid transparent;
  }
  .year-option:focus {
    border: 1px solid black;
  }
  .year-option:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
  .year-option--selected {
    background-color: rgba(0, 0, 0, 0.15);
  }

  .calendar-month-change-icon-container {
    all: unset;
    border: 1px solid transparent;
    border-radius: 100%;
    height: 2.5rem;
    width: 2.5rem;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .calendar-month-change-icon-container:focus {
    border: 1px solid black;
  }
  .calendar-month-change-icon-container:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .calendar-grid-wrapper {
    max-width: 21.875rem;
    height: 19.375rem;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 0.25rem;
    /* animation: slide-in 0.15s linear; */
  }

  #calendar-grid-days-container {
  }

  .calendar-grid-cell {
    height: 2.5rem;
    width: 2.5rem;
    font-size: 0.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    transition: all 0.15s ease;
  }
  .calendar-grid-cell:focus {
    border: 1px solid black;
  }
  .calendar-grid-cell:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .calendar-grid-cell--empty,
  .calendar-grid-cell--column-cell {
    pointer-events: none;
  }
  .calendar-grid-cell--column-cell {
    font-weight: 700;
  }
  .calendar-grid-cell--current-day {
    border: 1px solid black;
    border-radius: 100%;
  }
  .calendar-grid-cell--selected {
    background-color: grey;
    color: white;
  }
  .calendar-grid-cell--selected:hover {
    background-color: grey;
  }
  .calendar-date-cell--highlighted {
    position: relative;
    /* background-color: rgba(0, 0, 0, 0.15); */
  }
  .calendar-date-cell--highlighted::before {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.15);
    height: 100%;
    width: 100%;
  }
  .calendar-date-cell--highlighted-row-cell-first::before {
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
  }
  .calendar-date-cell--highlighted-row-cell-last::before {
    border-top-right-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
  }

  .clear-button-container {
    padding: 8px;
    display: flex;
  }

  .clear-selections-button {
    all: unset;
    color: black;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.875rem;
  }
  .clear-selections-button:focus {
    border: 1px solid black;
  }
  .clear-selections-button:disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  @keyframes slide-left {
    0% {
      transform: translateX(0%);
    }

    49% {
      transform: translateX(-100%);
    }

    50% {
      opacity: 0;
      transform: translateX(100%);
    }

    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }

  @keyframes slide-right {
    0% {
      transform: translateX(0%);
    }

    49% {
      transform: translateX(100%);
    }

    50% {
      opacity: 0;
      transform: translateX(-100%);
    }

    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
`;
//#endregion
//#region \0@oxc-project+runtime@0.132.0/helpers/decorate.js
function y(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/date-range-picker-wc.ts
var b = "YYYY/MM/DD - YYYY/MM/DD", x = [
	{
		start: 0,
		end: 4,
		length: 4,
		placeholder: "YYYY"
	},
	{
		start: 5,
		end: 7,
		length: 2,
		placeholder: "MM"
	},
	{
		start: 8,
		end: 10,
		length: 2,
		placeholder: "DD"
	},
	{
		start: 13,
		end: 17,
		length: 4,
		placeholder: "YYYY"
	},
	{
		start: 18,
		end: 20,
		length: 2,
		placeholder: "MM"
	},
	{
		start: 21,
		end: 23,
		length: 2,
		placeholder: "DD"
	}
], S = class extends n {
	constructor(...e) {
		super(...e), this.calendarPopoverRef = f(), this._segmentDigits = [
			"",
			"",
			"",
			"",
			"",
			""
		], this._activeSegmentIdx = -1, this._activeSegmentTypedCount = 0, this.startDate = void 0, this.endDate = void 0, this.labelFormatForDays = "ddd", this.rangePreviewBorderColor = "black", this.hideClearButton = !1, this._currentSelectedDate = this.startDate || (/* @__PURE__ */ new Date()).toISOString(), this._mouseOveredDate = void 0;
	}
	static {
		this.styles = [v];
	}
	_emitCustomEvent({ name: e, detail: t }) {
		this.dispatchEvent(new CustomEvent(e, {
			bubbles: !0,
			composed: !0,
			detail: t
		}));
	}
	get _currentSelectedDateDetails() {
		let e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = e.getMonth(), r = e.getDate(), i = new Date(this._currentSelectedDate), a = i.getFullYear(), o = i.getMonth();
		return {
			currentYear: t,
			currentMonthIndex: n,
			currentDayNumber: r,
			currentSelectedYear: a,
			currentSelectedMonthIndex: o,
			currentSelectedMonthName: g[o],
			startDayOfMonth: new Date(i.setDate(1)).getDay(),
			totalDaysInSelectedDate: new Date(a, o + 1, 0).getDate()
		};
	}
	_moveToNextMonth() {
		let e = new Date(this._currentSelectedDateDetails.currentSelectedYear, this._currentSelectedDateDetails.currentSelectedMonthIndex + 1);
		this._currentSelectedDate = e.toISOString();
		let t = this._calendarGridDaysContainerElem;
		t && (t.style.animation = "slide-left 0.15s ease-out", t.addEventListener("animationend", () => {
			t.style.animation = "";
		}, { once: !0 }));
	}
	_moveToPreviousMonth() {
		let e = new Date(this._currentSelectedDateDetails.currentSelectedYear, this._currentSelectedDateDetails.currentSelectedMonthIndex - 1);
		this._currentSelectedDate = e.toISOString();
		let t = this._calendarGridDaysContainerElem;
		t && (t.style.animation = "slide-right 0.15s ease-out", t.addEventListener("animationend", () => {
			t.style.animation = "";
		}, { once: !0 }));
	}
	_buildInputValue() {
		let e = (e, t, n) => e.length ? e.padStart(t, "0") : n, [t, n, r, i, a, o] = this._segmentDigits;
		return `${e(t, 4, "YYYY")}/${e(n, 2, "MM")}/${e(r, 2, "DD")} - ${e(i, 4, "YYYY")}/${e(a, 2, "MM")}/${e(o, 2, "DD")}`;
	}
	_getSegmentIndex(e) {
		for (let t = 0; t < x.length; t++) {
			let n = x[t];
			if (e >= n.start && e < n.end) return t;
		}
		for (let t = 0; t < x.length; t++) if (e < x[t].start) return t;
		return x.length - 1;
	}
	_getFirstIncompleteSegmentIndex() {
		for (let e = 0; e < x.length; e++) if (this._segmentDigits[e].length < x[e].length) return e;
		return 0;
	}
	_setSelection(e, t) {
		let n = x[t];
		requestAnimationFrame(() => {
			e.setSelectionRange(n.start, n.end);
		});
	}
	_activateSegment(e, t) {
		this._activeSegmentTypedCount = 0, this._activeSegmentIdx = t, this._setSelection(e, t);
	}
	_parseDateFromSegments(e, t, n) {
		if (e.length !== 4 || t.length === 0 || n.length === 0) return null;
		let r = parseInt(e, 10), i = parseInt(t, 10), a = parseInt(n, 10);
		return r < 1e3 || r > 9999 || i < 1 || i > 12 || a < 1 || a > new Date(r, i, 0).getDate() ? null : new Date(r, i - 1, a);
	}
	_handleInputFocus(e) {
		let t = e.target;
		t.value ||= this._buildInputValue(), this._activateSegment(t, this._getFirstIncompleteSegmentIndex());
	}
	_handleInputBlur(e) {
		let t = e.target, [n, r, i, a, o, s] = this._segmentDigits, c = this._parseDateFromSegments(n, r, i), l = this._parseDateFromSegments(a, o, s);
		c && l && l <= c && (l = new Date(c), l.setDate(l.getDate() + 1), this._segmentDigits[3] = String(l.getFullYear()), this._segmentDigits[4] = String(l.getMonth() + 1).padStart(2, "0"), this._segmentDigits[5] = String(l.getDate()).padStart(2, "0")), c || (this._segmentDigits[0] = "", this._segmentDigits[1] = "", this._segmentDigits[2] = ""), l || (this._segmentDigits[3] = "", this._segmentDigits[4] = "", this._segmentDigits[5] = ""), t.value = this._segmentDigits.some((e) => e.length > 0) ? this._buildInputValue() : "", this.startDate = c ? c.toISOString() : void 0, this.endDate = l ? l.toISOString() : void 0;
	}
	_handleInputClick(e) {
		let t = e.target;
		if (!t.value) return;
		let n = t.selectionStart ?? 0;
		this._activateSegment(t, this._getSegmentIndex(n));
	}
	_handleInputKeydown(e) {
		if (e.key === "Tab") return;
		let t = e.target, n = t.selectionStart ?? 0, r = this._getSegmentIndex(n);
		if (/^[0-9]$/.test(e.key)) {
			e.preventDefault();
			let n = x[r];
			this._activeSegmentTypedCount === 0 ? this._segmentDigits[r] = e.key : this._segmentDigits[r] = (this._segmentDigits[r] + e.key).slice(-n.length), this._activeSegmentTypedCount++, t.value = this._buildInputValue(), this._activeSegmentTypedCount >= n.length && r < x.length - 1 ? this._activateSegment(t, r + 1) : this._setSelection(t, r);
		} else e.key === "Backspace" ? (e.preventDefault(), this._activeSegmentTypedCount > 0 ? (this._segmentDigits[r] = this._segmentDigits[r].slice(0, -1), this._activeSegmentTypedCount--, t.value = this._buildInputValue(), this._setSelection(t, r)) : r > 0 ? this._activateSegment(t, r - 1) : this._setSelection(t, r)) : e.key === "ArrowLeft" ? (e.preventDefault(), this._activateSegment(t, Math.max(0, r - 1))) : e.key === "ArrowRight" ? (e.preventDefault(), this._activateSegment(t, Math.min(x.length - 1, r + 1))) : e.preventDefault();
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("labelFormatForDays") && (Object.keys(_).includes(this.labelFormatForDays) || (this.labelFormatForDays = "ddd"));
	}
	updated(e) {
		super.updated(e);
		let t = e.has("startDate"), n = e.has("endDate");
		if (!t && !n) return;
		if (t) if (this.startDate) {
			let e = new Date(this.startDate);
			this._segmentDigits[0] = String(e.getFullYear()), this._segmentDigits[1] = String(e.getMonth() + 1).padStart(2, "0"), this._segmentDigits[2] = String(e.getDate()).padStart(2, "0"), this._currentSelectedDate = this.startDate;
		} else this._segmentDigits[0] = "", this._segmentDigits[1] = "", this._segmentDigits[2] = "";
		if (n) if (this.endDate) {
			let e = new Date(this.endDate);
			this._segmentDigits[3] = String(e.getFullYear()), this._segmentDigits[4] = String(e.getMonth() + 1).padStart(2, "0"), this._segmentDigits[5] = String(e.getDate()).padStart(2, "0");
		} else this._segmentDigits[3] = "", this._segmentDigits[4] = "", this._segmentDigits[5] = "";
		if (!this._dateInputFieldElem) return;
		let r = this._segmentDigits.some((e) => e.length > 0);
		this._dateInputFieldElem.value = r ? this._buildInputValue() : "";
	}
	_renderCurrentMonthGrid() {
		let { currentDayNumber: e, startDayOfMonth: t, totalDaysInSelectedDate: n } = this._currentSelectedDateDetails;
		return i`
      <div class="calendar-grid-wrapper">
        <div class="calendar-grid">
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${_[this.labelFormatForDays].MONDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${_[this.labelFormatForDays].TUESDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${_[this.labelFormatForDays].WEDNESDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${_[this.labelFormatForDays].THURSDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${_[this.labelFormatForDays].FRIDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${_[this.labelFormatForDays].SATURDAY}
          </div>
          <div class="calendar-grid-cell calendar-grid-cell--column-cell">
            ${_[this.labelFormatForDays].SUNDAY}
          </div>
        </div>

        <div id="calendar-grid-days-container" class="calendar-grid">
          ${Array.from({ length: t === 0 ? 6 : t - 1 }).map(() => i`
              <div class="calendar-grid-cell calendar-grid-cell--empty"></div>
            `)}
          ${Array.from({ length: n }).map((t, n) => {
			let r = n + 1, a = new Date(this._currentSelectedDateDetails.currentSelectedYear, this._currentSelectedDateDetails.currentSelectedMonthIndex, r), o = this._mouseOveredDate ? new Date(this._mouseOveredDate) : null, s = this.startDate ? new Date(this.startDate) : null, c = this.endDate ? new Date(this.endDate) : null, l = e === r && this._currentSelectedDateDetails.currentMonthIndex === this._currentSelectedDateDetails.currentSelectedMonthIndex && this._currentSelectedDateDetails.currentSelectedYear === this._currentSelectedDateDetails.currentYear, u = (() => {
				if (!this.startDate && !this.endDate) return !1;
				let e = s, t = e?.getFullYear?.(), n = e?.getMonth?.(), i = e?.getDate?.(), a = c, o = a?.getFullYear?.(), l = a?.getMonth?.(), u = a?.getDate?.(), d = t === this._currentSelectedDateDetails.currentSelectedYear && n === this._currentSelectedDateDetails.currentSelectedMonthIndex && r === i, f = o === this._currentSelectedDateDetails.currentSelectedYear && l === this._currentSelectedDateDetails.currentSelectedMonthIndex && r === u;
				return d || f;
			})(), f = a.getTime() === s?.getTime?.(), p = a.getTime() === c?.getTime?.(), m = a.getDay() === 1, h = a.getDay() === 0, g = (() => {
				if (s && c) {
					if (!o) return !1;
					if (o > c) return a.getTime() === c.getTime();
					if (o < s) return a.getTime() === o.getTime();
				}
				return s ? a.getTime() === s.getTime() : !1;
			})(), _ = (() => {
				if (!o) return !1;
				if (s && c) {
					if (o > c) return a.getTime() === o.getTime();
					if (o < s) return a.getTime() === s.getTime();
				}
				return a.getTime() === o.getTime();
			})(), v = !s || !c ? !1 : a >= s && a <= c, y = !o || !s ? !1 : s && c ? o > c ? a >= c && a <= o : o < s ? a <= s && a >= o : !1 : s && o > s ? a >= s && a <= o : !1, b = () => {
				let e = new Date(this._currentSelectedDateDetails.currentSelectedYear, this._currentSelectedDateDetails.currentSelectedMonthIndex, r), t = e.toISOString();
				if (s && c) {
					if (v) {
						this.startDate = t, this.endDate = void 0, this._emitCustomEvent({
							name: "date-range-picker-wc:on-date-select",
							detail: {
								startDate: t,
								endDate: null
							}
						});
						return;
					}
					if (e < s) {
						this.startDate = t, this._emitCustomEvent({
							name: "date-range-picker-wc:on-date-select",
							detail: {
								startDate: t,
								endDate: this.endDate
							}
						});
						return;
					}
					if (e > c) {
						this.endDate = t, this._emitCustomEvent({
							name: "date-range-picker-wc:on-date-select",
							detail: {
								endDate: t,
								startDate: this.startDate
							}
						});
						return;
					}
				}
				if (!s) {
					this.startDate = t, this._emitCustomEvent({
						name: "date-range-picker-wc:on-date-select",
						detail: {
							startDate: t,
							endDate: this.endDate
						}
					});
					return;
				}
				if (e < s) {
					this.startDate = t, this._emitCustomEvent({
						name: "date-range-picker-wc:on-date-select",
						detail: {
							startDate: t,
							endDate: this.endDate
						}
					});
					return;
				}
				this.endDate = t, this._emitCustomEvent({
					name: "date-range-picker-wc:on-date-select",
					detail: {
						startDate: this.startDate,
						endDate: t
					}
				});
			};
			return i`
                <div
                  part=${`calendar-date-cell${u ? " calendar-grid-cell--selected" : ""}${v ? " calendar-date-cell--highlighted" : ""}`}
                  class=${d({
				"calendar-grid-cell": !0,
				"calendar-grid-cell--current-day": l,
				"calendar-grid-cell--selected": u,
				"calendar-date-cell--highlighted": v,
				"calendar-date-cell--highlighted-row-cell-first": v && (m || f),
				"calendar-date-cell--highlighted-row-cell-last": v && (h || p),
				"calendar-date-cell--preview-range": y,
				"calendar-date-cell--preview-range-row-cell-first": y && (m || g),
				"calendar-date-cell--preview-range-row-cell-last": y && (h || _)
			})}
                  @click=${b}
                  @mouseover=${() => {
				this._mouseOveredDate = a.toISOString();
			}}
                  @mouseout=${() => {
				this._mouseOveredDate = void 0;
			}}
                  tabindex="0"
                  @keydown=${(e) => {
				console.log({ event: e }), ["Space", "Enter"].includes(e?.code) && b();
			}}
                >
                  ${r}
                </div>
              `;
		})}
        </div>
      </div>
    `;
	}
	_handleCalendarPopoverToggle(e) {
		e?.newState === "closed" && (this._currentSelectedDate = this.startDate || (/* @__PURE__ */ new Date()).toISOString());
	}
	_onClearClick() {
		this.startDate = void 0, this.endDate = void 0, this._emitCustomEvent({
			name: "date-range-picker-wc:on-date-select",
			detail: {
				startDate: this.startDate,
				endDate: this.endDate
			}
		});
	}
	render() {
		return i`
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
          border-top: 1px dashed ${o(this.rangePreviewBorderColor)};
          border-bottom: 1px dashed ${o(this.rangePreviewBorderColor)};
        }
        .calendar-date-cell--preview-range-row-cell-first::before {
          border-left: 1px dashed ${o(this.rangePreviewBorderColor)};
          border-top-left-radius: 1.5rem;
          border-bottom-left-radius: 1.5rem;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
        .calendar-date-cell--preview-range-row-cell-last::before {
          border-right: 1px dashed ${o(this.rangePreviewBorderColor)};
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
              placeholder=${b}
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
          ${p(this.calendarPopoverRef)}
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
				let e = this.shadowRoot?.querySelector(".years-container"), t = e?.querySelector(`.year-option--${this._currentSelectedDateDetails.currentSelectedYear}`);
				e && (e.scrollTop = t?.offsetTop ? t?.offsetTop - 50 : 0);
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
                    ${Array.from({ length: 1199 }).map((e, t) => {
			let n = 1800 + t;
			return i`
                          <button
                            class=${`year-option year-option--${n}${String(n) === String(this._currentSelectedDateDetails.currentSelectedYear) ? " year-option--selected" : ""}`}
                            @click=${() => {
				let e = new Date(n, this._currentSelectedDateDetails.currentSelectedMonthIndex, this._currentSelectedDateDetails.currentDayNumber);
				this._currentSelectedDate = e.toISOString(), this._yearSelectorContainerPopoverElem && this._yearSelectorContainerPopoverElem.hidePopover();
			}}
                          >
                            ${n}
                          </button>
                        `;
		})}
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

            ${this.hideClearButton ? a : i`
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
};
y([c({
	type: String,
	attribute: m.START_DATE
})], S.prototype, "startDate", void 0), y([c({
	type: String,
	attribute: m.END_DATE
})], S.prototype, "endDate", void 0), y([c({
	type: String,
	attribute: m.LABEL_FORMAT_FOR_DAYS
})], S.prototype, "labelFormatForDays", void 0), y([c({
	type: String,
	attribute: m.RANGE_PREVIEW_BORDER_COLOR
})], S.prototype, "rangePreviewBorderColor", void 0), y([c({
	type: Boolean,
	attribute: m.HIDE_CLEAR_BUTTON
})], S.prototype, "hideClearButton", void 0), y([u()], S.prototype, "_currentSelectedDate", void 0), y([u()], S.prototype, "_mouseOveredDate", void 0), y([l(".date-input-field")], S.prototype, "_dateInputFieldElem", void 0), y([l("#calendar-grid-days-container")], S.prototype, "_calendarGridDaysContainerElem", void 0), y([l("#year-selector-container")], S.prototype, "_yearSelectorContainerPopoverElem", void 0), S = y([s("date-range-picker-wc")], S);
//#endregion
//#region src/index.ts
var C = t({
	tagName: "date-range-picker-wc",
	elementClass: S,
	react: e,
	events: { onDateSelect: h.ON_DATE_SELECT }
});
//#endregion
export { S as DateRangePickerWc, C as DateRangePickerWcReact };

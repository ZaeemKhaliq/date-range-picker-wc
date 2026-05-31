# Date Range Picker WC

<img width="1297" height="1091" alt="date-range-picker-wc-usage-1" src="https://github.com/user-attachments/assets/63120a2a-5742-49f4-9502-66ff568e9bb1" />

A lightweight, framework-agnostic date range picker. Built with the following modern techniques:

- Web Components ([Lit](https://lit.dev/))
- Native [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
- [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning)

Features a segmented date text input (`YYYY/MM/DD - YYYY/MM/DD`) with keyboard navigation between each date part, a calendar popover with animated month transitions and year selection, and a hover-based range preview.

A React wrapper is also exported via `@lit/react` for drop-in use in React applications. See an example [below](#react).

Also provides customization possibilities (see [Available Slots](#available-slots) and [CSS parts](#styles-customization-with-css-part-selectors)).

Live Demo: [CodeSandbox](https://codesandbox.io/p/sandbox/g4r2wx)

> **Browser support:** Requires Popover API (Chrome 114+, Firefox 125+, Safari 17+) and CSS Anchor Positioning (Chrome 125+, Safari 18.2+).

---

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
  - [HTML](#html)
  - [Vanilla JS](#vanilla-js)
  - [React](#react)
- [Available Attributes/Props](#available-attributesprops)
- [Available Slots](#available-slots)
- [Styles Customization with CSS `::part()` Selectors](#styles-customization-with-css-part-selectors)
- [Custom Events](#custom-events)
- [Keyboard Interactions](#keyboard-interactions)

---

## Installation

```bash
npm install @zaeemk/date-range-picker-wc
```

If you are using `React`, make sure you have the following peer dependencies installed too:

- `@lit/react`

Next, do the following:

```js
// registers <date-range-picker-wc>
import "@zaeemk/date-range-picker-wc";

// or, import named export (in case of ReactJs)
import { DateRangePickerWcReact } from "@zaeemk/date-range-picker-wc";
```

---

## Basic Usage

### HTML

For completely plain HTML pages — no bundler, no `npm`, no `type="module"` needed. Load the self-contained IIFE build from a CDN; the custom element registers itself as soon as the script runs.

> **Note:** Remember to reflect the `date-range-picker-wc:on-date-select` event back onto the element. The component emits events but does not update its own `start-date` / `end-date` attributes.

```html
<script src="https://cdn.jsdelivr.net/npm/@zaeemk/date-range-picker-wc/dist/date-range-picker-wc.iife.js"></script>

<date-range-picker-wc id="picker"></date-range-picker-wc>

<script>
  const picker = document.getElementById("picker");

  picker.addEventListener("date-range-picker-wc:on-date-select", (e) => {
    picker.startDate = e.detail.startDate;
    picker.endDate = e.detail.endDate;

    console.log("Start:", e.detail.startDate);
    console.log("End:", e.detail.endDate);
  });
</script>
```

---

### Vanilla JS

For projects using ES modules without a framework. Install the package via `npm`, then import it in your entry file — the import alone registers the `<date-range-picker-wc>` custom element.

```js
// main.js
import "@zaeemk/date-range-picker-wc";

const picker = document.getElementById("picker");

picker.addEventListener("date-range-picker-wc:on-date-select", (e) => {
  picker.startDate = e.detail.startDate;
  picker.endDate = e.detail.endDate;
});
```

```html
<!-- index.html -->
<script type="module" src="main.js"></script>

<date-range-picker-wc id="picker"></date-range-picker-wc>
```

---

### React

The package ships a React wrapper created with `@lit/react`. Event names are mapped to camelCase props.

```tsx
import { useState } from "react";
import { DateRangePickerWcReact } from "@zaeemk/date-range-picker-wc";

export function App() {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  return (
    <DateRangePickerWcReact
      startDate={startDate}
      endDate={endDate}
      labelFormatForDays="ddd"
      onDateSelect={(e) => {
        setStartDate(e.detail.startDate);
        setEndDate(e.detail.endDate);
      }}
    />
  );
}
```

---

## Available Attributes/Props

These are the public attributes/properties of the `<date-range-picker-wc>` element (decorated with `@property()` in the source). All of them can be set as HTML attributes or as JS properties.

- [`start-date`](#start-date)
- [`end-date`](#end-date)
- [`min-date`](#min-date)
- [`max-date`](#max-date)
- [`label-format-for-days`](#label-format-for-days)
- [`range-preview-border-color`](#range-preview-border-color)
- [`hide-clear-button`](#hide-clear-button)

---

### `start-date`

|                 |                                 |
| --------------- | ------------------------------- |
| **Type**        | `string` (ISO 8601 date string) |
| **Default**     | `undefined`                     |
| **JS property** | `startDate`                     |

The start date of the currently selected range, expressed as an ISO 8601 string (e.g. `"2024-01-15T00:00:00.000Z"`). Setting this causes the corresponding date to be highlighted in the calendar and reflected in the text input. Setting it to `undefined` or removing the attribute clears the start date.

```html
<date-range-picker-wc
  start-date="2024-01-15T00:00:00.000Z"
></date-range-picker-wc>
```

```js
picker.startDate = new Date("2024-01-15").toISOString(); // set
picker.startDate = undefined; // clear
```

> Always reflect the `date-range-picker-wc:on-date-select` event back by setting `startDate` — the component emits the event but does not update its own attribute.

---

### `end-date`

|                 |                                 |
| --------------- | ------------------------------- |
| **Type**        | `string` (ISO 8601 date string) |
| **Default**     | `undefined`                     |
| **JS property** | `endDate`                       |

The end date of the currently selected range, expressed as an ISO 8601 string. Together with `start-date`, it defines the highlighted range in the calendar. The value is always stored with its time component set to `23:59:59.999` in local time so the full final day is included in the range. If `end-date` is before `start-date` when entered via the text input, it is automatically nudged to equal `start-date` (same-day ranges are permitted) on blur.

```html
<date-range-picker-wc
  end-date="2024-01-31T00:00:00.000Z"
></date-range-picker-wc>
```

```js
picker.endDate = new Date("2024-01-31").toISOString(); // set
picker.endDate = undefined; // clear
```

---

### `min-date`

|                 |                                                 |
| --------------- | ----------------------------------------------- |
| **Type**        | `string` (ISO 8601 or `YYYY-MM-DD` date string) |
| **Default**     | `undefined`                                     |
| **JS property** | `minDate`                                       |

Sets a lower boundary for selectable dates. Any day before this date is visually disabled in the calendar grid and cannot be clicked or keyboard-activated. When the user types a start date earlier than `min-date` in the text input, it is automatically clamped to `min-date` on blur.

All date comparisons are performed against local midnight, so date-only strings such as `"2024-01-15"` are interpreted as January 15 in the user's local timezone rather than UTC midnight.

```html
<date-range-picker-wc min-date="2024-01-01"></date-range-picker-wc>
```

```js
picker.minDate = "2024-01-01"; // set — accepts YYYY-MM-DD or full ISO string
picker.minDate = undefined; // clear
```

> If `start-date` or `end-date` is already set to a value outside the `min-date`/`max-date` boundary when the boundary changes, it is automatically clamped to the nearest valid date in the same Lit update cycle — no user interaction is required.

---

### `max-date`

|                 |                                                 |
| --------------- | ----------------------------------------------- |
| **Type**        | `string` (ISO 8601 or `YYYY-MM-DD` date string) |
| **Default**     | `undefined`                                     |
| **JS property** | `maxDate`                                       |

Sets an upper boundary for selectable dates. Any day after this date is visually disabled in the calendar grid and cannot be clicked or keyboard-activated. When the user types an end date later than `max-date` in the text input, it is automatically clamped to `max-date` on blur.

The end date is always stored with its time component set to `23:59:59.999` in local time, including when it is clamped to `max-date`, so the full final day is included in the range.

```html
<date-range-picker-wc max-date="2024-12-31"></date-range-picker-wc>
```

```js
picker.maxDate = "2024-12-31"; // set — accepts YYYY-MM-DD or full ISO string
picker.maxDate = undefined; // clear
```

> `min-date` and `max-date` can be combined to restrict selection to a specific window:

```html
<date-range-picker-wc
  min-date="2024-01-01"
  max-date="2024-12-31"
></date-range-picker-wc>
```

---

### `label-format-for-days`

|                 |                      |
| --------------- | -------------------- |
| **Type**        | `"ddd" \| "d"`       |
| **Default**     | `"ddd"`              |
| **JS property** | `labelFormatForDays` |

Controls the format of the day-of-week column headers rendered in the calendar grid.

| Value   | Header labels                     |
| ------- | --------------------------------- |
| `"ddd"` | Mon, Tue, Wed, Thu, Fri, Sat, Sun |
| `"d"`   | M, T, W, T, F, S, S               |

Invalid values are silently reset to `"ddd"`.

```html
<date-range-picker-wc label-format-for-days="d"></date-range-picker-wc>
```

---

### `range-preview-border-color`

|                 |                                      |
| --------------- | ------------------------------------ |
| **Type**        | `string` (any valid CSS color value) |
| **Default**     | `"black"`                            |
| **JS property** | `rangePreviewBorderColor`            |

The color of the dashed border shown around the hover range preview — the visual indication of where the range would extend if the user clicks the currently hovered day. Accepts any valid CSS color string: hex, RGB, RGBA, HSL, or named colors.

```html
<date-range-picker-wc
  range-preview-border-color="rgba(99,102,241,0.6)"
></date-range-picker-wc>
```

---

### `hide-clear-button`

|                 |                   |
| --------------- | ----------------- |
| **Type**        | `boolean`         |
| **Default**     | `false`           |
| **JS property** | `hideClearButton` |

Hides the "Clear" button that appears at the bottom of the calendar popover. When the Clear button is visible it is automatically disabled if no dates are currently selected.

```html
<date-range-picker-wc hide-clear-button></date-range-picker-wc>
```

---

## Available Slots

Slots let you replace or extend regions of the component with your own markup. Default slot content is used as a fallback when you do not provide a replacement.

- [`input-field`](#input-field)
- [`calendar-trigger`](#calendar-trigger)
- [`left-sidebar`](#left-sidebar)
- [`right-sidebar`](#right-sidebar)
- [`step-to-previous-month-button`](#step-to-previous-month-button)
- [`step-to-next-month-button`](#step-to-next-month-button)
- [`calendar-footer`](#calendar-footer)

---

### `input-field`

Replaces the entire default date text input (`<input type="text">`). The default input implements a segmented `YYYY/MM/DD - YYYY/MM/DD` format with keyboard navigation between the individual date parts and automatic blur-time date parsing.

> **Important:** When you replace this slot, the built-in keyboard handlers (digit entry, arrow navigation, backspace, blur parsing) are no longer wired up — you take full control of input behavior.

```html
<date-range-picker-wc>
  <input slot="input-field" type="text" placeholder="Pick a date range…" />
</date-range-picker-wc>
```

**Default content:** A text input with `inputmode="numeric"` and placeholder `YYYY/MM/DD - YYYY/MM/DD`, wired with segmented keyboard entry and blur-time date parsing.

---

### `calendar-trigger`

Replaces the calendar icon rendered inside the calendar trigger button. The button itself (which opens and closes the calendar popover) is not replaced — only its inner icon content.

```html
<date-range-picker-wc>
  <span slot="calendar-trigger">📅</span>
</date-range-picker-wc>
```

**Default content:** An SVG calendar icon.

---

### `left-sidebar`

Renders content to the left of the calendar inside the popover. Use this to add a list of preset date ranges (e.g. "Last 7 days", "This month") or any other auxiliary UI.

```html
<date-range-picker-wc>
  <div
    slot="left-sidebar"
    style="display:flex;flex-direction:column;gap:4px;padding-right:8px;"
  >
    <button>Last 7 days</button>
    <button>Last 30 days</button>
    <button>This month</button>
  </div>
</date-range-picker-wc>
```

**Default content:** none.

---

### `right-sidebar`

Renders content to the right of the calendar inside the popover.

```html
<date-range-picker-wc>
  <div slot="right-sidebar" style="padding-left:8px;">
    <p>Select a start and end date.</p>
  </div>
</date-range-picker-wc>
```

**Default content:** none.

---

### `step-to-previous-month-button`

Replaces the default previous-month navigation button (the left chevron) in the calendar header. Click events from the slotted element bubble up to the slot and are handled automatically — no manual event wiring is needed.

```html
<date-range-picker-wc>
  <button slot="step-to-previous-month-button">‹</button>
</date-range-picker-wc>
```

**Default content:** A circular transparent button containing a left-chevron SVG icon.

---

### `step-to-next-month-button`

Replaces the default next-month navigation button (the right chevron) in the calendar header. Click events from the slotted element bubble up to the slot and are handled automatically — no manual event wiring is needed.

```html
<date-range-picker-wc>
  <button slot="step-to-next-month-button">›</button>
</date-range-picker-wc>
```

**Default content:** A circular transparent button containing a right-chevron SVG icon.

---

### `calendar-footer`

Renders content at the bottom of the calendar popover, below the calendar grid and the Clear button.

```html
<date-range-picker-wc>
  <div slot="calendar-footer" style="padding:4px 8px;">
    <small>All dates are in UTC.</small>
  </div>
</date-range-picker-wc>
```

**Default content:** none.

---

## Styles Customization with CSS `::part()` Selectors

Internal elements that carry a `part` attribute can be styled from outside the shadow DOM using the `::part()` pseudo-element. This is the recommended way to theme the component without overriding global CSS. (See [reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::part))

- [`::part(input-container)`](#partinput-container)
- [`::part(date-input-field)`](#partdate-input-field)
- [`::part(calendar-header)`](#partcalendar-header)
- [`::part(calendar-date-cell)`](#partcalendar-date-cell)

---

### `::part(input-container)`

The `<div>` wrapping both the date text input and the calendar trigger button. Controls border, border-radius, padding, background, and overall input-row layout.

```css
date-range-picker-wc::part(input-container) {
  border-color: #6366f1;
  border-radius: 8px;
  padding-inline: 12px;
  background: #f5f3ff;
}
```

---

### `::part(date-input-field)`

The `<input type="text">` element used for manual date entry. Only present when the `input-field` slot is not replaced. Use this to style the input font, color, size, or cursor.

```css
date-range-picker-wc::part(date-input-field) {
  font-size: 1rem;
  color: #1e1e2e;
  letter-spacing: 0.02em;
}
```

---

### `::part(calendar-header)`

The header row of the calendar popover, containing the month name, the year selector button, and the previous / next month navigation buttons.

```css
date-range-picker-wc::part(calendar-header) {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0.25rem;
}
```

---

### `::part(calendar-date-cell)`

Each individual day cell in the calendar grid. Additional part tokens are appended dynamically to reflect the cell's selection state, enabling conditional styling without extra class names:

| Selector                                                     | When applied                                               |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| `::part(calendar-date-cell)`                                 | Every day cell                                             |
| `::part(calendar-date-cell calendar-grid-cell--selected)`    | The start date cell or end date cell                       |
| `::part(calendar-date-cell calendar-date-cell--highlighted)` | Cells that fall within the selected date range (inclusive) |

```css
/* Style every day cell */
date-range-picker-wc::part(calendar-date-cell) {
  border-radius: 6px;
  font-weight: 500;
}

/* Highlight the selected start / end dates */
date-range-picker-wc::part(calendar-date-cell calendar-grid-cell--selected) {
  background-color: #6366f1;
  color: #ffffff;
}

/* Tint the in-range days */
date-range-picker-wc::part(calendar-date-cell calendar-date-cell--highlighted) {
  background-color: #e0e7ff;
  border-radius: 0;
}
```

---

## Custom Events

All events are emitted as [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) so all details are included in the `detail` field.

All events bubble and are composed (they cross shadow DOM boundaries). Listen for them on the `<date-range-picker-wc>` element or any ancestor.

- [`date-range-picker-wc:on-date-select`](#date-range-picker-wcon-date-select)

In `React`, you can use the `on*` convention i.e., `onDateSelect` on the wrapper component ([`DateRangePickerWcReact`](#react)).

---

### `date-range-picker-wc:on-date-select`

Fired every time the user interacts with the calendar to change the selection. This includes:

- Clicking a day cell to set the start date (when no start date is selected)
- Clicking a day cell to set the end date (when a start date exists but no end date)
- Clicking a day cell outside the current range to extend or shrink the range
- Clicking a day cell inside the current range to start a new selection from that date
- Clicking the "Clear" button (both values will be `undefined`)

**Detail:**

```ts
{
  startDate?: string; // ISO 8601 string, or undefined if cleared / not yet selected
  endDate?: string;   // ISO 8601 string, or undefined if cleared / not yet selected
}
```

```js
picker.addEventListener("date-range-picker-wc:on-date-select", (e) => {
  const { startDate, endDate } = e.detail;

  // Always reflect the new values back onto the component
  picker.startDate = startDate;
  picker.endDate = endDate;

  console.log(`Range: ${startDate} → ${endDate}`);
});
```

> Always reflect the event's `startDate` / `endDate` back onto the component — it emits the event but does not update its own attributes.

---

## Keyboard Interactions

### Date Text Input

| Key          | Action                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `0`–`9`      | Type a digit into the active date segment (YYYY, MM, or DD). The segment automatically advances to the next one once filled. |
| `Backspace`  | Delete the last typed digit in the current segment. If the segment is already empty, move focus to the previous segment.     |
| `ArrowLeft`  | Move focus to the previous date segment.                                                                                     |
| `ArrowRight` | Move focus to the next date segment.                                                                                         |
| `Tab`        | Default browser behavior — moves focus out of the input.                                                                     |

### Calendar Grid

| Key               | Action                                                      |
| ----------------- | ----------------------------------------------------------- |
| `Space` / `Enter` | Select the focused day cell (same behavior as clicking it). |

import { css } from "lit";

export const mainStyles = css`
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

import * as React from "react";
import { isEqual, cloneDeep } from "lodash";
import moment, * as Moment from "moment";
import { DatePicker, type ITimePickerProps, TimePicker, type IDatePickerProps } from "@fluentui/react";
import { withComponentMetadata } from "@m365scc/component-metadata";
import { getTextAriaLabel, type ITextWithAriaLabel } from "@m365scc/utilities";

import { DatetimeBase } from "./datetimeBase";
import type { ICustomDateRangeStrings, IDatetimeRange, IDatetimeRangeProps } from "./datetimeRange.types";
import { datetimeRangeStyles } from "./datetimeRange.styles";

import ComponentStrings from "@m365scc/datetime/localization";

interface IDatetimeRangeStatus {
  currentRange: IDatetimeRange;
  errorMessage?: string;
}

/**
 * Gets the initial dates and ignores anything more granular than hours if useTimePicker is specified since the time increment & selection is limited to hours
 * @param initialDates
 * @param useTimePicker
 */
export const getInitialDates = (initialDates?: IDatetimeRange, useTimePicker?: boolean) =>
  useTimePicker && initialDates
    ? {
        startDate: new Date(initialDates.startDate.setMinutes(0, 0, 0)),
        endDate: new Date(initialDates.endDate.setMinutes(0, 0, 0)),
      }
    : initialDates;

class DatetimeRange extends DatetimeBase<ICustomDateRangeStrings, IDatetimeRangeProps, IDatetimeRangeStatus> {
  constructor(props: IDatetimeRangeProps) {
    super(props);

    this.datePickerStrings = {
      ...this.datePickerStrings,
      prevYearRangeAriaLabel: ComponentStrings.GoToPreviousYearRange,
      nextYearRangeAriaLabel: ComponentStrings.GoToNextYearRange,
    };

    this.state = {
      currentRange: DatetimeRange.getInitialRange(getInitialDates(this.props.initialDates, this.props.useTimePicker)),
    };
  }

  static getInitialRange(initialDates?: IDatetimeRange | null) {
    return {
      startDate: initialDates && initialDates.startDate ? initialDates.startDate : new Date(Moment.now()),
      endDate: initialDates && initialDates.endDate ? initialDates.endDate : new Date(Moment.now()),
    };
  }

  static getDerivedStateFromProps(props: IDatetimeRangeProps, state: IDatetimeRangeStatus) {
    const initialDates = getInitialDates(props.initialDates, props.useTimePicker);
    if (!isEqual(initialDates, state.currentRange)) {
      return {
        currentRange: DatetimeRange.getInitialRange(initialDates),
      };
    }
    return null;
  }

  onChangeDate = (date: Date, isStartDate: boolean) => {
    if (!date) return;
    const nextDateRange: IDatetimeRange = isStartDate
      ? {
          startDate: date,
          endDate: this.state.currentRange.endDate,
        }
      : {
          startDate: this.state.currentRange.startDate,
          endDate: this.props.useInclusiveEndDate ? moment(date).endOf("day").toDate() : date,
        };

    const startTs = nextDateRange.startDate?.getTime?.();
    const endTs = nextDateRange.endDate?.getTime?.();

    console.log(startTs, endTs, "timestamps");

    if (Number.isFinite(startTs) && Number.isFinite(endTs) && endTs < startTs) {
      const errorMsg = isStartDate
        ? this.props.customStrings?.invalidDateRangeError || "Start date cannot be after end date."
        : this.props.customStrings?.invalidDateRangeError || "End date cannot be before start date.";

      this.setState((prev) => {
        console.log(prev, "prev state in onChangeDate");
        return {
          errorMessage: errorMsg,
        };
      });
      return;
    }
    console.log(this.props, "props in onChangeDate");

    this.setState(
      (prev) => {
        console.log(prev, "prev state in onChangeDate - before setState");
        return {
          currentRange: cloneDeep(nextDateRange),
          errorMessage: undefined,
        };
      },
      () => {
        this.props.onChanged(nextDateRange);
        console.log(this.state, "state after setState in onChangeDate");
      }
    );
  };

  renderDatePicker = (timezonePreference: string, datetimeLabel: JSX.Element) => {
    const startLabel = getTextAriaLabel(
      this.props.customStrings?.startDateLabel || ComponentStrings.StartDate
    ) as ITextWithAriaLabel;
    const endLabel = getTextAriaLabel(
      this.props.customStrings?.endDateLabel || ComponentStrings.EndDate
    ) as ITextWithAriaLabel;
    const startTimeLabel = getTextAriaLabel(
      this.props.customStrings?.startTimeLabel || ComponentStrings.StartTime
    ) as ITextWithAriaLabel;
    const endTimeLabel = getTextAriaLabel(
      this.props.customStrings?.endTimeLabel || ComponentStrings.EndTime
    ) as ITextWithAriaLabel;
    const rangeLabel = getTextAriaLabel(this.props.label) as ITextWithAriaLabel;

    const startDatePickerProps: IDatePickerProps = {
      ...this.getBaseDatePickerProps(timezonePreference),
      minDate: DatetimeRange.convertDateWithTZ(this.props.minDate, "to", timezonePreference),
      // FIXED: Always constrain start date to not be after end date
      maxDate: DatetimeRange.convertDateWithTZ(
        this.props.maxDate && this.state.currentRange.endDate > this.props.maxDate
          ? this.props.maxDate
          : this.state.currentRange.endDate,
        "to",
        timezonePreference
      ),
      value: DatetimeRange.convertDateWithTZ(this.state.currentRange.startDate, "to", timezonePreference),
      label: startLabel.text,
      ariaLabel: startLabel.ariaLabel,
      onSelectDate: (date: Date) => {
        this.onChangeDate(DatetimeRange.convertDateWithTZ(date, "from", timezonePreference) || date, true);
      },
      pickerAriaLabel: ComponentStrings.StartDateExpanded,
      // FIXED: Show error message for start date validation
      textField: {
        errorMessage: this.state.errorMessage,
      },
    };

    const endDatePickerProps: IDatePickerProps = {
      ...this.getBaseDatePickerProps(timezonePreference),
      // FIXED: Always constrain end date to not be before start date
      minDate: DatetimeRange.convertDateWithTZ(
        this.props.minDate && this.state.currentRange.startDate < this.props.minDate
          ? this.props.minDate
          : this.state.currentRange.startDate,
        "to",
        timezonePreference
      ),
      maxDate: DatetimeRange.convertDateWithTZ(this.props.maxDate, "to", timezonePreference),
      value: DatetimeRange.convertDateWithTZ(this.state.currentRange.endDate, "to", timezonePreference),
      label: endLabel.text,
      ariaLabel: endLabel.ariaLabel,
      onSelectDate: (date: Date) => {
        this.onChangeDate(DatetimeRange.convertDateWithTZ(date, "from", timezonePreference) || date, false);
      },
      pickerAriaLabel: ComponentStrings.EndDateExpanded,
      // FIXED: Show error message for end date validation
      textField: {
        errorMessage: this.state.errorMessage,
      },
    };

    const isSameDate = () =>
      this.state.currentRange.startDate.toDateString() === this.state.currentRange.endDate.toDateString();

    const getStartTimePickerProps = (): ITimePickerProps => ({
      ...this.getBaseTimePickerProps(timezonePreference),
      value: DatetimeRange.convertDateWithTZ(
        new Date(this.state.currentRange.startDate.setMinutes(0, 0, 0)),
        "to",
        timezonePreference
      ),
      timeRange: {
        start:
          this.props.minDate && this.state.currentRange.startDate.toDateString() === this.props.minDate.toDateString()
            ? (
                DatetimeRange.convertDateWithTZ(this.props.minDate, "to", timezonePreference) || this.props.minDate
              ).getHours()
            : 0,
        end: isSameDate()
          ? (
              DatetimeRange.convertDateWithTZ(this.state.currentRange.endDate, "to", timezonePreference) ||
              this.state.currentRange.endDate
            ).getHours()
          : 24,
      },
      onChange: (_, time) => {
        // First validate if this would create an invalid range
        const startDateTime = new Date(this.state.currentRange.startDate);
        startDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

        if (startDateTime.getTime() <= this.state.currentRange.endDate.getTime()) {
          // Valid range, proceed with change
          this.onChangeDate(DatetimeRange.convertDateWithTZ(time, "from", timezonePreference) || time, true);
        } else {
          // Set error message for invalid range
          const errorMsg = this.props.customStrings?.invalidDateRangeError || "Start time cannot be after end time.";
          this.setState({ errorMessage: errorMsg });
        }
      },
      label: startTimeLabel.text,
      ariaLabel: startTimeLabel.ariaLabel,
      errorMessage: this.state.errorMessage,
    });
    
    const getEndTimePickerProps = (): ITimePickerProps => ({
      ...this.getBaseTimePickerProps(timezonePreference),
      value: DatetimeRange.convertDateWithTZ(
        new Date(this.state.currentRange.endDate.setMinutes(0, 0, 0)),
        "to",
        timezonePreference
      ),
      timeRange: {
        start: isSameDate()
          ? (
              DatetimeRange.convertDateWithTZ(this.state.currentRange.startDate, "to", timezonePreference) ||
              this.state.currentRange.startDate
            )
              // +1 because the endTime timeRange is not inclusive
              .getHours() + 1
          : 0,
        end:
          this.props.maxDate && this.state.currentRange.endDate.toDateString() === this.props.maxDate.toDateString()
            ? (DatetimeRange.convertDateWithTZ(this.props.maxDate, "to", timezonePreference) || this.props.maxDate)
                // +2 because the endTime timeRange is not inclusive
                .getHours() + 2
            : 24,
      },
      onChange: (_, time) => {
        // First validate if this would create an invalid range
        const endDateTime = new Date(this.state.currentRange.endDate);
        endDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

        if (endDateTime.getTime() >= this.state.currentRange.startDate.getTime()) {
          // Valid range, proceed with change
          this.onChangeDate(DatetimeRange.convertDateWithTZ(time, "from", timezonePreference) || time, false);
        } else {
          // Set error message for invalid range
          const errorMsg = this.props.customStrings?.invalidDateRangeError || "End time cannot be before start time.";
          this.setState({ errorMessage: errorMsg });
        }
      },
      label: endTimeLabel.text,
      ariaLabel: endTimeLabel.ariaLabel,
      errorMessage: this.state.errorMessage,
    });

    return (
      <div className="scc-datePicker datepicker-group" role="group" aria-label={rangeLabel.ariaLabel}>
        {datetimeLabel}
        <div className={datetimeRangeStyles.section}>
          <DatePicker {...startDatePickerProps} />
          {this.props.useTimePicker && <TimePicker {...getStartTimePickerProps()} />}
        </div>
        <div className={datetimeRangeStyles.section}>
          <DatePicker {...endDatePickerProps} />
          {this.props.useTimePicker && <TimePicker {...getEndTimePickerProps()} />}
        </div>
      </div>
    );
  };
}

withComponentMetadata(
  {
    componentName: "DatetimeRange",
    type: "Subcomponent",
    owner: {
      team: "SccCommonUxDev",
    },
  },
  DatetimeRange
);

export { DatetimeRange };

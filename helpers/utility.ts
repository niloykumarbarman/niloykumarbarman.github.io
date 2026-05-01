const DAY_IN_MS = 24 * 60 * 60 * 1000;

const normalizeToDay = (value: Date | string) => {
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const getExperienceEndExclusive = (value: Date | string) => {
  const normalizedDate = normalizeToDay(value);
  const today = normalizeToDay(new Date());

  if (isSameDay(normalizedDate, today)) {
    return normalizedDate;
  }

  return new Date(normalizedDate.getTime() + DAY_IN_MS);
};

const getExperienceParts = (startDate: Date | string, endDate: Date | string) => {
  const start = normalizeToDay(startDate);
  const endExclusive = getExperienceEndExclusive(endDate);

  if (endExclusive <= start) {
    return { years: 0, months: 0 };
  }

  let years = endExclusive.getFullYear() - start.getFullYear();
  let months = endExclusive.getMonth() - start.getMonth();

  if (endExclusive.getDate() < start.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years: Math.max(years, 0),
    months: Math.max(months, 0),
  };
};

const mergeExperienceIntervals = (
  positions: Array<{ startDate: Date | string; endDate?: Date | string }>
) => {
  const sortedIntervals = positions
    .map((position) => ({
      start: normalizeToDay(position.startDate),
      endExclusive: getExperienceEndExclusive(position.endDate ?? new Date()),
    }))
    .filter(({ start, endExclusive }) => endExclusive > start)
    .sort((left, right) => left.start.getTime() - right.start.getTime());

  return sortedIntervals.reduce<Array<{ start: Date; endExclusive: Date }>>((merged, interval) => {
    const lastInterval = merged[merged.length - 1];

    if (!lastInterval || interval.start.getTime() > lastInterval.endExclusive.getTime()) {
      merged.push({ ...interval });
      return merged;
    }

    if (interval.endExclusive.getTime() > lastInterval.endExclusive.getTime()) {
      lastInterval.endExclusive = interval.endExclusive;
    }

    return merged;
  }, []);
};

export const calculateDuration = (startDate: Date, endDate: Date) => {
  const { years, months } = getExperienceParts(startDate, endDate);

  if (years === 0 && months === 0) {
    return "Less than 1 month";
  } else if (years === 0) {
    return `${months} month${months > 1 ? 's' : ''}`;
  } else if (months === 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  } else {
    return `${years} year${years > 1 ? 's' : ''}, ${months} month${months > 1 ? 's' : ''}`;
  }
};

export const calculateFromTo = (startDate: Date, endDate: Date) => {
    const startYear = startDate.getFullYear();
    if(endDate.toDateString() === new Date().toDateString())
        return `${startYear} - Present`;
    const endYear = endDate.getFullYear();
    return `${startYear} - ${endYear}`;
  };

export const calculateFromToWithDuration = (startDate: Date, endDate: Date) => {
  const dateRange = calculateFromTo(startDate, endDate);
  const duration = calculateDuration(startDate, endDate);
  return `${dateRange}\n${duration}`;
  };

export const getDateRange = (startDate: Date, endDate: Date) => {
  return calculateFromTo(startDate, endDate);
};

export const getDuration = (startDate: Date, endDate: Date) => {
  return calculateDuration(startDate, endDate);
};

export const calculateTotalExperience = (positions: Array<{startDate: Date | string, endDate?: Date | string}>) => {
  const totalMonths = mergeExperienceIntervals(positions).reduce((monthsTotal, interval) => {
    const { years, months } = getExperienceParts(interval.start, interval.endExclusive);
    return monthsTotal + years * 12 + months;
  }, 0);

  const displayYears = Math.floor(totalMonths / 12);
  const displayMonths = totalMonths % 12;

  if (displayYears === 0) {
    return `${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
  } else if (displayMonths === 0) {
    return `${displayYears} year${displayYears > 1 ? 's' : ''}`;
  } else {
    return `${displayYears}+ years`;
  }
};

export const calculateTotalCompaniesServed = (positions: Array<{company: string}>) => {
  const uniqueCompanies = new Set(positions.map(position => position.company));
  return uniqueCompanies.size;
};


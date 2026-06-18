/**
 * Calculate available hours per year for a designer
 * Formula: (standardHoursPerWeek × weeksPerYear) - all adjustments
 */
export function calculateAvailableHours(capacitySettings) {
  const {
    standardHoursPerWeek,
    weeksPerYear,
    ptoHoursPerYear,
    holidaysHoursPerYear,
    ldHoursPerYear,
    okrPlanningHoursPerYear
  } = capacitySettings;

  return (
    standardHoursPerWeek * weeksPerYear -
    ptoHoursPerYear -
    holidaysHoursPerYear -
    ldHoursPerYear -
    okrPlanningHoursPerYear
  );
}

/**
 * Calculate allocated hours per year for a designer
 * Formula: availableHours × (sum of allocation percentages / 100)
 */
export function calculateAllocatedHours(designer, capacitySettings) {
  const availableHours = calculateAvailableHours(capacitySettings);
  const totalAllocationPercentage = designer.allocations.reduce(
    (sum, allocation) => sum + allocation.percentage,
    0
  );
  return availableHours * (totalAllocationPercentage / 100);
}

/**
 * Calculate utilization percentage for a designer
 * Formula: (allocatedHours / availableHours) × 100
 */
export function calculateUtilization(designer, capacitySettings) {
  const availableHours = calculateAvailableHours(capacitySettings);
  const allocatedHours = calculateAllocatedHours(designer, capacitySettings);

  if (availableHours === 0) return 0;

  return (allocatedHours / availableHours) * 100;
}

/**
 * Calculate monthly run rate for a designer
 * Formula: (blendedRate × availableHours) / 12
 */
export function calculateMonthlyRunRate(designer, capacitySettings) {
  const availableHours = calculateAvailableHours(capacitySettings);
  const blendedRate = capacitySettings.ratesByLevel[designer.level].blended;
  const annualCost = blendedRate * availableHours;
  return annualCost / 12;
}

/**
 * Get color code for utilization percentage
 * < 70%: Gray, 70-100%: Green, > 100%: Red
 */
export function getUtilizationColor(utilization) {
  if (utilization < 70) return '#9ca3af';
  if (utilization <= 100) return '#2e7d32';
  return '#d32f2f';
}

/**
 * Get status label for utilization
 */
export function getUtilizationStatus(utilization) {
  if (utilization < 70) return 'under';
  if (utilization <= 100) return 'good';
  return 'over';
}

import {
  calculateAvailableHours,
  calculateAllocatedHours,
  calculateUtilization,
  calculateMonthlyRunRate,
  getUtilizationColor,
  getUtilizationStatus
} from './calculations';

describe('calculations', () => {
  const mockSettings = {
    standardHoursPerWeek: 40,
    weeksPerYear: 52,
    ptoHoursPerYear: 120,
    holidaysHoursPerYear: 80,
    ldHoursPerYear: 24,
    okrPlanningHoursPerYear: 16,
    ratesByLevel: {
      APD: { actual: 100, blended: 125 },
      PD: { actual: 120, blended: 150 },
      SPD: { actual: 150, blended: 180 }
    }
  };

  describe('calculateAvailableHours', () => {
    it('should calculate available hours correctly', () => {
      const result = calculateAvailableHours(mockSettings);
      expect(result).toBe(1840); // (40 * 52) - 120 - 80 - 24 - 16
    });
  });

  describe('calculateAllocatedHours', () => {
    it('should calculate allocated hours for 100% allocation', () => {
      const designer = {
        allocations: [
          { productTeamId: 'team-1', percentage: 100 }
        ]
      };
      const result = calculateAllocatedHours(designer, mockSettings);
      expect(result).toBe(1840);
    });

    it('should calculate allocated hours for 50% allocation', () => {
      const designer = {
        allocations: [
          { productTeamId: 'team-1', percentage: 50 }
        ]
      };
      const result = calculateAllocatedHours(designer, mockSettings);
      expect(result).toBe(920);
    });

    it('should sum multiple allocations', () => {
      const designer = {
        allocations: [
          { productTeamId: 'team-1', percentage: 50 },
          { productTeamId: 'team-2', percentage: 30 }
        ]
      };
      const result = calculateAllocatedHours(designer, mockSettings);
      expect(result).toBe(1472); // 1840 * 0.8
    });

    it('should return 0 for no allocations', () => {
      const designer = { allocations: [] };
      const result = calculateAllocatedHours(designer, mockSettings);
      expect(result).toBe(0);
    });
  });

  describe('calculateUtilization', () => {
    it('should calculate 100% utilization', () => {
      const designer = {
        allocations: [{ productTeamId: 'team-1', percentage: 100 }]
      };
      const result = calculateUtilization(designer, mockSettings);
      expect(result).toBe(100);
    });

    it('should calculate 50% utilization', () => {
      const designer = {
        allocations: [{ productTeamId: 'team-1', percentage: 50 }]
      };
      const result = calculateUtilization(designer, mockSettings);
      expect(result).toBe(50);
    });

    it('should handle over-allocation', () => {
      const designer = {
        allocations: [
          { productTeamId: 'team-1', percentage: 80 },
          { productTeamId: 'team-2', percentage: 40 }
        ]
      };
      const result = calculateUtilization(designer, mockSettings);
      expect(result).toBe(120);
    });

    it('should return 0 for no allocations', () => {
      const designer = { allocations: [] };
      const result = calculateUtilization(designer, mockSettings);
      expect(result).toBe(0);
    });
  });

  describe('calculateMonthlyRunRate', () => {
    it('should calculate monthly run rate for APD', () => {
      const designer = { level: 'APD' };
      const result = calculateMonthlyRunRate(designer, mockSettings);
      // $125/hr × 1840 hrs = $230,000/yr / 12 = $19,166.67/mo
      expect(result).toBeCloseTo(19166.67, 2);
    });

    it('should calculate monthly run rate for PD', () => {
      const designer = { level: 'PD' };
      const result = calculateMonthlyRunRate(designer, mockSettings);
      // $150/hr × 1840 hrs = $276,000/yr / 12 = $23,000/mo
      expect(result).toBeCloseTo(23000, 2);
    });

    it('should calculate monthly run rate for SPD', () => {
      const designer = { level: 'SPD' };
      const result = calculateMonthlyRunRate(designer, mockSettings);
      // $180/hr × 1840 hrs = $331,200/yr / 12 = $27,600/mo
      expect(result).toBeCloseTo(27600, 2);
    });
  });

  describe('getUtilizationColor', () => {
    it('should return gray for under-allocation', () => {
      expect(getUtilizationColor(0)).toBe('#9ca3af');
      expect(getUtilizationColor(50)).toBe('#9ca3af');
      expect(getUtilizationColor(69)).toBe('#9ca3af');
    });

    it('should return green for good utilization', () => {
      expect(getUtilizationColor(70)).toBe('#2e7d32');
      expect(getUtilizationColor(85)).toBe('#2e7d32');
      expect(getUtilizationColor(100)).toBe('#2e7d32');
    });

    it('should return red for over-allocation', () => {
      expect(getUtilizationColor(101)).toBe('#d32f2f');
      expect(getUtilizationColor(120)).toBe('#d32f2f');
    });
  });

  describe('getUtilizationStatus', () => {
    it('should return "under" for under-allocation', () => {
      expect(getUtilizationStatus(0)).toBe('under');
      expect(getUtilizationStatus(69)).toBe('under');
    });

    it('should return "good" for good utilization', () => {
      expect(getUtilizationStatus(70)).toBe('good');
      expect(getUtilizationStatus(100)).toBe('good');
    });

    it('should return "over" for over-allocation', () => {
      expect(getUtilizationStatus(101)).toBe('over');
      expect(getUtilizationStatus(150)).toBe('over');
    });
  });
});

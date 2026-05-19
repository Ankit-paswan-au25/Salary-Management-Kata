export type SalaryBreakdown = {
  grossSalary: number;
  deductions: number;
  netSalary: number;
};

function getDeductionRate(country: string): number {
  if (country === 'India') {
    return 0.1;
  }
  if (country === 'United States') {
    return 0.12;
  }
  return 0;
}

export function calculateSalary(
  grossSalary: number,
  country: string,
): SalaryBreakdown {
  const deductions = grossSalary * getDeductionRate(country);
  const netSalary = grossSalary - deductions;

  return { grossSalary, deductions, netSalary };
}

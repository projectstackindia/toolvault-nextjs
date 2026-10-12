export interface AgeResult {
  years: number
  months: number
  days: number
}

export const calculateAge = (birthDate: Date): AgeResult => {
  const today = new Date()
  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }
  return { years, months, days }
}

export const calculateBMI = (weight: number, heightCm: number): number => {
  const heightM = heightCm / 100
  return weight / (heightM * heightM)
}

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

export const calculateDateDifference = (start: Date, end: Date) => {
  const diffMs = end.getTime() - start.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30.44)
  const years = Math.floor(days / 365.25)
  return { days, weeks, months, years }
}
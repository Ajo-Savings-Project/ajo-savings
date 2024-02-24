export function findMissingNumbers(number: number, inputArray: number[]) {
  if (!Array.isArray(inputArray) || typeof number !== 'number') {
    return []
  }

  const lessthanOrEqualNumber = inputArray.filter((num) => num <= number)

  const missingNumbers = []
  for (let i = 1; i <= number; i++) {
    if (!lessthanOrEqualNumber.includes(i)) {
      missingNumbers.push(i)
    }
  }
  if (missingNumbers.length == 1) {
    return missingNumbers
  }
  return (
    missingNumbers.slice(0, -1).join(', ') +
    (missingNumbers.length > 1
      ? ` and ${missingNumbers[missingNumbers.length - 1]}`
      : '')
  )
}

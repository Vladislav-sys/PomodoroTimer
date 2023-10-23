export const secondsToTime = (seconds: number): string => {
  let mins: string = String(Math.floor(seconds / 60))
  let secs: string = String(seconds % 60)
  if (mins.length === 1) mins = "0" + mins
  if (secs.length === 1) secs = "0" + secs
  return `${mins}:${secs}`
}

export const timeToSeconds = (time: string): number => {
  const parts: string[] = time.split(":")
  return parseInt(parts[0]) * 60 + parseInt(parts[1])
}

export const wait = async (ms: number): Promise<void> => {
  await new Promise<void>((res) =>
    setTimeout(() => {
      res()
    }, ms),
  )
}

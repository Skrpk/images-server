export default interface IScheduler {
  schedule: (cronTime: string, callback: () => void) => void
}
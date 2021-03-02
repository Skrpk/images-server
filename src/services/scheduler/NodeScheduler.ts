import schedule from 'node-schedule';

import IScheduler from './IScheduler';

class NodeScheduler implements IScheduler {
  schedule(cronTime: string, callback: () => void) {
    schedule.scheduleJob(cronTime, callback);
  }
}

export default NodeScheduler;

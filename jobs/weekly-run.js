import { sendWeeklyEmail, sendTestingEmail } from './batch-send.js'

const eventName = process.env.GITHUB_EVENT_NAME;

if (eventName === 'workflow_dispatch') {
  sendTestingEmail();
} else if (eventName === 'schedule') {
  sendWeeklyEmail();
}


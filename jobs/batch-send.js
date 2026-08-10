import { getAllSignupData, updateCount } from './firebase.js';
import { sendEmail } from './send-email.js';

export async function sendWeeklyEmail() {
  const allData = await getAllSignupData();
  for (const item of allData) {
    if (item.count > 6) continue;

    const fileName = `day${item.count + 1}`;

    try {
      // Await email delivery if sendEmail returns a Promise
      await sendEmail(item.email, `${fileName}.html`, fileName);

      await updateCount(item, item.count);
      console.log("Count increment code executed without runtime errors!");
    } catch (error) {
      console.error(`Error processing ${item.email}: `, error);
    }
  }
}

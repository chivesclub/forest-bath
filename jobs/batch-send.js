import { getAllSignupData, updateCount } from './firebase.js';

async function sendEmail(email, count) {
	var fileName = "Nothing";
    switch (count){
		case 0: fileName = "day1.html"; break;
		case 1: fileName = "day2.html"; break;
		case 2: fileName = "day3.html"; break;
		case 3: fileName = "day4.html"; break;
		case 4: fileName = "day5.html"; break;
		case 5: fileName = "day6.html"; break;
		case 6: fileName = "day7.html"; break;
		default: return;
	}

	try {
    // Replace with your actual deployed Vercel domain URL
    const response = await fetch('https://forest-bath-eight.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, fileName: fileName }),
    });

    const data = await response.json();

    if (!response.ok) console.error('Error: ' + data.error);
  } catch (error) {
    console.error('Network error:', error);
  }

}


export async function sendWeeklyEmail() {
  const allData = await getAllSignupData();
  allData.forEach(item => {
    sendEmail(item.email, item.count);
	try {
    	if (item.count < 7) {
			updateCount(item, item.count);
    		console.log("Count increment code executed without runtime errors!");
		}
	} 
	catch (error) {
		console.error("Error incrementing count: ", error);
	}
    
  });
}

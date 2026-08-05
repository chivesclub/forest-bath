import { getAllSignupData, updateCount } from './firebase.js';

async function sendEmail(email, count) {
	var fileName = "test.html";
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
  fileName = "test.html";
  try {
    // Replace with your actual deployed Vercel domain URL
    const response = await fetch('https://forest-bath-eight.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, fileName: fileName }),
    });

     if (!response.ok) {
      const errorText = await response.text(); // Safely read the HTML/Text error page
      console.error(`Vercel API failed with status ${response.status}: ${errorText}`);
      return; // Stop execution for this item so it doesn't try to parse JSON
    }

    // 2. Only parse as JSON if the network request was successful
    const data = await response.json();
    console.log('Email sent successfully:', data);
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

import { getAllSignupData, updateCount } from './firebase.js';


function sendEmail(userEmail, count) {
	var templateID = "Nothing";
    switch (count){
		case 0: templateID = "template_ia5kmaa"; break;
		case 1: templateID = "template_e53ugey"; break;
		case 2: templateID = "template_2csycwb"; break;
		case 3: templateID = "template_ahnme5f"; break;
		case 4: templateID = "template_yumuumt"; break;
		case 5: templateID = "template_e3hx6qv"; break;
		case 6: templateID = "template_kccr2cu"; break;
		default: return;
	}

}


async function sendWeeklyEmail() {
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

export { sendWeeklyEmail };

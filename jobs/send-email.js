export async function sendEmail(email, fileName, ...attachments) {
  try {
    // Replace with your actual deployed Vercel domain URL
    const response = await fetch('https://forest-bath-eight.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, fileName: fileName, attachments: attachments }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Success! Check your inbox.');
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
    alert('Something went wrong connecting to the server.');
  }
}

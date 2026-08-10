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
  } catch (error) {
    console.error('Network error:', error);
  }
}

export async function sendEmail(email, fileName, attachmentFolder) {
  try {
    // Replace with your actual deployed Vercel domain URL
    const response = await fetch('https://forest-bath-eight.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, fileName: fileName, attachmentFolder: attachmentFolder }),
    });

    const data = await response.json();
  } catch (error) {
    console.error('Network error:', error);
  }
}

export async function sendCustomEmail(email, htmlContent) {
   try {
    // Replace with your actual deployed Vercel domain URL
    const response = await fetch('https://forest-bath-eight.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, customHTML: htmlContent }),
    });

    const data = await response.json();
  } catch (error) {
    console.error('Network error:', error);
  }
}

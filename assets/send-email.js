function sendEmail(email){
  try {
    // Replace with your actual deployed Vercel domain URL
    const response = await fetch('https://forest-bath-chive-club.vercel.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, subject: "[TESTING] Confirmation Email", content: "<p>You've signed up!</p>" }),
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

export { sendEmail };

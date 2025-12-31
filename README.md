# Fresh Start Multiservices - Coming Soon Page

A modern, responsive coming soon page for Fresh Start Multiservices, matching the brand's distinctive green, black, and white color scheme.

## Features

- **Countdown Timer**: Dynamic countdown to launch date (set to 30 days from now by default)
- **Email Notification Signup**: Allow visitors to subscribe for launch notifications
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging fade-in animations and hover effects
- **Interactive Elements**: Parallax mouse-tracking decorative circles
- **Brand Consistent**: Matches Fresh Start Multiservices' brand colors and style

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and responsive design
- `script.js` - Countdown timer and interactive functionality

## Customization

### Change Launch Date

Edit `script.js` line 2-3 to set your desired launch date:

```javascript
const launchDate = new Date('2025-02-28'); // Set specific date
```

### Update Colors

The color scheme is defined in `style.css` using CSS variables:

```css
:root {
    --primary-green: #00FF88;
    --dark-bg: #0a0a0a;
    --light-bg: #f5f5f5;
    --text-dark: #1a1a1a;
    --text-light: #ffffff;
    --text-gray: #888888;
}
```

### Connect Email Signup

In `script.js`, add your backend endpoint in the form submission handler (currently shows a success message only):

```javascript
// Add your API call here to save the email
fetch('your-api-endpoint', {
    method: 'POST',
    body: JSON.stringify({ email: email })
});
```

#### Email Submition - Web3Forms

- Access Key: bbc58898-52f9-4dd9-9a26-4e36c1ee66f1

##### **HTML**

```html

<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="bbc58898-52f9-4dd9-9a26-4e36c1ee66f1">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Submit</button>
</form>

```

##### **JavaScript**

```js

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "bbc58898-52f9-4dd9-9a26-4e36c1ee66f1");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

```

##### **React**

```js

import { useState } from 'react';

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "bbc58898-52f9-4dd9-9a26-4e36c1ee66f1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" required/>
      <input type="email" name="email" required/>
      <textarea name="message" required></textarea>
      <button type="submit">Submit</button>
      <p>{result}</p>
    </form>
  );
}

```

## Usage

Simply open `index.html` in a web browser or deploy to your web hosting service.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

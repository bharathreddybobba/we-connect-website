import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; 

const app = express();
const port = 5500; 

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle messages from frontend and communicate with Rasa
app.post('/api/chat', async (req, res) => {
    try {
        const message = req.body.message;

        // Your existing code for handling chat messages
        // Here you can call your NLP system (e.g., Rasa) to process the message and generate a response
        const botResponse = await callNLPSystem(message);

        // Send the bot response back to the client
        res.json({ botResponse });
    } catch (error) {
        console.error('Error handling chat message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to call the NLP system (e.g., Rasa) and get the bot response
async function callNLPSystem(message) {
    // Make a request to the NLP system's API endpoint
    // Example:
const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
    method: 'POST',
    headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ sender: 'user', message: message })
     });

    // Parse the response from the NLP system
     const data = await response.json();

    // Extract and return the bot response from the data
    // Example:
    // return data && data.length > 0 && data[0].text ? data[0].text : 'Sorry, I could not understand that.';

    // Placeholder return statement (replace with actual logic)
    return 'This is a placeholder response from the bot.';
}

// Endpoint for user login
app.post('/api/login', (req, res) => {
    try {
        // Implement login logic here
        const { username, password } = req.body;
        // Example login logic:
        if (username === 'example' && password === 'password') {
            // Authentication successful
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Authentication failed
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error handling login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for payment
app.post('/api/payment', (req, res) => {
    try {
        // Implement payment logic here
        // Example payment logic:
        const { amount, cardNumber, expiryDate, cvv } = req.body;
        // Process payment...
        res.status(200).json({ message: 'Payment successful' });
    } catch (error) {
        console.error('Error handling payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for user registration
app.post('/api/registration', (req, res) => {
    try {
        // Implement registration logic here
        const { username, email, password } = req.body;
        // Example registration logic:
        // Store user data in database...
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error handling registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

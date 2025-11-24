const express = require('express');
const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password, remember } = req.body;

  if(validUser(email, password)) {
    const token = createTokenForUser(email);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/verifyToken', (req, res) => {
  const { token } = req.body;
  const user = verifyToken(token); // returns user info if valid
  if(user) {
    res.json({ valid: true, user });
  } else {
    res.json({ valid: false });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

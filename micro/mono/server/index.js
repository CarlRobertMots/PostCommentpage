const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

const postRoutes = require('./routes/posts');
app.use('/posts', postRoutes);



app.get('/', (req, res) => {
    res.send('sup')
});

app.listen(PORT, () => {
  console.log(`Mono server is running on http://localhost:${PORT}`);
});
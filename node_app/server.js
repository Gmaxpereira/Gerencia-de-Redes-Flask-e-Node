const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; 

app.use(express.json()); 

// Endpoint 
app.post('/run_python_script', async (req, res) => {
    const pythonCode = req.body.code; 

    if (!pythonCode) {
        return res.status(400).json({ error: "Nenhum código Python fornecido na requisição." });
    }

    try {
        const flaskResponse = await axios.post('http://127.0.0.1:5000/execute_python_code', {
            code: pythonCode
        });

        res.json(flaskResponse.data);
    } catch (error) {
        console.error("Erro ao se comunicar com a aplicação Flask:", error.message);

        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Erro interno ao processar a requisição." });
        }
    }
});

app.get('/', (req, res) => {
    res.send('Aplicação Node.js rodando! Use /run_python_script com um POST para executar código Python.');
});

app.listen(port, () => {
    console.log(`Node.js app listening at http://localhost:${port}`);
});
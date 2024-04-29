const express = require('express');
const { Pool } = require('pg')
const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harry_potter', 
    password: 'ds564', 
    port: 5432, 
  });

  app.get('/bruxos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM bruxos');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao obter bruxos');
    }
  });

  app.get('/bruxos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        res.status(404).send('Bruxo não encontrado');
        return;
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar bruxo');
    }
  });

  app.post('/bruxos', async (req, res) => {
    try {
      const { nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono } = req.body;
      await pool.query('INSERT INTO bruxos (nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono]);
      res.status(201).send('Bruxo adicionado com sucesso');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao adicionar bruxo');
    }
  });

  app.put('/bruxos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono } = req.body;
      await pool.query('UPDATE bruxos SET nome = $1, idade = $2, casa_hogwarts = $3, habilidade_especial = $4, status_sangue = $5, patrono = $6 WHERE id = $7', [nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono, id]);
      res.status(200).send('Bruxo atualizado com sucesso');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar bruxo');
    }
  });

  app.delete('/bruxos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
      res.status(200).send('Bruxo removido com sucesso');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao remover bruxo');
    }
  });
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Pizzaria 2 Irmãos', docs });
  } catch (err) {
    next(err);
  }
})
//renderizar a pagina
router.get('/realizar_pedido', (req, res, next) => {
  res.render('new', { title: 'Novo Pedido de Pizza', doc: {"nome_cli":"","bairro_cli":"","rua_cli":"","numero_cli":"","descricao_pedido":"","valor_pedido":""}, action: '/realizar_pedido' });
});
//realizar o pedido
router.post('/realizar_pedido', async (req, res, next) => {
  const nome_cli = req.body.nome_cli;
  const bairro_cli = req.body.bairro_cli;
  const rua_cli = req.body.rua_cli;
  const numero_cli = req.body.numero_cli;
  const descricao_pedido = req.body.descricao_pedido;
  const valor_pedido = req.body.valor_pedido;
  

  try {
    const result = await global.db.insert({ nome_cli, bairro_cli, rua_cli, numero_cli, descricao_pedido, valor_pedido });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

//editar o pedido
router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const doc = await global.db.findOne(id);
    res.render('new', { title: 'Edição de Pedido', doc, action: '/edit/' + doc._id });
  } catch (err) {
    next(err);
  }
})

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const nome_cli = req.body.nome_cli;
  const bairro_cli = req.body.bairro_cli;
  const rua_cli = req.body.rua_cli;
  const numero_cli = req.body.numero_cli;
  const descricao_pedido = req.body.descricao_pedido;
  const valor_pedido = req.body.valor_pedido;

  try {
    const result = await global.db.update(id, { nome_cli, bairro_cli, rua_cli, numero_cli, descricao_pedido, valor_pedido });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})
//deletar pedido
router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await global.db.deleteOne(id);
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

module.exports = router;

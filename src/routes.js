import { Router } from "express";
import Regiao from "./models/regiao.js";
import User from "./models/User.js";
import Meliponario from "./models/Meliponario.js";


const router = Router();

router.get('/', (req, res) => res.redirect('/index.html'));

//router.get('/meliponarios?', async (req, res) => {
// const regioes = req.query.regioes;

// if (regioes) {
 //  Meliponario.ReadByregioes(regioes);
// const regioes = await Meliponario.ReadByregioes(regioes);
//   reg.style.display ="none"
 // } else {
//    Meliponario.readAll();
// }
 // const meliponarios = await Meliponario.readAll();
//res.json(regioes);
 // res.json(meliponarios);
// });

router.get('/meliponarios', async (req, res) => {
 try {
 const regioes = req.query.regioes;

   let meliponarios = [];

  if (regioes)
    meliponarios = await Meliponario.ReadByregioes()
 else 
    meliponarios = await Meliponario.readAll();

 res.json(meliponarios);
 } catch(error) {
    throw new Error('Error in list meliponarios');
  }
});


router.post('/meliponarios', async (req, res) => {
  try {
  const meliponario = req.body;

  const newMeliponario = await Meliponario.create(meliponario);

  // console.log('New', newMeliponario)

  res.json(newMeliponario);
  } catch(error) {
    throw new Error('Error in create food');
  }
});

router.put('/meliponarios/:id', async (req, res) => {
   try {
  const id = Number(req.params.id);

  const meliponario = req.body;

  const newMeliponario = await Meliponario.update(meliponario, id);

  if (newMeliponario) {
    res.json(newMeliponario);
  } else {
    res.status(400).json({ error: 'Meliponario não encontrado.' });
  }
  } catch(error) {
    throw new Error('Error in update meliponarios');
 }
});

router.delete('/meliponarios/:id', async (req, res) => {
   try {
  const id = Number(req.params.id);

  if (await Meliponario.destroy(id)) {
    res.status(204).send();
  } else {
    res.status(400).json({ error: 'Meliponário não encontrado.' });
  }
 } catch(error) {
    throw new Error('Error in delete meliponarios');
 }
});

router.get('/regioes', async (req, res) => {
  try {
  const regioes = await Regiao.readAll();

  res.json(regioes);
   } catch(error) {
    throw new Error('Error in list regioes');
  }  
});

router.post('/users', async (req, res) => {
  try {
    const user = req.body;

    const newUser = await User.create(user);

    res.json(newUser);
  } catch(error) {
    throw new Error('Error in create user');
  }
});

router.use(function(req, res, next) {
  res.status(404).json({
    message: 'Content not found'
  });
});

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something broke!'
  });
});

export default router;
//Require
const Sauce = require('../models/Sauce');
const fs = require('fs');
const { json } = require('body-parser');
const sauce = require('../routes/sauce');

//Créer une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
    });
    sauce.save()
    .then(()=> res.status(201).json({message: 'Sauce enregistré'}))
    .catch(error => res.status(400).json({ error }))
};


//Afficher toutes les sauces
exports.getAllSauces = (req, res, next ) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
}

exports.getOneSauce = (req, res, next) => {
   Sauce.findById(req.params.id).then(
      (sauce) => {
        if (!sauce) {
          return res.status(404).send(new Error('Product not found!'));
        }
        sauce.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + sauce.imageUrl;
        res.status(200).json(sauce);
      }
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    )
  };

  exports.modifySauces = (req, res, next ) => {
    const sauceObject = req.fil ? {
      ...JSON.parse(req.body.sauce),
      imageUrl:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }: {...req.body};

    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
        if(Sauce._userId != req.auth.userId){
          res.status(401).json({message:'Non autorisé'})
        }else{
          Sauce.updateOne({_id: req.params.id},{...sauceObject, _id:req.params.id})
          .then(() => res.status(200).json({message: 'Sauce modifié'}))
          .catch(error => res.status(401).json({ error }))
        }
      })
      .catch(error => res.status(400).json({ error }))

  };
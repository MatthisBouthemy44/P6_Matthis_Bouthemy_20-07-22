const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sauce = require('../models/Sauce');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée!' }))
                .catch(error => res.status(400).json({ error }));
        }).catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(401).json({ message: 'not authorized' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ message: 'not authorized' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                }).catch(error => res.status(500).json({ error }));

        }).catch(error => res.status(500).json({ error }));
};


/*exports.sauces = (req, res, next) => {
    const newSauce = new Sauce({
      ...req.body //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
    });
    newSauce.save()
      .then(() => res.status(201).json({message: 'Nouvel Sauce enregistré !'}))
      .catch(error => res.status(400).json({error}));
  };*/
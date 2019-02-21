const express = require('express');
const router = express.Router();
const Contact = require('../../database/models/Contact');

/************************
 *  LOGIN / LOGOUT
************************/

router.post('/register', (req, res) => {
  User.where({ username: req.body.username }).fetch()
    .then((dbUser) => {
      if (dbUser) {
        res.status(400);
        return res.json({ success: false });
      }

      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          res.status(500);
          res.json({ success: false });
        }

        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            res.status(500);
            res.json({ success: false });
          }

          return new User({
            username: req.body.username,
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
          })
            .save()
            .then((user) => {
              return res.json({ success: true });
            })
            .catch((err) => {
              res.status(500);
              return res.json({ success: false });
            });
        });
      });
    });
});

router.post('/login', (req, res) => {
  return res.json({ success: true });
});

router.post('/logout', (req, res) => {
  req.logout();
  return res.json({});
});

/************************
 *  GET
************************/

router.get('/profile', (req, res) => {
  let id = req.query.user;
  User.where({ id: id }).fetch()
    .then((user) => {
      user = user.attributes;
      const profile = {
        username: user.username,
        name: user.name,
        address: user.address,
        email: user.email
      }
      res.json(profile);
    });
});

router.get('/contacts', (req, res) => {
  let id = req.query.user;
  Contact.where({ created_by: id }).fetchAll()
    .then((contacts) => {
      contacts = contacts.models;
      return res.json({ contacts: contacts });
    });
});

router.get('/contacts/search/:term', (req, res) => {
  let id = req.query.user;
  let query = req.params.term;

  Contact.query(function (qb) {
    qb.where({ created_by: id })
      .andWhere(function () {
        this.whereRaw('LOWER(name) LIKE ?', '%' + query.toLowerCase() + '%')
          .orWhereRaw('LOWER(address) LIKE ?', '%' + query.toLowerCase() + '%')
          .orWhereRaw('LOWER(email) LIKE ?', '%' + query.toLowerCase() + '%')
          .orWhereRaw('LOWER(twitter) LIKE ?', '%' + query.toLowerCase() + '%')
          .orWhereRaw('LOWER(instagram) LIKE ?', '%' + query.toLowerCase() + '%')
          .orWhereRaw('LOWER(github) LIKE ?', '%' + query.toLowerCase() + '%')
      })
  }).fetchAll()
    .then((contacts) => {
      return res.json({ contacts });
    });
});

router.get('/contacts/:id', (req, res) => {
  const id = req.params.id;

  Contact.where({ id: id }).fetch()
    .then((contact) => {
      contact = contact.attributes;
      return res.json(contact);
    })
});


/************************
 *  POST
************************/

router.post('/contacts', (req, res) => {
  const newContact = req.body;

  Contact.forge({
    name: newContact.name,
    address: newContact.address,
    mobile: newContact.mobile,
    work: newContact.work,
    home: newContact.home,
    email: newContact.email,
    twitter: newContact.twitter,
    instagram: newContact.instagram,
    github: newContact.github,
    created_by: newContact.created_by
  }).save(null, { method: 'insert' })
    .then((contact) => {
      console.log(contact);
      return res.json({ contact });
    });
});

/************************
 *  PUT
************************/

router.put('/users', (req, res) => {
  const id = req.query.id;
  const user = req.body;

  new User({ id: id }).fetch()
    .save({
      username: user.username,
      name: user.name,
      email: user.email,
      address: user.address
    }, { patch: true })
    .then((user) => {
      return res.json({ user });
    });
});

router.put('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  Contact.where({ id: id }).fetch()
    .then((contact) => {
      if (contact.attributes.created_by !== req.user.id) {
        return res.json({ success: false });
      }

      new Contact({ id: id })
        .save({
          name: newData.name,
          address: newData.address,
          mobile: newData.mobile,
          work: newData.work,
          home: newData.home,
          email: newData.email,
          twitter: newData.twitter,
          instagram: newData.instagram,
          github: newData.github,
        }, { patch: true })
        .then((contact) => {
          return res.json({ contact });
        });
    });
})


/************************
 *  DELETE
************************/

router.delete('/contacts/:id', (req, res) => {
  const id = req.params.id

  Contact.where({ id: id }).fetch()
    .then((contact) => {
      if (contact.attributes.created_by !== req.user.id) {
        return res.json({ success: false });
      }

      new Contact({ id: id })
        .destroy()
        .then(() => {
          res.status(200);
          res.json({ success: true });
        });
    });
});


module.exports = router;
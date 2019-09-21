const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const crypto = require('crypto');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.candidates = functions.https.onRequest(async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', '*');
    switch (req.method) {
      case 'OPTIONS': {
        res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send();
        break;
      }
      case 'GET': {
        const data = await db.collection('candidates').get();
        const candidates = data.docs.map(c => c.data());
        res.json({ result: candidates });
        break;
      }
      case 'POST': {
        const id = uid(req.body.email);
        const candidate = {
          nombre: req.body.nombre,
          cp: req.body.cp,
          email: req.body.email,
          fecha_nacimiento: moment(
            req.body.fecha_nacimiento,
            'DD/MM/YYYY'
          ).valueOf(),
        };
        await db
          .collection('candidates')
          .doc(id)
          .set(candidate);
        res.status(201).json(candidate);
        break;
      }
      default: {
        res.status(400).send();
      }
    }
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// To allow us to overwrite existing records (without compromising user information)
// we turn the email into a UID using MD5
function uid(email) {
  return crypto
    .createHash('md5')
    .update(email)
    .digest('hex');
}

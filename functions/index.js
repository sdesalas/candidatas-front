const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const crypto = require('crypto');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

/**
 * HTTP API for /candidates
 * supports GET, POST and OPTIONS methods
 */
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

/**
 * Event triggered whenever there is an update to the database.
 * It sets the edad (age) of the candidate.
 */
exports.onWrite = functions.firestore
  .document('candidates/{uid}')
  .onWrite(async (change, context) => {
    const MILLISECONDS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365;
    const uid = context.params.uid;
    if (!change.after.exists) return; // DELETE? Do nothing.
    try {
      const data = change.after.data();
      const fecha_nacimiento = data && data.fecha_nacimiento;
      const edad = Math.floor(
        (new Date().getTime() - fecha_nacimiento) / MILLISECONDS_IN_A_YEAR
      );
      db.collection('candidates')
        .doc(uid)
        .set({ edad }, { merge: true });
    } catch (err) {
      console.error(err);
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

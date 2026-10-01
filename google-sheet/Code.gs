/**
 * Brouillard : reçoit chaque mesure du téléphone et l'ajoute comme ligne dans ce Google Sheet.
 * Reçoit aussi les données de santé envoyées par le Raccourci iOS et les range sur la même ligne.
 *
 * Installation (une seule fois) :
 *  1. Créer un Google Sheet vide dans Drive (ex. « Brouillard »).
 *  2. Menu Extensions > Apps Script. Remplacer tout le contenu par ce fichier. Enregistrer.
 *  3. Déployer > Nouveau déploiement > type « Application Web ».
 *       Exécuter en tant que : Moi
 *       Qui a accès : Tout le monde
 *  4. Autoriser, puis copier l'URL qui finit par /exec.
 *  5. Dans l'application, ⚙︎ > coller l'URL > OK.
 *
 * L'URL fait office de clé : quiconque la connaît peut ajouter des lignes. Ne pas la publier.
 *
 * Deux types d'envoi, reliés par le même id :
 *   mesure : { id, iso, valeur, note, familles, emotions }   (envoyée par la page)
 *   santé  : { id, <nom>: <valeur>, … }  (envoyée par le Raccourci ; chaque nom devient une colonne)
 * L'ordre d'arrivée est indifférent.
 */

var ONGLET = 'Mesures';
var ENTETES = ['Horodatage', 'Valeur', 'Note', 'ISO (heure du téléphone)', 'id'];
var COL_ID = 5;

function doPost(e) {
  var verrou = LockService.getScriptLock();
  try {
    verrou.waitLock(10000);
    var d = JSON.parse(e.postData.contents);
    if (!d.id) throw new Error('id manquant');
    var id = String(d.id).trim();

    var classeur = SpreadsheetApp.getActiveSpreadsheet();
    var f = classeur.getSheetByName(ONGLET) || classeur.insertSheet(ONGLET);
    if (f.getLastRow() === 0) {
      f.appendRow(ENTETES);
      f.setFrozenRows(1);
      f.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
    }
    var ligne = trouverLigne(f, id);

    if (d.valeur !== undefined) {
      if (!d.iso || isNaN(Number(d.valeur))) throw new Error('mesure incomplète');
      var base = [new Date(d.iso), Number(d.valeur), String(d.note || ''), d.iso];
      if (!ligne) {
        f.appendRow(base.concat([id]));
      } else if (f.getRange(ligne, 1).getValue() === '') {
        // la santé est arrivée avant la mesure
        f.getRange(ligne, 1, 1, 4).setValues([base]);
      } else {
        // renvoi après une coupure réseau : pas de doublon
        return reponse({ ok: true, doublon: true });
      }
      var emotions = {};
      if (d.familles !== undefined) emotions['Familles'] = String(d.familles);
      if (d.emotions !== undefined) emotions['Émotions'] = String(d.emotions);
      ecrireParEntete(f, ligne || f.getLastRow(), emotions);
      return reponse({ ok: true });
    }

    if (!ligne) {
      f.appendRow(['', '', '', '', id]);
      ligne = f.getLastRow();
    }
    var sante = {};
    for (var cle in d) {
      if (cle !== 'id') sante[cle] = nombreSiPossible(d[cle]);
    }
    ecrireParEntete(f, ligne, sante);
    return reponse({ ok: true });
  } catch (err) {
    return reponse({ ok: false, erreur: String(err) });
  } finally {
    try { verrou.releaseLock(); } catch (err) {}
  }
}

// Range chaque valeur dans la colonne qui porte son nom, créée au besoin à la suite des autres
function ecrireParEntete(f, ligne, valeurs) {
  var entetes = f.getRange(1, 1, 1, f.getLastColumn()).getValues()[0];
  for (var cle in valeurs) {
    var col = entetes.indexOf(cle) + 1;
    if (!col) {
      entetes.push(cle);
      col = entetes.length;
      f.getRange(1, col).setValue(cle);
    }
    f.getRange(ligne, col).setValue(valeurs[cle]);
  }
}

function trouverLigne(f, id) {
  var n = f.getLastRow();
  if (n < 2) return 0;
  var trouve = f.getRange(2, COL_ID, n - 1, 1).createTextFinder(id).matchEntireCell(true).matchCase(true).findNext();
  return trouve ? trouve.getRow() : 0;
}

// Raccourcis envoie souvent les nombres en texte, parfois avec une virgule
function nombreSiPossible(v) {
  if (typeof v !== 'string') return v;
  var t = v.trim().replace(',', '.');
  return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : v;
}

function doGet() {
  return reponse({ ok: true, message: 'Brouillard est prêt' });
}

function reponse(objet) {
  return ContentService.createTextOutput(JSON.stringify(objet)).setMimeType(ContentService.MimeType.JSON);
}

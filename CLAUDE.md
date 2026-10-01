# Mesure brouillard

Application web installable sur téléphone : un gradateur de 0 à 10, un bouton Enregistrer, chaque mesure horodatée ajoutée dans un Google Sheet.

## Structure

- `app/` : l'application (page unique `index.html`, sans dépendance ni étape de build, plus manifeste, service worker et icônes). C'est ce dossier qui est publié.
- `google-sheet/Code.gs` : le script Apps Script collé dans le Google Sheet. Il reçoit les mesures et ajoute les lignes. Les étapes d'installation sont en tête du fichier.
- `raccourci/RACCOURCI.md` : montage du Raccourci iOS qui lit Santé (Apple Watch) et complète la ligne de la mesure, reliée par son `id`.
- `reference/` : documents de référence de Mathieu (taxonomie des émotions). Dossier privé, exclu du dépôt public par `.gitignore`.

## Règles propres au projet

- L'URL du script Google n'est jamais écrite dans le code : elle se saisit dans les réglages de l'application et reste dans le téléphone.
- Toute mesure est d'abord écrite localement, puis envoyée. Une mesure n'est jamais perdue faute de réseau.
- Après un changement dans `app/`, incrémenter `CACHE` dans `app/sw.js`.

## Publication

- Dépôt `mmmathieu77/brouillard` (public), page servie sur https://mmmathieu77.github.io/brouillard/ depuis la branche `gh-pages`.
- Publier une mise à jour : commit sur `main`, `git push`, puis `git subtree push --prefix app origin gh-pages`.

## Suivi

Registre des points : `SUIVI.md`.

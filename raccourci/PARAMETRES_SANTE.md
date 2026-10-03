# Paramètres de santé : appréciation de la liste de Mathieu

Avis de Claude du 3 octobre 2026 sur les 20 paramètres proposés, pour les croiser avec le score de brouillard.
Les valeurs de la montre sont des estimations, pas des mesures cliniques.

## Le constat de fond : deux rythmes

- Le brouillard se note **plusieurs fois par jour**.
- La plupart des paramètres n'ont **qu'une valeur par nuit ou par jour** (sommeil, température, FC au repos…).
- Les joindre à chaque mesure répète la même valeur sur toutes les lignes de la journée.
- D'où deux raccourcis : un **quotidien** (une ligne par jour, onglet « Jours ») et celui **par mesure** (l'instant).

## Verdict par paramètre

| N° | Paramètre | Verdict | Rythme | Remarque |
|---|---|---|---|---|
| 1 | Durée totale de sommeil | Garder, essentiel | Jour | Le premier suspect du brouillard |
| 2 | Phases (Awake, REM, Core, Deep) | Garder | Jour | Minutes par phase ; le découpage de la montre est approximatif |
| 3 | Régularité coucher / lever | Garder, autrement | Jour | Pas une donnée lisible : relever l'heure d'endormissement et de réveil, la régularité se calcule dans le Sheet. Le Sleep Score n'est probablement pas accessible aux Raccourcis |
| 4 | Fréquence respiratoire nocturne | Garder | Jour | Monte en cas d'infection ou de mauvaise nuit |
| 5 | Température du poignet | Garder | Jour | Écart à la ligne de base, signal précoce de maladie. Disponibilité dans Raccourcis à vérifier |
| 6 | Saturation en oxygène | Garder, secondaire | Jour | Peu parlant sauf trouble respiratoire du sommeil |
| 7 | Variabilité cardiaque (HRV) | Garder, essentiel | Jour + mesure | Peu d'échantillons et bruités : la moyenne de la nuit vaut mieux que le dernier échantillon |
| 8 | FC au repos | Garder, essentiel | Jour | |
| 9 | FC pendant le sommeil | Retirer | | Redondant avec 8, et difficile à calculer dans Raccourcis |
| 10 | Récupération cardio | Retirer | | N'existe qu'après un entraînement, trop rare pour corréler |
| 11 | Signes vitaux (Vitals) | Retirer | | Ce n'est pas une donnée mais un écran qui résume 4, 5, 6, 8 et le sommeil |
| 12 | Pas et distance | Garder les pas | Jour + mesure | La distance répète les pas |
| 13 | Minutes d'exercice | Garder | Jour + mesure | |
| 14 | Lumière du jour | Garder | Jour + mesure | Lien plausible avec l'éveil et l'humeur |
| 15 | Capacité cardio (VO2 max) | Retirer | | Bouge sur des semaines, inutile au jour le jour |
| 16 | Score de brouillard | Déjà fait | Mesure | C'est le cadran |
| 17 | État d'esprit (State of Mind) | Retirer | | Double emploi avec les émotions de l'application |
| 18 | Caféine et alcool | Garder, essentiel | Mesure | Rien n'est capté seul : à saisir. Plus simple dans l'application que dans Santé |
| 19 | Événements marquants | Déjà fait | Mesure | C'est la note |
| 20 | Médicaments et suppléments | Garder, autrement | Mesure | Probablement illisible par Raccourcis : à saisir dans l'application ou la note |

## Ce qui manque

- **Perturbations respiratoires du sommeil** (Breathing Disturbances) : indice d'apnée, cause classique de brouillard. Le plus important des absents.
- **Heure d'endormissement et heure de réveil** : pour la régularité (point 3) et la dette de sommeil.
- **Repas** : heure du dernier repas. Le brouillard d'après-repas est fréquent ; à saisir.
- **Hydratation** : facultatif, à saisir.

## Mise en garde de méthode

- Avec une quinzaine de paramètres, le hasard produit toujours quelques fausses corrélations.
- Il faut du volume avant de conclure : trois ou quatre mesures par jour pendant au moins quatre semaines.
- Commencer par le noyau (1, 2, 7, 8, 4, 5, 18, perturbations respiratoires), ajouter le reste ensuite.

## Décision du 3 octobre 2026

- Mathieu retient un **seul raccourci** : tout est capturé à chaque mesure.
- Les données quotidiennes se répètent donc sur les lignes d'une même journée. À l'analyse, on n'en garde qu'une valeur par jour, sans quoi une nuit compterait autant de fois qu'il y a de mesures ce jour-là.
- Le montage exact est dans `RACCOURCI.md`.

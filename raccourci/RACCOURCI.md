# Raccourci « Brouillard Santé »

Lancé par l'application à chaque Enregistrer. Il lit des données dans Santé et les envoie au Google Sheet, sur la même ligne que la mesure.

Principe retenu : **tout capturer à chaque mesure**, dans un seul raccourci. Les données qui n'ont qu'une valeur par jour se répètent sur les lignes de la journée ; c'est à l'analyse qu'on n'en garde qu'une par jour.

Les noms d'actions sont ceux d'un iPhone en anglais. Le choix des paramètres est expliqué dans `PARAMETRES_SANTE.md`.

## Structure du raccourci

```
Receive … input                      (créé par « Show in Share Sheet »)
Find All Health Samples …            (une action par donnée)
…
Get Contents of URL                  (une seule, avec un champ par donnée)
Go to Home Screen
```

Dans **Get Contents of URL** : Method **POST**, Request Body **JSON**, un champ Text `id` = **Shortcut Input**, puis un champ Text par donnée.
Chaque clé de champ devient une colonne du Sheet, créée seule à la première mesure.

## Recette 1 : dernière valeur connue

Pour les données mesurées de temps en temps ou une fois par nuit.

Action **Find Health Samples** :
- **Type is** : la donnée
- **Start Date is in the last 7 days**
- **Sort by : Start Date**, **Order : Latest First**
- **Limit : activé, 1**

Champ dans Get Contents of URL : valeur = le **Health Samples** de cette action, propriété **Value**.

| Type dans Santé | Clé du champ | État |
|---|---|---|
| Heart Rate | `FC` | Fonctionne |
| Heart Rate Variability | `HRV` | Fonctionne |
| Resting Heart Rate | `FC repos` | À monter |
| Respiratory Rate | `Respiration` | À monter |
| Blood Oxygen | `SpO2` | À monter |
| Wrist Temperature | `Temp poignet` | À monter, présence du type à vérifier |
| Breathing Disturbances | `Perturb resp` | À monter, présence du type à vérifier |
| Cardio Fitness (VO2 Max) | `VO2max` | Facultatif |
| Cardio Recovery | `Recup cardio` | Facultatif, vide sans entraînement récent |

## Recette 2 : cumul depuis le matin

Pour les données qui s'additionnent au fil de la journée. Un seul échantillon ne vaut rien : il faut le total du jour.

Action **Find Health Samples** :
- **Type is** : la donnée
- **Start Date is today**
- **Group by : Day**
- **Limit : désactivé**

Champ : valeur = le **Health Samples** de cette action, propriété **Value**.

| Type dans Santé | Clé du champ | État |
|---|---|---|
| Steps | `Pas` | À monter |
| Exercise Minutes | `Exercice min` | À monter |
| Time in Daylight | `Lumière min` | À monter |

À vérifier au premier essai : la cellule doit contenir un seul nombre, le total du jour, comparable à celui de l'app Santé. Si elle contient une liste de nombres, le dire à Claude : l'addition se fera côté script.

## Recette 3 : sommeil par phase

En cours de mise au point. Santé stocke le sommeil en tranches ; il faut les durées de toutes les tranches d'une phase.

Action **Find Health Samples**, une par phase :
- **Type is Sleep**
- **Value is** : Deep, puis Core, REM, Awake dans les trois autres
- **Start Date is in the last 1 days**
- **Limit : désactivé**

Champ : valeur = le **Health Samples** de cette action, propriété **Duration**.

Clés prévues : `Sommeil profond`, `Sommeil core`, `Sommeil REM`, `Sommeil éveil`. La durée totale de sommeil et les heures d'endormissement et de réveil seront calculées à partir de ces tranches.

Étape en attente : monter la phase Deep seule, puis rapporter le contenu exact de la cellule, pour que le script additionne les durées.

## Hors raccourci

- **Signes vitaux (Vitals)** et **Sleep Score** : des écrans de résumé, pas des données lisibles.
- **État d'esprit (State of Mind)** : couvert par les émotions de l'application.
- **FC pendant le sommeil** : trop lourde à isoler ; la FC au repos en tient lieu.
- **Caféine, alcool, médicaments, repas** : rien n'est capté par la montre. À saisir, de préférence dans l'application.

## Pièges

- **« Filter » au lieu de « Find All »** : une action de recherche ajoutée sous une autre se branche sur le résultat de la précédente et renvoie du vide. La colonne se crée, sans valeur. Correction : toucher la pastille **Health Samples** dans le titre de l'action, puis **Clear Variable**. À vérifier pour chaque action ajoutée.
- **Toutes les variables s'appellent « Health Samples »** : pour choisir la bonne dans un champ, passer par **Select Variable** et toucher le résultat sous l'action voulue. On peut la renommer dans **Variable Name**.
- **Autorisation** : chaque nouveau type doit être autorisé en lecture. Santé > photo de profil > Apps > Shortcuts.
- **« id manquant »** au lancement manuel (▶) : normal, le raccourci n'a pas de mesure à compléter.

## Limites connues

- La valeur lue est le dernier échantillon enregistré par la montre, pas une mesure prise à l'instant.
- Plus il y a d'actions, plus le raccourci met de temps à chaque Enregistrer.
- Les jours sans aucune mesure de brouillard n'ont aucune donnée de santé dans le Sheet.
- Après le raccourci, l'écran ne revient pas dans Brouillard : une application d'écran d'accueil ne peut pas être rouverte par un raccourci.

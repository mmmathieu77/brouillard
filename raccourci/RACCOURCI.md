# Raccourci « Brouillard Santé »

Lancé par l'application à chaque Enregistrer. Il lit des données dans Santé et les envoie au Google Sheet, sur la même ligne que la mesure.

Les noms d'actions ci-dessous sont ceux d'iOS en français. Ils peuvent varier légèrement selon la version.

## Montage (une seule fois, sur l'iPhone)

1. App **Raccourcis** > **+** > renommer en `Brouillard Santé` (le nom exact compte).
2. Pour chaque donnée voulue, ajouter une action **Rechercher des échantillons de santé** :
   - Type : la donnée (ex. Fréquence cardiaque)
   - Trier par : Date de début, **Le plus récent en premier**
   - Limiter : **1** échantillon
3. Ajouter l'action **Obtenir le contenu de l'URL** :
   - URL : l'adresse `/exec` du script Google
   - Méthode : **POST**
   - Corps de la requête : **JSON**
   - Champ `id` (Texte) : la variable **Entrée de raccourci**
   - Un champ (Texte) par donnée : nom libre, valeur = la variable **Échantillons de santé** de l'action correspondante, en choisissant sa propriété **Valeur**
4. Dans l'application : ⚙︎ > « Raccourci santé » > `Brouillard Santé` > OK.

Au premier lancement, iOS demande l'accès à Santé et l'autorisation de joindre script.google.com : accepter les deux.

## Jeu de départ suggéré

| Type dans Santé | Nom du champ |
|---|---|
| Fréquence cardiaque | `FC` |
| Variabilité de la fréquence cardiaque | `VFC` |
| Fréquence cardiaque au repos | `FC repos` |
| Oxygène sanguin | `SpO2` |
| Fréquence respiratoire | `Respiration` |

Chaque nom de champ devient automatiquement une colonne du Sheet. Ajouter une donnée plus tard = ajouter une action et un champ, rien à changer ailleurs.

## Limites connues

- La valeur lue est le **dernier échantillon enregistré** par la montre, pas une mesure prise à l'instant.
- Le sommeil n'est pas un simple nombre : il demande un montage à part.
- Après le Raccourci, l'écran reste sur Raccourcis. Une action finale **Aller à l'écran d'accueil** (Go to Home Screen) évite d'y rester ; une application d'écran d'accueil ne peut pas être rouverte par un Raccourci.

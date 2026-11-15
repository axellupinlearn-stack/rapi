# RAP IVOIRE — Le Média Digital de la Culture Urbaine Ivoirienne

> **« Plus qu'un média, une culture, un mouvement. »**

RAP IVOIRE est la plateforme numérique de référence dédiée au rap ivoirien, à la trap nouchi, à la drill abidjanaise et à l'ensemble de la culture hip-hop en Côte d’Ivoire.

---

## 1. Identité Visuelle & Direction Artistique

Conçue dans le respect strict du **logo officiel RAP IVOIRE** :
- **Bleu Électrique (`#0062FF`)** : Teinte principale d'énergie, de puissance et de modernité.
- **Cyan Néon (`#00E5FF`)** : Couleur d'accentuation pour les badges, micro-interactions et surbrillances.
- **Noir Profond & Nuit Abidjanaise (`#080B11` / `#0E1424`)** : Fonds immersifs créant un contraste éditorial maximal digne des plus grands magazines internationaux (*Complex*, *Pitchfork*, *Billboard*).
- **Blanc Cassé (`#F8FAFC`) & Slate Subtil (`#94A3B8`)** : Typographies lisibles, élégantes et aérées.
- **Logo Officiel Intégré** : Conservé dans sa forme, son inclinaison et ses couleurs d'origine sous `public/images/logo-rap-ivoire.jpg`.

---

## 2. Architecture du Site Public

### Page d'Accueil (`/`)
1. **Top Bar Flash Actu** : Ticker défilant en continu avec les dernières minutes et liens réseaux sociaux.
2. **Header Premium** : Logo officiel, navigation rapide, recherche instantanée et bouton d'accès au *Studio Rédaction*.
3. **Hero Section Immersive** : Grand article à la une avec badge « Grand Format », date, temps de lecture, vues et illustration haute résolution.
4. **Grille Asymétrique des Dernières Actualités** : Alternance de cartes éditoriales majeures et horizontales.
5. **Actualités du Rap Ivoirien** : Filtrage thématique par sous-genres (Drill, Trap Nouchi, Paiya, etc.).
6. **Nouvelles Sorties & Projets** : Albums, EPs et singles majeurs avec pochettes et liens d'écoute streaming.
7. **Clips & Vidéos** : Lecteur modal intégré pour visionner les clips officiels et freestyles sans quitter la page.
8. **Artistes du Rap Ivoire** : Portraits circulaires avec badges de communes d'Abidjan (Cocody, Yopougon, Marcory, Treichville, Abobo...).
9. **Interviews & Portraits** : Section long-format mettant en valeur de grandes citations d'artistes.
10. **Top Tendances** : Classement numéroté (01 à 05) des contenus les plus consultés.
11. **Bannière VIP & Newsletter** : Inscription fluide avec confirmation visuelle.
12. **Footer Complet** : Manifeste culturel, navigation, mentions légales et contact.

### Page Actualités (`/actualites`)
- Filtres dynamiques par rubriques : *Rap Ivoire*, *Interviews*, *Culture Urbaine*, *Musique*, *Clips*.
- Recherche textuelle en temps réel.
- Tri par date ou par popularité (vues).
- Métadonnées complètes : temps de lecture, vues, date et auteur.

### Page Article Individuelle (`/actualites/[slug]`)
- Titre éditorial percutant et chapeau d'accroche mis en exergue.
- Typographie soignée, intertitres H2/H3 et citations stylisées (`editorial-quote`).
- Intégration fluide de vidéos YouTube et galeries de photos.
- **Barre de partage 1-clic** : Partage **WhatsApp** optimisé pour la Côte d'Ivoire et la diaspora, Facebook, X (Twitter) et copie de lien avec notification toast.
- **Espace Commentaires Interactif** : Formulaire de réaction avec publication instantanée.
- Module de recommandations d'articles similaires et artistes associés.

### Répertoire des Artistes (`/artistes` & `/artistes/[slug]`)
- Filtres par communes abidjanaises et styles musicaux.
- Fiches artistes complètes : photo haute résolution, nom civil, biographie détaillée, hits phares numérotés, discographie (albums, EPs), liens streaming (Spotify, Apple Music) et réseaux sociaux.

### Vidéothèque & Sessions (`/videos`)
- Clips officiels, freestyles de rue, documentaires et interviews.
- Lecteur vidéo modal immersif avec fermeture tactile ou touche Échap.

### Culture Urbaine & Nouchi (`/culture`)
- Dossiers sur l'argot nouchi, le streetwear abidjanais, les danses (maïmouna, paiya) et l'histoire du hip-hop ivoirien.
- Lexique nouchi interactif.

### Recherche Globale (`/recherche`)
- Recherche instantanée multi-entités : Articles, Artistes et Vidéos.

### Pages Institutionnelles
- `/a-propos` : Manifeste, engagements déontologiques et piliers du média.
- `/contact` : Formulaire de soumission de morceaux/clips, demandes d'interviews et partenariats.

---

## 3. Le Studio Éditorial (`/studio`)

Le cœur névralgique de publication autonome pour l'équipe rédactionnelle.

### Accès & Rôles Intégrés (RBAC)
- L'accès est désactivé tant que les identifiants administrateur et la clé de session ne sont pas configurés.
- Les identifiants sont vérifiés côté serveur et les sessions utilisent un cookie signé, `HttpOnly` et `Secure` en production.
- Les routes de modification et les contenus non publiés sont protégés côté serveur ; la publication reste réservée au compte administrateur.
- Des comptes rédacteur et contributeur peuvent être configurés séparément ; le sélecteur de rôle de démonstration a été supprimé.

### Tableau de Bord Éditorial (`/studio`)
- Compteurs en direct : Total articles, Publiés, En attente, Brouillons, Vues cumulées, Rédacteurs actifs.
- Bannière d'alerte pour les articles en attente d'approbation (validation en 1 clic pour l'admin).
- Table interactive avec statut, catégorie, auteur, vues et actions rapides.

### Éditeur d'Article Professionnel (`/studio/articles/nouveau`)
- Titre, sous-titre, catégorie et résumé court.
- Téléversement direct d'image de couverture depuis mobile ou PC, ou saisie d'URL.
- **Barre d'outils riche** : Gras, italique, titres H2, H3, citations stylisées (`editorial-quote`), insertion d'images dans le texte.
- Intégration de vidéo YouTube avec détection automatique.
- Mots-clés, artistes associés et signature de l'auteur.
- **Live Preview Modal** : Prévisualisation fidèle du rendu public avant validation.
- **Auto-save** : Sauvegarde automatique des brouillons toutes les 20 secondes.

### Médiathèque Cloud (`/studio/medias`)
- Téléversement de photos avec contrôle des formats (WebP, JPEG, PNG, AVIF) et limite de 10 Mo.
- Affichage des dimensions et du poids.
- Bouton de copie d'URL d'image en 1 clic pour insertion immédiate dans les articles.

### Outils Complémentaires du Studio
- `/studio/artistes` : Création et gestion des fiches du répertoire artistique.
- `/studio/videos` : Ajout de nouveaux clips et freestyles avec liens YouTube.
- `/studio/commentaires` : Modération des réactions des lecteurs (Approuver / Rejeter).

---

## 4. Stack Technique & Robustesse

- **Framework** : Next.js 14 (App Router) + TypeScript.
- **Styling** : Tailwind CSS + animations et effets électriques sur-mesure.
- **Icônes** : Lucide React.
- **Base de Données** : Moteur modulaire persistant (`src/lib/db.ts`) avec cache mémoire haute vitesse et sauvegarde locale JSON (`data/database.json`), prêt pour Supabase.
- **Upload sécurisé** : Route API `/api/upload` avec validation stricte de taille et de types MIME.
- **SEO & Performance** :
  - `sitemap.ts` et `robots.ts` dynamiques.
  - Balises OpenGraph et Twitter Cards pour tous les articles.
  - Optimisation responsive mobile-first pour réseaux 3G/4G ivoiriens.

---

## 5. Configuration et démarrage

Copiez `.env.example` vers `.env.local` pour le développement local ou configurez ces variables dans l'environnement privé de votre hébergeur. Ne préfixez aucune variable par `NEXT_PUBLIC_` et ne publiez jamais le fichier de valeurs.

| Variable | Obligatoire | Description |
| --- | --- | --- |
| `RAP_SESSION_SECRET` | Oui | Clé aléatoire d'au moins 32 caractères pour signer les sessions. |
| `RAP_ADMIN_EMAIL` | Oui | Adresse du compte administrateur. |
| `RAP_ADMIN_PASSWORD` | Oui | Mot de passe administrateur d'au moins 12 caractères. |
| `RAP_EDITOR_EMAIL` / `RAP_EDITOR_PASSWORD` | Non | Active un compte rédacteur quand les deux valeurs sont définies. |
| `RAP_CONTRIBUTOR_EMAIL` / `RAP_CONTRIBUTOR_PASSWORD` | Non | Active un compte contributeur quand les deux valeurs sont définies. |

Si une variable obligatoire manque ou si le mot de passe administrateur est trop court, aucune connexion au Studio n'est acceptée. Générez une clé de session avec un gestionnaire de mots de passe ou un générateur cryptographique.

```bash
# Installation des dépendances (déjà effectuée)
npm install

# Lancement du serveur de développement
npm run dev

# Accès au site public :
# http://localhost:3000

# Accès au Studio Éditorial :
# http://localhost:3000/studio
```

`data/database.json` et `public/uploads/` sont des données locales/runtime ignorées par Git. Une base neuve est initialisée à partir des contenus de départ conservés dans `src/lib/db.ts`.

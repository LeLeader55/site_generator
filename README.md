# Depannage Site Complet

Projet React/Vite prêt à lancer.

## Lancer le site

```bash
npm install
npm run dev
```

## URL déjà prête

- Accueil : `/`
- Ville : `/serrurier/27/val-de-reuil`

## Dupliquer une ville

Ouvre `src/data/cities.js`.

Copie un objet existant dans le tableau `cities`, puis change au minimum :

- `slug`
- `name`
- `postalCode`
- `departmentCode`
- `mapsUrl`
- `seoTitle`
- `metaDescription`
- `localAreas`

L'URL se génère automatiquement ainsi :

```bash
/:serviceSlug/:departmentCode/:citySlug
```

Exemple :

```bash
/serrurier/27/evreux
```

## Ajouter votre fiche Google Maps

Dans l'objet ville :

```js
mapsUrl: 'https://g.page/votre-fiche-google'
```

Le bouton “Voir la fiche Maps” utilisera automatiquement ce lien.

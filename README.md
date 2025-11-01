# Portfolio de Baha Eddine Dridi

Un portfolio moderne, responsive et professionnel créé avec HTML, CSS et JavaScript.

## 🚀 Fonctionnalités

- **Design moderne et minimaliste** : Interface épurée et professionnelle
- **Responsive** : Adapté pour ordinateur, tablette et mobile
- **Animations fluides** : Effets d'apparition et transitions smooth
- **Navigation fixe** : Menu de navigation qui suit le scroll
- **Barres de compétences animées** : Visualisation interactive des skills
- **Formulaire de contact** : Avec validation et notifications
- **Performance optimisée** : Code léger et rapide

## 📁 Structure du projet

```
mon-portfolio/
├── index.html          # Page principale
├── css/
│   └── style.css      # Styles CSS
├── js/
│   └── script.js      # Scripts JavaScript
├── images/            # Dossier pour vos images (à créer)
└── README.md          # Ce fichier
```

## 🛠️ Personnalisation

### 1. Informations personnelles

Dans `index.html`, modifiez les sections suivantes :

**Section Hero (Accueil) :**
```html
<h1 class="hero-title">
    Bonjour, je suis
    <span class="highlight">Votre Nom</span>
</h1>
<h2 class="hero-subtitle">Votre Titre Professionnel</h2>
<p class="hero-description">
    Votre description personnelle...
</p>
```

**Section À propos :**
- Remplacez le texte de présentation
- Modifiez les statistiques (années d'expérience, projets, etc.)

**Section Contact :**
```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>votre.email@exemple.com</span>
</div>
```

### 2. Vos projets

Remplacez les cartes de projets dans la section `#projets` :

```html
<div class="project-card">
    <div class="project-image">
        <img src="lien-vers-votre-image" alt="Nom du projet">
        <div class="project-overlay">
            <div class="project-links">
                <a href="lien-demo" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="lien-github" class="project-link">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <h3>Nom de votre projet</h3>
        <p>Description de votre projet...</p>
        <div class="project-tech">
            <span class="tech-tag">Technologie 1</span>
            <span class="tech-tag">Technologie 2</span>
        </div>
    </div>
</div>
```

### 3. Compétences techniques

Modifiez les barres de compétences dans `style.css` :

```html
<div class="skill-item">
    <i class="fab fa-html5"></i>
    <span>Nom de la compétence</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="90%"></div>
    </div>
</div>
```

### 4. Parcours professionnel

Modifiez la timeline dans la section `#parcours` :

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content-item">
        <div class="timeline-date">2023 - Présent</div>
        <h3>Votre poste</h3>
        <h4>Nom de l'entreprise</h4>
        <p>Description de votre expérience...</p>
    </div>
</div>
```

### 5. Photo de profil

Remplacez le placeholder par votre photo :

```html
<div class="hero-image">
    <img src="images/votre-photo.jpg" alt="Votre nom" class="profile-image">
</div>
```

Ajoutez ce CSS pour styler la photo :

```css
.profile-image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: var(--shadow-lg);
}
```

## 🎨 Personnalisation des couleurs

Dans `style.css`, modifiez les variables CSS :

```css
:root {
    --primary-color: #2563eb;    /* Couleur principale */
    --primary-dark: #1e40af;     /* Couleur principale sombre */
    --secondary-color: #6366f1;   /* Couleur secondaire */
    --accent-color: #10b981;      /* Couleur d'accent */
}
```

### Palettes suggérées :

**Bleu professionnel (actuel) :**
- Primaire : #2563eb
- Secondaire : #6366f1

**Vert moderne :**
- Primaire : #059669
- Secondaire : #10b981

**Violet créatif :**
- Primaire : #7c3aed
- Secondaire : #a855f7

**Orange dynamique :**
- Primaire : #ea580c
- Secondaire : #f97316

## 📱 Ajout d'images

1. Créez un dossier `images` dans le répertoire principal
2. Ajoutez vos images (photo de profil, captures d'écran de projets)
3. Remplacez les liens placeholder dans le HTML

**Format recommandé pour les images :**
- Photo de profil : 400x400px, format JPG/PNG
- Images de projets : 800x500px, format JPG/PNG
- Optimisez vos images pour le web (compression)

## 🚀 Déploiement

### GitHub Pages (Gratuit)
1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans les settings
4. Votre portfolio sera accessible via `username.github.io/repository-name`

### Netlify (Gratuit)
1. Créez un compte sur Netlify
2. Glissez-déposez le dossier de votre portfolio
3. Votre site sera en ligne instantanément

### Vercel (Gratuit)

#### Méthode 1 : Via l'interface Vercel (✅ Recommandée - La plus simple)

1. **Créer un compte Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Sign Up"
   - Connectez-vous avec GitHub (recommandé)

2. **Pousser votre code sur GitHub** :
   ```bash
   # Ouvrir PowerShell dans le dossier du projet
   cd c:\Users\Lenovo\Desktop\mon-portfolio
   
   # Initialiser git (si pas déjà fait)
   git init
   
   # Ajouter tous les fichiers
   git add .
   
   # Créer le premier commit
   git commit -m "Initial commit - Portfolio professionnel"
   
   # Créer un dépôt sur GitHub (github.com/new) puis :
   git branch -M main
   git remote add origin https://github.com/baha-eddine-dridi/mon-portfolio.git
   git push -u origin main
   ```

3. **Importer le projet sur Vercel** :
   - Connectez-vous à [vercel.com](https://vercel.com)
   - Cliquez sur "Add New..." → "Project"
   - Cliquez sur "Import Git Repository"
   - Sélectionnez votre dépôt GitHub "mon-portfolio"
   - Laissez les paramètres par défaut
   - Cliquez sur "Deploy"
   - ✅ **Votre site sera en ligne en 30 secondes !**

4. **Obtenir votre URL** :
   - Votre portfolio sera accessible sur : `https://mon-portfolio-xxxxx.vercel.app`
   - Vous pouvez configurer un domaine personnalisé dans les paramètres

#### Méthode 2 : Via Vercel CLI (Pour développeurs)

```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer depuis le dossier du projet
cd c:\Users\Lenovo\Desktop\mon-portfolio
vercel

# Pour un déploiement en production
vercel --prod
```

#### Méthode 3 : Glisser-Déposer (Sans Git)

1. Compressez votre dossier `mon-portfolio` en fichier ZIP
2. Allez sur [vercel.com](https://vercel.com)
3. Glissez-déposez le fichier ZIP sur la page
4. Vercel déploiera automatiquement votre site

## 🔄 Mise à jour du site après déploiement

Une fois déployé via GitHub, chaque modification sera automatiquement mise en ligne :

```bash
# Après avoir modifié vos fichiers
git add .
git commit -m "Description de vos modifications"
git push
```

➡️ Vercel détecte automatiquement le push et redéploie votre site en quelques secondes !

## 🌐 Configuration de domaine personnalisé

1. Allez dans votre projet sur Vercel
2. Settings → Domains
3. Ajoutez votre domaine (ex: bahadridi.com)
4. Suivez les instructions pour configurer les DNS

## 📧 Contact

Pour toute question sur la personnalisation de ce portfolio :

- **Email** : votre.email@exemple.com
- **LinkedIn** : [Votre profil LinkedIn]
- **GitHub** : [Votre profil GitHub]

## 📄 Licence

Ce portfolio est libre d'utilisation. Vous pouvez le modifier et l'adapter selon vos besoins.

---

**Créé avec ❤️ pour votre réussite professionnelle !**

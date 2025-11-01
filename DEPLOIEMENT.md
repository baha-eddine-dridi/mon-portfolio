# 🚀 Guide Rapide : Déployer sur Vercel en 5 Minutes

## Option 1 : Via GitHub (Recommandée) ✅

### Étape 1 : Pousser sur GitHub
```powershell
# Dans PowerShell, naviguez vers votre dossier
cd c:\Users\Lenovo\Desktop\mon-portfolio

# Initialisez Git
git init
git add .
git commit -m "Initial commit - Portfolio"

# Créez un nouveau dépôt sur github.com/new
# Puis liez-le et poussez :
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/mon-portfolio.git
git push -u origin main
```

### Étape 2 : Déployer sur Vercel
1. Allez sur **https://vercel.com**
2. Cliquez sur **"Sign Up"** et connectez-vous avec GitHub
3. Cliquez sur **"Add New..." → "Project"**
4. Sélectionnez votre dépôt **"mon-portfolio"**
5. Cliquez sur **"Deploy"**
6. ✅ Terminé ! Votre site est en ligne !

Votre URL : `https://mon-portfolio-xxxxx.vercel.app`

---

## Option 2 : Via CLI (Plus rapide si vous avez Node.js)

```powershell
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
cd c:\Users\Lenovo\Desktop\mon-portfolio
vercel --prod
```

---

## Option 3 : Glisser-Déposer (Sans Git, mais sans mises à jour auto)

1. Compressez le dossier `mon-portfolio` en ZIP
2. Allez sur **https://vercel.com**
3. Glissez-déposez le fichier ZIP
4. ✅ Déployé instantanément !

---

## 🔄 Pour mettre à jour après déploiement (Option 1 seulement)

```powershell
git add .
git commit -m "Mise à jour du portfolio"
git push
```

Vercel redéploiera automatiquement ! 🎉

---

## 📝 Problèmes courants

### Git n'est pas reconnu
Installez Git : https://git-scm.com/download/win

### npm n'est pas reconnu
Installez Node.js : https://nodejs.org

### Le dépôt GitHub est vide
Vérifiez que vous avez bien fait `git push -u origin main`

---

## 💡 Conseils

- **Domaine personnalisé** : Configurez gratuitement dans Vercel → Settings → Domains
- **HTTPS** : Activé automatiquement par Vercel
- **Performances** : Vercel optimise automatiquement vos images et CSS
- **Analytics** : Activez les analytics gratuites dans les paramètres du projet

---

## 🎯 Checklist avant déploiement

- ✅ Toutes les images sont dans le dossier `images/`
- ✅ Toutes les vidéos sont dans le dossier `videos/`
- ✅ Les liens externes (LinkedIn, GitHub) sont corrects
- ✅ L'email et le téléphone sont à jour
- ✅ Le CV est à jour (cv_Baha_eddine_Dridi2025.pdf)
- ✅ Testez localement : ouvrez `index.html` dans votre navigateur

---

## 📞 Support

Si vous rencontrez des problèmes :
- Documentation Vercel : https://vercel.com/docs
- Support Vercel : https://vercel.com/support
- Discord Vercel : https://vercel.com/discord

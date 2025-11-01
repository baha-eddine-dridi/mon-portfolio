# 🎬 Guide de Gestion des Vidéos pour le Portfolio

## ⚠️ Problème : Vidéos trop volumineuses pour GitHub

GitHub limite les fichiers à **100 MB**. Votre vidéo `DjangoLinkedin.mp4` fait **230 MB**.

---

## ✅ Solution 1 : Git LFS (Large File Storage) - RECOMMANDÉE

Git LFS a été configuré dans votre projet pour gérer les vidéos.

### Vérifier que Git LFS fonctionne :

```bash
# Vérifier l'installation
git lfs version

# Voir les fichiers suivis par LFS
git lfs ls-files
```

### Si le push a réussi :
✅ Vos vidéos sont maintenant sur GitHub via Git LFS !

### Si le push a échoué :
Passez aux solutions alternatives ci-dessous.

---

## 🎯 Solution 2 : Héberger les vidéos ailleurs (PLUS SIMPLE)

### Option A : YouTube (Recommandé)
1. **Téléversez vos vidéos sur YouTube** (en mode non répertorié si vous voulez)
2. **Obtenez le lien embed** :
   - Cliquez sur "Partager" → "Intégrer"
   - Copiez le code iframe

3. **Remplacez dans index.html** :

```html
<!-- Avant (vidéo locale) -->
<video id="eduia-video" controls>
    <source src="videos/DjangoLinkedin.mp4" type="video/mp4">
</video>

<!-- Après (YouTube) -->
<iframe width="100%" height="500" 
        src="https://www.youtube.com/embed/VOTRE_VIDEO_ID" 
        frameborder="0" allowfullscreen>
</iframe>
```

### Option B : Google Drive / Dropbox
1. Téléversez la vidéo sur Google Drive
2. Cliquez droit → "Obtenir le lien" → "Autoriser l'accès"
3. Utilisez le lien dans votre HTML

### Option C : Cloudinary (Gratuit jusqu'à 25 GB)
1. Créez un compte sur [cloudinary.com](https://cloudinary.com)
2. Téléversez vos vidéos
3. Obtenez l'URL publique
4. Utilisez-la dans votre `<video src="URL_CLOUDINARY">`

---

## 🔧 Solution 3 : Compresser les vidéos

Si vous voulez garder les vidéos locales, compressez-les :

### Avec HandBrake (Gratuit) :
1. Téléchargez [HandBrake](https://handbrake.fr/)
2. Ouvrez votre vidéo
3. Preset : "Web" → "Gmail Small 3 Minutes 480p30"
4. Ajustez la qualité (RF 25-28)
5. **Objectif : < 50 MB par vidéo**

### Avec FFmpeg (Ligne de commande) :
```bash
# Installer FFmpeg depuis https://ffmpeg.org/download.html
# Puis dans PowerShell :

cd c:\Users\Lenovo\Desktop\mon-portfolio\videos

# Compresser une vidéo
ffmpeg -i DjangoLinkedin.mp4 -vcodec h264 -crf 28 -preset medium DjangoLinkedin_compressed.mp4

# Remplacer l'originale
Remove-Item DjangoLinkedin.mp4
Rename-Item DjangoLinkedin_compressed.mp4 DjangoLinkedin.mp4
```

---

## 🚫 Solution 4 : Exclure les vidéos de Git (Dernière option)

Si vous ne voulez vraiment pas utiliser les solutions ci-dessus :

### 1. Modifiez `.gitignore` :
```
videos/*.mp4
```

### 2. Ajoutez un message dans le portfolio :
```html
<p>📹 Vidéo de démonstration disponible sur demande</p>
<a href="mailto:bahadridi441@gmail.com">Demander la vidéo</a>
```

### 3. Poussez sans les vidéos :
```bash
git rm --cached videos/*.mp4
git add .
git commit -m "Remove large video files"
git push -u origin main --force
```

---

## 📊 Tailles de fichiers recommandées

| Type | Taille max | Recommandation |
|------|------------|----------------|
| Images | < 500 KB | Optimiser avec TinyPNG |
| Vidéos courtes (< 30s) | < 10 MB | Compresser en 720p |
| Vidéos moyennes (1-2 min) | < 50 MB | Compresser en 1080p |
| Vidéos longues (> 2 min) | YouTube | Héberger ailleurs |
| PDF | < 5 MB | Compresser si nécessaire |

---

## ✅ Checklist finale

- [ ] Git LFS installé et configuré
- [ ] Vidéos < 100 MB ou hébergées ailleurs
- [ ] Images optimisées (< 500 KB)
- [ ] Push réussi sur GitHub
- [ ] Site déployé sur Vercel
- [ ] Vidéos lisibles sur le portfolio en ligne

---

## 🆘 Besoin d'aide ?

Si aucune solution ne fonctionne, contactez-moi :
- **Email** : bahadridi441@gmail.com
- **GitHub Issues** : https://github.com/baha-eddine-dridi/mon-portfolio/issues

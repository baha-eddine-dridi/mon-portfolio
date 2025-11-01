# Script de déploiement sans les vidéos volumineuses
Write-Host "`n╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🚀 DÉPLOIEMENT PORTFOLIO (sans vidéos lourdes)         ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# 1. Exclure temporairement les grosses vidéos
Write-Host "📝 Mise à jour du .gitignore pour exclure les grosses vidéos...`n" -ForegroundColor Yellow

$gitignoreContent = @"
# Vercel
.vercel

# System Files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
*.log
npm-debug.log*

# Git LFS
.git/lfs/

# VIDÉOS VOLUMINEUSES (> 100 MB) - À héberger sur YouTube
videos/DjangoLinkedin.mp4
videos/unimindcare.mp4
videos/ML.mp4
"@

Set-Content -Path ".gitignore" -Value $gitignoreContent
Write-Host "✅ .gitignore mis à jour`n" -ForegroundColor Green

# 2. Supprimer les vidéos du cache Git si elles y sont
Write-Host "🧹 Nettoyage du cache Git...`n" -ForegroundColor Yellow
git rm --cached videos/*.mp4 2>$null
Write-Host "✅ Cache nettoyé`n" -ForegroundColor Green

# 3. Ajouter tous les autres fichiers
Write-Host "📦 Ajout de tous les fichiers (sauf vidéos)...`n" -ForegroundColor Yellow
git add -A
Write-Host "✅ Fichiers ajoutés`n" -ForegroundColor Green

# 4. Créer le commit
Write-Host "💾 Création du commit...`n" -ForegroundColor Yellow
git commit -m "Deploy portfolio - Exclude large videos (use YouTube links instead)"

# 5. Pousser vers GitHub
Write-Host "⬆️  Push vers GitHub...`n" -ForegroundColor Cyan
git push origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n╔══════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║  ✅ DÉPLOIEMENT RÉUSSI !                                ║" -ForegroundColor Green
    Write-Host "╚══════════════════════════════════════════════════════════╝`n" -ForegroundColor Green
    
    Write-Host "📱 Prochaines étapes :`n" -ForegroundColor Cyan
    Write-Host "1. Allez sur Vercel : https://vercel.com" -ForegroundColor White
    Write-Host "2. Le site se redéploiera automatiquement" -ForegroundColor White
    Write-Host "3. CSS, JS et images seront maintenant visibles !`n" -ForegroundColor White
    
    Write-Host "🎬 Pour les vidéos :" -ForegroundColor Yellow
    Write-Host "   Option A : Téléversez-les sur YouTube" -ForegroundColor Gray
    Write-Host "   Option B : Compressez-les à < 50 MB" -ForegroundColor Gray
    Write-Host "   Option C : Utilisez Cloudinary (gratuit)`n" -ForegroundColor Gray
    
    Write-Host "📖 Consultez VIDEOS-GUIDE.md pour plus d'infos`n" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Erreur lors du push" -ForegroundColor Red
    Write-Host "Vérifiez votre connexion Internet et vos identifiants GitHub`n" -ForegroundColor Yellow
}

Read-Host "`nAppuyez sur Entrée pour quitter"

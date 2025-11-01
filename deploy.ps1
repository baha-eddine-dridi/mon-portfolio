# Script PowerShell pour déployer sur Vercel via GitHub

Write-Host "🚀 Déploiement du Portfolio sur Vercel" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Vérifier si Git est installé
Write-Host "📋 Vérification de Git..." -ForegroundColor Yellow
$gitInstalled = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitInstalled) {
    Write-Host "❌ Git n'est pas installé. Téléchargez-le sur : https://git-scm.com/download/win" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit
}
Write-Host "✅ Git est installé`n" -ForegroundColor Green

# Initialiser Git si nécessaire
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initialisation de Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialisé`n" -ForegroundColor Green
}

# Ajouter tous les fichiers
Write-Host "📁 Ajout des fichiers..." -ForegroundColor Yellow
git add .
Write-Host "✅ Fichiers ajoutés`n" -ForegroundColor Green

# Créer un commit
Write-Host "💾 Création du commit..." -ForegroundColor Yellow
$commitMessage = Read-Host "Message du commit (ou appuyez sur Entrée pour 'Update portfolio')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update portfolio"
}
git commit -m $commitMessage
Write-Host "✅ Commit créé`n" -ForegroundColor Green

# Demander l'URL du dépôt GitHub si pas déjà configuré
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host "`n📌 Configuration du dépôt GitHub" -ForegroundColor Cyan
    Write-Host "Allez sur https://github.com/new et créez un nouveau dépôt" -ForegroundColor Yellow
    Write-Host "Nom suggéré : mon-portfolio`n" -ForegroundColor Yellow
    
    $githubUsername = Read-Host "Votre nom d'utilisateur GitHub"
    $repoName = Read-Host "Nom du dépôt (par défaut: mon-portfolio)"
    if ([string]::IsNullOrWhiteSpace($repoName)) {
        $repoName = "mon-portfolio"
    }
    
    $remoteUrl = "https://github.com/$githubUsername/$repoName.git"
    
    Write-Host "`n🔗 Configuration du dépôt distant..." -ForegroundColor Yellow
    git branch -M main
    git remote add origin $remoteUrl
    Write-Host "✅ Dépôt distant configuré`n" -ForegroundColor Green
}

# Pousser vers GitHub
Write-Host "⬆️  Push vers GitHub..." -ForegroundColor Yellow
Write-Host "Si demandé, entrez vos identifiants GitHub`n" -ForegroundColor Gray
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Code poussé sur GitHub avec succès !`n" -ForegroundColor Green
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "🎉 Prochaines étapes :" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    Write-Host "1. Allez sur https://vercel.com" -ForegroundColor White
    Write-Host "2. Cliquez sur 'Sign Up' et connectez-vous avec GitHub" -ForegroundColor White
    Write-Host "3. Cliquez sur 'Add New...' → 'Project'" -ForegroundColor White
    Write-Host "4. Sélectionnez votre dépôt '$repoName'" -ForegroundColor White
    Write-Host "5. Cliquez sur 'Deploy'`n" -ForegroundColor White
    
    Write-Host "🌐 Votre portfolio sera en ligne en moins d'une minute !" -ForegroundColor Cyan
    Write-Host "📱 URL : https://$repoName-xxxxx.vercel.app`n" -ForegroundColor Cyan
    
    Write-Host "💡 Pour les mises à jour futures, exécutez simplement :" -ForegroundColor Yellow
    Write-Host "   .\deploy.ps1`n" -ForegroundColor Gray
} else {
    Write-Host "`n❌ Erreur lors du push. Vérifiez vos identifiants GitHub." -ForegroundColor Red
}

Read-Host "`nAppuyez sur Entrée pour quitter"

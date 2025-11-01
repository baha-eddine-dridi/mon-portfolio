# Script de vérification complète avant déploiement
Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🔍 VÉRIFICATION COMPLÈTE DU DÉPLOIEMENT                 ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# 1. Vérifier que les dossiers existent
Write-Host "📂 Vérification des dossiers...`n" -ForegroundColor Yellow

$folders = @("css", "js", "images", "videos")
$allFoldersExist = $true

foreach ($folder in $folders) {
    if (Test-Path $folder) {
        $fileCount = (Get-ChildItem $folder -Recurse -File | Measure-Object).Count
        Write-Host "  ✅ $folder/ ($fileCount fichiers)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $folder/ MANQUANT" -ForegroundColor Red
        $allFoldersExist = $false
    }
}

if (-not $allFoldersExist) {
    Write-Host "`n⚠️  Certains dossiers sont manquants !`n" -ForegroundColor Red
    exit 1
}

Write-Host "`n" -ForegroundColor White

# 2. Vérifier les fichiers critiques
Write-Host "📄 Vérification des fichiers critiques...`n" -ForegroundColor Yellow

$criticalFiles = @(
    "index.html",
    "css/style.css",
    "js/script.js"
)

$allFilesExist = $true
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length / 1KB
        Write-Host "  ✅ $file ($([math]::Round($size, 2)) KB)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file MANQUANT" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host "`n⚠️  Certains fichiers critiques sont manquants !`n" -ForegroundColor Red
    exit 1
}

Write-Host "`n" -ForegroundColor White

# 3. Vérifier Git
Write-Host "🔧 Vérification de Git...`n" -ForegroundColor Yellow

if (Test-Path ".git") {
    Write-Host "  ✅ Dépôt Git initialisé" -ForegroundColor Green
} else {
    Write-Host "  ❌ Git non initialisé" -ForegroundColor Red
    Write-Host "  Exécutez: git init`n" -ForegroundColor Yellow
    exit 1
}

# 4. Vérifier les fichiers suivis
Write-Host "`n📋 Fichiers suivis par Git...`n" -ForegroundColor Yellow

$gitFiles = git ls-files
$gitFilesCount = ($gitFiles | Measure-Object).Count

if ($gitFilesCount -eq 0) {
    Write-Host "  ❌ AUCUN fichier n'est suivi par Git !" -ForegroundColor Red
    Write-Host "`n  🔧 SOLUTION :" -ForegroundColor Yellow
    Write-Host "     git add -A" -ForegroundColor Gray
    Write-Host "     git commit -m 'Add all files'" -ForegroundColor Gray
    Write-Host "     git push origin main --force`n" -ForegroundColor Gray
} elseif ($gitFilesCount -lt 10) {
    Write-Host "  ⚠️  Seulement $gitFilesCount fichiers suivis (trop peu !)" -ForegroundColor Red
    Write-Host "  Fichiers actuels :" -ForegroundColor Gray
    $gitFiles | ForEach-Object { Write-Host "    - $_" -ForegroundColor Gray }
    Write-Host "`n  🔧 Ajoutez les fichiers manquants :" -ForegroundColor Yellow
    Write-Host "     git add -A" -ForegroundColor Gray
    Write-Host "     git commit -m 'Add missing files'" -ForegroundColor Gray
    Write-Host "     git push origin main --force`n" -ForegroundColor Gray
} else {
    Write-Host "  ✅ $gitFilesCount fichiers suivis" -ForegroundColor Green
    
    # Vérifier si CSS et JS sont suivis
    $hasCss = $gitFiles -match "css/style.css"
    $hasJs = $gitFiles -match "js/script.js"
    
    if ($hasCss) {
        Write-Host "  ✅ style.css est suivi" -ForegroundColor Green
    } else {
        Write-Host "  ❌ style.css N'EST PAS suivi" -ForegroundColor Red
    }
    
    if ($hasJs) {
        Write-Host "  ✅ script.js est suivi" -ForegroundColor Green
    } else {
        Write-Host "  ❌ script.js N'EST PAS suivi" -ForegroundColor Red
    }
}

Write-Host "`n" -ForegroundColor White

# 5. Vérifier le statut Git
Write-Host "📊 Statut Git actuel...`n" -ForegroundColor Yellow

$status = git status --short
if ($status) {
    Write-Host "  ⚠️  Fichiers non commités :" -ForegroundColor Yellow
    Write-Host $status -ForegroundColor Gray
    Write-Host "`n  🔧 Commitez les changements :" -ForegroundColor Yellow
    Write-Host "     git add -A" -ForegroundColor Gray
    Write-Host "     git commit -m 'Update files'" -ForegroundColor Gray
    Write-Host "     git push origin main`n" -ForegroundColor Gray
} else {
    Write-Host "  ✅ Aucun changement en attente" -ForegroundColor Green
}

Write-Host "`n" -ForegroundColor White

# 6. Vérifier la connexion GitHub
Write-Host "🌐 Vérification de GitHub...`n" -ForegroundColor Yellow

$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "  ✅ Dépôt distant : $remote" -ForegroundColor Green
} else {
    Write-Host "  ❌ Pas de dépôt distant configuré" -ForegroundColor Red
    Write-Host "`n  🔧 Configurez le dépôt :" -ForegroundColor Yellow
    Write-Host "     git remote add origin https://github.com/baha-eddine-dridi/mon-portfolio.git`n" -ForegroundColor Gray
}

Write-Host "`n" -ForegroundColor White

# 7. Résumé final
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  📊 RÉSUMÉ                                               ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

if ($allFoldersExist -and $allFilesExist -and $gitFilesCount -gt 50 -and -not $status) {
    Write-Host "✅ TOUT EST PRÊT !" -ForegroundColor Green
    Write-Host "   Votre portfolio devrait fonctionner sur Vercel`n" -ForegroundColor White
    Write-Host "🌐 Vérifiez votre site : https://mon-portfolio-xxxxx.vercel.app`n" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  DES ACTIONS SONT NÉCESSAIRES" -ForegroundColor Yellow
    Write-Host "`nExécutez ces commandes dans l'ordre :`n" -ForegroundColor White
    Write-Host "   1. git add -A" -ForegroundColor Gray
    Write-Host "   2. git commit -m 'Add all portfolio files'" -ForegroundColor Gray
    Write-Host "   3. git push origin main --force`n" -ForegroundColor Gray
    Write-Host "⏰ Attendez 2 minutes que Vercel redéploie`n" -ForegroundColor Yellow
}

Read-Host "Appuyez sur Entree pour quitter"

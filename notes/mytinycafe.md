---
title: "Comment My Tiny Café a eu un buzz modéré sur Hacker News"
layout: article
date: "2026-01-29"
---

# Comment My Tiny Café a eu un buzz modéré sur Hacker News

*English version below*

Dimanche dernier, pour la première fois, j'ai partagé publiquement un projet perso sur un thread "What are you working on?" de Hacker News. Une application toute bête qui permet à mon épouse de me commander un café comme si j'étais un barista pro.

Ça a explosé. Je suis devenu le top commentaire du post.

## La genèse du projet

J'ai développé la première version de My Tiny Café pendant mes premiers jours de congé paternité, avant que la fatigue ne devienne trop intense. Ça a commencé comme un petit side-project rigolo, mais c'était aussi pour moi le terrain de jeu pour tester l'envoi de notifications push via une application Web (quelque chose que j'anticipais devoir faire pour [Hormur](https://hormur.com)).

Au fil des semaines, j'ai ajouté des fonctionnalités sur les demandes de ma fille et mon épouse. Une amélioration par-ci, une option par-là. L'app a grandi tranquillement, au rythme de la famille.

Et puis est venu ce dimanche de décembre où j'ai décidé de la partager sur Hacker News, juste avant les congés de Noël. J'avoue, j'avais un peu anticipé l'opportunité de partager ce projet à l'occasion d'un de ces threads mensuels "What are you working on?" et quelques jours avant, j'avais fait confiance à Gemini pour créer une landing page pour My Tiny Café. C'était une super bonne idée.

## Les chiffres

Voici ce que ça a donné sur Hacker News :

- 27 réponses à mon commentaire
- 183 upvotes
- Le post "What are you working on" est resté 2 jours en front page

Et sur l'application elle-même :

- 18 000 visiteurs uniques en 3 jours
- 245 comptes créés
- 1 600 commandes de cafés
- 20$ de donations de la part d'Andrew, Jon et Dan (merci à vous !)

## La stack technique

My Tiny Café est une Progressive Web App assez simple, construite avec :

- **Nuxt 3 & Nuxt UI** pour la Single Page App
- **Appwrite** pour l'authentification, la base de données et les notifications push
- **Cloudfront** pour le CDN
- **GitHub Copilot** pour coder certaines features à la voix (!) quand j'avais les mains occupées avec le bébé

## À propos d'Appwrite

Appwrite s'est révélé vraiment excellent pour ma situation.

D'abord, je n'ai pas une grande expérience en infra et bases de données. Appwrite a été capable de fournir le service avec une grande simplicité de dev et résilience, même pendant le pic de trafic. Et surtout j'était serein sur la sécurité des comptes utilisateurs. J'ai certes dû passer temporairement sur un compte Pro à cause de cette popularité éphémère, mais maintenant que l'agitation est retombée, je vais pouvoir repasser sur un compte gratuit.

Ensuite, j'ai pu avoir un dashboard complet de mon application out-of-the-box, ce qui m'a permis de suivre en temps réel ce qui se passait pendant la vague de visiteurs.

Enfin, si j'avais voulu auto-héberger, Appwrite est à mon sens le service le plus simple à déployer et maintenir sur un serveur dédié (bien plus simple que Supabase). C'est rassurant de savoir que cette option existe.

## Et après ?

Aujourd'hui, je continue quelques développements pour le fun. Et c'est assez valorisant de voir tous les jours, ou tous les deux jours, un nouveau compte se créer sur la plateforme et des commandes être envoyées. Des inconnus, quelque part dans le monde, qui commandent des cafés (et d'autres choses) à leurs proches.

C'est la vraie récompense de ce projet : avoir créé un truc qui apporte un peu de fun dans le quotidien de gens que je ne conais même pas.

---

**À propos de l'app** : [My Tiny Café](https://mytinycafe.com) — Commandez votre café préféré.
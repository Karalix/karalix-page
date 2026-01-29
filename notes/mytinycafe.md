---
title: "Comment mon app de café pour mon épouse a explosé sur Hacker News"
layout: article
date: "2026-01-29"
---

# Comment mon app de café pour mon épouse a explosé sur Hacker News

*English version below*

Dimanche dernier, pour la première fois, j'ai partagé publiquement un projet perso sur un thread "What are you working on?" de Hacker News. Une application toute bête qui permet à mon épouse de me commander un café comme si j'étais un barista professionnel.

Ça a explosé. Je suis devenu le top commentaire du post.

## La genèse du projet

J'ai développé la première version de My Tiny Café pendant mes premiers jours de congé paternité, avant que la fatigue ne devienne trop intense. Ça a commencé comme un petit side-project rigolo, mais c'était aussi pour moi le terrain de jeu idéal pour tester l'envoi de notifications push via une application Web (quelque chose que j'anticipais devoir faire dans un projet pro).

Au fil des semaines, j'ai ajouté des fonctionnalités sur les demandes de ma fille et mon épouse. Une amélioration par-ci, une option par-là. L'app a grandi tranquillement, au rythme de la famille.

Et puis est venu ce dimanche de décembre où j'ai décidé de la partager sur Hacker News, juste avant les congés de Noël. J'avoue, j'avais un peu anticipé l'opportunité de partager ce projet à l'occasion d'un de ces threads mensuels "What are you working on?" et quelques jours avant, j'avais fait confiance à Gemini pour créer une landing page pour My Tiny Café. C'était un pari gagnant en ce qui me concerne !

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

Le choix d'utiliser Appwrite s'est révélé vraiment excellent pour plusieurs raisons.

D'abord, je n'ai pas une grande expérience en infra et bases de données. L'offre d'Appwrite a été capable de fournir le service avec une grande simplicité de dev et résilience, même pendant le pic de trafic. Et surtout j'tait serein sur la sécurité des comptes utilisateurs. J'ai certes dû passer temporairement sur un compte Pro à cause de cette popularité éphémère, mais maintenant que l'agitation est retombée, je vais pouvoir repasser sur un compte gratuit.

Ensuite, j'ai pu avoir un dashboard complet de mon application out-of-the-box, ce qui m'a permis de suivre en temps réel ce qui se passait pendant la vague de visiteurs.

Enfin, si j'avais voulu auto-héberger, Appwrite est à mon sens le service le plus simple à déployer et maintenir sur un serveur dédié. C'est rassurant de savoir que cette option existe.

## Et après ?

Aujourd'hui, je continue quelques développements pour le fun. Et c'est assez valorisant de voir tous les jours, ou tous les deux jours, un nouveau compte se créer sur la plateforme et des commandes être encoyées. Des inconnus, quelque part dans le monde, qui commandent des cafés (et d'autres choses) à leurs proches.

C'est la vraie récompense de ce projet : avoir créé un truc qui apporte un peu de joie dans le quotidien de gens que je ne conais même pas.

---

**À propos de l'app** : [My Tiny Café](https://mytinycafe.com) — Commandez votre café préféré.


---

# How my coffee app for my wife blew up on Hacker News

Last Sunday, for the first time ever, I publicly shared a side project on a Hacker News "What are you working on?" thread. A silly little app that lets my wife order coffee from me as if I were a fancy barista.

It blew up. I became the top comment of the post.

## How it started

I built the first version of My Tiny Café during my first days of paternity leave, before exhaustion really kicked in. It started as a fun little side project, but it was also the perfect playground for me to experiment with sending push notifications via a web app (something I anticipated needing for a professional project).

Over the following weeks, I added features based on requests from my daughter and my wife. A tweak here, an option there. The app grew quietly, at the pace of family life.

And then came that Sunday in December when I decided to share it on Hacker News, just before the Christmas holidays. I'll admit, I had been anticipating the opportunity to share this project on one of those monthly "What are you working on?" threads, and a few days earlier, I had trusted Gemini to create a landing page for My Tiny Café. Turned out to be a winning bet!

## The numbers

Here's what it looked like on Hacker News:

- 27 replies to my comment
- 183 upvotes
- The "What are you working on" post stayed on the front page for 2 days

And on the app itself:

- 18,000 unique visitors over 3 days
- 245 accounts created
- 1,600 coffee orders
- $20 in donations from Andrew, Jon and Dan (thank you!)

## The tech stack

My Tiny Café is a fairly simple Progressive Web App, built with:

- **Nuxt 3 & Nuxt UI** for the Single Page App
- **Appwrite** for authentication, database and push notifications
- **CloudFront** for the CDN
- **GitHub Copilot** to voice-code (!) some features when my hands were busy with the baby

## About Appwrite

Choosing Appwrite turned out to be an excellent decision for several reasons.

First, I don't have much experience with infrastructure and databases. Appwrite's offering was able to deliver with great simplicity and resilience, even during the traffic spike. Most importantly, I felt confident about user account security. I did have to temporarily upgrade to a Pro account because of this short-lived popularity, but now that things have settled down, I'll be able to switch back to a free plan.

Second, I got a complete dashboard for my application out of the box, which allowed me to monitor what was happening in real time during the wave of visitors.

Finally, if I had wanted to self-host, Appwrite is in my opinion the easiest service to deploy and maintain on a dedicated server. It's reassuring to know that option exists.

## What's next?

Today, I keep working on a few developments just for fun. And it's pretty rewarding to see, every day or every other day, a new account being created on the platform and orders being placed. Strangers, somewhere in the world, ordering coffee (and other things) for their loved ones.

That's the real reward of this project: having built something that brings a little joy into the daily lives of people I don't even know.

---

**About the app**: [My Tiny Café](https://mytinycafe.com) — Order your favorite coffee.

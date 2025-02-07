---
title: "Configurer Le Chat comme moteur de recherche par défaut sur Firefox"
layout: article
date: "2025-02-07"
head:
 - - link
   - rel: search
     type: application/opensearchdescription+xml
     title: Cherche Le Chat
     href: /mistral-search.xml
---
# Configurer Le Chat comme moteur de recherche par défaut sur Firefox
*English version below*

Un sujet suscite de plus en plus mon intérêt : les LLM. Les avancées récentes dans ce domaine sont notables, et malgré mon scepticisme initial je crois de plus en plus à leurs potentiel.

Les LLM open source, en particulier les outsider non-US, par leur déployabilité, leur embarcabilité et leur position me donnent espoir en des usages plus justes de ce genre d'outils. Mistral, par exemple, se distingue en étant la seule initiative crédible européenne. De son coté, DeepSeek a tout récemment impressionné par ses performances inattendues. Ces modèles ouvrent des perspectives intéressantes que j'aimerai explorer davantage : j'ai de plus en plus l'impression que les fantasmes de science fiction deviennent tangibles et je pressents aussi que c'est un enjeux d'employabilité à l'avenir.

Jusqu'à présent, mes interactions avec les API de ces LLM ont été limitées. Je suis pourtant un utilisateur régulier (et même payant) de Copilot pour le développement au jour le jour, ainsi que quelques discrètes fonctionnalités pour [Hormur](https://hormur.com), mais rien de très approfondi. Pour gagner en expérience et surtout me forcer à diversifier mon usage, j'ai décidé d'intégrer Le Chat de Mistral dans mon quotidien numérique.

## Le Chat de Mistral comme moteur de recherche par défaut

Configurer Le Chat de Mistral comme moteur de recherche par défaut sur mon navigateur m'a semblé être une manière efficace de l'utiliser plus régulièrement. Cependant, cette tâche n'est pas aussi simple qu'elle devrait l'être.

Pour résoudre ce problème, j'ai eu l'aide de la documentation OpenSearch disponible sur [MDN](https://developer.mozilla.org/en-US/docs/Web/XML/Guides/OpenSearch). Avec, j'ai pu configurer la page actuelle (oui oui, celle que vous êtes en train de lire !) pour permettre l'ajout de Le Chat comme moteur de recherche par défaut.

Il a suffit de ce [bête fichier XML](/mistral-search.xml), déclaré dans le `<head>` de cette page.

## Comment ajouter Le Chat sur Firefox

Si vous utilisez Firefox, la démarche est simple : tout e nrestant sur cette page, faites un clic droit sur la barre d'URL et sélectionnez "Ajouter Cherche Le Chat". Le Chat est alors prêt à être utilisé comme moteur de recherche. Pour le choisir par défaut il ne reste plus qu'à le sélectionner dans Menu > Paramètres > Recherche > Moteur de recherche par défaut.

Si vous utilisez un autre navigateur que Firefox, vous devriez reconsidérer vos choix de vie. Déso, c'est pas moi qui fait les règles.


___

## Setup Le Chat as the default search engine on Firefox

A topic that is increasingly piquing my interest is LLMs. Recent advancements in this field are notable, and despite my initial skepticism, I am becoming more convinced of their potential.

Open-source LLMs, particularly non-US outsiders, with their deployability, embeddability, and position, give me hope for fairer uses of such tools. Mistral, for example, stands out as the only credible European initiative. Meanwhile, DeepSeek has recently impressed with its unexpected performance. These models open up interesting perspectives that I would like to explore further: I am increasingly feeling that science fiction fantasies are becoming tangible, and I also sense that this will be a key factor in future employability.

So far, my interactions with the APIs of these LLMs have been limited. However, I am a regular (and even paying) user of Copilot for daily development, as well as a few discreet features for [Hormur](https://hormur.com), but nothing very in-depth. To gain experience and, above all, to force myself to diversify my usage, I decided to integrate Mistral's Le Chat into my digital daily life.

## Le Chat by Mistral as the default search engine

Setting Le Chat by Mistral as the default search engine on my browser seemed like an effective way to use it more regularly. However, this task is not as simple as it should be.

To solve this problem, I used the OpenSearch documentation available on [MDN](https://developer.mozilla.org/en-US/docs/Web/XML/Guides/OpenSearch). With it, I was able to configure the current page (yes, the one you are reading!) to allow the addition of Le Chat as the default search engine.

All it took was this [simple XML file](/mistral-search.xml), declared in the `<head>` of this page.

## How to add Le Chat on Firefox

If you use Firefox, the process is simple: while staying on this page, right-click on the URL bar and select "Add Cherche Le Chat." Le Chat is then ready to be used as a search engine. To set it as the default, simply select it in Menu > Settings > Search > Default search engine.

If you use a browser other than Firefox, you might want to reconsider your life choices. Sorry, I'm not the one making the rules.


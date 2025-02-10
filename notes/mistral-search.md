---
title: "Configurer Mistral comme moteur de recherche par défaut sur Firefox"
layout: article
date: "2025-02-07"
head:
 - - link
   - rel: search
     type: application/opensearchdescription+xml
     title: Cherche Le Chat
     href: /mistral-search.xml
---
# Configurer Mistral comme moteur de recherche par défaut sur Firefox

Un sujet suscite de plus en plus mon intérêt : les LLM. Les avancées récentes dans ce domaine sont notables, et malgré mon scepticisme initial je crois de plus en plus à leurs potentiel.

Les LLM open source, en particulier les outsider non-US, par leur déployabilité, leur embarcabilité et leur position me donnent espoir en des usages plus justes de ce genre d'outils : [Mistral](https://mistral.ai), la seule initiative crédible européenne, [DeepSeek](https://www.deepseek.com/) par ses performances inattendues. Ces modèles ouvrent des perspectives intéressantes que j'aimerai explorer davantage : j'ai de plus en plus l'impression que les fantasmes de science fiction deviennent tangibles et je pressents aussi que c'est un enjeux d'employabilité et de performance pour moi à l'avenir.

Jusqu'à présent, mes interactions avec les API de ces LLM ont été limitées. Je suis pourtant un utilisateur régulier (et même payant) de Copilot pour le développement au jour le jour, ainsi que quelques discrètes fonctionnalités pour [Hormur](https://hormur.com), mais rien de très poussé. Pour gagner en expérience et surtout me forcer à diversifier mon usage, j'ai décidé d'intégrer Le Chat de Mistral dans mon quotidien numérique.

## Le Chat de Mistral comme moteur de recherche par défaut

Configurer Le Chat de Mistral comme moteur de recherche par défaut sur mon navigateur m'a semblé être une manière efficace de l'utiliser plus régulièrement. Cependant, cette tâche n'est pas aussi simple qu'elle devrait l'être.

Pour résoudre ce problème, ça a été pour moi l'occasion d'en apprendre plus sur les plugins [OpenSearch](https://developer.mozilla.org/en-US/docs/Web/XML/Guides/OpenSearch). Avec, j'ai pu configurer la page actuelle (oui oui, celle que vous êtes en train de lire !) pour permettre l'ajout de Le Chat comme moteur de recherche par défaut.

Il a suffit de ce [bête fichier XML](/mistral-search.xml), déclaré dans le `<head>` de cette page.

### Comment ajouter Le Chat sur Firefox Desktop

Si vous utilisez Firefox, la démarche est simple : *tout en restant sur cette page*, faites un clic droit sur la barre d'URL et sélectionnez "Ajouter Cherche Le Chat". Le Chat est alors prêt à être utilisé comme moteur de recherche. Pour le choisir par défaut il ne reste plus qu'à le sélectionner dans 
> Menu > Paramètres > Recherche > Moteur de recherche par défaut

Si vous utilisez un autre navigateur que Firefox, vous devriez reconsidérer vos choix de vie. Déso, c'est pas moi qui fait les règles.

### Comment ajouter Le Chat sur Firefox Mobile

Bien plus simple que sur Desktop, il suffit d'utiliser la chaîne de caractères suivante dans 
> Paramètres > Recherche > Moteur de recherche > Ajouter un moteur de recherche > URL de la chaîne de recherche

 `https://chat.mistral.ai/chat/?q=%s`.

En ce qui me concerne, utiliser Le Chat par défaut sur mobile s'est révélé vraiment trop radical et pas vraiment adapté, mais je continue d'expérimenter sur Desktop.
---
title: "Citation dans le texte avec Obsidian"
layout: article
date: "2022-05-20"
---

Si vous utilisez [Obsidian](https://obsidian.md) pour rédiger des notes de lectures académiques, voire ébauches d'articles, la gestion des citations dans votre texte vous a probablement déjà posé question.
Et comme l'écosystème de plugin tiers est très bien fourni vous avez déjà sans doute installé le très bon [Obsidian Citation Plugin](https://github.com/hans/obsidian-citation-plugin).

Toutefois, en ce qui me concerne, je ne rédige pas mes notes de lectures sur Obsidian, mais dans [Zotero](https://zotero.org) lui-même et une bonne partie du plugin devient alors peu utile dans mon cas. En revanche, j'aimerai bien pouvoir l'utiliser pour insérer un joli bloc de citation ou une note de bas de page quand je rédige un texte.

| Exemple de bloc de citation    | Exemple de note de bas de page       |
|--------------------------------|--------------------------------------|
|![bloc-citation](https://user-images.githubusercontent.com/5560197/169554185-46580b13-ead5-48cd-bc23-a3574718b199.png) |![note-bas-page](https://user-images.githubusercontent.com/5560197/169554182-37ad2743-9c2f-4544-83b1-23d60594ad46.png)|


Pour réaliser ceci, il est possible de détourner le fonctionnement du plugin lorsqu'il propose d'insérer une note de lecture à la page courante :

![insert-note-content](https://user-images.githubusercontent.com/5560197/169554186-c096e2b3-6155-408f-bd97-7a0748443093.png)

Mais du coup, si vous avez l'habitude de rédiger vos notes de lecture dans Obsidian, les modifications que je présente dessous risquent d'avoir un impact indésirable sur votre processus d'écriture. Attention donc.

Pour mettre en oeuvre ce système, il faut modifier le template des notes de lecture dans les paramètres du plugin : Paramètres > Option des plugins > Citations > Literature note content template

À cet endroit, vous pouvez utiliser les variables proposées pour personnaliser le bloc de texte qui est créé lorsqu'une note de lecture est créée. Ci-dessous 2 propositions pour faire des citations dont vous pouvez vous inspirer pour démarrer.

## Bloc de citation
Solution la plus simple pour obtenir un bloc de citation qui ressort dans le texte, auquel il est possible d'ajouter un extrait par exemple.

{% raw %}
```md
> *"...REMPLACER CE TEXTE PAR UN EXTRAIT..."*
> 
> **{{title}}**
> {{authorString}}
> {{year}}, {{publisher}}, *{{page}}*
```
{% endraw %}

Cette solution a l'avantage de permettre dans une certaine mesure de toujours profiter de la rédaction de notes de lecture dans une certaine mesure même si on perd le formattage FrontMatter originel.

## Note de bas de page
On rappelera tout d'abord qu'une note de bas de page se réalise ainsi en Markdown :

```md
Lorem ipsum[^1]

[^1]: Ceci est une note de bas de page
sur plusieurs lignes. 
```

Profitant du fait qu'il n'est pas obligatoire d'utiliser des chiffres pour les références des notes de bas de page, il est possible d'avoir le template suivant :

{% raw %}
```md
[^{{citekey}}]

[^{{citekey}}]: **{{title}}**
{{authorString}}
{{year}}, {{publisher}}, *{{page}}*`
```
{% endraw %}

Seulement, d'implémenter ce template rend la création de note de lectures bien moins élégante.

---
title: "Accent insensitive search"
layout: article
date: "2020-11-19"
---

When I search my phone contacts for someone named Albéric, Maïté, Eugène, Éric or Søren I want to type "alberic", "maite", "eugene", "eric" or "soren" without thinking about uppercase nor accents that are sometimes difficult or impossible to type. I want a **Accent and uppercase insensitive search**.

It works very well in most apps such as Google Contacts, but it is actually not trivial at all. Because it did not work in [Signal](https://www.signal.org), I investigated how to achieve it using a regex (GLOB) search in SQLite.

Here a a set of regex ranges that cover variantions from latin characters from the unicode blocks :
* [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block))
* [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
* [Latin Extended-B](https://en.wikipedia.org/wiki/Latin_Extended-B)
* [Latin Extended Additional](https://en.wikipedia.org/wiki/Latin_Extended_Additional)

<script src="https://gist.github.com/Karalix/a23db78a64b33f3995957cf9dd196ccb.js"></script>

This was visually verified using [https://regex101.com/r/vaN0J8/1](https://regex101.com/r/vaN0J8/1). 
If you spot any error, please let me know on the [gist directly](https://gist.github.com/Karalix/a23db78a64b33f3995957cf9dd196ccb).
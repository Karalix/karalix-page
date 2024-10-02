---
title: "Adding space before citations in LaTeX"
layout: article
date: "2021-01-07"
---

In [Overleaf](www.overleaf.com) or maybe another LaTeX editor, if like me you only used `\cite{...}` instead of `~\cite{...}` and your advisor cracks down on you because it should be with a space before de square brackets [1] and not the other way[2], fear no more.

The search and replace tool of Overleaf leverages all the power of regexes. Lets add a `~` character before all the `\cite` that do not have one yet.

Search : `([^~])\\cite` (do not forget to select the RegExp Search option)

Replace by : `$1~\cite`

Click *Replace* to check that I do not misguide you by only fixing one occurence at a time or be over confident in the power of regexes and click "All".

Done.

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

```
a : [À-Åà-åĀ-ąǍǎǞ-ǡǺ-ǻȀ-ȃȦȧȺɐ-ɒḀḁẚẠ-ặ]
b : [ßƀ-ƅɃɓḂ-ḇ]
c : [çÇĆ-čƆ-ƈȻȼɔḈḉ]
d : [ÐðĎ-đƉ-ƍȡɖɗḊ-ḓ]
e : [È-Ëè-ëĒ-ěƎ-ƐǝȄ-ȇȨȩɆɇɘ-ɞḔ-ḝẸ-ệ]
f : [ƑƒḞḟ]
g : [Ĝ-ģƓǤ-ǧǴǵḠḡ]
h : [Ĥ-ħƕǶȞȟḢ-ḫẖ]
i : [Ì-Ïì-ïĨ-ıƖƗǏǐȈ-ȋɨɪḬ-ḯỈ-ị]
j : [ĴĵǰȷɈɉɟ]
k : [Ķ-ĸƘƙǨǩḰ-ḵ]
l : [Ĺ-łƚȴȽɫ-ɭḶ-ḽ]
m : [Ɯɯ-ɱḾ-ṃ]
n : [ÑñŃ-ŋƝƞǸǹȠȵɲ-ɴṄ-ṋ]
o : [Ò-ÖØò-öøŌ-őƟ-ơǑǒǪ-ǭǾǿȌ-ȏȪ-ȱṌ-ṓỌ-ợ]
p : [ƤƥṔ-ṗ]
q : []
r : [Ŕ-řƦȐ-ȓɌɍṘ-ṟ]
s : [Ś-šƧƨȘșȿṠ-ṩ]
t : [Ţ-ŧƫ-ƮȚțȾṪ-ṱẗ]
u : [Ù-Üù-üŨ-ųƯ-ƱǓ-ǜȔ-ȗɄṲ-ṻỤ-ự]
v : [ƲɅṼ-ṿ]
w : [ŴŵẀ-ẉẘ]
x : [Ẋ-ẍ]
y : [ÝýÿŶ-ŸƔƳƴȲȳɎɏẎẏỲ-ỹỾỿẙ]
z : [Ź-žƵƶɀẐ-ẕ]
```

This was visually verified using [https://regex101.com/r/vaN0J8/1](https://regex101.com/r/vaN0J8/1). 
If you spot any error, please let me know on the [gist directly](https://gist.github.com/Karalix/a23db78a64b33f3995957cf9dd196ccb).
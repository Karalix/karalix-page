---
title: "Conception logicielle 2018 - TP 2"
layout: page
---

## Séquences et états-transitions

### Diagramme de séquence - Guichet automatique de banque
Nous allons représenter partiellement le fonctionnement d’un guichet automatique de banque, à partir duquel un client peut retirer des billets et/ou consulter son solde. Nous décrivons différentes étapes (elles ne sont pas données dans un ordre chronologique)

Pour chaque étape décrite ci-dessous, construisez un diagramme de séquences (faisant éventuellement appel à un plusieurs autre(s) diagramme(s) ). Construisez ensuite un diagramme de séquences décrivant tout le scénario, en faisant appel aux diagrammes déjà construits.

Penser à bien utiliser les fragments d’interaction vus en cours.

On utilisera [draw.io](https://draw.io) pour construire les diagrammes.

### Saisie du code et connexion
Le client insère sa carte. La machine vérifie la validité de la carte et demande alors le code au client. Le client rentre son code. Si le code saisi correspond à celui qui est enregistré sur la carte, la machine établit une connexion avec le système de groupement des banques, qui répond à la machine si l’utilisateur est client de la banque propriétaire du guichet, ou d’une autre banque, et le montant que l’utilisateur peut retirer. Sinon, le code est redemandé. La machine peut éjecter la carte et mettre fin à l’utilisation pour différentes raisons : si la carte n’est pas valide (ex: périmée), si le code saisi n’est toujours pas bon au bout de 3 essais, ou si le système de groupement de banques informe que le client ne peut plus effectuer d’opération (interdit bancaire, découvert trop important, …)

### Ejection de la carte
Pour différentes raisons, la machine peut éjecter la carte et se met alors en attente. Si au bout d’un certain délai T1, le client n’a pas récupéré sa carte, elle est avalée.

### Interface principale
Une fois la connexion validée, la machine propose différents choix au client : effectuer un retrait ou quitter. Pour les clients de la banque propriétaire, le choix supplémentaire de consultation de solde est proposé. S’il choisit de consulter le solde, celui-ci est affiché à l’écran. L’utilisateur n’a qu’un seul choix : revenir à l’écran principal. S’il quitte l’écran principal, la carte est éjectée.

### Retrait
L’interface affiche l’écran de retrait. Il propose au client des montants prédéfinis (10, 20, 50, 100, …) tous inférieurs au montant maximum qui peut être retiré. Le client peut soit choisir un des montants donnés, soit saisir un autre montant, soit quitter (la carte est éjectée). Dans le premier cas, la somme correspondante est fournie (puisque le contrôle de solde a déjà été fait auparavant). Le client doit prendre les billets pour pouvoir récupérer sa carte. Dans le deuxième cas, le client saisit un montant. Si le montant est valide, la somme demandée est fournie. Dans le cas contraire, l’interface retourne à l’écran de retrait (tant que le montant choisi n’est pas valide).

### Billets
La machine délivre les billets. Si le client ne les récupère pas au bout d’un certain délai T2, ils sont avalés. Le débit est alors annulé. Si le client les récupère, le débit du compte est confirmé et la carte est éjectée.

## Rendu
Les TPs compterons pour 50% de la note.

Le TP peut se faire seul ou en binôme.

Le rendu se fait en deux fois :

[v1 en fin de TP à 18h](https://docs.google.com/forms/d/e/1FAIpQLSe83RoNpQusisLrUy_3O6eyd4Ob0us-rSi6oQS5ElJRb8q3oA/viewform?usp=sf_link)

[v2 à rendre avant dimanche soir](https://docs.google.com/forms/d/e/1FAIpQLSexsGtSZqBpsCTD0IPHc4SPz9UE0LmwXI9cLTTKRWYAc7IhFA/viewform?usp=sf_link)

L’architecture peut prendre des formes assez diverses, des rendus trop similaire entre groupes seront sanctionnés.


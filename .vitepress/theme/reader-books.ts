// Liste des epub disponibles dans le lecteur (/reader)
// Ajoute un livre en copiant le fichier .epub dans public/ puis en
// ajoutant une entrée ici : { title, url }
export interface ReaderBook {
  title: string
  url: string
}

export const READER_BOOKS: ReaderBook[] = [
  {
    title: "Lettres Calaisiennes — Première partie",
    url: "/Lettres%20calaisiennes%20-%20Premi%C3%A8re%20partie.epub"
  },
  {
    title: "Lettres Calaisiennes — Deuxième partie",
    url: "/Lettres%20calaisiennes%20-%20Deuxi%C3%A8me%20partie.epub"
  }
]

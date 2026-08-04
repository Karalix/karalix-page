// Liste des epub disponibles dans le lecteur (/reader)
// Ajoute un livre en copiant le fichier .epub dans public/ puis en
// ajoutant une entrée ici : { id, title, url }
// `id` est un slug stable utilisé pour les deep-links /reader?book=<id>.
export interface ReaderBook {
  id: string
  title: string
  url: string
}

export const READER_BOOKS: ReaderBook[] = [
  {
    id: 'lettres-calaisiennes-1',
    title: "Lettres Calaisiennes — Première partie",
    url: "/Lettres%20calaisiennes%20-%20Premi%C3%A8re%20partie.epub"
  },
  {
    id: 'lettres-calaisiennes-2',
    title: "Lettres Calaisiennes — Deuxième partie",
    url: "/Lettres%20calaisiennes%20-%20Deuxi%C3%A8me%20partie.epub"
  }
]

// Interfaccia per definire la struttura di un campione
interface Champion {
  name: string;
  title: string;
  gender: string;
  species: string;
  releaseYear: number;
  region: string;
  primaryRole: string;
  secondaryRole?: string;
  damageType: string;
}

// Dataset completo dei campioni di League of Legends con informazioni verificate
const CHAMPIONS: Champion[] = [
  // 2009 - Anno di lancio
  { name: "Alistar", title: "Il Minotauro", gender: "Maschio", species: "Minotauro", releaseYear: 2009, region: "Targon", primaryRole: "Support", secondaryRole: "Tank", damageType: "Magic" },
  { name: "Annie", title: "La Bambina Oscura", gender: "Femmina", species: "Umano", releaseYear: 2009, region: "Noxus", primaryRole: "Mage", damageType: "Magic" },
  { name: "Ashe", title: "L'Arciera dei Ghiacci", gender: "Femmina", species: "Umano", releaseYear: 2009, region: "Freljord", primaryRole: "Marksman", secondaryRole: "Support", damageType: "Physical" },
  { name: "Fiddlesticks", title: "Il Primo Terrore", gender: "Non-binario", species: "Demone", releaseYear: 2009, region: "Runeterra", primaryRole: "Jungler", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Jax", title: "Il Gran Maestro d'Armi", gender: "Maschio", species: "Icathiano", releaseYear: 2009, region: "Icathia", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Mixed" },
  { name: "Kayle", title: "La Giusta", gender: "Femmina", species: "Aspetto", releaseYear: 2009, region: "Targon", primaryRole: "Fighter", secondaryRole: "Marksman", damageType: "Mixed" },
  { name: "Master Yi", title: "Il Spadaccino Wuju", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Ionia", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Morgana", title: "La Caduta", gender: "Femmina", species: "Aspetto", releaseYear: 2009, region: "Targon", primaryRole: "Support", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Nunu & Willump", title: "Il Ragazzo e il suo Yeti", gender: "Maschio", species: "Umano e Yeti", releaseYear: 2009, region: "Freljord", primaryRole: "Jungler", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Ryze", title: "Il Mago delle Rune", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Runeterra", primaryRole: "Mage", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Sion", title: "Il Non-morto Giuggernaut", gender: "Maschio", species: "Non-morto", releaseYear: 2009, region: "Noxus", primaryRole: "Tank", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Sivir", title: "La Signora della Battaglia", gender: "Femmina", species: "Umano", releaseYear: 2009, region: "Shurima", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Soraka", title: "La Figlia delle Stelle", gender: "Femmina", species: "Celestiale", releaseYear: 2009, region: "Targon", primaryRole: "Support", damageType: "Magic" },
  { name: "Teemo", title: "Il Rapido Scout", gender: "Maschio", species: "Yordle", releaseYear: 2009, region: "Bandle City", primaryRole: "Marksman", secondaryRole: "Assassin", damageType: "Magic" },
  { name: "Tristana", title: "La Cannoniera Yordle", gender: "Femmina", species: "Yordle", releaseYear: 2009, region: "Bandle City", primaryRole: "Marksman", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Twisted Fate", title: "Il Maestro di Carte", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Bilgewater", primaryRole: "Mage", damageType: "Magic" },
  { name: "Warwick", title: "La Furia Scatenata di Zaun", gender: "Maschio", species: "Chimera", releaseYear: 2009, region: "Zaun", primaryRole: "Jungler", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Singed", title: "Il Chimico Folle", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Zaun", primaryRole: "Tank", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Zilean", title: "Il Cronomantico", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Icathia", primaryRole: "Support", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Evelynn", title: "L'Abbraccio dell'Agonia", gender: "Femmina", species: "Demone", releaseYear: 2009, region: "Runeterra", primaryRole: "Assassin", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Tryndamere", title: "Il Re dei Barbari", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Freljord", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Twitch", title: "La Piaga dei Ratti", gender: "Maschio", species: "Ratto", releaseYear: 2009, region: "Zaun", primaryRole: "Marksman", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Karthus", title: "Il Presagio della Morte", gender: "Maschio", species: "Lich", releaseYear: 2009, region: "Isole Ombra", primaryRole: "Mage", damageType: "Magic" },
  { name: "Ammu", title: "La Mummia Triste", gender: "Maschio", species: "Mummia", releaseYear: 2009, region: "Shurima", primaryRole: "Tank", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Cho'Gath", title: "Il Terrore del Vuoto", gender: "Maschio", species: "Vuoto", releaseYear: 2009, region: "Vuoto", primaryRole: "Tank", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Anivia", title: "La Criofenicia", gender: "Femmina", species: "Cryophoenix", releaseYear: 2009, region: "Freljord", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },
  { name: "Rammus", title: "L'Armadillo", gender: "Maschio", species: "Armadillo magico", releaseYear: 2009, region: "Shurima", primaryRole: "Tank", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Veigar", title: "Il Piccolo Maestro del Male", gender: "Maschio", species: "Yordle", releaseYear: 2009, region: "Bandle City", primaryRole: "Mage", damageType: "Magic" },
  { name: "Kassadin", title: "Il Viandante del Vuoto", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Shurima", primaryRole: "Assassin", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Gangplank", title: "Il Flagello dei Sette Mari", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Bilgewater", primaryRole: "Fighter", damageType: "Physical" },
  { name: "Taric", title: "L'Aspetto Scudo di Valoran", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Targon", primaryRole: "Support", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Blitzcrank", title: "Il Grande Golem a Vapore", gender: "Maschio", species: "Golem", releaseYear: 2009, region: "Zaun", primaryRole: "Support", secondaryRole: "Tank", damageType: "Magic" },
  { name: "Dr. Mundo", title: "Il Folle di Zaun", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Zaun", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Magic" },
  { name: "Janna", title: "La Furia della Tempesta", gender: "Femmina", species: "Spirito elementale", releaseYear: 2009, region: "Zaun", primaryRole: "Support", damageType: "Magic" },
  { name: "Malphite", title: "Frammento del Monolito", gender: "Maschio", species: "Elementale di roccia", releaseYear: 2009, region: "Ixtal", primaryRole: "Tank", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Corki", title: "Il Bombardiere Spericolato", gender: "Maschio", species: "Yordle", releaseYear: 2009, region: "Bandle City", primaryRole: "Marksman", damageType: "Mixed" },
  { name: "Katarina", title: "La Lama Sinistra", gender: "Femmina", species: "Umano", releaseYear: 2009, region: "Noxus", primaryRole: "Assassin", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Shaco", title: "Il Demone Giullare", gender: "Maschio", species: "Demone", releaseYear: 2009, region: "Runeterra", primaryRole: "Assassin", damageType: "Physical" },
  { name: "Udyr", title: "Lo Spirito Guerriero", gender: "Maschio", species: "Umano", releaseYear: 2009, region: "Freljord", primaryRole: "Jungler", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Nidalee", title: "La Cacciatrice Primitiva", gender: "Femmina", species: "Umano", releaseYear: 2009, region: "Ixtal", primaryRole: "Assassin", secondaryRole: "Mage", damageType: "Magic" },

  // 2010
  { name: "Heimerdinger", title: "Il Venerato Inventore", gender: "Maschio", species: "Yordle", releaseYear: 2010, region: "Piltover", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },
  { name: "Ezreal", title: "L'Esploratore Prodigio", gender: "Maschio", species: "Umano", releaseYear: 2010, region: "Piltover", primaryRole: "Marksman", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Olaf", title: "Il Berserker", gender: "Maschio", species: "Umano", releaseYear: 2010, region: "Freljord", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Akali", title: "L'Assassina Solitaria", gender: "Femmina", species: "Umano", releaseYear: 2010, region: "Ionia", primaryRole: "Assassin", secondaryRole: "Mage", damageType: "Mixed" },
  { name: "Malzahar", title: "Il Profeta del Vuoto", gender: "Maschio", species: "Umano", releaseYear: 2010, region: "Shurima", primaryRole: "Mage", secondaryRole: "Assassin", damageType: "Magic" },
  { name: "Miss Fortune", title: "La Cacciatrice di Taglie", gender: "Femmina", species: "Umano", releaseYear: 2010, region: "Bilgewater", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Swain", title: "Il Noxiano Gran Generale", gender: "Maschio", species: "Umano", releaseYear: 2010, region: "Noxus", primaryRole: "Mage", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Garen", title: "Il Potere di Demacia", gender: "Maschio", species: "Umano", releaseYear: 2010, region: "Demacia", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Urgot", title: "Il Dreadnought", gender: "Maschio", species: "Cyborg", releaseYear: 2010, region: "Zaun", primaryRole: "Marksman", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Lux", title: "La Dama della Luce", gender: "Femmina", species: "Umano", releaseYear: 2010, region: "Demacia", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },
  { name: "LeBlanc", title: "L'Ingannatrice", gender: "Femmina", species: "Umano", releaseYear: 2010, region: "Noxus", primaryRole: "Assassin", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Irelia", title: "La Danzatrice delle Lame", gender: "Femmina", species: "Umano", releaseYear: 2010, region: "Ionia", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Vladimir", title: "Il Raccolti-Sangue Cremisi", gender: "Maschio", species: "Emomante", releaseYear: 2010, region: "Noxus", primaryRole: "Mage", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Galio", title: "Il Colosso", gender: "Maschio", species: "Gargoyle", releaseYear: 2010, region: "Demacia", primaryRole: "Tank", secondaryRole: "Mage", damageType: "Magic" },

  // 2011
  { name: "Trundle", title: "Il Re dei Troll", gender: "Maschio", species: "Troll", releaseYear: 2011, region: "Freljord", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Cassiopeia", title: "L'Abbraccio del Serpente", gender: "Femmina", species: "Naga", releaseYear: 2011, region: "Noxus", primaryRole: "Mage", damageType: "Magic" },
  { name: "Caitlyn", title: "Lo Sceriffo di Piltover", gender: "Femmina", species: "Umano", releaseYear: 2011, region: "Piltover", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Renekton", title: "Il Macellaio delle Sabbie", gender: "Maschio", species: "Asceso", releaseYear: 2011, region: "Shurima", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Karma", title: "La Duca Illuminata", gender: "Femmina", species: "Umano", releaseYear: 2011, region: "Ionia", primaryRole: "Support", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Maokai", title: "Il Treant Contorto", gender: "Maschio", species: "Treant", releaseYear: 2011, region: "Isole Ombra", primaryRole: "Tank", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Jarvan IV", title: "L'Esempio di Demacia", gender: "Maschio", species: "Umano", releaseYear: 2011, region: "Demacia", primaryRole: "Tank", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Nocturne", title: "L'Eterna Paura", gender: "Maschio", species: "Demone", releaseYear: 2011, region: "Runeterra", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Lee Sin", title: "Il Monaco Cieco", gender: "Maschio", species: "Umano", releaseYear: 2011, region: "Ionia", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Brand", title: "La Vendetta Ardente", gender: "Maschio", species: "Spirito di fuoco", releaseYear: 2011, region: "Freljord", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },
  { name: "Rumble", title: "Il Meccanico Minaccia", gender: "Maschio", species: "Yordle", releaseYear: 2011, region: "Bandle City", primaryRole: "Fighter", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Vayne", title: "La Cacciatrice Notturna", gender: "Femmina", species: "Umano", releaseYear: 2011, region: "Demacia", primaryRole: "Marksman", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Orianna", title: "La Dama Meccanica", gender: "Femmina", species: "Robot", releaseYear: 2011, region: "Piltover", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },
  { name: "Yorick", title: "Il Pastore delle Anime Perdute", gender: "Maschio", species: "Non-morto", releaseYear: 2011, region: "Isole Ombra", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Leona", title: "L'Aspetto Radioso", gender: "Femmina", species: "Aspetto", releaseYear: 2011, region: "Targon", primaryRole: "Support", secondaryRole: "Tank", damageType: "Magic" },
  { name: "Wukong", title: "Il Re delle Scimmie", gender: "Maschio", species: "Vastaya", releaseYear: 2011, region: "Ionia", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Skarner", title: "Il Sovrano di Cristallo", gender: "Maschio", species: "Scorpione di cristallo", releaseYear: 2011, region: "Shurima", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Talon", title: "L'Ombra della Lama", gender: "Maschio", species: "Umano", releaseYear: 2011, region: "Noxus", primaryRole: "Assassin", damageType: "Physical" },
  { name: "Riven", title: "L'Esule", gender: "Femmina", species: "Umano", releaseYear: 2011, region: "Noxus", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Xerath", title: "Il Magus Asceso", gender: "Maschio", species: "Asceso", releaseYear: 2011, region: "Shurima", primaryRole: "Mage", damageType: "Magic" },
  { name: "Graves", title: "Il Fuorilegge", gender: "Maschio", species: "Umano", releaseYear: 2011, region: "Bilgewater", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Shyvana", title: "La Sanguinaria", gender: "Femmina", species: "Drago", releaseYear: 2011, region: "Demacia", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Mixed" },
  { name: "Fizz", title: "Il Prestigiatore delle Maree", gender: "Maschio", species: "Yordle acquatico", releaseYear: 2011, region: "Bilgewater", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Volibear", title: "Il Tuono Implacabile", gender: "Maschio", species: "Semidio", releaseYear: 2011, region: "Freljord", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Mixed" },
  { name: "Ahri", title: "La Volpe a Nove Code", gender: "Femmina", species: "Vastaya", releaseYear: 2011, region: "Ionia", primaryRole: "Mage", secondaryRole: "Assassin", damageType: "Magic" },

  // 2012
  { name: "Viktor", title: "L'Araldo delle Macchine", gender: "Maschio", species: "Cyborg", releaseYear: 2012, region: "Zaun", primaryRole: "Mage", damageType: "Magic" },
  { name: "Sejuani", title: "Furia del Nord", gender: "Femmina", species: "Umano", releaseYear: 2012, region: "Freljord", primaryRole: "Tank", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Ziggs", title: "L'Esperto di Esplosivi", gender: "Maschio", species: "Yordle", releaseYear: 2012, region: "Bandle City", primaryRole: "Mage", damageType: "Magic" },
  { name: "Nautilus", title: "Il Titano delle Profondità", gender: "Maschio", species: "Umano", releaseYear: 2012, region: "Bilgewater", primaryRole: "Support", secondaryRole: "Tank", damageType: "Magic" },
  { name: "Fiora", title: "La Gran Duelista", gender: "Femmina", species: "Umano", releaseYear: 2012, region: "Demacia", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Lulu", title: "La Fata Stregona", gender: "Femmina", species: "Yordle", releaseYear: 2012, region: "Bandle City", primaryRole: "Support", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Hecarim", title: "L'Ombra della Guerra", gender: "Maschio", species: "Centauro spettrale", releaseYear: 2012, region: "Isole Ombra", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Varus", title: "La Freccia del Castigo", gender: "Maschio", species: "Darkin", releaseYear: 2012, region: "Ionia", primaryRole: "Marksman", secondaryRole: "Mage", damageType: "Physical" },
  { name: "Darius", title: "La Mano di Noxus", gender: "Maschio", species: "Umano", releaseYear: 2012, region: "Noxus", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Draven", title: "Il Boia Glorioso", gender: "Maschio", species: "Umano", releaseYear: 2012, region: "Noxus", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Jayce", title: "Il Difensore del Futuro", gender: "Maschio", species: "Umano", releaseYear: 2012, region: "Piltover", primaryRole: "Fighter", secondaryRole: "Marksman", damageType: "Physical" },
  { name: "Zyra", title: "L'Ascesa delle Spine", gender: "Femmina", species: "Pianta magica", releaseYear: 2012, region: "Ixtal", primaryRole: "Support", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Diana", title: "Il Disprezzo della Luna", gender: "Femmina", species: "Aspetto", releaseYear: 2012, region: "Targon", primaryRole: "Fighter", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Rengar", title: "Il Cacciatore Supremo", gender: "Maschio", species: "Vastaya", releaseYear: 2012, region: "Shurima", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Syndra", title: "La Sovrana Oscura", gender: "Femmina", species: "Umano", releaseYear: 2012, region: "Ionia", primaryRole: "Mage", damageType: "Magic" },
  { name: "Kha'Zix", title: "Il Predatore del Vuoto", gender: "Maschio", species: "Vuoto", releaseYear: 2012, region: "Vuoto", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Elise", title: "La Regina dei Ragni", gender: "Femmina", species: "Umano/Ragno", releaseYear: 2012, region: "Isole Ombra", primaryRole: "Fighter", secondaryRole: "Mage", damageType: "Magic" },

  // 2013
  { name: "Nami", title: "La Strega delle Maree", gender: "Femmina", species: "Vastaya", releaseYear: 2012, region: "Targon", primaryRole: "Support", damageType: "Magic" },
  { name: "Vi", title: "La Legge di Piltover", gender: "Femmina", species: "Umano", releaseYear: 2012, region: "Piltover", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Thresh", title: "Il Carceriere", gender: "Maschio", species: "Non-morto", releaseYear: 2013, region: "Isole Ombra", primaryRole: "Support", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Quinn", title: "Le Ali di Demacia", gender: "Femmina", species: "Umano", releaseYear: 2013, region: "Demacia", primaryRole: "Marksman", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Zac", title: "L'Arma Segreta", gender: "Maschio", species: "Golem chimico", releaseYear: 2013, region: "Zaun", primaryRole: "Tank", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Lissandra", title: "La Strega di Ghiaccio", gender: "Femmina", species: "Iceborn", releaseYear: 2013, region: "Freljord", primaryRole: "Mage", damageType: "Magic" },
  { name: "Aatrox", title: "La Lama Darkin", gender: "Maschio", species: "Darkin", releaseYear: 2013, region: "Runeterra", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Lucian", title: "Il Purificatore", gender: "Maschio", species: "Umano", releaseYear: 2013, region: "Demacia", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Jinx", title: "La Mina Vagante", gender: "Femmina", species: "Umano", releaseYear: 2013, region: "Zaun", primaryRole: "Marksman", damageType: "Physical" },

  // 2014
  { name: "Yasuo", title: "L'Imperdonato", gender: "Maschio", species: "Umano", releaseYear: 2013, region: "Ionia", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Vel'Koz", title: "L'Occhio del Vuoto", gender: "Maschio", species: "Vuoto", releaseYear: 2014, region: "Vuoto", primaryRole: "Mage", damageType: "Magic" },
  { name: "Braum", title: "Il Cuore del Freljord", gender: "Maschio", species: "Umano", releaseYear: 2014, region: "Freljord", primaryRole: "Support", secondaryRole: "Tank", damageType: "Magic" },
  { name: "Gnar", title: "L'Anello Mancante", gender: "Maschio", species: "Yordle", releaseYear: 2014, region: "Freljord", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Azir", title: "L'Imperatore delle Sabbie", gender: "Maschio", species: "Asceso", releaseYear: 2014, region: "Shurima", primaryRole: "Mage", secondaryRole: "Marksman", damageType: "Magic" },
  { name: "Kalista", title: "La Lancia della Vendetta", gender: "Femmina", species: "Non-morto", releaseYear: 2014, region: "Isole Ombra", primaryRole: "Marksman", damageType: "Physical" },

  // 2015
  { name: "Rek'Sai", title: "La Regina Scavatrice", gender: "Femmina", species: "Vuoto", releaseYear: 2014, region: "Shurima", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Bard", title: "Il Vagabondo Celestiale", gender: "Maschio", species: "Celestiale", releaseYear: 2015, region: "Runeterra", primaryRole: "Support", damageType: "Magic" },
  { name: "Ekko", title: "Il Ragazzo che Spezzò il Tempo", gender: "Maschio", species: "Umano", releaseYear: 2015, region: "Zaun", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Magic" },
  { name: "Tahm Kench", title: "Il Re del Fiume", gender: "Maschio", species: "Demone", releaseYear: 2015, region: "Bilgewater", primaryRole: "Support", secondaryRole: "Tank", damageType: "Magic" },
  { name: "Kindred", title: "Gli Eterni Cacciatori", gender: "Non-binario", species: "Spirito della morte", releaseYear: 2015, region: "Runeterra", primaryRole: "Marksman", damageType: "Physical" },

  // 2016
  { name: "Illaoi", title: "La Sacerdotessa del Kraken", gender: "Femmina", species: "Umano", releaseYear: 2015, region: "Bilgewater", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Jhin", title: "Il Virtuoso", gender: "Maschio", species: "Umano", releaseYear: 2016, region: "Ionia", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Aurelion Sol", title: "Il Forgiatore di Stelle", gender: "Maschio", species: "Drago stellare", releaseYear: 2016, region: "Targon", primaryRole: "Mage", damageType: "Magic" },
  { name: "Taliyah", title: "La Tessitrice di Pietra", gender: "Femmina", species: "Umano", releaseYear: 2016, region: "Shurima", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },
  { name: "Kled", title: "La Carica del Cantore", gender: "Maschio", species: "Yordle", releaseYear: 2016, region: "Noxus", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Ivern", title: "L'Amico Verde", gender: "Maschio", species: "Spirito della natura", releaseYear: 2016, region: "Ionia", primaryRole: "Support", damageType: "Magic" },

  // 2017
  { name: "Camille", title: "L'Ombra d'Acciaio", gender: "Femmina", species: "Cyborg", releaseYear: 2016, region: "Piltover", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Xayah", title: "La Ribelle", gender: "Femmina", species: "Vastaya", releaseYear: 2017, region: "Ionia", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Rakan", title: "L'Incantatore", gender: "Maschio", species: "Vastaya", releaseYear: 2017, region: "Ionia", primaryRole: "Support", damageType: "Magic" },
  { name: "Kayn", title: "L'Ombra dell'Ordine", gender: "Maschio", species: "Umano/Darkin", releaseYear: 2017, region: "Ionia", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Ornn", title: "Il Fuoco della Montagna", gender: "Maschio", species: "Semidio", releaseYear: 2017, region: "Freljord", primaryRole: "Tank", secondaryRole: "Fighter", damageType: "Mixed" },

  // 2018
  { name: "Zoe", title: "L'Aspetto del Crepuscolo", gender: "Femmina", species: "Aspetto", releaseYear: 2017, region: "Targon", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },
  { name: "Kai'Sa", title: "La Figlia del Vuoto", gender: "Femmina", species: "Umano", releaseYear: 2018, region: "Shurima", primaryRole: "Marksman", damageType: "Mixed" },
  { name: "Pyke", title: "Il Macellaio delle Acque Profonde", gender: "Maschio", species: "Umano", releaseYear: 2018, region: "Bilgewater", primaryRole: "Support", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Neeko", title: "La Camaleonte Curiosa", gender: "Femmina", species: "Vastaya", releaseYear: 2018, region: "Ixtal", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },

  // 2019
  { name: "Sylas", title: "L'Usurpatore", gender: "Maschio", species: "Umano", releaseYear: 2019, region: "Demacia", primaryRole: "Mage", secondaryRole: "Assassin", damageType: "Magic" },
  { name: "Yuumi", title: "Il Gatto Magico", gender: "Femmina", species: "Gatto magico", releaseYear: 2019, region: "Bandle City", primaryRole: "Support", damageType: "Magic" },
  { name: "Qiyana", title: "L'Imperatrice degli Elementi", gender: "Femmina", species: "Umano", releaseYear: 2019, region: "Ixtal", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Pantheon", title: "L'Aspetto Inconfutabile", gender: "Maschio", species: "Aspetto", releaseYear: 2019, region: "Targon", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Senna", title: "La Redentrice", gender: "Femmina", species: "Umano", releaseYear: 2019, region: "Demacia", primaryRole: "Marksman", secondaryRole: "Support", damageType: "Physical" },

  // 2020
  { name: "Aphelios", title: "L'Arma dei Fedeli", gender: "Maschio", species: "Umano", releaseYear: 2019, region: "Targon", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Sett", title: "Il Boss", gender: "Maschio", species: "Vastaya", releaseYear: 2020, region: "Ionia", primaryRole: "Fighter", secondaryRole: "Tank", damageType: "Physical" },
  { name: "Lillia", title: "Il Fiore Timido", gender: "Femmina", species: "Fauno magico", releaseYear: 2020, region: "Ionia", primaryRole: "Fighter", secondaryRole: "Mage", damageType: "Magic" },
  { name: "Yone", title: "L'Imperdonato", gender: "Maschio", species: "Spirito/Umano", releaseYear: 2020, region: "Ionia", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Mixed" },
  { name: "Samira", title: "La Rosa del Deserto", gender: "Femmina", species: "Umano", releaseYear: 2020, region: "Shurima", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Seraphine", title: "La Cantante Sognatrice", gender: "Femmina", species: "Umano", releaseYear: 2020, region: "Piltover", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },

  // 2021
  { name: "Rell", title: "Il Cavaliere di Ferro", gender: "Femmina", species: "Umano", releaseYear: 2020, region: "Noxus", primaryRole: "Support", secondaryRole: "Tank", damageType: "Magic" },
  { name: "Viego", title: "Il Re Rovinato", gender: "Maschio", species: "Non-morto", releaseYear: 2021, region: "Isole Ombra", primaryRole: "Assassin", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Gwen", title: "La Sarta Sacra", gender: "Femmina", species: "Bambola magica", releaseYear: 2021, region: "Isole Ombra", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Magic" },
  { name: "Akshan", title: "La Sentinella Canaglia", gender: "Maschio", species: "Umano", releaseYear: 2021, region: "Shurima", primaryRole: "Marksman", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Vex", title: "La Tristezza", gender: "Femmina", species: "Yordle", releaseYear: 2021, region: "Isole Ombra", primaryRole: "Mage", secondaryRole: "Assassin", damageType: "Magic" },

  // 2022
  { name: "Zeri", title: "La Scintilla di Zaun", gender: "Femmina", species: "Umano", releaseYear: 2022, region: "Zaun", primaryRole: "Marksman", damageType: "Physical" },
  { name: "Renata Glasc", title: "La Baronessa Chimica", gender: "Femmina", species: "Umano", releaseYear: 2022, region: "Zaun", primaryRole: "Support", damageType: "Magic" },
  { name: "Bel'Veth", title: "L'Imperatrice del Vuoto", gender: "Femmina", species: "Vuoto", releaseYear: 2022, region: "Vuoto", primaryRole: "Fighter", damageType: "Physical" },
  { name: "Nilah", title: "La Gioia Scatenata", gender: "Femmina", species: "Umano", releaseYear: 2022, region: "Bilgewater", primaryRole: "Marksman", secondaryRole: "Fighter", damageType: "Physical" },

  // 2023
  { name: "K'Sante", title: "Il Fiero", gender: "Maschio", species: "Umano", releaseYear: 2022, region: "Shurima", primaryRole: "Tank", secondaryRole: "Fighter", damageType: "Physical" },
  { name: "Milio", title: "Il Fuoco Gentile", gender: "Maschio", species: "Umano", releaseYear: 2023, region: "Ixtal", primaryRole: "Support", damageType: "Magic" },
  { name: "Naafiri", title: "Il Segugio dai Cento Morsi", gender: "Femmina", species: "Darkin", releaseYear: 2023, region: "Shurima", primaryRole: "Assassin", damageType: "Physical" },

  // 2024
  { name: "Briar", title: "Il Flagello Assetato", gender: "Femmina", species: "Umano", releaseYear: 2023, region: "Noxus", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
  { name: "Hwei", title: "Il Visionario", gender: "Maschio", species: "Umano", releaseYear: 2023, region: "Ionia", primaryRole: "Mage", secondaryRole: "Support", damageType: "Magic" },
  { name: "Smolder", title: "Il Principino Ardente", gender: "Maschio", species: "Drago", releaseYear: 2024, region: "Noxus", primaryRole: "Marksman", damageType: "Magic" },
  { name: "Aurora", title: "La Strega tra i Mondi", gender: "Femmina", species: "Vastaya", releaseYear: 2024, region: "Freljord", primaryRole: "Mage", secondaryRole: "Assassin", damageType: "Magic" },
  { name: "Ambessa", title: "La Matriarca della Guerra", gender: "Femmina", species: "Umano", releaseYear: 2024, region: "Noxus", primaryRole: "Fighter", secondaryRole: "Assassin", damageType: "Physical" },
];

// Funzione semplice per mostrare tutti i campioni
function printChampions(): void {
  console.log('================================\n');
  
  CHAMPIONS.forEach((champion, index) => {
    console.log(`${index + 1}. ${champion.name} - ${champion.gender} - ${champion.species} (${champion.releaseYear})`);
  });
  
  console.log(`\n Totale campioni: ${CHAMPIONS.length}`);
}

// Esegui lo script
printChampions();

// Esporta i dati per uso esterno
export { CHAMPIONS, Champion };

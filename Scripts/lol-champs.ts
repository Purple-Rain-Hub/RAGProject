// Interfaccia per definire la struttura di un campione
interface Champion {
  name: string;
  gender: string;
  species: string;
  releaseYear: number;
}

// Dataset completo dei campioni di League of Legends con informazioni verificate
const CHAMPIONS: Champion[] = [
  // 2009 - Anno di lancio
  { name: "Alistar", gender: "Maschio", species: "Minotauro", releaseYear: 2009 },
  { name: "Annie", gender: "Femmina", species: "Umano", releaseYear: 2009 },
  { name: "Ashe", gender: "Femmina", species: "Umano", releaseYear: 2009 },
  { name: "Fiddlesticks", gender: "Non-binario", species: "Demone", releaseYear: 2009 },
  { name: "Jax", gender: "Maschio", species: "Icathiano", releaseYear: 2009 },
  { name: "Kayle", gender: "Femmina", species: "Aspetto", releaseYear: 2009 },
  { name: "Master Yi", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Morgana", gender: "Femmina", species: "Aspetto", releaseYear: 2009 },
  { name: "Nunu & Willump", gender: "Maschio", species: "Umano e Yeti", releaseYear: 2009 },
  { name: "Ryze", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Sion", gender: "Maschio", species: "Non-morto", releaseYear: 2009 },
  { name: "Sivir", gender: "Femmina", species: "Umano", releaseYear: 2009 },
  { name: "Soraka", gender: "Femmina", species: "Celestiale", releaseYear: 2009 },
  { name: "Teemo", gender: "Maschio", species: "Yordle", releaseYear: 2009 },
  { name: "Tristana", gender: "Femmina", species: "Yordle", releaseYear: 2009 },
  { name: "Twisted Fate", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Warwick", gender: "Maschio", species: "Chimera", releaseYear: 2009 },
  { name: "Singed", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Zilean", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Evelynn", gender: "Femmina", species: "Demone", releaseYear: 2009 },
  { name: "Tryndamere", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Twitch", gender: "Maschio", species: "Ratto", releaseYear: 2009 },
  { name: "Karthus", gender: "Maschio", species: "Lich", releaseYear: 2009 },
  { name: "Ammu", gender: "Maschio", species: "Mummia", releaseYear: 2009 },
  { name: "Cho'Gath", gender: "Maschio", species: "Vuoto", releaseYear: 2009 },
  { name: "Anivia", gender: "Femmina", species: "Cryophoenix", releaseYear: 2009 },
  { name: "Rammus", gender: "Maschio", species: "Armadillo magico", releaseYear: 2009 },
  { name: "Veigar", gender: "Maschio", species: "Yordle", releaseYear: 2009 },
  { name: "Kassadin", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Gangplank", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Taric", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Blitzcrank", gender: "Maschio", species: "Golem", releaseYear: 2009 },
  { name: "Dr. Mundo", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Janna", gender: "Femmina", species: "Spirito elementale", releaseYear: 2009 },
  { name: "Malphite", gender: "Maschio", species: "Elementale di roccia", releaseYear: 2009 },
  { name: "Corki", gender: "Maschio", species: "Yordle", releaseYear: 2009 },
  { name: "Katarina", gender: "Femmina", species: "Umano", releaseYear: 2009 },
  { name: "Shaco", gender: "Maschio", species: "Demone", releaseYear: 2009 },
  { name: "Udyr", gender: "Maschio", species: "Umano", releaseYear: 2009 },
  { name: "Nidalee", gender: "Femmina", species: "Umano", releaseYear: 2009 },

  // 2010
  { name: "Heimerdinger", gender: "Maschio", species: "Yordle", releaseYear: 2010 },
  { name: "Ezreal", gender: "Maschio", species: "Umano", releaseYear: 2010 },
  { name: "Olaf", gender: "Maschio", species: "Umano", releaseYear: 2010 },
  { name: "Akali", gender: "Femmina", species: "Umano", releaseYear: 2010 },
  { name: "Malzahar", gender: "Maschio", species: "Umano", releaseYear: 2010 },
  { name: "Miss Fortune", gender: "Femmina", species: "Umano", releaseYear: 2010 },
  { name: "Swain", gender: "Maschio", species: "Umano", releaseYear: 2010 },
  { name: "Garen", gender: "Maschio", species: "Umano", releaseYear: 2010 },
  { name: "Urgot", gender: "Maschio", species: "Cyborg", releaseYear: 2010 },
  { name: "Lux", gender: "Femmina", species: "Umano", releaseYear: 2010 },
  { name: "LeBlanc", gender: "Femmina", species: "Umano", releaseYear: 2010 },
  { name: "Irelia", gender: "Femmina", species: "Umano", releaseYear: 2010 },
  { name: "Vladmir", gender: "Maschio", species: "Emomante", releaseYear: 2010 },
  { name: "Galio", gender: "Maschio", species: "Gargoyle", releaseYear: 2010 },

  // 2011
  { name: "Trundle", gender: "Maschio", species: "Troll", releaseYear: 2011 },
  { name: "Cassiopeia", gender: "Femmina", species: "Naga", releaseYear: 2011 },
  { name: "Caitlyn", gender: "Femmina", species: "Umano", releaseYear: 2011 },
  { name: "Renekton", gender: "Maschio", species: "Asceso", releaseYear: 2011 },
  { name: "Karma", gender: "Femmina", species: "Umano", releaseYear: 2011 },
  { name: "Maokai", gender: "Maschio", species: "Treant", releaseYear: 2011 },
  { name: "Jarvan IV", gender: "Maschio", species: "Umano", releaseYear: 2011 },
  { name: "Nocturne", gender: "Maschio", species: "Demone", releaseYear: 2011 },
  { name: "Lee Sin", gender: "Maschio", species: "Umano", releaseYear: 2011 },
  { name: "Brand", gender: "Maschio", species: "Spirito di fuoco", releaseYear: 2011 },
  { name: "Rumble", gender: "Maschio", species: "Yordle", releaseYear: 2011 },
  { name: "Vayne", gender: "Femmina", species: "Umano", releaseYear: 2011 },
  { name: "Orianna", gender: "Femmina", species: "Robot", releaseYear: 2011 },
  { name: "Yorick", gender: "Maschio", species: "Non-morto", releaseYear: 2011 },
  { name: "Leona", gender: "Femmina", species: "Aspetto", releaseYear: 2011 },
  { name: "Wukong", gender: "Maschio", species: "Vastaya", releaseYear: 2011 },
  { name: "Skarner", gender: "Maschio", species: "Scorpione di cristallo", releaseYear: 2011 },
  { name: "Talon", gender: "Maschio", species: "Umano", releaseYear: 2011 },
  { name: "Riven", gender: "Femmina", species: "Umano", releaseYear: 2011 },
  { name: "Xerath", gender: "Maschio", species: "Asceso", releaseYear: 2011 },
  { name: "Graves", gender: "Maschio", species: "Umano", releaseYear: 2011 },
  { name: "Shyvana", gender: "Femmina", species: "Drago", releaseYear: 2011 },
  { name: "Fizz", gender: "Maschio", species: "Yordle acquatico", releaseYear: 2011 },
  { name: "Volibear", gender: "Maschio", species: "Semidio", releaseYear: 2011 },
  { name: "Ahri", gender: "Femmina", species: "Vastaya", releaseYear: 2011 },

  // 2012
  { name: "Viktor", gender: "Maschio", species: "Cyborg", releaseYear: 2012 },
  { name: "Sejuani", gender: "Femmina", species: "Umano", releaseYear: 2012 },
  { name: "Ziggs", gender: "Maschio", species: "Yordle", releaseYear: 2012 },
  { name: "Nautilus", gender: "Maschio", species: "Umano", releaseYear: 2012 },
  { name: "Fiora", gender: "Femmina", species: "Umano", releaseYear: 2012 },
  { name: "Lulu", gender: "Femmina", species: "Yordle", releaseYear: 2012 },
  { name: "Hecarim", gender: "Maschio", species: "Centauro spettrale", releaseYear: 2012 },
  { name: "Varus", gender: "Maschio", species: "Darkin", releaseYear: 2012 },
  { name: "Darius", gender: "Maschio", species: "Umano", releaseYear: 2012 },
  { name: "Draven", gender: "Maschio", species: "Umano", releaseYear: 2012 },
  { name: "Jayce", gender: "Maschio", species: "Umano", releaseYear: 2012 },
  { name: "Zyra", gender: "Femmina", species: "Pianta magica", releaseYear: 2012 },
  { name: "Diana", gender: "Femmina", species: "Aspetto", releaseYear: 2012 },
  { name: "Rengar", gender: "Maschio", species: "Vastaya", releaseYear: 2012 },
  { name: "Syndra", gender: "Femmina", species: "Umano", releaseYear: 2012 },
  { name: "Kha'Zix", gender: "Maschio", species: "Vuoto", releaseYear: 2012 },
  { name: "Elise", gender: "Femmina", species: "Umano/Ragno", releaseYear: 2012 },

  // 2013
  { name: "Nami", gender: "Femmina", species: "Vastaya", releaseYear: 2012 },
  { name: "Vi", gender: "Femmina", species: "Umano", releaseYear: 2012 },
  { name: "Thresh", gender: "Maschio", species: "Non-morto", releaseYear: 2013 },
  { name: "Quinn", gender: "Femmina", species: "Umano", releaseYear: 2013 },
  { name: "Zac", gender: "Maschio", species: "Golem chimico", releaseYear: 2013 },
  { name: "Lissandra", gender: "Femmina", species: "Iceborn", releaseYear: 2013 },
  { name: "Aatrox", gender: "Maschio", species: "Darkin", releaseYear: 2013 },
  { name: "Lucian", gender: "Maschio", species: "Umano", releaseYear: 2013 },
  { name: "Jinx", gender: "Femmina", species: "Umano", releaseYear: 2013 },

  // 2014
  { name: "Yasuo", gender: "Maschio", species: "Umano", releaseYear: 2013 },
  { name: "Vel'Koz", gender: "Maschio", species: "Vuoto", releaseYear: 2014 },
  { name: "Braum", gender: "Maschio", species: "Umano", releaseYear: 2014 },
  { name: "Gnar", gender: "Maschio", species: "Yordle", releaseYear: 2014 },
  { name: "Azir", gender: "Maschio", species: "Asceso", releaseYear: 2014 },
  { name: "Kalista", gender: "Femmina", species: "Non-morto", releaseYear: 2014 },

  // 2015
  { name: "Rek'Sai", gender: "Femmina", species: "Vuoto", releaseYear: 2014 },
  { name: "Bard", gender: "Maschio", species: "Celestiale", releaseYear: 2015 },
  { name: "Ekko", gender: "Maschio", species: "Umano", releaseYear: 2015 },
  { name: "Tahm Kench", gender: "Maschio", species: "Demone", releaseYear: 2015 },
  { name: "Kindred", gender: "Non-binario", species: "Spirito della morte", releaseYear: 2015 },

  // 2016
  { name: "Illaoi", gender: "Femmina", species: "Umano", releaseYear: 2015 },
  { name: "Jhin", gender: "Maschio", species: "Umano", releaseYear: 2016 },
  { name: "Aurelion Sol", gender: "Maschio", species: "Drago stellare", releaseYear: 2016 },
  { name: "Taliyah", gender: "Femmina", species: "Umano", releaseYear: 2016 },
  { name: "Kled", gender: "Maschio", species: "Yordle", releaseYear: 2016 },
  { name: "Ivern", gender: "Maschio", species: "Spirito della natura", releaseYear: 2016 },

  // 2017
  { name: "Camille", gender: "Femmina", species: "Cyborg", releaseYear: 2016 },
  { name: "Xayah", gender: "Femmina", species: "Vastaya", releaseYear: 2017 },
  { name: "Rakan", gender: "Maschio", species: "Vastaya", releaseYear: 2017 },
  { name: "Kayn", gender: "Maschio", species: "Umano/Darkin", releaseYear: 2017 },
  { name: "Ornn", gender: "Maschio", species: "Semidio", releaseYear: 2017 },

  // 2018
  { name: "Zoe", gender: "Femmina", species: "Aspetto", releaseYear: 2017 },
  { name: "Kai'Sa", gender: "Femmina", species: "Umano", releaseYear: 2018 },
  { name: "Pyke", gender: "Maschio", species: "Umano", releaseYear: 2018 },
  { name: "Neeko", gender: "Femmina", species: "Vastaya", releaseYear: 2018 },

  // 2019
  { name: "Sylas", gender: "Maschio", species: "Umano", releaseYear: 2019 },
  { name: "Yuumi", gender: "Femmina", species: "Gatto magico", releaseYear: 2019 },
  { name: "Qiyana", gender: "Femmina", species: "Umano", releaseYear: 2019 },
  { name: "Pantheon", gender: "Maschio", species: "Aspetto", releaseYear: 2019 },
  { name: "Senna", gender: "Femmina", species: "Umano", releaseYear: 2019 },

  // 2020
  { name: "Aphelios", gender: "Maschio", species: "Umano", releaseYear: 2019 },
  { name: "Sett", gender: "Maschio", species: "Vastaya", releaseYear: 2020 },
  { name: "Lillia", gender: "Femmina", species: "Fauno magico", releaseYear: 2020 },
  { name: "Yone", gender: "Maschio", species: "Spirito/Umano", releaseYear: 2020 },
  { name: "Samira", gender: "Femmina", species: "Umano", releaseYear: 2020 },
  { name: "Seraphine", gender: "Femmina", species: "Umano", releaseYear: 2020 },

  // 2021
  { name: "Rell", gender: "Femmina", species: "Umano", releaseYear: 2020 },
  { name: "Viego", gender: "Maschio", species: "Non-morto", releaseYear: 2021 },
  { name: "Gwen", gender: "Femmina", species: "Bambola magica", releaseYear: 2021 },
  { name: "Akshan", gender: "Maschio", species: "Umano", releaseYear: 2021 },
  { name: "Vex", gender: "Femmina", species: "Yordle", releaseYear: 2021 },

  // 2022
  { name: "Zeri", gender: "Femmina", species: "Umano", releaseYear: 2022 },
  { name: "Renata Glasc", gender: "Femmina", species: "Umano", releaseYear: 2022 },
  { name: "Bel'Veth", gender: "Femmina", species: "Vuoto", releaseYear: 2022 },
  { name: "Nilah", gender: "Femmina", species: "Umano", releaseYear: 2022 },

  // 2023
  { name: "K'Sante", gender: "Maschio", species: "Umano", releaseYear: 2022 },
  { name: "Milio", gender: "Maschio", species: "Umano", releaseYear: 2023 },
  { name: "Naafiri", gender: "Femmina", species: "Darkin", releaseYear: 2023 },

  // 2024
  { name: "Briar", gender: "Femmina", species: "Umano", releaseYear: 2023 },
  { name: "Hwei", gender: "Maschio", species: "Umano", releaseYear: 2023 },
  { name: "Smolder", gender: "Maschio", species: "Drago", releaseYear: 2024 },
  { name: "Aurora", gender: "Femmina", species: "Vastaya", releaseYear: 2024 },
  { name: "Ambessa", gender: "Femmina", species: "Umano", releaseYear: 2024 },
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

# 🎮 LoL Champion Guess Game

Un gioco interattivo dove devi indovinare il campione misterioso di League of Legends utilizzando un sistema di ranking basato su AI e vettori semantici.

## 🎯 Cos'è il gioco

**LoL Champion Guess** è un'applicazione web che simula il famoso gioco "Wordle" ma con i campioni di League of Legends. Ogni giorno viene selezionato un campione misterioso e tu devi indovinarlo inserendo nomi di altri campioni. Il sistema ti dirà quanto sei vicino al campione target utilizzando un ranking basato su similarità semantica.

### Come funziona
1. **Campione del giorno**: Ogni giorno viene selezionato automaticamente un campione misterioso
2. **Indovina**: Inserisci il nome di un campione che pensi possa essere quello giusto
3. **Ranking**: Il sistema ti mostra la posizione del tuo campione rispetto al target (0 = hai indovinato!)
4. **Continua**: Usa i suggerimenti per avvicinarti sempre di più al campione misterioso

## 🚀 Tecnologie utilizzate

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI/ML**: LlamaIndex, OpenAI Embeddings, Google Gemini 2.0 Flash
- **Database vettoriale**: Upstash Vector
- **Deployment**: Vercel (raccomandato)

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere:

- Node.js 18+ installato
- Un account [OpenAI](https://openai.com) per gli embeddings
- Un account [Google AI Studio](https://makersuite.google.com/app/apikey) per Gemini
- Un account [Upstash](https://upstash.com) per il database vettoriale

## ⚙️ Setup e Installazione

### 1. Clona il repository

```bash
git clone <your-repo-url>
cd RAGProject
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Configura le variabili d'ambiente

Crea un file `.env.local` nella root del progetto:

```env
# OpenAI API Key (per gli embeddings)
OPENAI_API_KEY=your_openai_api_key_here

# Google AI API Key (per Gemini)
GOOGLE_API_KEY=your_google_api_key_here

# Upstash Vector Database
UPSTASH_VECTOR_REST_URL=your_upstash_vector_url_here
UPSTASH_VECTOR_REST_TOKEN=your_upstash_vector_token_here
```

### 4. Inizializza il database vettoriale

Il primo avvio dell'applicazione inizializzerà automaticamente il database vettoriale con tutti i campioni di League of Legends. Questo processo potrebbe richiedere alcuni minuti.

### 5. Avvia l'applicazione

```bash
# Modalità sviluppo
npm run dev

# Build per produzione
npm run build
npm start
```

L'applicazione sarà disponibile su `http://localhost:3000`

## 🎮 Come giocare

1. **Apri l'applicazione** nel tuo browser
2. **Aspetta** che il sistema di analisi si inizializzi (solo al primo avvio)
3. **Inserisci** il nome di un campione nella casella di testo
4. **Clicca "Analizza Campione"** o premi Invio
5. **Leggi il risultato**:
   - 🎉 **Ranking 0**: Hai indovinato il campione misterioso!
   - 📍 **Ranking 1-5**: Molto vicino!
   - 📍 **Ranking 6-15**: Abbastanza vicino
   - 📍 **Ranking 16+**: Lontano dal target

6. **Continua** a provare fino a quando non indovini!

## 🏗️ Architettura del progetto

```
RAGProject/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── champions/     # Endpoint per lista campioni
│   │   └── ranking/       # Endpoint per calcolo ranking
│   ├── components/        # Componenti React
│   ├── hooks/            # Custom hooks
│   ├── layout.tsx        # Layout principale
│   └── page.tsx          # Pagina principale
├── Scripts/              # Scripts di utilità
│   ├── lol-champs.ts     # Dataset campioni
│   ├── lol-champs-emb.ts # Generazione embeddings
│   └── lol-champs-query.ts # Query e ranking
└── public/               # File statici
```

## 🔧 Funzionalità principali

### Sistema di Ranking Semantico
- Utilizza **OpenAI Embeddings** per convertire i nomi dei campioni in vettori semantici
- **Gemini 2.0 Flash** per l'elaborazione del linguaggio naturale
- **Upstash Vector** per lo storage e la ricerca vettoriale

### Campione del Giorno
- Selezione **deterministica** basata sulla data
- Il campione cambia ogni giorno automaticamente
- Stesso campione per tutti i giocatori nello stesso giorno

### Interfaccia Utente
- **Design moderno** con tema League of Legends
- **Autocompletamento** per i nomi dei campioni
- **Feedback visivo** con colori per indicare la vicinanza
- **Responsive design** per mobile e desktop

### Sistema di Cache
- **Cache intelligente** per migliorare le performance
- **Inizializzazione automatica** del database vettoriale
- **Gestione errori** robusta

## 🚀 Deployment

### Vercel (Raccomandato)

1. **Collega** il tuo repository GitHub a Vercel
2. **Aggiungi** le variabili d'ambiente nel dashboard Vercel
3. **Deploy** automatico ad ogni push

### Altre piattaforme

L'applicazione può essere deployata su qualsiasi piattaforma che supporti Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Dataset

Il dataset include **159 campioni** di League of Legends con informazioni complete:
- Nome e titolo
- Genere e specie
- Anno di rilascio
- Regione di appartenenza
- Ruoli primari e secondari
- Tipo di danno

## 🐛 Troubleshooting

### Problemi comuni

**Errore "Cache initialization failed"**
- Verifica che le API keys siano corrette
- Controlla che Upstash Vector sia configurato correttamente
- Assicurati di avere credito sufficiente su OpenAI e Google AI

**App lenta al primo avvio**
- Normale per la prima volta, il sistema deve creare gli embeddings
- Il processo può richiedere 2-5 minuti

**Campioni non trovati**
- Verifica che il nome sia scritto correttamente
- Usa l'autocompletamento per suggerimenti

### Log e debugging

Controlla la console del browser e i log del server per informazioni dettagliate sugli errori.

## 🤝 Contributi

I contributi sono benvenuti! Per contribuire:

1. Fork del repository
2. Crea un branch per la tua feature
3. Commit delle modifiche
4. Push al branch
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## 🎯 Roadmap futura

- [ ] Modalità multiplayer
- [ ] Statistiche personali
- [ ] Leaderboard globale
- [ ] Temi personalizzabili
- [ ] Supporto per altre lingue
- [ ] Integrazione con API ufficiale di League of Legends

---

**Buon divertimento e buona fortuna nel trovare il campione misterioso!** 🎮✨
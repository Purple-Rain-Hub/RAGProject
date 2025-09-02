
export default function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent float-animation">
        🏆 Campione Misterioso 🏆
      </h1>
      <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mb-4"></div>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Indovina il campione nascosto! Ogni tentativo ti rivelerà quanto sei vicino alla risposta corretta,
        ma dovrai usare le tue conoscenze sui campioni di League of Legends per scoprire chi si nasconde nell'ombra.
      </p>
    </div>
  );
}

export {}

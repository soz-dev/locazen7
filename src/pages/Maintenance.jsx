import React from "react";
import { Wrench, AlertTriangle, RefreshCw } from "lucide-react";

export default function Maintenance({ error = false, errorMsg = "", onRetry }) {
  return (
    <div className="min-h-screen bg-[#0C4A6E] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            {error
              ? <AlertTriangle size={28} className="text-[#F59E0B]" />
              : <Wrench size={28} className="text-[#38BDF8]" />
            }
          </div>
        </div>

        <p className="text-[#38BDF8] text-xs tracking-[0.3em] uppercase font-body mb-4">
          Locazen · Sète
        </p>

        <h1 className="font-heading text-4xl md:text-5xl font-light text-white leading-tight mb-6">
          {error ? (
            <>Oups, une<br /><span className="italic text-[#F59E0B]">erreur</span></>
          ) : (
            <>Site en<br /><span className="italic text-[#F59E0B]">maintenance</span></>
          )}
        </h1>

        <p className="text-white/50 text-sm font-body leading-relaxed">
          {error
          ? (errorMsg ? errorMsg : "Un problème de chargement est survenu. Merci de réessayer dans un instant.")
            : "Nous effectuons une mise à jour.\nMerci de revenir dans quelques instants."
          }
        </p>

        {error && onRetry && (
          <button
            onClick={onRetry}
            className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 border border-white/20 text-white/70 text-xs tracking-[0.2em] uppercase font-body hover:border-white/40 hover:text-white transition-colors"
          >
            <RefreshCw size={14} />
            Réessayer
          </button>
        )}

        {!error && (
          <p className="mt-2 text-white/25 text-xs font-body tracking-wide">
            We'll be back shortly.
          </p>
        )}

        <div className="mt-12 w-12 h-px bg-white/10 mx-auto" />

        <p className="mt-6 text-white/15 text-[10px] font-body tracking-[0.2em] uppercase">
          © Locazen · Conciergerie de location à Sète
        </p>
      </div>
    </div>
  );
}


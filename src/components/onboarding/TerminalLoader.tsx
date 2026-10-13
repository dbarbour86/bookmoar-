"use client";

import { useEffect, useState } from "react";
import { Terminal, Shield, Cpu } from "lucide-react";

interface TerminalLoaderProps {
  businessName: string;
}

const TERMINAL_LOGS = [
  "INITIALIZING SECURE TLS HANDSHAKE...",
  "ENCODING FORM PAYLOAD TO BOOK MOAR REPOSITORY...",
  "PROVISIONING CLIENT PROFILE & STAGING ENVIRONMENT...",
  "PACKAGING SERVICES MATRIX & TIME BUFFER ALGORITHMS...",
  "CONFIGURING DISPATCH GATEWAY: TWILIO SMS & SMTP RELAY...",
  "TRANSMITTING STRUCTURED TELEMETRY TO WEBHOOK RECEIVER...",
  "VERIFYING PAYLOAD CHECKSUM & PERSISTENCE...",
  "FINALIZING STAGING CONTAINER DEPLOYMENT...",
];

export default function TerminalLoader({ businessName }: TerminalLoaderProps) {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < TERMINAL_LOGS.length) {
        const nextLog = TERMINAL_LOGS[currentIdx];
        setActiveLogs((prev) => [...prev, nextLog]);
        currentIdx++;
        setProgress((prev) => Math.min(prev + 12, 98));
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 sm:p-8 bg-[#0B0B0D] border border-primary-red/40 rounded-2xl shadow-[0_0_40px_rgba(255,37,56,0.25)] space-y-6 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary-red/10 blur-[100px] pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-red/10 border border-primary-red/30 flex items-center justify-center text-primary-red">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="font-display text-xl text-white-text tracking-wide uppercase block">
              BOOK MOAR PROVISIONING ENGINE
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-text">
          <Cpu className="w-3.5 h-3.5 text-primary-red animate-spin" />
          <span className="text-primary-red font-bold font-mono">PIPELINE ACTIVE</span>
        </div>
      </div>

      {/* Target Spec Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#050505] p-3.5 rounded-xl border border-white/5 relative z-10">
        <div>
          <span className="text-muted-text block text-[10px] uppercase font-bold tracking-wider">TARGET ENTITY:</span>
          <span className="text-white-text font-bold truncate block">{businessName || "NEW CLIENT"}</span>
        </div>
        <div>
          <span className="text-muted-text block text-[10px] uppercase font-bold tracking-wider">PROTOCOL:</span>
          <span className="text-primary-red font-mono font-bold">REST WEBHOOK // POST</span>
        </div>
        <div>
          <span className="text-muted-text block text-[10px] uppercase font-bold tracking-wider">CONTAINER STATUS:</span>
          <span className="text-white-text font-bold">ALLOCATING STAGING</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 relative z-10">
        <div className="flex justify-between text-xs text-muted-text">
          <span className="uppercase tracking-wider font-semibold">PROGRESS:</span>
          <span className="text-primary-red font-bold font-mono">{progress}% COMPLETE</span>
        </div>
        <div className="w-full h-2.5 bg-[#050505] rounded-full border border-white/10 p-0.5 overflow-hidden">
          <div
            className="h-full bg-primary-red rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_#FF2538]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Animated Log Stream */}
      <div className="bg-[#050505] border border-white/10 rounded-xl p-4 min-h-[160px] text-xs space-y-1.5 text-white-text font-mono overflow-y-auto relative z-10">
        <div className="text-muted-text text-[11px] pb-1.5 border-b border-white/5 flex items-center justify-between">
          <span>[SYSTEM DISPATCH SYSLOG]</span>
          <span className="text-primary-red text-[10px]">ENCRYPTED SSL</span>
        </div>
        {activeLogs.map((log, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-primary-red select-none">&gt;&gt;</span>
            <span className="text-white-text/90 leading-relaxed">{log}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1 text-muted-text">
          <span className="text-primary-red">&gt;&gt;</span>
          <span className="text-white-text font-semibold">DEPLOYING SERVICES</span>
          <span className="w-2 h-4 bg-primary-red inline-block terminal-cursor" />
        </div>
      </div>

      {/* Footnote */}
      <div className="flex items-center justify-between text-[11px] text-muted-text pt-2 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-primary-red" />
          <span>DO NOT REFRESH OR CLOSE BROWSER</span>
        </div>
        <span className="text-muted-text font-mono font-bold">BM-AUTH-OK</span>
      </div>
    </div>
  );
}

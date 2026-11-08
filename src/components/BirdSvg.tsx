import React from 'react';

export const BirdSvgDefs: React.FC = () => {
  return (
    <svg width="0" height="0" className="hidden absolute" aria-hidden="true">
      <defs>
        {/* 1. Red Bird */}
        <g id="bird-red">
          <circle cx="50" cy="50" r="45" fill="#e3000f" />
          <path d="M 20 80 Q 50 100 80 80" fill="#f4e0c4" />
          <circle cx="35" cy="45" r="10" fill="white" />
          <circle cx="35" cy="45" r="3" fill="black" />
          <circle cx="65" cy="45" r="10" fill="white" />
          <circle cx="65" cy="45" r="3" fill="black" />
          <path d="M 20 30 L 45 40 L 45 35 Z" fill="black" />
          <path d="M 80 30 L 55 40 L 55 35 Z" fill="black" />
          <path d="M 40 60 L 60 60 L 50 75 Z" fill="#ffcc00" />
          <path d="M 45 10 Q 50 0 55 10" fill="#e3000f" stroke="black" strokeWidth="2" />
        </g>
        {/* 2. Yellow Bird */}
        <g id="bird-yellow">
          <polygon points="50,10 10,90 90,90" fill="#ffd600" />
          <path d="M 20 90 Q 50 100 80 90" fill="#ffffff" />
          <circle cx="40" cy="60" r="8" fill="white" />
          <circle cx="40" cy="60" r="3" fill="black" />
          <circle cx="60" cy="60" r="8" fill="white" />
          <circle cx="60" cy="60" r="3" fill="black" />
          <path d="M 25 45 L 45 55 L 45 50 Z" fill="#cc0000" />
          <path d="M 75 45 L 55 55 L 55 50 Z" fill="#cc0000" />
          <path d="M 45 70 L 55 70 L 50 85 Z" fill="#ff9900" />
          <path d="M 50 10 L 45 0 L 55 5 Z" fill="black" />
        </g>
        {/* 3. Black Bird */}
        <g id="bird-black">
          <circle cx="50" cy="55" r="40" fill="#1a1a1a" />
          <path d="M 30 85 Q 50 100 70 85" fill="#999999" />
          <circle cx="35" cy="50" r="8" fill="white" />
          <circle cx="37" cy="50" r="3" fill="black" />
          <circle cx="65" cy="50" r="8" fill="white" />
          <circle cx="63" cy="50" r="3" fill="black" />
          <path d="M 25 35 L 45 45 L 45 40 Z" fill="#ffcc00" />
          <path d="M 75 35 L 55 45 L 55 40 Z" fill="#ffcc00" />
          <circle cx="50" cy="65" r="5" fill="#ff9900" />
          <path d="M 50 15 Q 50 5 60 5" fill="none" stroke="#ffcc00" strokeWidth="4" />
          <circle cx="60" cy="5" r="4" fill="#ff0000" />
        </g>
        {/* 4. Blue Bird */}
        <g id="bird-blue">
          <circle cx="50" cy="50" r="30" fill="#66ccff" />
          <path d="M 35 70 Q 50 85 65 70" fill="#ffffff" />
          <circle cx="40" cy="45" r="6" fill="white" />
          <circle cx="40" cy="45" r="2" fill="black" />
          <circle cx="60" cy="45" r="6" fill="white" />
          <circle cx="60" cy="45" r="2" fill="black" />
          <path d="M 45 55 L 55 55 L 50 65 Z" fill="#ffcc00" />
          <path d="M 45 20 Q 50 15 55 20" fill="none" stroke="#003366" strokeWidth="3" />
        </g>
        {/* 5. White Bird */}
        <g id="bird-white">
          <ellipse cx="50" cy="50" rx="40" ry="45" fill="#ffffff" />
          <circle cx="35" cy="40" r="7" fill="black" />
          <circle cx="35" cy="40" r="2" fill="white" />
          <circle cx="65" cy="40" r="7" fill="black" />
          <circle cx="65" cy="40" r="2" fill="white" />
          <path d="M 25 25 L 40 30 L 40 27 Z" fill="#ff9999" />
          <path d="M 75 25 L 60 30 L 60 27 Z" fill="#ff9999" />
          <path d="M 40 55 L 60 55 L 50 70 Z" fill="#ffcc00" />
        </g>
        {/* 6. Green Bird */}
        <g id="bird-green">
          <path d="M 10 50 Q 50 90 90 50 Q 50 10 10 50" fill="#33cc33" />
          <circle cx="35" cy="50" r="7" fill="white" />
          <circle cx="35" cy="50" r="2" fill="black" />
          <circle cx="65" cy="50" r="7" fill="white" />
          <circle cx="65" cy="50" r="2" fill="black" />
          <path d="M 10 50 L 30 50 L 20 60 Z" fill="#ffcc00" />
          <path d="M 45 15 Q 50 5 55 15" fill="none" stroke="black" strokeWidth="2" />
        </g>
        {/* 7. Big Red Bird */}
        <g id="bird-bigred">
          <circle cx="50" cy="50" r="50" fill="#990000" />
          <path d="M 10 80 Q 50 100 90 80" fill="#e6ccb3" />
          <circle cx="30" cy="40" r="8" fill="white" />
          <circle cx="30" cy="40" r="2" fill="black" />
          <circle cx="70" cy="40" r="8" fill="white" />
          <circle cx="70" cy="40" r="2" fill="black" />
          <path d="M 15 25 L 45 35 L 45 30 Z" fill="black" />
          <path d="M 85 25 L 55 35 L 55 30 Z" fill="black" />
          <path d="M 40 60 L 60 60 L 50 80 Z" fill="#ff9900" />
        </g>
        {/* 8. Pink Bird */}
        <g id="bird-pink">
          <circle cx="50" cy="50" r="35" fill="#ff66b2" />
          <path d="M 25 75 Q 50 90 75 75" fill="#ffe6f2" />
          <circle cx="35" cy="45" r="9" fill="white" />
          <circle cx="35" cy="45" r="3" fill="#0066cc" />
          <circle cx="65" cy="45" r="9" fill="white" />
          <circle cx="65" cy="45" r="3" fill="#0066cc" />
          <path d="M 45 60 L 55 60 L 50 70 Z" fill="#ffcc00" />
          <path d="M 40 10 Q 50 0 60 10" fill="none" stroke="#ff3399" strokeWidth="4" />
        </g>
        {/* 9. Orange Bird */}
        <g id="bird-orange">
          <circle cx="50" cy="50" r="30" fill="#ff9933" />
          <path d="M 30 70 Q 50 85 70 70" fill="#ffffff" />
          <circle cx="40" cy="40" r="6" fill="white" />
          <circle cx="40" cy="40" r="2" fill="black" />
          <circle cx="60" cy="40" r="6" fill="white" />
          <circle cx="60" cy="40" r="2" fill="black" />
          <path d="M 45 50 L 55 50 L 50 60 Z" fill="#ffcc00" />
        </g>
        {/* 10. Silver Bird */}
        <g id="bird-silver">
          <polygon points="50,20 20,80 80,80" fill="#cccccc" />
          <circle cx="40" cy="55" r="7" fill="white" />
          <circle cx="40" cy="55" r="2" fill="black" />
          <circle cx="60" cy="55" r="7" fill="white" />
          <circle cx="60" cy="55" r="2" fill="black" />
          <path d="M 45 65 L 55 65 L 50 75 Z" fill="#ff9900" />
          <path d="M 45 10 Q 50 0 55 10" fill="none" stroke="black" strokeWidth="2" />
        </g>
        {/* 11. Mighty Eagle */}
        <g id="bird-eagle">
          <ellipse cx="50" cy="50" rx="50" ry="45" fill="#5c3a21" />
          <path d="M 10 75 Q 50 100 90 75" fill="#ffffff" />
          <circle cx="35" cy="40" r="10" fill="white" />
          <circle cx="35" cy="40" r="3" fill="black" />
          <circle cx="65" cy="40" r="10" fill="white" />
          <circle cx="65" cy="40" r="3" fill="black" />
          <path d="M 15 25 L 45 35 L 45 30 Z" fill="black" />
          <path d="M 85 25 L 55 35 L 55 30 Z" fill="black" />
          <path d="M 30 50 L 70 50 L 50 85 Z" fill="#ffb700" stroke="#cc8800" strokeWidth="2" />
        </g>
        {/* 12. Ice Bird */}
        <g id="bird-ice">
          <rect x="15" y="15" width="70" height="70" rx="15" fill="#aee2ff" stroke="#7ab8ff" strokeWidth="3" />
          <circle cx="35" cy="40" r="8" fill="white" />
          <circle cx="35" cy="40" r="3" fill="black" />
          <circle cx="65" cy="40" r="8" fill="white" />
          <circle cx="65" cy="40" r="3" fill="black" />
          <path d="M 25 25 L 45 35 L 45 30 Z" fill="#0055aa" />
          <path d="M 75 25 L 55 35 L 55 30 Z" fill="#0055aa" />
          <path d="M 40 55 L 60 55 L 50 70 Z" fill="#ffcc00" />
          <polygon points="50,15 45,0 55,5" fill="#aee2ff" />
        </g>
        {/* 13. Melody */}
        <g id="bird-melody">
          <circle cx="50" cy="55" r="35" fill="#f4d03f" />
          <path d="M 25 75 Q 50 95 75 75" fill="#fdf2e9" />
          <circle cx="38" cy="45" r="8" fill="white" />
          <circle cx="38" cy="45" r="3" fill="black" />
          <circle cx="62" cy="45" r="8" fill="white" />
          <circle cx="62" cy="45" r="3" fill="black" />
          <path d="M 30 35 Q 40 30 45 38" fill="none" stroke="#e67e22" strokeWidth="3" />
          <path d="M 70 35 Q 60 30 55 38" fill="none" stroke="#e67e22" strokeWidth="3" />
          <path d="M 40 60 L 60 60 Q 50 75 40 60 Z" fill="#e67e22" />
          <path d="M 50 20 L 50 5 L 65 10 L 65 15 L 53 10 L 53 20" fill="#d35400" stroke="#d35400" strokeWidth="2" />
          <circle cx="48" cy="20" r="4" fill="#d35400" />
        </g>
        {/* 14. Tony */}
        <g id="bird-tony">
          <circle cx="50" cy="50" r="50" fill="#85c1e9" />
          <path d="M 10 80 Q 50 100 90 80" fill="#ffffff" />
          <circle cx="30" cy="40" r="8" fill="white" />
          <circle cx="30" cy="40" r="2" fill="black" />
          <circle cx="70" cy="40" r="8" fill="white" />
          <circle cx="70" cy="40" r="2" fill="black" />
          <path d="M 15 25 L 45 35 L 45 30 Z" fill="#1b4f72" />
          <path d="M 85 25 L 55 35 L 55 30 Z" fill="#1b4f72" />
          <path d="M 40 60 L 60 60 L 50 80 Z" fill="#f39c12" />
        </g>
        {/* 15. Ruby */}
        <g id="bird-ruby">
          <circle cx="50" cy="50" r="40" fill="#e74c3c" />
          <path d="M 25 75 Q 50 95 75 75" fill="#fdedec" />
          <circle cx="35" cy="45" r="9" fill="white" />
          <circle cx="35" cy="45" r="3" fill="black" />
          <circle cx="65" cy="45" r="9" fill="white" />
          <circle cx="65" cy="45" r="3" fill="black" />
          <path d="M 26 40 L 20 35 M 28 38 L 24 30 M 32 36 L 30 28" stroke="black" strokeWidth="2" />
          <path d="M 74 40 L 80 35 M 72 38 L 76 30 M 68 36 L 70 28" stroke="black" strokeWidth="2" />
          <polygon points="50,15 35,5 35,25" fill="#f1c40f" />
          <polygon points="50,15 65,5 65,25" fill="#f1c40f" />
          <circle cx="50" cy="15" r="4" fill="#f39c12" />
          <path d="M 40 60 L 60 60 L 50 75 Z" fill="#f39c12" />
        </g>
        {/* 16. Leonard */}
        <g id="bird-leonard">
          <path d="M 25 15 L 35 30 L 50 5 L 65 30 L 75 15 L 70 35 L 30 35 Z" fill="#f1c40f" stroke="#d4ac0d" strokeWidth="2" />
          <circle cx="50" cy="55" r="40" fill="#77cc33" />
          <path d="M 15 55 Q 50 100 85 55 Q 75 75 50 85 Q 25 75 15 55 Z" fill="#2d4a13" />
          <ellipse cx="50" cy="60" rx="16" ry="12" fill="#559922" />
          <circle cx="43" cy="60" r="3" fill="#224400" />
          <circle cx="57" cy="60" r="3" fill="#224400" />
          <circle cx="35" cy="40" r="7" fill="white" />
          <circle cx="35" cy="40" r="2" fill="black" />
          <circle cx="65" cy="40" r="7" fill="white" />
          <circle cx="65" cy="40" r="2" fill="black" />
          <path d="M 22 35 Q 35 30 42 38" fill="none" stroke="#2d4a13" strokeWidth="4" strokeLinecap="round" />
          <path d="M 78 35 Q 65 30 58 38" fill="none" stroke="#2d4a13" strokeWidth="4" strokeLinecap="round" />
        </g>
        {/* 17. Shade */}
        <g id="bird-shade">
          <ellipse cx="50" cy="50" rx="40" ry="45" fill="#f8f9fa" />
          <circle cx="20" cy="45" r="4" fill="#4a4a4a" />
          <circle cx="23" cy="60" r="5" fill="#4a4a4a" />
          <circle cx="18" cy="70" r="3" fill="#4a4a4a" />
          <circle cx="38" cy="40" r="11" fill="none" stroke="#4a4a4a" strokeWidth="2" />
          <circle cx="62" cy="40" r="11" fill="none" stroke="#4a4a4a" strokeWidth="2" />
          <circle cx="38" cy="40" r="9" fill="#ff7f50" />
          <circle cx="62" cy="40" r="9" fill="#ff7f50" />
          <circle cx="38" cy="40" r="3" fill="#ffffff" />
          <circle cx="62" cy="40" r="3" fill="#ffffff" />
          <path d="M 45 48 L 55 48 L 50 58 Z" fill="#f1c40f" />
          <path d="M 35 15 Q 35 5 28 5" fill="none" stroke="#4a4a4a" strokeWidth="4" strokeLinecap="round" />
          <path d="M 50 10 Q 50 0 45 -2" fill="none" stroke="#4a4a4a" strokeWidth="4" strokeLinecap="round" />
          <path d="M 65 15 Q 65 5 72 5" fill="none" stroke="#4a4a4a" strokeWidth="4" strokeLinecap="round" />
          <path d="M 30 85 Q 50 105 70 85 Q 60 95 50 90 Q 40 95 30 85 Z" fill="#e2e8f0" />
        </g>
        {/* 18. Bounci */}
        <g id="bird-bounci">
          <path d="M 25 50 L 5 40 L 15 55 L 2 60 L 15 65 L 5 75 L 25 70 Z" fill="#1a1a1a" />
          <ellipse cx="50" cy="55" rx="35" ry="45" fill="#9333ea" />
          <path d="M 25 80 Q 50 105 75 80" fill="#d8b4fe" />
          <circle cx="38" cy="45" r="8" fill="white" />
          <circle cx="38" cy="45" r="3" fill="#4b5563" />
          <circle cx="62" cy="45" r="8" fill="white" />
          <circle cx="62" cy="45" r="3" fill="#4b5563" />
          <path d="M 25 40 L 45 48 L 45 42 Z" fill="black" />
          <path d="M 75 40 L 55 48 L 55 42 Z" fill="black" />
          <path d="M 40 60 L 60 60 L 50 75 Z" fill="#ffcc00" />
          <path d="M 50 10 Q 45 -5 40 5 Q 50 5 55 10" fill="none" stroke="#9333ea" strokeWidth="4" strokeLinecap="round" />
          <path d="M 50 10 Q 55 -5 65 5 Q 55 5 50 10" fill="none" stroke="#9333ea" strokeWidth="4" strokeLinecap="round" />
        </g>
        {/* 19. Gale */}
        <g id="bird-gale">
          <path d="M 25 15 L 35 30 L 50 0 L 65 30 L 75 15 L 70 35 L 30 35 Z" fill="#f1c40f" stroke="#d4ac0d" strokeWidth="2" />
          <circle cx="50" cy="55" r="38" fill="#5e2a84" />
          <path d="M 20 75 Q 50 100 80 75" fill="#d7bde2" />
          <circle cx="35" cy="45" r="9" fill="white" />
          <circle cx="35" cy="45" r="3" fill="#2c3e50" />
          <circle cx="65" cy="45" r="9" fill="white" />
          <circle cx="65" cy="45" r="3" fill="#2c3e50" />
          <path d="M 25 40 Q 35 35 44 42" fill="none" stroke="#2980b9" strokeWidth="4" strokeLinecap="round" />
          <path d="M 75 40 Q 65 35 56 42" fill="none" stroke="#2980b9" strokeWidth="4" strokeLinecap="round" />
          <path d="M 45 55 L 55 55 L 50 68 Z" fill="#f39c12" />
          <path d="M 12 55 Q 50 90 88 55" fill="none" stroke="#2c3e50" strokeWidth="4" />
        </g>
        {/* 20. Shakira */}
        <g id="bird-shakira">
          <path d="M 20 50 Q 10 70 20 90 Q 30 70 25 50" fill="#fcd34d" />
          <path d="M 80 50 Q 90 70 80 90 Q 70 70 75 50" fill="#fcd34d" />
          <circle cx="50" cy="55" r="38" fill="#fb923c" />
          <path d="M 25 75 Q 50 95 75 75" fill="#ffedd5" />
          <path d="M 50 17 Q 35 17 25 40 Q 40 25 50 25 Q 60 25 75 40 Q 65 17 50 17" fill="#fcd34d" />
          <circle cx="38" cy="48" r="8" fill="white" />
          <circle cx="38" cy="48" r="3" fill="#78350f" />
          <circle cx="62" cy="48" r="8" fill="white" />
          <circle cx="62" cy="48" r="3" fill="#78350f" />
          <path d="M 45 58 L 55 58 L 50 68 Z" fill="#f59e0b" />
        </g>
        {/* 21. Jo */}
        <g id="bird-jo">
          <circle cx="50" cy="55" r="40" fill="#1f2937" />
          <path d="M 25 70 Q 50 50 75 70 Q 50 100 25 70" fill="#0d9488" />
          <circle cx="35" cy="45" r="8" fill="white" />
          <circle cx="35" cy="45" r="3" fill="#111827" />
          <circle cx="65" cy="45" r="8" fill="white" />
          <circle cx="65" cy="45" r="3" fill="#111827" />
          <path d="M 45 55 L 55 55 L 50 65 Z" fill="#fbbf24" />
          <path d="M 30 25 Q 50 0 70 25 Q 50 15 30 25" fill="#0d9488" />
        </g>
        {/* 22. Gordon */}
        <g id="bird-gordon">
          <polygon points="35,20 25,-5 40,10 50,-10 60,10 75,-5 65,20" fill="#1e40af" />
          <ellipse cx="50" cy="55" rx="45" ry="40" fill="#2563eb" />
          <path d="M 15 75 Q 50 100 85 75 Q 50 85 15 75 Z" fill="#e5e7eb" />
          <circle cx="35" cy="45" r="8" fill="white" />
          <circle cx="35" cy="45" r="2.5" fill="black" />
          <circle cx="65" cy="45" r="8" fill="white" />
          <circle cx="65" cy="45" r="2.5" fill="black" />
          <path d="M 15 35 L 45 42 L 45 36 L 15 29 Z" fill="#1f2937" />
          <path d="M 85 35 L 55 42 L 55 36 L 85 29 Z" fill="#1f2937" />
          <path d="M 40 55 L 60 55 L 50 70 Z" fill="#f59e0b" />
        </g>
        {/* 23. Ollie */}
        <g id="bird-ollie">
          <line x1="80" y1="15" x2="65" y2="70" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
          <line x1="65" y1="70" x2="90" y2="85" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="55" r="32" fill="#1f2937" />
          <path d="M 23 45 Q 50 25 77 45 Q 82 65 65 80 Q 50 90 35 80 Q 18 65 23 45 Z" fill="#ffffff" />
          <circle cx="38" cy="48" r="7" fill="white" stroke="#1f2937" strokeWidth="1" />
          <circle cx="38" cy="48" r="2.5" fill="black" />
          <circle cx="62" cy="48" r="7" fill="white" stroke="#1f2937" strokeWidth="1" />
          <circle cx="62" cy="48" r="2.5" fill="black" />
          <path d="M 45 55 L 55 55 L 50 68 Z" fill="#f59e0b" />
        </g>
        {/* 24. Bombom */}
        <g id="bird-bombom">
          <circle cx="50" cy="60" r="28" fill="#dc2626" />
          <path d="M 28 78 Q 50 92 72 78 Z" fill="#1a1a1a" />
          <circle cx="40" cy="52" r="5" fill="white" />
          <circle cx="40" cy="52" r="2" fill="black" />
          <circle cx="60" cy="52" r="5" fill="white" />
          <circle cx="60" cy="52" r="2" fill="black" />
          <polygon points="45,62 55,62 50,70" fill="#f59e0b" />
          <path d="M 50 32 Q 45 22 55 12" fill="none" stroke="#1a1a1a" strokeWidth="2" />
          <circle cx="55" cy="12" r="3" fill="#fcd34d" />
        </g>
        {/* 25. Rusty */}
        <g id="bird-rusty">
          <g transform="translate(65, 45) rotate(20)">
            <polygon points="10,0 20,0 15,-40" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
            <rect x="2" y="0" width="26" height="5" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
            <rect x="11" y="5" width="8" height="15" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
            <circle cx="15" cy="22" r="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
          </g>
          <circle cx="45" cy="55" r="38" fill="#e3000f" />
          <path d="M 15 75 Q 45 100 75 75 Z" fill="#f4e0c4" />
          <circle cx="33" cy="52" r="7" fill="white" />
          <circle cx="33" cy="52" r="2.5" fill="black" />
          <circle cx="57" cy="52" r="7" fill="white" />
          <circle cx="57" cy="52" r="2.5" fill="black" />
          <path d="M 18 44 L 40 50 L 40 44 L 18 36 Z" fill="black" />
          <path d="M 72 44 L 50 50 L 50 44 L 72 36 Z" fill="black" />
          <path d="M 37 62 L 53 62 L 45 74 Z" fill="#ffcc00" />
          <path d="M 10 40 C 10 5 80 5 80 40" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
          <rect x="6" y="38" width="78" height="8" rx="4" fill="#64748b" stroke="#334155" strokeWidth="2" />
        </g>

        {/* Chicks */}
        {['red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'purple', 'pink', 'darkpink', 'black', 'white', 'grey', 'brown', 'ochre'].map(c => (
          <g id={`chick-${c}`} key={c}>
            <circle
              cx="50"
              cy="60"
              r="28"
              fill={
                c === 'red' ? '#ff3333' :
                c === 'orange' ? '#ff9933' :
                c === 'yellow' ? '#ffdd00' :
                c === 'lightgreen' ? '#99ff66' :
                c === 'green' ? '#33cc33' :
                c === 'lightblue' ? '#66ccff' :
                c === 'blue' ? '#3366ff' :
                c === 'purple' ? '#9933cc' :
                c === 'pink' ? '#ff99cc' :
                c === 'darkpink' ? '#cc0066' :
                c === 'black' ? '#333333' :
                c === 'white' ? '#fcfcfc' :
                c === 'grey' ? '#999999' :
                c === 'brown' ? '#8b4513' : '#cc7722'
              }
              stroke={c === 'white' ? '#cccccc' : 'none'}
              strokeWidth="2"
            />
            <path d="M 30 75 Q 50 95 70 75" fill="#ffffff" opacity="0.8" />
            <circle cx="42" cy="55" r="5.5" fill="white" /><circle cx="42" cy="55" r="2.5" fill="black" />
            <circle cx="58" cy="55" r="5.5" fill="white" /><circle cx="58" cy="55" r="2.5" fill="black" />
            <path d="M 46 62 L 54 62 L 50 68 Z" fill="#ffaa00" />
            <path d="M 50 32 Q 55 22 60 27" fill="none" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
          </g>
        ))}

        {/* Hats */}
        <g id="hat-cat">
          <path d="M 25 35 Q 50 -5 75 35 Q 50 45 25 35" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
          <polygon points="30,20 20,0 45,15" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
          <polygon points="31,18 24,7 39,15" fill="#fca5a5" />
          <polygon points="70,20 80,0 55,15" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
          <polygon points="69,18 76,7 61,15" fill="#fca5a5" />
          <circle cx="40" cy="25" r="2.5" fill="#4b5563" />
          <circle cx="60" cy="25" r="2.5" fill="#4b5563" />
          <path d="M 45 28 Q 50 32 55 28" fill="none" stroke="#4b5563" strokeWidth="1.5" />
          <ellipse cx="50" cy="27" rx="2" ry="1.5" fill="#ef4444" />
        </g>
        <g id="hat-dog">
          <path d="M 25 35 Q 50 -5 75 35 Q 50 45 25 35" fill="#8b4513" stroke="#5c2e0b" strokeWidth="2" />
          <path d="M 25 25 C 10 25 15 55 25 50" fill="#5c2e0b" stroke="#3e1f07" strokeWidth="2" />
          <path d="M 75 25 C 90 25 85 55 75 50" fill="#5c2e0b" stroke="#3e1f07" strokeWidth="2" />
          <circle cx="42" cy="20" r="3" fill="white" />
          <circle cx="58" cy="20" r="3" fill="white" />
          <circle cx="42" cy="20" r="1.5" fill="black" />
          <circle cx="58" cy="20" r="1.5" fill="black" />
          <ellipse cx="50" cy="26" rx="4" ry="2.5" fill="#3b1f09" />
        </g>
        <g id="hat-transformer">
          <polygon points="20,15 25,10 25,35 20,35" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <polygon points="80,15 75,10 75,35 80,35" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <path d="M 25 35 L 25 15 L 40 5 L 60 5 L 75 15 L 75 35 Q 50 45 25 35" fill="#1e3a8a" stroke="#1e40af" strokeWidth="2" />
          <polygon points="45,5 55,5 50,-8" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
          <path d="M 35 20 L 50 28 L 65 20 L 50 24 Z" fill="#60a5fa" />
        </g>
        <g id="hat-shades">
          <path d="M 22 35 L 45 38 L 47 38 L 53 38 L 55 38 L 78 35 L 75 48 L 55 48 L 53 42 L 47 42 L 45 48 L 25 48 Z" fill="#1a1a1a" stroke="#000000" strokeWidth="2" />
          <path d="M 25 38 L 43 40 L 42 46 L 27 46 Z" fill="#4d4d4d" />
          <path d="M 57 40 L 75 38 L 73 46 L 58 46 Z" fill="#4d4d4d" />
          <path d="M 27 40 L 35 40 L 30 45 Z" fill="#ffffff" opacity="0.4" />
          <path d="M 59 40 L 67 40 L 62 45 Z" fill="#ffffff" opacity="0.4" />
        </g>

        {/* Slingshot */}
        <g id="slingshot">
          <path d="M 40 100 L 40 40 L 20 10 L 30 10 L 45 35 L 60 10 L 70 10 L 50 40 L 50 100 Z" fill="#8b4513" stroke="#5c2e0b" strokeWidth="2" />
          <rect x="35" y="95" width="20" height="5" fill="#5c2e0b" />
        </g>
        {/* Golden Slingshot */}
        <g id="golden-slingshot">
          <path d="M 40 100 L 40 40 L 20 10 L 30 10 L 45 35 L 60 10 L 70 10 L 50 40 L 50 100 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="3" />
          <rect x="35" y="95" width="20" height="5" fill="#d97706" />
          <circle cx="25" cy="15" r="4" fill="#60a5fa" />
          <circle cx="65" cy="15" r="4" fill="#60a5fa" />
        </g>
        {/* Enemy Pig */}
        <g id="pig">
          <circle cx="50" cy="50" r="45" fill="#77cc33" stroke="#4d8820" strokeWidth="2" />
          <ellipse cx="30" cy="20" rx="10" ry="15" fill="#77cc33" stroke="#4d8820" strokeWidth="2" />
          <ellipse cx="70" cy="20" rx="10" ry="15" fill="#77cc33" stroke="#4d8820" strokeWidth="2" />
          <circle cx="35" cy="45" r="8" fill="white" />
          <circle cx="35" cy="45" r="3" fill="black" />
          <circle cx="65" cy="45" r="8" fill="white" />
          <circle cx="65" cy="45" r="3" fill="black" />
          <ellipse cx="50" cy="65" rx="15" ry="10" fill="#559922" />
          <circle cx="45" cy="65" r="3" fill="#224400" />
          <circle cx="55" cy="65" r="3" fill="#224400" />
        </g>
        {/* Helmet Pig */}
        <g id="pig-helmet">
          <use href="#pig" />
          <path d="M 12 35 C 12 5 88 5 88 35" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
          <rect x="8" y="32" width="84" height="8" rx="4" fill="#64748b" stroke="#334155" strokeWidth="2" />
        </g>
        {/* King Pig */}
        <g id="pig-king">
          <use href="#pig" />
          <path d="M 30 18 L 40 32 L 50 10 L 60 32 L 70 18 L 65 38 L 35 38 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        </g>

        {/* Currency Icons */}
        <g id="icon-coin">
          <circle cx="50" cy="50" r="45" fill="#ffd700" stroke="#b8860b" strokeWidth="5" />
          <circle cx="50" cy="50" r="35" fill="#ffec8b" />
          <text x="50" y="65" fontFamily="Arial" fontWeight="bold" fontSize="40" fill="#b8860b" textAnchor="middle">$</text>
        </g>
        <g id="icon-gem">
          <polygon points="50,10 90,40 50,90 10,40" fill="#00ffcc" stroke="#009999" strokeWidth="4" />
          <polygon points="50,15 80,40 50,80 20,40" fill="#ccffff" />
        </g>
        <radialGradient id="pearl-grad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffb3e6" />
          <stop offset="50%" stopColor="#ff3399" />
          <stop offset="100%" stopColor="#cc0066" />
        </radialGradient>
        <g id="icon-pearl">
          <circle cx="50" cy="50" r="45" fill="url(#pearl-grad)" stroke="#ff007f" strokeWidth="2" />
          <ellipse cx="35" cy="30" rx="15" ry="10" fill="#ffe6f2" opacity="0.8" transform="rotate(-45 35 30)" />
          <circle cx="70" cy="70" r="8" fill="#cc0066" opacity="0.6" />
        </g>
        <g id="icon-leaf">
          <path d="M50,90 C50,90 10,70 10,40 C10,20 30,10 50,10 C70,10 90,20 90,40 C90,70 50,90 50,90 Z" fill="#4ade80" stroke="#15803d" strokeWidth="4" />
          <path d="M50,90 L50,15" stroke="#15803d" strokeWidth="4" fill="none" />
        </g>
      </defs>
    </svg>
  );
};

export interface BirdAvatarProps {
  birdId: string;
  hatId?: string;
  className?: string;
}

export const BirdAvatar: React.FC<BirdAvatarProps> = ({ birdId, hatId = 'none', className = 'w-16 h-16' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <use href={`#${birdId}`} />
        {hatId && hatId !== 'none' && <use href={`#hat-${hatId}`} />}
      </svg>
    </div>
  );
};

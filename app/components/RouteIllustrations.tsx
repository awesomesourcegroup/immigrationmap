function Illustration({ color, emoji }: { color: string; emoji: string }) {
  return (
    <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="180" fill={color} />
      <text x="200" y="116" fontSize="72" textAnchor="middle">{emoji}</text>
    </svg>
  );
}

export function StudentIllustration()    { return <Illustration color="#0284c7" emoji="🎓" />; }
export function EmploymentIllustration() { return <Illustration color="#4338ca" emoji="💼" />; }
export function FamilyIllustration()     { return <Illustration color="#e11d48" emoji="👨‍👩‍👧" />; }
export function LotteryIllustration()    { return <Illustration color="#b45309" emoji="🎲" />; }
export function AsylumIllustration()     { return <Illustration color="#047857" emoji="🕊️" />; }
export function CitizenshipIllustration(){ return <Illustration color="#92400e" emoji="🛂" />; }
export function InvestorIllustration()   { return <Illustration color="#7c3aed" emoji="💰" />; }
export function RegionalIllustration()   { return <Illustration color="#15803d" emoji="📍" />; }

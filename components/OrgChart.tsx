
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAMS } from '../constants';
import { TeamLogo } from './TeamLogo';
import { User, Users, Edit2, Plus, Trash2, ChevronDown, Sparkles, Crown, Swords, Star } from 'lucide-react';

// --- Types ---

interface Member {
  id: string;
  name: string;
}

interface TeamData {
  id: string; // Matches TEAMS constant id
  leader: string;
  members: Member[];
}

// --- Components ---

interface EditableFieldProps {
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'title' | 'subtitle' | 'body' | 'card';
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  placeholder, 
  onChange, 
  icon, 
  className = "",
  variant = 'body'
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Styles based on variant
  const styles = {
    title: "text-2xl font-display font-bold text-white text-center bg-transparent border-b-2 border-transparent focus:border-heim-aurora",
    subtitle: "text-sm uppercase tracking-widest text-heim-ice/70 text-center bg-transparent border-b border-transparent focus:border-heim-ice",
    // Added text-center to body
    body: "text-sm text-gray-200 bg-transparent border-b border-transparent focus:border-white/20 w-full text-center",
    // Modified card style: removed bg-black/20 to make it transparent
    card: "w-full text-center bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg py-2 px-3 focus:outline-none focus:border-heim-aurora transition-colors text-white"
  };

  return (
    <div className={`relative group ${className}`}>
      {isEditing ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
          placeholder={placeholder}
          className={`outline-none transition-all placeholder-white/10 ${styles[variant]}`}
        />
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          className={`cursor-pointer flex items-center justify-center gap-2 min-h-[1.5em] rounded px-1 transition-colors relative ${styles[variant]} ${variant !== 'card' ? 'group-hover:bg-white/5' : ''}`}
        >
          {icon && <span className="text-heim-aurora/50 group-hover:text-heim-aurora">{icon}</span>}
          <span className={!value ? "text-white/20 italic" : ""}>
            {value || placeholder}
          </span>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 text-heim-ice pointer-events-none">
             <Edit2 size={10} />
          </div>
        </div>
      )}
    </div>
  );
};

interface NodeCardProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
}

const NodeCard: React.FC<NodeCardProps> = ({ children, className = "", glowing = false }) => (
  <div className={`
    relative bg-heim-fjord/80 backdrop-blur-md border rounded-xl p-4 flex flex-col items-center justify-center min-w-[180px] shadow-xl z-10 transition-all duration-300
    ${glowing ? 'border-heim-aurora/50 shadow-[0_0_20px_rgba(111,255,176,0.15)]' : 'border-white/10 hover:border-white/30'}
    ${className}
  `}>
    {children}
  </div>
);

// --- Main Chart Component ---

export const OrgChart: React.FC = () => {
  // --- State Management with LocalStorage ---

  // 1. Counselors (Top Level)
  const [counselors, setCounselors] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('heim-org-counselors');
      return saved ? JSON.parse(saved) : ['輔導員 A', '輔導員 B'];
    } catch { return ['輔導員 A', '輔導員 B']; }
  });

  // 2. Squad Leaders (Middle Level)
  const [leaders, setLeaders] = useState(() => {
    try {
      const saved = localStorage.getItem('heim-org-leaders');
      return saved ? JSON.parse(saved) : { main: '支隊長姓名', vice: '副支隊長姓名' };
    } catch { return { main: '支隊長姓名', vice: '副支隊長姓名' }; }
  });

  // 3. Teams (Bottom Level)
  const [teamData, setTeamData] = useState<TeamData[]>(() => {
    try {
      const saved = localStorage.getItem('heim-org-teams');
      if (saved) return JSON.parse(saved);
      return TEAMS.map(t => ({
        id: t.id,
        leader: '組長姓名',
        members: [{ id: crypto.randomUUID(), name: '組員姓名' }]
      }));
    } catch {
      return TEAMS.map(t => ({
        id: t.id,
        leader: '組長姓名',
        members: [{ id: crypto.randomUUID(), name: '組員姓名' }]
      }));
    }
  });

  // Persist Effects
  useEffect(() => localStorage.setItem('heim-org-counselors', JSON.stringify(counselors)), [counselors]);
  useEffect(() => localStorage.setItem('heim-org-leaders', JSON.stringify(leaders)), [leaders]);
  useEffect(() => localStorage.setItem('heim-org-teams', JSON.stringify(teamData)), [teamData]);

  // --- Handlers ---

  const updateCounselor = (index: number, val: string) => {
    const newC = [...counselors];
    newC[index] = val;
    setCounselors(newC);
  };

  const updateTeamLeader = (teamId: string, val: string) => {
    setTeamData(prev => prev.map(t => t.id === teamId ? { ...t, leader: val } : t));
  };

  const addMember = (teamId: string) => {
    setTeamData(prev => prev.map(t => t.id === teamId ? {
      ...t,
      members: [...t.members, { id: crypto.randomUUID(), name: '' }]
    } : t));
  };

  const updateMember = (teamId: string, memberId: string, val: string) => {
    setTeamData(prev => prev.map(t => t.id === teamId ? {
      ...t,
      members: t.members.map(m => m.id === memberId ? { ...m, name: val } : m)
    } : t));
  };

  const removeMember = (teamId: string, memberId: string) => {
    setTeamData(prev => prev.map(t => t.id === teamId ? {
      ...t,
      members: t.members.filter(m => m.id !== memberId)
    } : t));
  };

  return (
    <div className="relative w-full flex flex-col items-center py-10 min-h-[800px]">
      
      {/* --- LEVEL 0: COUNSELORS --- */}
      <div className="flex gap-16 md:gap-32 relative z-10 mb-12">
        {counselors.map((name, idx) => (
          <NodeCard key={`counselor-${idx}`} className="border-heim-ice/30">
            <div className="flex items-center justify-center gap-2 mb-1">
               <Swords size={16} className="text-heim-ice" />
               <span className="text-xs text-heim-ice uppercase tracking-widest font-bold">Counselor</span>
            </div>
            <EditableField 
              value={name} 
              placeholder="輔導員姓名" 
              onChange={(val) => updateCounselor(idx, val)} 
              variant="card"
            />
          </NodeCard>
        ))}
      </div>

      {/* Connector: Counselors to Leader Group */}
      <div className="absolute top-[80px] w-[260px] h-[50px] pointer-events-none">
         {/* Horizontal line connecting counselors */}
         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-heim-ice/50 to-transparent" />
         {/* Vertical line down to leader group */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-heim-ice/50 to-heim-aurora/50" />
      </div>

      {/* --- LEVEL 1: LEADERS (SIDE BY SIDE) --- */}
      <div className="flex flex-col md:flex-row gap-8 relative z-10 mb-12 items-stretch">
        
        {/* Squad Leader */}
        <NodeCard glowing className="min-w-[240px] py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
             <Crown size={16} className="text-heim-aurora" />
             <span className="text-xs text-heim-aurora uppercase tracking-widest font-bold">Squad Leader</span>
          </div>
          <EditableField 
            value={leaders.main} 
            placeholder="支隊長姓名" 
            onChange={(val) => setLeaders(prev => ({ ...prev, main: val }))} 
            variant="title"
          />
        </NodeCard>

        {/* Vice Leader */}
        <NodeCard className="min-w-[240px] py-6 border-white/20">
          <div className="flex items-center justify-center gap-2 mb-2">
             <Star size={14} className="text-gray-400" />
             <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Vice Leader</span>
          </div>
          <EditableField 
            value={leaders.vice} 
            placeholder="副支隊長姓名" 
            onChange={(val) => setLeaders(prev => ({ ...prev, vice: val }))} 
            variant="title"
          />
        </NodeCard>

      </div>

      {/* Connector: Leader Group to Teams (Branching) */}
      <div className="w-full max-w-5xl h-px bg-white/10 mb-8 relative z-0">
        {/* Vertical line up to leaders */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[-24px] h-[24px] w-px bg-white/10" />
        
        {/* Vertical droppers for teams */}
        <div className="absolute left-[12.5%] top-0 h-8 w-px bg-white/10" />
        <div className="absolute left-[37.5%] top-0 h-8 w-px bg-white/10" />
        <div className="absolute left-[62.5%] top-0 h-8 w-px bg-white/10" />
        <div className="absolute left-[87.5%] top-0 h-8 w-px bg-white/10" />
      </div>

      {/* --- LEVEL 3: TEAMS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4">
        {teamData.map((team, idx) => {
          const staticTeamInfo = TEAMS.find(t => t.id === team.id);
          const isEven = idx % 2 === 0;

          return (
            <motion.div 
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-heim-aurora/30 transition-colors group"
            >
              {/* Header */}
              <div className="p-4 bg-black/20 flex items-center justify-center gap-3 border-b border-white/5 relative">
                <TeamLogo role={staticTeamInfo?.role as any} scale={0.35} />
                <div className="flex flex-col items-start">
                  <h3 className="font-display font-bold text-lg text-white">{staticTeamInfo?.name}</h3>
                  <span className="text-xs text-heim-ice uppercase tracking-widest">{staticTeamInfo?.enName}</span>
                </div>
              </div>

              {/* Leader */}
              <div className="p-4 border-b border-white/5 bg-heim-aurora/5">
                <div className="flex items-center justify-center gap-2 mb-1">
                   <Sparkles size={12} className="text-heim-aurora" />
                   <span className="text-[10px] uppercase font-bold text-heim-aurora tracking-wider">Group Leader</span>
                </div>
                <EditableField 
                  value={team.leader} 
                  placeholder="組長姓名" 
                  onChange={(val) => updateTeamLeader(team.id, val)}
                  variant="card"
                />
              </div>

              {/* Members */}
              <div className="p-4 flex-grow flex flex-col gap-2">
                 <div className="flex items-center justify-center gap-2 mb-1 opacity-50">
                   <Users size={12} />
                   <span className="text-[10px] uppercase font-bold tracking-wider">Members</span>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {team.members.map((member) => (
                      <motion.div 
                        key={member.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 group/member justify-center"
                      >
                         <div className="w-1.5 h-1.5 rounded-full bg-heim-ice/30 flex-shrink-0" />
                         <EditableField 
                            value={member.name}
                            placeholder="組員姓名"
                            onChange={(val) => updateMember(team.id, member.id, val)}
                            variant="body"
                         />
                         <button 
                           onClick={() => removeMember(team.id, member.id)}
                           className="opacity-0 group-hover/member:opacity-100 p-1 hover:text-red-400 transition-opacity"
                         >
                           <Trash2 size={12} />
                         </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                <button 
                  onClick={() => addMember(team.id)}
                  className="mt-4 w-full py-2 border border-dashed border-white/10 rounded-lg text-xs text-white/30 hover:text-heim-aurora hover:border-heim-aurora/30 hover:bg-heim-aurora/5 transition-all flex items-center justify-center gap-1"
                >
                  <Plus size={12} /> Add Member
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

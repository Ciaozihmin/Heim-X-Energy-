
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAMS } from '../constants';
import { TeamLogo } from './TeamLogo';
import { User, Users, Award, Shield, Check, Edit2, Plus, Camera, Trash2, X } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  photo: string | null;
}

interface TeamData {
  leader: string;
  leaderPhoto: string | null;
  members: Member[];
}

interface EditableFieldProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLocked: boolean;
  onToggleLock: () => void;
  icon?: React.ReactNode;
  className?: string;
  style?: 'default' | 'minimal';
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  placeholder, 
  onChange, 
  isLocked,
  onToggleLock,
  icon, 
  className = "",
  style = 'default'
}) => {
  return (
    <div className={`relative group ${className}`}>
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-heim-ice/50 transition-colors group-focus-within:text-heim-aurora">
          {icon}
        </div>
      )}

      {isLocked ? (
        // LOCKED STATE
        <div className="relative w-full">
           <div className={`
             w-full 
             ${style === 'default' ? 'bg-white/5 border-b border-white/5 px-10 py-3 rounded-t-lg' : 'bg-transparent border-b border-transparent px-2 py-1'}
             text-heim-ice font-display tracking-wide truncate transition-all duration-300
           `}>
             {value || <span className="text-white/10 italic text-sm">{placeholder}</span>}
           </div>
           
           <button 
             onClick={onToggleLock}
             className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-heim-ice/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-heim-aurora hover:text-heim-fjord"
             title="Edit"
           >
             <Edit2 size={12} />
           </button>
        </div>
      ) : (
        // EDIT STATE
        <div className="relative w-full">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoFocus
            className={`
              w-full text-white placeholder-heim-ice/30 focus:outline-none focus:border-heim-aurora transition-all duration-300 font-sans
              ${style === 'default' 
                ? 'bg-black/20 border-b border-white/10 px-10 py-3 rounded-t-lg text-base md:text-sm' 
                : 'bg-black/40 border-b border-heim-aurora px-2 py-1 text-sm'}
            `}
          />
          
          <button 
            onClick={onToggleLock}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-heim-aurora text-heim-fjord shadow-[0_0_10px_rgba(111,255,176,0.5)] hover:bg-white transition-all transform hover:scale-110"
            title="Confirm"
          >
            <Check size={12} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
};

const AvatarUpload: React.FC<{ 
  currentImage: string | null; 
  onUpload: (img: string) => void; 
  fallbackIcon?: React.ReactNode;
  size?: 'lg' | 'sm';
}> = ({ currentImage, onUpload, fallbackIcon, size = 'lg' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const dim = size === 'lg' ? 'w-20 h-20' : 'w-10 h-10';
  const iconSize = size === 'lg' ? 24 : 14;

  return (
    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      
      <div className={`${dim} rounded-full overflow-hidden bg-heim-fjord border border-white/10 flex items-center justify-center relative transition-all group-hover:border-heim-aurora/50`}>
        {currentImage ? (
          <img src={currentImage} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="text-heim-ice/30">
            {fallbackIcon || <User size={iconSize} />}
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <Camera size={iconSize} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export const OrgChart: React.FC = () => {
  // State for Captains
  const [captain, setCaptain] = useState({ name: '', photo: null as string | null, locked: false });
  const [viceCaptain, setViceCaptain] = useState({ name: '', photo: null as string | null, locked: false });

  // State for Teams
  const [teams, setTeams] = useState<Record<string, TeamData>>(
    TEAMS.reduce((acc, team) => ({
      ...acc,
      [team.id]: { leader: '', leaderPhoto: null, members: [] }
    }), {})
  );

  const [leaderLocks, setLeaderLocks] = useState<Record<string, boolean>>(
    TEAMS.reduce((acc, team) => ({ ...acc, [team.id]: false }), {})
  );

  // Handlers
  const handleTeamChange = (teamId: string, field: keyof TeamData, value: any) => {
    setTeams(prev => ({
      ...prev,
      [teamId]: { ...prev[teamId], [field]: value }
    }));
  };

  const addMember = (teamId: string) => {
    setTeams(prev => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        members: [...prev[teamId].members, { id: Date.now().toString(), name: '', photo: null }]
      }
    }));
  };

  const updateMember = (teamId: string, memberId: string, field: keyof Member, value: any) => {
    setTeams(prev => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        members: prev[teamId].members.map(m => m.id === memberId ? { ...m, [field]: value } : m)
      }
    }));
  };

  const removeMember = (teamId: string, memberId: string) => {
     setTeams(prev => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        members: prev[teamId].members.filter(m => m.id !== memberId)
      }
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-10">
       
       <div className="text-center mb-12">
          <span className="text-heim-aurora text-xs font-bold uppercase tracking-[0.3em] px-4 py-1 border border-heim-aurora/30 rounded-full">
            Phase 1
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-4">前期分組架構圖</h2>
       </div>

       {/* Level 1: Command */}
       <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 mb-8 relative z-10">
          
          {/* Captain */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-xs relative"
          >
            <div className="bg-heim-fjord/60 border border-heim-aurora/20 p-6 rounded-xl backdrop-blur-md relative overflow-hidden hover:border-heim-aurora/50 transition-colors flex flex-col items-center">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-heim-aurora to-transparent opacity-50" />
               
               <div className="mb-4">
                 <AvatarUpload 
                   currentImage={captain.photo} 
                   onUpload={(img) => setCaptain(prev => ({ ...prev, photo: img }))}
                   fallbackIcon={<Award size={32} className="text-heim-aurora" />}
                   size="lg"
                 />
               </div>
               
               <div className="text-center mb-4 w-full">
                 <h3 className="text-xl font-bold font-display text-white">支隊長</h3>
                 <p className="text-xs text-heim-ice/60 uppercase tracking-widest mb-2">Captain</p>
                 <EditableField 
                   value={captain.name}
                   onChange={(e) => setCaptain(prev => ({ ...prev, name: e.target.value }))}
                   isLocked={captain.locked}
                   onToggleLock={() => setCaptain(prev => ({ ...prev, locked: !prev.locked }))}
                   placeholder="Enter Name..."
                   icon={<User size={14} />}
                   className="text-center"
                 />
               </div>
            </div>
          </motion.div>

          {/* Vice Captain */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-xs relative"
          >
            <div className="bg-heim-fjord/60 border border-heim-ice/20 p-6 rounded-xl backdrop-blur-md relative overflow-hidden hover:border-heim-ice/50 transition-colors flex flex-col items-center">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-heim-ice to-transparent opacity-50" />
               
               <div className="mb-4">
                 <AvatarUpload 
                   currentImage={viceCaptain.photo} 
                   onUpload={(img) => setViceCaptain(prev => ({ ...prev, photo: img }))}
                   fallbackIcon={<Shield size={32} className="text-heim-ice" />}
                   size="lg"
                 />
               </div>

               <div className="text-center mb-4 w-full">
                 <h3 className="text-xl font-bold font-display text-white">副支隊長</h3>
                 <p className="text-xs text-heim-ice/60 uppercase tracking-widest mb-2">Vice Captain</p>
                 <EditableField 
                   value={viceCaptain.name}
                   onChange={(e) => setViceCaptain(prev => ({ ...prev, name: e.target.value }))}
                   isLocked={viceCaptain.locked}
                   onToggleLock={() => setViceCaptain(prev => ({ ...prev, locked: !prev.locked }))}
                   placeholder="Enter Name..."
                   icon={<User size={14} />}
                   className="text-center"
                 />
               </div>
            </div>
          </motion.div>
       </div>

       {/* Connector Lines */}
       <div className="hidden md:flex flex-col items-center mb-8 opacity-30">
          <div className="w-px h-8 bg-gradient-to-b from-white to-heim-aurora"></div>
          <div className="w-[80%] h-px bg-gradient-to-r from-transparent via-heim-aurora to-transparent"></div>
          <div className="w-full flex justify-between px-[10%]">
             <div className="w-px h-8 bg-gradient-to-b from-heim-aurora to-transparent"></div>
             <div className="w-px h-8 bg-gradient-to-b from-heim-aurora to-transparent"></div>
             <div className="w-px h-8 bg-gradient-to-b from-heim-aurora to-transparent"></div>
             <div className="w-px h-8 bg-gradient-to-b from-heim-aurora to-transparent"></div>
          </div>
       </div>

       {/* Level 2: Teams */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAMS.map((team, index) => (
             <motion.div
               key={team.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 }}
               className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 hover:border-heim-aurora/20 transition-all duration-300 flex flex-col h-full"
             >
                {/* Team Header */}
                <div className="flex flex-col items-center text-center mb-6">
                   <div className="mb-4 p-3 rounded-full bg-heim-fjord border border-white/10">
                     <TeamLogo role={team.role} scale={0.5} />
                   </div>
                   <h3 className="text-2xl font-bold font-display text-white mb-1">{team.name}</h3>
                   <span className="text-xs font-bold text-heim-aurora uppercase tracking-widest">{team.enName}</span>
                </div>

                {/* Leader Input (With Photo) */}
                <div className="mb-6">
                   <label className="text-xs text-heim-ice/60 uppercase tracking-wider font-bold flex items-center gap-2 mb-2">
                     <Award size={12} className="text-heim-aurora" /> 組長 (Leader)
                   </label>
                   <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg border border-white/5">
                      <AvatarUpload 
                        currentImage={teams[team.id].leaderPhoto}
                        onUpload={(img) => handleTeamChange(team.id, 'leaderPhoto', img)}
                        size="sm"
                      />
                      <div className="flex-grow">
                        <EditableField 
                          value={teams[team.id].leader}
                          onChange={(e) => handleTeamChange(team.id, 'leader', e.target.value)}
                          isLocked={leaderLocks[team.id]}
                          onToggleLock={() => setLeaderLocks(prev => ({...prev, [team.id]: !prev[team.id]}))}
                          placeholder="Name..."
                          style="minimal"
                        />
                      </div>
                   </div>
                </div>

                {/* Members List (Dynamic) */}
                <div className="flex-grow">
                   <div className="flex justify-between items-center mb-2">
                     <label className="text-xs text-heim-ice/60 uppercase tracking-wider font-bold flex items-center gap-2">
                       <Users size={12} className="text-heim-ice" /> 隊員 (Members)
                     </label>
                     <button 
                       onClick={() => addMember(team.id)}
                       className="p-1 rounded bg-heim-ice/10 text-heim-ice hover:bg-heim-ice hover:text-heim-fjord transition-colors"
                       title="Add Member"
                     >
                       <Plus size={14} />
                     </button>
                   </div>
                   
                   <div className="space-y-2">
                     <AnimatePresence>
                       {teams[team.id].members.map((member) => (
                         <motion.div 
                           key={member.id}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, height: 0 }}
                           className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5 hover:border-white/10 group/item"
                         >
                            <AvatarUpload 
                              currentImage={member.photo}
                              onUpload={(img) => updateMember(team.id, member.id, 'photo', img)}
                              size="sm"
                            />
                            <div className="flex-grow min-w-0">
                               <input 
                                 type="text"
                                 value={member.name}
                                 onChange={(e) => updateMember(team.id, member.id, 'name', e.target.value)}
                                 placeholder="Member Name"
                                 className="w-full bg-transparent text-sm text-gray-300 focus:outline-none focus:text-white placeholder-white/10"
                               />
                            </div>
                            <button 
                              onClick={() => removeMember(team.id, member.id)}
                              className="text-white/10 hover:text-red-400 opacity-0 group-hover/item:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                         </motion.div>
                       ))}
                     </AnimatePresence>
                     
                     {teams[team.id].members.length === 0 && (
                       <div className="text-center py-4 border border-dashed border-white/10 rounded-lg text-white/10 text-xs italic">
                         No members yet.
                       </div>
                     )}
                   </div>
                </div>
             </motion.div>
          ))}
       </div>

    </div>
  );
};

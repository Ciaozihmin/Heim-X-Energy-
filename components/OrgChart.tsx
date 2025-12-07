import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TEAMS } from '../constants';
import { TeamLogo } from './TeamLogo';
import { User, Users, Award, Shield, Check, Edit2 } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLocked: boolean;
  onToggleLock: () => void;
  icon?: React.ReactNode;
  isMultiline?: boolean;
  className?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  placeholder, 
  onChange, 
  isLocked,
  onToggleLock,
  icon, 
  isMultiline = false,
  className = "" 
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Icon Label */}
      <div className={`absolute left-3 ${isMultiline ? 'top-4' : 'top-1/2 -translate-y-1/2'} text-heim-ice/50 transition-colors ${!isLocked && 'group-focus-within:text-heim-aurora'}`}>
        {icon}
      </div>

      {isLocked ? (
        // LOCKED STATE (Display)
        <div className="relative w-full">
           <div className={`
             w-full bg-white/5 border-b border-white/5 
             ${isMultiline ? 'min-h-[8rem] md:min-h-[10rem] p-4 pl-10' : 'px-10 py-3'}
             text-heim-ice font-display tracking-wide
             ${isMultiline ? 'whitespace-pre-wrap' : 'truncate'}
             rounded-t-lg transition-all duration-300
           `}>
             {value || <span className="text-white/10 italic">Not set</span>}
           </div>
           
           {/* Edit Button */}
           <button 
             onClick={onToggleLock}
             className="absolute right-2 top-2 p-1.5 rounded-full bg-heim-fjord/80 text-heim-aurora opacity-0 group-hover:opacity-100 transition-all hover:bg-heim-aurora hover:text-heim-fjord transform hover:scale-110"
             title="Edit"
           >
             <Edit2 size={14} />
           </button>
        </div>
      ) : (
        // EDIT STATE (Input)
        <div className="relative w-full">
          {isMultiline ? (
            <textarea
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full h-32 md:h-40 bg-black/20 border-b border-white/10 p-4 pl-10 text-sm text-gray-300 placeholder-heim-ice/20 focus:outline-none focus:border-heim-aurora focus:bg-white/5 transition-all resize-none rounded-t-lg"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full bg-black/20 border-b border-white/10 px-10 py-3 text-white placeholder-heim-ice/30 focus:outline-none focus:border-heim-aurora focus:bg-white/5 transition-all duration-300 font-sans text-center md:text-left rounded-t-lg"
            />
          )}
          
          {/* Active Indicator Line */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-heim-aurora/50 animate-pulse" />

          {/* Confirm Button */}
          <button 
            onClick={onToggleLock}
            className="absolute right-2 top-2 z-10 p-1.5 rounded-full bg-heim-aurora text-heim-fjord shadow-[0_0_10px_rgba(111,255,176,0.5)] hover:bg-white transition-all transform hover:scale-110"
            title="Confirm"
          >
            <Check size={14} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
};

export const OrgChart: React.FC = () => {
  // State for data
  const [orgData, setOrgData] = useState({
    captain: '',
    viceCaptain: '',
    teams: TEAMS.reduce((acc, team) => ({
      ...acc,
      [team.id]: { leader: '', members: '' }
    }), {} as Record<string, { leader: string, members: string }>)
  });

  // State for locks
  const [locks, setLocks] = useState({
    captain: false,
    viceCaptain: false,
    teams: TEAMS.reduce((acc, team) => ({
      ...acc,
      [team.id]: { leader: false, members: false }
    }), {} as Record<string, { leader: boolean, members: boolean }>)
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, teamId?: string) => {
    const { value } = e.target;
    if (teamId) {
       setOrgData(prev => ({
         ...prev,
         teams: {
           ...prev.teams,
           [teamId]: { ...prev.teams[teamId], [field]: value }
         }
       }));
    } else {
      setOrgData(prev => ({ ...prev, [field]: value }));
    }
  };

  const toggleLock = (field: string, teamId?: string) => {
    if (teamId) {
      setLocks(prev => ({
        ...prev,
        teams: {
          ...prev.teams,
          [teamId]: { 
            ...prev.teams[teamId], 
            // @ts-ignore - dynamic key access on known structure
            [field]: !prev.teams[teamId][field as keyof typeof prev.teams[typeof teamId]] 
          }
        }
      }));
    } else {
      setLocks(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
       
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
            <div className="bg-heim-fjord/60 border border-heim-aurora/20 p-6 rounded-xl backdrop-blur-md relative overflow-hidden hover:border-heim-aurora/50 transition-colors">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-heim-aurora to-transparent opacity-50" />
               <div className="text-center mb-4">
                 <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-heim-aurora/10 text-heim-aurora mb-2">
                   <Award size={24} />
                 </div>
                 <h3 className="text-xl font-bold font-display text-white">支隊長</h3>
                 <p className="text-xs text-heim-ice/60 uppercase tracking-widest">Captain</p>
               </div>
               <EditableField 
                 value={orgData.captain}
                 onChange={(e) => handleInputChange(e, 'captain')}
                 isLocked={locks.captain}
                 onToggleLock={() => toggleLock('captain')}
                 placeholder="Enter Name..."
                 icon={<User size={16} />}
               />
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
            <div className="bg-heim-fjord/60 border border-heim-ice/20 p-6 rounded-xl backdrop-blur-md relative overflow-hidden hover:border-heim-ice/50 transition-colors">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-heim-ice to-transparent opacity-50" />
               <div className="text-center mb-4">
                 <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-heim-ice/10 text-heim-ice mb-2">
                   <Shield size={24} />
                 </div>
                 <h3 className="text-xl font-bold font-display text-white">副支隊長</h3>
                 <p className="text-xs text-heim-ice/60 uppercase tracking-widest">Vice Captain</p>
               </div>
               <EditableField 
                 value={orgData.viceCaptain}
                 onChange={(e) => handleInputChange(e, 'viceCaptain')}
                 isLocked={locks.viceCaptain}
                 onToggleLock={() => toggleLock('viceCaptain')}
                 placeholder="Enter Name..."
                 icon={<User size={16} />}
               />
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

                {/* Leader Input */}
                <div className="mb-6 space-y-2">
                   <label className="text-xs text-heim-ice/60 uppercase tracking-wider font-bold flex items-center gap-2">
                     <Award size={12} className="text-heim-aurora" /> 組長 (Leader)
                   </label>
                   <EditableField 
                     value={orgData.teams[team.id].leader}
                     onChange={(e) => handleInputChange(e, 'leader', team.id)}
                     isLocked={locks.teams[team.id].leader}
                     onToggleLock={() => toggleLock('leader', team.id)}
                     placeholder="Name..."
                     icon={<User size={14} />}
                     className="text-sm"
                   />
                </div>

                {/* Members Input */}
                <div className="flex-grow space-y-2">
                   <label className="text-xs text-heim-ice/60 uppercase tracking-wider font-bold flex items-center gap-2">
                     <Users size={12} className="text-heim-ice" /> 隊員 (Members)
                   </label>
                   <EditableField 
                     value={orgData.teams[team.id].members}
                     onChange={(e) => handleInputChange(e, 'members', team.id)}
                     isLocked={locks.teams[team.id].members}
                     onToggleLock={() => toggleLock('members', team.id)}
                     placeholder="Enter names (one per line)..."
                     isMultiline={true}
                   />
                </div>
             </motion.div>
          ))}
       </div>

    </div>
  );
};
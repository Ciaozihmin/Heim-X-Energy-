
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, ArrowLeft, Book } from 'lucide-react';
import { KickoffMeeting } from './KickoffMeeting';

export const TeamRecord: React.FC = () => {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const records = [
    {
      id: '01',
      title: '第一次見面會',
      date: '2025/12/10',
      time: '21:00 - 22:00',
      location: '西樓 C213B',
      description: '啟動旅程：工程與人文的交匯，共同定義未來的可持續發展。',
      component: <KickoffMeeting />
    }
  ];

  const selectedRecord = records.find(r => r.id === selectedRecordId);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0 min-h-[60vh]">
      <AnimatePresence mode="wait">
        {!selectedRecordId ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
             <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-6">
                <div className="p-3 bg-heim-aurora/10 rounded-lg text-heim-aurora">
                   <Book size={32} />
                </div>
                <div>
                   <h2 className="text-3xl font-display font-bold text-white">支隊紀錄</h2>
                   <p className="text-heim-ice/50 uppercase tracking-widest text-sm">Mission Logs</p>
                </div>
             </div>

             <div className="grid gap-4">
               {records.map((record) => (
                 <button
                   key={record.id}
                   onClick={() => setSelectedRecordId(record.id)}
                   className="group w-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-heim-aurora/30 rounded-xl p-6 text-left transition-all duration-300 flex flex-col md:flex-row gap-6 md:items-center"
                 >
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-heim-fjord border border-white/10 group-hover:border-heim-aurora/50 transition-colors">
                       <span className="text-heim-aurora font-bold text-xl">{record.date.split('/')[2]}</span>
                       <span className="text-xs text-heim-ice/50 uppercase">{record.date.split('/')[1]}月</span>
                    </div>
                    
                    <div className="flex-grow">
                       <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-heim-aurora transition-colors">{record.title}</h3>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-heim-ice/10 text-heim-ice border border-heim-ice/20">LOG {record.id}</span>
                       </div>
                       <p className="text-sm text-gray-400 mb-3 line-clamp-2">{record.description}</p>
                       <div className="flex items-center gap-4 text-xs text-heim-ice/40 uppercase tracking-wider">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {record.date}</span>
                          <span className="flex items-center gap-1"><MapPin size={12} /> {record.location}</span>
                       </div>
                    </div>

                    <div className="flex-shrink-0 text-white/20 group-hover:text-heim-aurora group-hover:translate-x-1 transition-all">
                       <ChevronRight size={24} />
                    </div>
                 </button>
               ))}
             </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
             <button 
               onClick={() => setSelectedRecordId(null)}
               className="flex items-center gap-2 text-heim-ice/50 hover:text-heim-aurora mb-6 transition-colors uppercase tracking-widest text-xs font-bold"
             >
                <ArrowLeft size={16} /> Back to Logs
             </button>
             
             {selectedRecord?.component}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

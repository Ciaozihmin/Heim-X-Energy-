
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, Edit2, Trash2, Plus, MessageSquare, ClipboardList } from 'lucide-react';

interface ProblemEntry {
  id: number;
  question: string;
  answer: string;
  isLocked: boolean;
}

interface EditableFieldProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLocked: boolean;
  onToggleLock: () => void;
  isMultiline?: boolean;
  isHeader?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
  value, 
  placeholder, 
  onChange, 
  isLocked,
  onToggleLock,
  isMultiline = false,
  isHeader = false
}) => {
  return (
    <div className="relative group w-full">
      {isLocked ? (
        // LOCKED STATE (Display)
        <div className="relative w-full pr-8">
           <div className={`
             w-full transition-all duration-300
             ${isHeader 
               ? 'text-xl md:text-2xl font-bold text-white font-display mb-2' 
               : 'text-gray-300 font-light leading-relaxed whitespace-pre-wrap text-sm md:text-base bg-black/20 p-4 rounded-lg border border-white/5'}
           `}>
             {value || <span className="text-white/10 italic">點擊編輯輸入內容...</span>}
           </div>
        </div>
      ) : (
        // EDIT STATE (Input)
        <div className="relative w-full mb-2">
          {isMultiline ? (
            <textarea
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full h-32 bg-black/40 border border-heim-aurora/30 p-4 text-sm md:text-base text-gray-200 placeholder-heim-ice/20 focus:outline-none focus:border-heim-aurora rounded-lg resize-none"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full bg-black/40 border-b-2 border-heim-aurora/50 px-2 py-2 text-white placeholder-heim-ice/30 focus:outline-none focus:border-heim-aurora transition-all duration-300 font-display font-bold text-xl md:text-2xl"
              autoFocus
            />
          )}
        </div>
      )}
    </div>
  );
};

export const ProblemLog: React.FC = () => {
  const [problems, setProblems] = useState<ProblemEntry[]>([
    {
      id: 1,
      question: "如何定義 Heim × Energi 的核心受眾？",
      answer: "主要針對對永續發展、跨文化交流感興趣的青年學生（工程與人文背景兼具）。我們希望吸引的是「參與者」而非單純的「旁觀者」。",
      isLocked: true
    }
  ]);

  const addProblem = () => {
    const newId = problems.length > 0 ? Math.max(...problems.map(p => p.id)) + 1 : 1;
    setProblems([
      {
        id: newId,
        question: "",
        answer: "",
        isLocked: false // Start in edit mode
      },
      ...problems
    ]);
  };

  const updateProblem = (id: number, field: 'question' | 'answer', value: string) => {
    setProblems(problems.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const toggleLock = (id: number) => {
    setProblems(problems.map(p => p.id === id ? { ...p, isLocked: !p.isLocked } : p));
  };

  const deleteProblem = (id: number) => {
    setProblems(problems.filter(p => p.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-10 px-4 md:px-0">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-white/10 pb-6 gap-6">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-heim-aurora/10 rounded-lg text-heim-aurora border border-heim-aurora/20 shadow-[0_0_15px_rgba(111,255,176,0.2)]">
              <ClipboardList size={32} />
           </div>
           <div>
              <h2 className="text-3xl font-display font-bold text-white">問題紀錄</h2>
              <p className="text-heim-ice/50 uppercase tracking-widest text-sm">Issue Tracker & FAQ</p>
           </div>
        </div>

        <button 
          onClick={addProblem}
          className="px-6 py-3 bg-heim-aurora text-heim-fjord font-bold rounded-full hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(111,255,176,0.3)] transform hover:scale-105 active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          <span>紀錄新問題</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-6">
        <AnimatePresence>
          {problems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              className={`
                relative bg-heim-fjord/60 border rounded-2xl p-6 md:p-8 backdrop-blur-md overflow-hidden transition-all duration-300
                ${item.isLocked ? 'border-white/10 hover:border-heim-aurora/30' : 'border-heim-aurora/50 bg-heim-fjord/90 shadow-[0_0_30px_rgba(0,0,0,0.5)]'}
              `}
            >
              {/* Question Section */}
              <div className="flex items-start gap-4 mb-4">
                <div className="mt-1 flex-shrink-0 text-heim-aurora">
                   <HelpCircle size={24} />
                </div>
                <div className="flex-grow">
                   <label className="block text-xs text-heim-aurora font-bold uppercase tracking-widest mb-1">Question / Issue</label>
                   <EditableField 
                      value={item.question}
                      placeholder="請輸入遇到的問題..."
                      onChange={(e) => updateProblem(item.id, 'question', e.target.value)}
                      isLocked={item.isLocked}
                      onToggleLock={() => toggleLock(item.id)}
                      isHeader={true}
                   />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5 w-full my-4 pl-10" />

              {/* Answer Section */}
              <div className="flex items-start gap-4 pl-0 md:pl-2">
                 <div className="mt-4 flex-shrink-0 text-heim-ice/50 hidden md:block">
                   <MessageSquare size={20} />
                 </div>
                 <div className="flex-grow">
                    <label className="block text-xs text-heim-ice font-bold uppercase tracking-widest mb-2">Solution / Notes</label>
                    <EditableField 
                        value={item.answer}
                        placeholder="請輸入解決方案或筆記..."
                        onChange={(e) => updateProblem(item.id, 'answer', e.target.value)}
                        isLocked={item.isLocked}
                        onToggleLock={() => toggleLock(item.id)}
                        isMultiline={true}
                    />
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex gap-2">
                <button 
                  onClick={() => toggleLock(item.id)}
                  className={`
                    p-2 rounded-full transition-all
                    ${item.isLocked 
                      ? 'text-heim-ice/30 hover:text-heim-aurora hover:bg-white/10' 
                      : 'bg-heim-aurora text-heim-fjord hover:bg-white shadow-[0_0_10px_rgba(111,255,176,0.5)]'}
                  `}
                  title={item.isLocked ? "Edit" : "Save"}
                >
                  {item.isLocked ? <Edit2 size={16} /> : <Check size={16} strokeWidth={3} />}
                </button>
                
                <button 
                  onClick={() => deleteProblem(item.id)}
                  className="p-2 rounded-full text-heim-ice/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>

        {problems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl text-heim-ice/30"
          >
            <p>目前沒有紀錄任何問題。</p>
            <button onClick={addProblem} className="mt-4 text-heim-aurora hover:underline text-sm">點擊新增</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};


import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Target, Map, FileText, CheckCircle, Zap, MessageCircle, Calendar, Plane, Flag, Crown, User, MapPin } from 'lucide-react';

interface TimelineItemProps {
  time: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ time, title, icon, children, align = 'left', isLast = false }) => {
  return (
    <div className={`relative flex flex-col md:flex-row gap-8 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Time & Icon Column */}
      <div className={`flex flex-row md:flex-col items-center md:w-32 flex-shrink-0 ${align === 'right' ? 'md:items-start' : 'md:items-end'}`}>
        <div className="md:text-right hidden md:block">
          <span className="text-heim-aurora font-bold font-display tracking-wider text-sm block">{time}</span>
        </div>
        
        <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-heim-fjord border border-heim-aurora/30 text-heim-aurora shadow-[0_0_15px_rgba(111,255,176,0.2)] mt-2 mb-2 md:my-4">
          {icon}
        </div>

        <div className="md:hidden ml-4">
           <span className="text-heim-aurora font-bold font-display tracking-wider text-sm">{time}</span>
           <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>

      {/* Content Card */}
      <div className={`flex-1 pb-12 ${isLast ? '' : 'border-l border-white/10 md:border-none ml-6 md:ml-0 pl-8 md:pl-0'}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap size={100} />
          </div>

          <h3 className="hidden md:block text-2xl font-bold text-white mb-6 font-display">{title}</h3>
          
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface TeamCardProps {
  name: string;
  enName: string;
  leaders: string[];
  members: string[];
  tasks: string[];
  colorClass: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, enName, leaders, members, tasks, colorClass }) => (
  <div className={`bg-black/20 rounded-xl p-5 border border-white/5 hover:border-${colorClass}/30 transition-all flex flex-col h-full`}>
    <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-3">
      <div>
        <h4 className={`text-lg font-bold text-${colorClass}`}>{name}</h4>
        <span className="text-xs uppercase tracking-widest text-heim-ice/50">{enName}</span>
      </div>
    </div>
    
    <div className="space-y-4 mb-6 flex-grow">
       {/* Leaders Section */}
       <div>
         <div className="text-[10px] text-heim-aurora/70 uppercase tracking-widest mb-2 flex items-center gap-1.5 font-bold">
            <Crown size={12} /> Leader
         </div>
         <div className="flex flex-wrap gap-2">
           {leaders.map((leader, i) => (
             <span key={i} className="px-2.5 py-1 rounded bg-heim-aurora/10 text-white text-sm font-medium border border-heim-aurora/20">
               {leader}
             </span>
           ))}
         </div>
       </div>

       {/* Members Section */}
       {members.length > 0 && (
         <div>
           <div className="text-[10px] text-heim-ice/40 uppercase tracking-widest mb-2 flex items-center gap-1.5 font-bold">
              <User size={12} /> Members
           </div>
           <div className="text-sm text-gray-400 font-light leading-relaxed">
             {members.join('、')}
           </div>
         </div>
       )}
    </div>

    <div className="pt-4 border-t border-white/5">
      <div className="text-[10px] text-heim-ice/40 uppercase tracking-widest mb-2 font-bold">Key Tasks</div>
      <ul className="space-y-2">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-400 font-light leading-snug">
            <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-${colorClass}`} />
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const KickoffMeeting: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-10 px-4 md:px-0">
      
      {/* Header */}
      <div className="text-center mb-16 relative">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-heim-aurora/30 bg-heim-aurora/5 text-heim-aurora text-xs font-bold uppercase tracking-[0.2em]">
            <Calendar size={14} />
            <span>2025/12/10</span>
          </div>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-heim-ice/30 bg-heim-ice/5 text-heim-ice text-xs font-bold uppercase tracking-[0.2em]">
            <Clock size={14} />
            <span>21:00 - 22:00</span>
          </div>
           <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-gray-300 text-xs font-bold uppercase tracking-[0.2em]">
            <MapPin size={14} />
            <span>西樓 C213B</span>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
          第一次見面會
        </h2>
        <p className="text-heim-ice/60 text-sm md:text-base tracking-wide max-w-2xl mx-auto">
          啟動旅程：工程與人文的交匯，共同定義未來的可持續發展。
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4 md:space-y-0 relative"
      >
        {/* Central Line for Desktop */}
        <div className="absolute left-[135px] top-8 bottom-0 w-px bg-gradient-to-b from-heim-aurora via-white/10 to-transparent hidden md:block" />
        <div className="absolute right-[135px] top-8 bottom-0 w-px bg-gradient-to-b from-heim-aurora via-white/10 to-transparent hidden md:block" />


        {/* SECTION 1: Intro */}
        <TimelineItem time="21:00 - 21:07" title="快速自我介紹" icon={<Users size={20} />}>
          <p className="text-gray-300 text-lg font-light">
            支隊長、副支隊長、以及所有核心成員的初次連結。
          </p>
        </TimelineItem>

        {/* SECTION 2: Goals */}
        <TimelineItem time="21:07 - 21:12" title="支隊大綱及目標" icon={<Target size={20} />} align="right">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-heim-fjord/50 p-4 rounded-lg border border-white/5">
                <h4 className="text-heim-aurora font-bold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Flag size={14} /> Core Objectives
                </h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <CheckCircle size={16} className="mt-0.5 text-heim-ice flex-shrink-0" /> 
                    <span>保持熱忱，享受探索與交流的旅程</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle size={16} className="mt-0.5 text-heim-ice flex-shrink-0" /> 
                    <span>優勢互補：促進中國與北歐在文化與專業上的雙向賦能</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle size={16} className="mt-0.5 text-heim-ice flex-shrink-0" /> 
                    <span>異國青年合作推進下一代可持續發展</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-heim-fjord/50 p-4 rounded-lg border border-white/5">
                 <h4 className="text-heim-ice font-bold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Target size={14} /> Outcome
                </h4>
                <ul className="space-y-3 text-sm text-gray-300">
                   <li className="flex gap-2">
                    <CheckCircle size={16} className="mt-0.5 text-white/50 flex-shrink-0" /> 
                    <span>成果轉化：將實踐過程提煉為具備社會影響力的價值論述</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle size={16} className="mt-0.5 text-white/50 flex-shrink-0" /> 
                    <span>傳承 (Legacy)：建立可持續運作的知識與合作網絡</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-heim-aurora/5 border border-heim-aurora/20">
              <h4 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">Theme Focus</h4>
              <p className="text-sm text-gray-300 leading-relaxed italic">
                「從工程和人文的視角下，異國青年如何根據各自的優勢來推進可持續發展計畫 (Sustainable cities, Innovation)。」
              </p>
            </div>
          </div>
        </TimelineItem>

        {/* SECTION 3: Structure */}
        <TimelineItem time="21:12 - 21:20" title="前期分工與實行" icon={<Map size={20} />}>
          <div className="space-y-8">
            <p className="text-heim-ice/60 text-sm">介紹分工細則以及實行計劃：前期、中期、後期</p>
            
            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TeamCard 
                name="外聯組" 
                enName="Outreach"
                colorClass="heim-aurora"
                leaders={['黃楷迪']}
                members={['王奕', '张汇泉', '于海洋']}
                tasks={['統整可以對接的機構和組織', '每個人詳細分工']}
              />
              <TeamCard 
                name="調研組" 
                enName="Research"
                colorClass="heim-ice"
                leaders={['王欣怡', '紀強']}
                members={['向乐尧', '王莹']}
                tasks={[
                  '搜集機構名單供外聯聯繫（整合現有指導資源）', 
                  '針對組織進行調研（預調研報告）', 
                  '制定核心行程',
                  '多做可視化圖表 (工程/人文/青年/SDGs)'
                ]}
              />
              <TeamCard 
                name="內聯組" 
                enName="Internal"
                colorClass="heim-ice"
                leaders={['鐘瑞']}
                members={[]}
                tasks={[
                  '財務：訂機票、酒店、發票統整', 
                  '行程：查閱景點、美食、住宿', 
                  '交通：規劃詳細路線與時間表'
                ]}
              />
              <TeamCard 
                name="宣傳組" 
                enName="Publicity"
                colorClass="heim-aurora"
                leaders={['傅芷褘']}
                members={['葛棣', '李曼宁']}
                tasks={[
                  '行前推送一篇', 
                  '規劃紀錄片內容與素材收集', 
                  '製作國內調研問卷', 
                  '設計隊旗並製作'
                ]}
              />
            </div>

            {/* Mid & Late Term Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-white/10">
               <div>
                  <h5 className="text-heim-aurora font-bold uppercase tracking-widest text-xs mb-3">中期工作 (Mid-term)</h5>
                  <p className="text-xs text-white/50 mb-2">主張自由發想，每個人發揮所長</p>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>大學座談會（主軸）</li>
                    <li>採訪發問卷（主軸）</li>
                    <li>紀錄片拍攝</li>
                    <li>經營媒體帳戶</li>
                    <li>爭取重點宣傳曝光</li>
                  </ul>
               </div>
               <div>
                  <h5 className="text-heim-ice font-bold uppercase tracking-widest text-xs mb-3">後期工作 (Late-term)</h5>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>調研問卷結果報告</li>
                    <li>其他調研總結報告</li>
                    <li>總結推送</li>
                    <li>最終答辯</li>
                  </ul>
               </div>
            </div>
          </div>
        </TimelineItem>

        {/* SECTION 4: Discussion */}
        <TimelineItem time="21:20 - 22:00" title="分工討論與執行" icon={<MessageCircle size={20} />} align="right" isLast={true}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3">
              <div className="p-2 bg-heim-aurora/10 rounded-full text-heim-aurora"><Zap size={18} /></div>
              <span className="text-sm text-gray-200">主要活動實行形式 (座談/調研)</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3">
              <div className="p-2 bg-heim-ice/10 rounded-full text-heim-ice"><Users size={18} /></div>
              <span className="text-sm text-gray-200">小組組內分工，即刻開工</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-full text-white"><Plane size={18} /></div>
              <span className="text-sm text-gray-200">訂大行程：買機票</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg flex items-center gap-3">
              <div className="p-2 bg-heim-aurora/10 rounded-full text-heim-aurora"><FileText size={18} /></div>
              <span className="text-sm text-gray-200">提供前期準備資料</span>
            </div>
          </div>
        </TimelineItem>

      </motion.div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { Check, X, Bell, Star, Search, ChevronRight, TrendingUp, Shield, Lock, Eye, EyeOff, Bot, Mic, Play, Pause, Volume2 } from 'lucide-react';

// ===== PATTERNS-04: Notification Preferences =====
export const NotificationPrefsPreview: React.FC = () => {
  const [prefs, setPrefs] = useState({push:true,email:false,sms:false,marketing:false});
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-800"><h3 className="text-white font-bold">알림 설정</h3></div>
        {Object.entries(prefs).map(([key,val]) => (
          <div key={key} className="flex items-center justify-between px-4 py-3 border-b border-gray-800 last:border-0">
            <span className="text-gray-300 text-sm font-semibold capitalize">{key==='push'?'푸시 알림':key==='email'?'이메일':key==='sms'?'SMS':'마케팅'}</span>
            <button onClick={() => setPrefs(p=>({...p,[key]:!val}))} className={`w-11 h-6 rounded-full transition-colors ${val?'bg-blue-600':'bg-gray-700'} relative`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${val?'translate-x-5':'translate-x-0.5'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== PATTERNS-05: Theme Toggle =====
export const ThemeTogglePreview: React.FC = () => {
  const [theme, setTheme] = useState<'light'|'dark'|'system'>('dark');
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className={`w-full max-w-sm rounded-2xl border p-6 transition-colors ${theme==='dark'?'bg-gray-900 border-gray-700 text-white':theme==='light'?'bg-white border-gray-200 text-gray-900':'bg-gray-800 border-gray-600 text-gray-200'}`}>
        <h3 className="font-bold text-lg mb-1">테마 미리보기</h3>
        <p className={`text-sm ${theme==='light'?'text-gray-500':'text-gray-400'}`}>현재 테마: {theme==='dark'?'다크':'light'==='light'?'라이트':'시스템'}</p>
      </div>
      <div className="flex gap-2">
        {(['light','dark','system'] as const).map(t => (
          <button key={t} onClick={() => setTheme(t)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${theme===t?'bg-blue-600 text-white':'bg-slate-800 text-gray-400'}`}>
            {t==='light'?'☀️ 라이트':t==='dark'?'🌙 다크':'💻 시스템'}
          </button>
        ))}
      </div>
    </div>
  );
};

// ===== PATTERNS-06: Undo Snackbar =====
export const UndoSnackbarPreview: React.FC = () => {
  const [deleted, setDeleted] = useState(false);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>|null>(null);
  const handleDelete = () => { setDeleted(true); setShow(true); const t = setTimeout(() => setShow(false), 4000); setTimer(t); };
  const handleUndo = () => { setDeleted(false); setShow(false); if(timer) clearTimeout(timer); };
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px] relative">
      {!deleted ? (
        <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">📧</div>
          <div className="flex-1"><p className="text-white font-semibold text-sm">중요 이메일</p><p className="text-gray-500 text-xs">발신자 · 방금 전</p></div>
          <button onClick={handleDelete} className="text-gray-600 hover:text-red-400 transition-colors"><X className="w-4 h-4" /></button>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center gap-3 opacity-50">
          <p className="text-gray-500 text-sm flex-1">항목이 삭제되었습니다</p>
        </div>
      )}
      {show && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-2xl px-4 py-3 flex items-center gap-4 shadow-xl">
          <span className="text-gray-300 text-sm">삭제됨</span>
          <button onClick={handleUndo} className="text-blue-400 font-bold text-sm hover:text-blue-300">실행 취소</button>
        </div>
      )}
    </div>
  );
};

// ===== PATTERNS-07: Permission Dialog =====
export const PermissionDialogPreview: React.FC = () => {
  const [step, setStep] = useState(0);
  const perms = [{icon:'📍',title:'위치 접근',desc:'내 근처 서비스를 찾기 위해 위치가 필요합니다.'},{icon:'🔔',title:'알림 허용',desc:'중요한 업데이트를 받을 수 있습니다.'},{icon:'📷',title:'카메라 접근',desc:'프로필 사진을 찍을 수 있습니다.'}];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      {step < perms.length ? (
        <div className="w-full max-w-xs bg-gray-900 border border-gray-700 rounded-3xl p-6 text-center">
          <div className="text-5xl mb-4">{perms[step].icon}</div>
          <h3 className="text-white font-bold text-lg mb-2">{perms[step].title}</h3>
          <p className="text-gray-400 text-sm mb-6">{perms[step].desc}</p>
          <div className="flex gap-3">
            <button onClick={() => setStep(s=>s+1)} className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-800">거부</button>
            <button onClick={() => setStep(s=>s+1)} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-500">허용</button>
          </div>
          <div className="flex gap-1.5 justify-center mt-4">{perms.map((_,i) => <div key={i} className={`w-2 h-2 rounded-full ${i===step?'bg-blue-500':'bg-gray-700'}`} />)}</div>
        </div>
      ) : (
        <div className="text-center"><div className="text-5xl mb-3">✅</div><p className="text-white font-bold">설정 완료!</p><button onClick={() => setStep(0)} className="mt-4 px-4 py-2 bg-slate-800 text-gray-400 rounded-xl text-sm">다시 시작</button></div>
      )}
    </div>
  );
};

// ===== PATTERNS-08: Promotional Banner =====
export const PromoBannerPreview: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [idx, setIdx] = useState(0);
  const banners = [{title:'첫 구매 30% 할인',sub:'코드: FIRST30',gradient:'from-blue-600 to-indigo-700'},{title:'오늘만! 무료 배송',sub:'₩30,000 이상 주문 시',gradient:'from-orange-500 to-red-600'},{title:'신규 회원 특별 혜택',sub:'지금 가입하면 ₩5,000 쿠폰',gradient:'from-purple-600 to-pink-600'}];
  if (dismissed) return <div className="flex items-center justify-center min-h-[380px] bg-slate-950"><button onClick={() => {setDismissed(false);}} className="px-4 py-2 bg-slate-800 text-gray-400 rounded-xl text-sm">배너 다시 보기</button></div>;
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className={`w-full max-w-sm bg-gradient-to-r ${banners[idx].gradient} rounded-2xl p-5 relative`}>
        <button onClick={() => setDismissed(true)} className="absolute top-3 right-3 text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
        <p className="text-white/70 text-xs font-bold mb-1">한정 기간</p>
        <h3 className="text-white text-xl font-extrabold mb-1">{banners[idx].title}</h3>
        <p className="text-white/70 text-sm mb-4">{banners[idx].sub}</p>
        <button className="px-4 py-2 bg-white rounded-xl text-sm font-bold" style={{color:'inherit'}}>지금 이용하기 →</button>
      </div>
      <div className="flex gap-2">{banners.map((_,i) => <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full ${i===idx?'bg-blue-400':'bg-gray-700'}`} />)}</div>
    </div>
  );
};

// ===== PATTERNS-09: Cookie Banner =====
export const CookieBannerPreview: React.FC = () => {
  const [accepted, setAccepted] = useState<string|null>(null);
  if (accepted) return <div className="flex items-center justify-center min-h-[380px] bg-slate-950"><div className="text-center"><div className="text-3xl mb-2">🍪</div><p className="text-green-400 font-bold">{accepted} 선택됨</p><button onClick={() => setAccepted(null)} className="mt-3 px-4 py-2 bg-slate-800 text-gray-400 rounded-xl text-sm">초기화</button></div></div>;
  return (
    <div className="flex flex-col items-center justify-end p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-start gap-3 mb-4"><span className="text-2xl">🍪</span><div><h3 className="text-white font-bold mb-1">쿠키 설정</h3><p className="text-gray-400 text-sm">사이트 경험 향상을 위해 쿠키를 사용합니다.</p></div></div>
        <div className="flex gap-2">
          <button onClick={() => setAccepted('필수만')} className="flex-1 py-2 border border-gray-700 text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-800">필수만</button>
          <button onClick={() => setAccepted('사용자 설정')} className="flex-1 py-2 border border-gray-700 text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-800">설정</button>
          <button onClick={() => setAccepted('모두 허용')} className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500">모두 허용</button>
        </div>
      </div>
    </div>
  );
};

// ===== PATTERNS-10: Share Sheet =====
export const ShareSheetPreview: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const channels = [{icon:'💬',name:'카카오'},{icon:'🐦',name:'트위터'},{icon:'📘',name:'페이스북'},{icon:'📧',name:'이메일'},{icon:'💼',name:'링크드인'},{icon:'📱',name:'SMS'}];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px] relative overflow-hidden">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
        <h3 className="text-white font-bold mb-1">Vibe UI Kit - 컴포넌트 대백과</h3>
        <p className="text-gray-500 text-sm">200+ UI 컴포넌트 라이브러리</p>
      </div>
      <button onClick={() => setOpen(true)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">공유하기</button>
      {open && (
        <>
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 rounded-t-3xl p-6">
            <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto mb-4" />
            <h3 className="text-white font-bold mb-4">공유하기</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {channels.map(c => (
                <button key={c.name} onClick={() => setOpen(false)} className="flex flex-col items-center gap-1.5 py-2 hover:bg-gray-800 rounded-xl">
                  <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-2xl">{c.icon}</div>
                  <span className="text-xs text-gray-400">{c.name}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-800 rounded-xl px-3 py-2 text-gray-400 text-xs truncate">https://vibe.ui.kr/components</div>
              <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false),2000); setOpen(false); }} className={`px-3 py-2 rounded-xl text-xs font-bold ${copied?'bg-green-600 text-white':'bg-blue-600 text-white'}`}>{copied?'복사됨':'복사'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ===== PATTERNS-11: Invite Flow =====
export const InviteFlowPreview: React.FC = () => {
  const [email, setEmail] = useState('');
  const [invited, setInvited] = useState<string[]>(['park@design.co']);
  const [role, setRole] = useState('뷰어');
  const send = () => { if(email) { setInvited([...invited,email]); setEmail(''); } };
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
        <h3 className="text-white font-bold mb-3">팀원 초대</h3>
        <div className="flex gap-2 mb-3">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일 입력" className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          <select value={role} onChange={e => setRole(e.target.value)} className="bg-gray-800 text-white border border-gray-700 rounded-xl px-2 py-2 text-sm focus:outline-none">
            {['뷰어','편집자','관리자'].map(r => <option key={r}>{r}</option>)}
          </select>
          <button onClick={send} className="px-3 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">초대</button>
        </div>
        <div className="space-y-2">
          {invited.map(e => (
            <div key={e} className="flex items-center gap-2 text-sm">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">{e[0].toUpperCase()}</div>
              <span className="flex-1 text-gray-400 truncate">{e}</span>
              <span className="text-xs text-blue-400 font-semibold">{role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== PATTERNS-12: Feature Gate =====
export const FeatureGatePreview: React.FC = () => {
  const [plan, setPlan] = useState<'free'|'pro'>('free');
  const features = [{name:'기본 컴포넌트',free:true,pro:true},{name:'고급 애니메이션',free:false,pro:true},{name:'AI 프리뷰',free:false,pro:true},{name:'팀 협업',free:false,pro:true},{name:'커스텀 테마',free:false,pro:true}];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="flex gap-2 bg-slate-900 border border-gray-800 rounded-xl p-1">
        <button onClick={() => setPlan('free')} className={`px-4 py-1.5 rounded-lg text-sm font-bold ${plan==='free'?'bg-gray-700 text-white':'text-gray-500'}`}>무료</button>
        <button onClick={() => setPlan('pro')} className={`px-4 py-1.5 rounded-lg text-sm font-bold ${plan==='pro'?'bg-blue-600 text-white':'text-gray-500'}`}>Pro ⭐</button>
      </div>
      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        {features.map(f => {
          const ok = plan==='pro' ? f.pro : f.free;
          return (
            <div key={f.name} className={`flex items-center gap-3 px-4 py-3 border-b border-gray-800 last:border-0 ${!ok?'opacity-40':''}`}>
              <span className={`text-sm ${ok?'text-green-400':'text-gray-600'}`}>{ok?'✓':'🔒'}</span>
              <span className="text-gray-300 text-sm">{f.name}</span>
              {!ok && <span className="ml-auto text-xs text-blue-400 font-bold">Pro</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===== PATTERNS-13: Command Palette =====
export const CommandPalettePreview: React.FC = () => {
  const [query, setQuery] = useState('');
  const commands = ['⚙️ 설정으로 이동','📊 대시보드 열기','🔍 전체 검색','👤 프로필 편집','🌙 다크 모드 전환','📤 내보내기','🔔 알림 확인','🏠 홈으로 이동'];
  const filtered = commands.filter(c => !query || c.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-600 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
          <Search className="w-4 h-4 text-gray-500" />
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="명령어 검색..." className="flex-1 bg-transparent text-white text-sm focus:outline-none" />
          <kbd className="px-2 py-0.5 bg-gray-800 text-gray-500 rounded text-xs">ESC</kbd>
        </div>
        <div className="max-h-48 overflow-y-auto">
          {filtered.map((c,i) => <button key={c} className={`w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-3 ${i===0?'bg-gray-800 text-white':''}`}>{c}</button>)}
          {filtered.length === 0 && <p className="text-gray-600 text-sm text-center py-6">결과 없음</p>}
        </div>
      </div>
    </div>
  );
};

// ===== PATTERNS-14: App Rating =====
export const AppRatingPreview: React.FC = () => {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="text-5xl">🎉</div><p className="text-white font-bold text-xl">감사합니다!</p>
      <button onClick={() => { setSubmitted(false); setStars(0); }} className="px-4 py-2 bg-slate-800 text-gray-400 rounded-xl text-sm">다시 평가</button>
    </div>
  );
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-1">앱이 마음에 드시나요?</p>
        <p className="text-white font-bold text-lg">Vibe UI Kit 평가하기</p>
      </div>
      <div className="flex gap-2">
        {[1,2,3,4,5].map(i => (
          <button key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setStars(i)} className={`text-4xl transition-transform hover:scale-125 ${i<=(hover||stars)?'text-amber-400':'text-gray-700'}`}>★</button>
        ))}
      </div>
      {stars > 0 && <button onClick={() => setSubmitted(true)} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">제출하기</button>}
    </div>
  );
};

// ===== PATTERNS-15: Splash/Hero =====
export const SplashHeroPreview: React.FC = () => {
  const [step, setStep] = useState(0);
  const slides = [
    {emoji:'✨',title:'모든 UI 패턴을 한곳에',desc:'200개 이상의 컴포넌트를 탐색하세요'},
    {emoji:'🚀',title:'빠른 프로토타이핑',desc:'코드와 프리뷰를 바로 확인하세요'},
    {emoji:'🎨',title:'커스텀 디자인 시스템',desc:'나만의 스타일로 확장하세요'},
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-gradient-to-b from-blue-900/40 to-slate-900 border border-gray-800 rounded-3xl p-8 text-center">
        <div className="text-6xl mb-4">{slides[step].emoji}</div>
        <h3 className="text-white text-xl font-extrabold mb-2">{slides[step].title}</h3>
        <p className="text-gray-400 text-sm">{slides[step].desc}</p>
        <div className="flex gap-2 justify-center mt-6">
          {slides.map((_,i) => <div key={i} className={`rounded-full transition-all ${i===step?'w-6 h-2 bg-blue-500':'w-2 h-2 bg-gray-700'}`} />)}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => setStep(s=>Math.max(0,s-1))} disabled={step===0} className="px-4 py-2 bg-slate-800 text-gray-400 rounded-xl text-sm disabled:opacity-30">이전</button>
        {step < slides.length-1 ? <button onClick={() => setStep(s=>s+1)} className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">다음 →</button>
        : <button onClick={() => setStep(0)} className="px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-bold">시작 🎉</button>}
      </div>
    </div>
  );
};

// ===== PATTERNS-16: Feature Tour =====
export const FeatureTourPreview: React.FC = () => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const tips = [
    {target:'검색창',msg:'여기서 컴포넌트를 검색할 수 있어요!',x:'20%',y:'20%'},
    {target:'카테고리',msg:'카테고리별로 필터링하세요.',x:'10%',y:'50%'},
    {target:'즐겨찾기',msg:'자주 쓰는 컴포넌트를 저장하세요.',x:'60%',y:'30%'},
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="relative w-full max-w-sm h-48 bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="absolute" style={{left:'20%',top:'15%'}}><div className="w-24 h-6 bg-gray-700 rounded-lg" /></div>
        <div className="absolute" style={{left:'5%',top:'40%'}}><div className="w-16 h-20 bg-gray-800 rounded-xl" /></div>
        <div className="absolute" style={{right:'10%',top:'25%'}}><div className="w-8 h-8 bg-gray-700 rounded-xl" /></div>
        {open && step < tips.length && (
          <div className="absolute bg-blue-900 border border-blue-600 rounded-xl p-3 shadow-xl w-44 z-10" style={{left:tips[step].x, top:tips[step].y}}>
            <p className="text-white text-xs font-semibold">{tips[step].msg}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-blue-400 text-xs">{step+1}/{tips.length}</span>
              <button onClick={() => step < tips.length-1 ? setStep(s=>s+1) : setOpen(false)} className="px-2 py-0.5 bg-blue-600 text-white rounded text-xs font-bold">{step<tips.length-1?'다음':'완료'}</button>
            </div>
          </div>
        )}
      </div>
      <button onClick={() => { setOpen(true); setStep(0); }} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">가이드 시작</button>
    </div>
  );
};

// ===== PATTERNS-17: Update Prompt =====
export const UpdatePromptPreview: React.FC = () => {
  const [state, setState] = useState<'idle'|'updating'|'done'>('idle');
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-xs bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center">
        <div className="text-5xl mb-3">{state==='done'?'✅':'🚀'}</div>
        <h3 className="text-white font-bold text-lg mb-1">{state==='done'?'업데이트 완료!':'새 버전 출시'}</h3>
        <p className="text-gray-400 text-sm mb-1">{state==='done'?'v2.1.0이 설치되었습니다':'Vibe UI Kit v2.1.0'}</p>
        <p className="text-gray-600 text-xs mb-5">✨ 신규 컴포넌트 50개 추가<br/>🐛 버그 수정 12건</p>
        {state==='idle' && <button onClick={() => { setState('updating'); setTimeout(() => setState('done'), 2000); }} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">지금 업데이트</button>}
        {state==='updating' && <div className="flex items-center justify-center gap-2 text-blue-400"><div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"/><span className="text-sm font-bold">설치 중...</span></div>}
        {state==='done' && <button onClick={() => setState('idle')} className="w-full py-2 border border-gray-700 text-gray-400 rounded-xl text-sm">확인</button>}
      </div>
    </div>
  );
};

// ===== DATA DISPLAY =====
export const BadgeChipPreview: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
    <div className="flex flex-wrap gap-2 justify-center">
      {[{label:'NEW',color:'bg-blue-600'},{label:'PRO',color:'bg-purple-600'},{label:'BETA',color:'bg-amber-600'},{label:'SALE',color:'bg-red-600'},{label:'인기',color:'bg-green-600'}].map(b => (
        <span key={b.label} className={`${b.color} text-white text-xs font-extrabold px-3 py-1 rounded-full`}>{b.label}</span>
      ))}
    </div>
    <div className="flex flex-wrap gap-2 justify-center">
      {['디자인','개발','마케팅','기획'].map(t => (
        <span key={t} className="px-3 py-1.5 bg-slate-800 border border-gray-700 text-gray-300 text-sm font-semibold rounded-full">{t}</span>
      ))}
    </div>
  </div>
);

export const AvatarGroupPreview: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
    <div className="flex items-center -space-x-3">
      {['김','이','박','최','정','+8'].map((n,i) => (
        <div key={n} className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-slate-950 ${['bg-blue-500','bg-purple-500','bg-green-500','bg-orange-500','bg-pink-500','bg-gray-600'][i]}`}>{n}</div>
      ))}
    </div>
    <p className="text-gray-400 text-sm">13명이 협업 중</p>
  </div>
);

export const StatCardPreview: React.FC = () => {
  const stats = [{label:'총 매출',value:'₩12.4M',change:'+8.2%',up:true},{label:'방문자',value:'48,291',change:'+12.1%',up:true},{label:'전환율',value:'3.24%',change:'-0.4%',up:false}];
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 bg-slate-950 min-h-[380px]">
      {stats.map(s => (
        <div key={s.label} className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
          <div><p className="text-gray-500 text-xs font-semibold mb-1">{s.label}</p><p className="text-white text-xl font-extrabold">{s.value}</p></div>
          <span className={`text-sm font-bold px-2 py-1 rounded-lg ${s.up?'text-green-400 bg-green-900/30':'text-red-400 bg-red-900/30'}`}>{s.change}</span>
        </div>
      ))}
    </div>
  );
};

export const TimelinePreview: React.FC = () => {
  const events = [{time:'09:00',title:'팀 스탠드업',done:true},{time:'11:00',title:'디자인 리뷰',done:true},{time:'14:00',title:'코드 리뷰',done:false},{time:'16:00',title:'배포',done:false}];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-xs space-y-0">
        {events.map((e,i) => (
          <div key={e.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full border-2 mt-1 flex-shrink-0 ${e.done?'bg-blue-500 border-blue-500':'bg-slate-900 border-gray-600'}`} />
              {i < events.length-1 && <div className={`w-0.5 flex-1 my-1 ${e.done?'bg-blue-500/40':'bg-gray-800'}`} />}
            </div>
            <div className="pb-4">
              <p className="text-gray-500 text-xs">{e.time}</p>
              <p className={`text-sm font-semibold ${e.done?'text-white':'text-gray-500'}`}>{e.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SparklinePreview: React.FC = () => {
  const data = [40,65,45,80,55,90,70,85,60,95];
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v,i) => `${i*(280/9)},${60-((v-min)/(max-min)*50)}`).join(' ');
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
        <div className="flex justify-between mb-3"><div><p className="text-gray-500 text-xs">주간 활성 사용자</p><p className="text-white text-2xl font-black">24,891</p></div><span className="text-green-400 font-bold text-sm bg-green-900/30 px-2 py-1 rounded-lg h-fit">+18%</span></div>
        <svg width="100%" height="64" viewBox="0 0 280 64">
          <defs><linearGradient id="sl" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient></defs>
          <polygon points={`${pts} 280,64 0,64`} fill="url(#sl)" />
          <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export const EditableDataPreview: React.FC = () => {
  const [rows, setRows] = useState([{name:'홍길동',role:'디자이너',status:'활성'},{name:'김철수',role:'개발자',status:'비활성'}]);
  const [editing, setEditing] = useState<{row:number,col:string}|null>(null);
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-800 text-gray-500 text-xs font-semibold">
            <th className="px-4 py-3 text-left">이름</th><th className="px-4 py-3 text-left">역할</th><th className="px-4 py-3 text-left">상태</th>
          </tr></thead>
          <tbody>{rows.map((row,ri) => (
            <tr key={ri} className="border-b border-gray-800 last:border-0">
              {(['name','role','status'] as const).map(col => (
                <td key={col} className="px-4 py-3">
                  {editing?.row===ri && editing?.col===col ? (
                    <input autoFocus defaultValue={row[col]} onBlur={e => { const r=[...rows]; r[ri]={...r[ri],[col]:e.target.value}; setRows(r); setEditing(null); }} className="bg-gray-800 text-white rounded-lg px-2 py-1 text-xs w-full focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  ) : (
                    <span className="text-gray-300 cursor-pointer hover:text-white" onClick={() => setEditing({row:ri,col})}>{row[col]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p className="text-gray-600 text-xs mt-3">셀을 클릭하면 편집됩니다</p>
    </div>
  );
};

export const ActivityHeatmapPreview: React.FC = () => {
  const weeks = 12; const days = 7;
  const data = Array.from({length:weeks*days},() => Math.floor(Math.random()*5));
  const colors = ['bg-gray-800','bg-green-900','bg-green-700','bg-green-500','bg-green-400'];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="flex gap-1">
        {Array.from({length:weeks},(_,w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({length:days},(_,d) => <div key={d} className={`w-4 h-4 rounded-sm ${colors[data[w*7+d]]}`} />)}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">적음 {['bg-gray-800','bg-green-900','bg-green-700','bg-green-500','bg-green-400'].map(c => <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />)} 많음</div>
    </div>
  );
};

export const ComparisonTablePreview: React.FC = () => {
  const features = ['컴포넌트 수','커스텀 테마','팀 협업','API 접근','우선 지원'];
  const plans = [false,false,true,false,false];
  const proPlans = [true,true,true,true,true];
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-800 px-4 py-3 text-center text-xs font-bold text-gray-400">
          <div className="text-left">기능</div><div>무료</div><div className="text-blue-400">Pro ⭐</div>
        </div>
        {features.map((f,i) => (
          <div key={f} className="grid grid-cols-3 px-4 py-3 border-t border-gray-800 text-sm items-center">
            <span className="text-gray-400">{f}</span>
            <span className="text-center">{plans[i]?<span className="text-green-400">✓</span>:<span className="text-gray-700">—</span>}</span>
            <span className="text-center">{proPlans[i]?<span className="text-green-400">✓</span>:<span className="text-gray-700">—</span>}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const KPICardPreview: React.FC = () => {
  const kpis = [{label:'신규 사용자',val:'1,247',change:'+24%',up:true,icon:'👥'},{label:'전환율',val:'4.8%',change:'+0.6%',up:true,icon:'🎯'},{label:'이탈률',val:'32.1%',change:'+2.1%',up:false,icon:'📉'}];
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 bg-slate-950 min-h-[380px]">
      {kpis.map(k => (
        <div key={k.label} className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">{k.icon}</div>
          <div className="flex-1"><p className="text-gray-500 text-xs">{k.label}</p><p className="text-white text-xl font-bold">{k.val}</p></div>
          <span className={`text-sm font-bold px-2 py-1 rounded-lg ${k.up?'text-green-400 bg-green-900/30':'text-red-400 bg-red-900/30'}`}>{k.change}</span>
        </div>
      ))}
    </div>
  );
};

export const CollabIndicatorPreview: React.FC = () => {
  const users = [{name:'김철수',action:'수정 중',color:'bg-blue-500'},{name:'이영희',action:'댓글 추가',color:'bg-purple-500'},{name:'박준호',action:'이미지 업로드',color:'bg-green-500'}];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm space-y-2">
        {users.map(u => (
          <div key={u.name} className="flex items-center gap-3 bg-slate-900 border border-gray-800 rounded-xl px-4 py-3">
            <div className={`w-8 h-8 rounded-full ${u.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>{u.name[0]}</div>
            <div className="flex-1"><p className="text-white text-sm font-semibold">{u.name}</p><p className="text-gray-500 text-xs">{u.action}...</p></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== LAYOUT =====
export const BentoLayoutPreview: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-8 bg-slate-950 min-h-[380px]">
    <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
      <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 flex items-end"><p className="text-white font-bold">주요 기능</p></div>
      <div className="bg-slate-800 rounded-2xl p-3 flex items-center justify-center text-2xl">✨</div>
      <div className="bg-slate-800 rounded-2xl p-3 flex items-center justify-center text-2xl">🚀</div>
      <div className="bg-purple-900/50 border border-purple-800 rounded-2xl p-3 text-center text-xs text-purple-300 font-bold">통계</div>
      <div className="bg-green-900/50 border border-green-800 rounded-2xl p-3 text-center text-xs text-green-300 font-bold">상태</div>
    </div>
  </div>
);

export const SplitViewPreview: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const items = ['컴포넌트 A','컴포넌트 B','컴포넌트 C'];
  return (
    <div className="flex items-stretch justify-center p-6 bg-slate-950 min-h-[380px]">
      <div className="flex w-full max-w-sm gap-2">
        <div className="w-1/3 bg-slate-900 border border-gray-800 rounded-l-2xl overflow-hidden">
          {items.map((item,i) => <button key={item} onClick={() => setSelected(i)} className={`w-full px-3 py-3 text-left text-xs font-semibold border-b border-gray-800 last:border-0 ${i===selected?'bg-blue-600 text-white':'text-gray-400 hover:bg-gray-800'}`}>{item}</button>)}
        </div>
        <div className="flex-1 bg-slate-900 border border-gray-800 rounded-r-2xl p-4 flex items-center justify-center">
          <p className="text-gray-400 text-sm">{items[selected]} 상세</p>
        </div>
      </div>
    </div>
  );
};

export const VirtualScrollPreview: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const visible = 5; const total = 100;
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-800 flex justify-between text-xs text-gray-500">
          <span>총 {total}개</span><span>{offset+1}–{Math.min(offset+visible,total)} 표시</span>
        </div>
        {Array.from({length:visible},(_,i) => (
          <div key={i} className="px-4 py-3 border-b border-gray-800 last:border-0 flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-500">{offset+i+1}</div>
            <div><div className="h-2 bg-gray-700 rounded-full w-24 mb-1" /><div className="h-1.5 bg-gray-800 rounded-full w-16" /></div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setOffset(Math.max(0,offset-visible))} disabled={offset===0} className="px-4 py-2 bg-slate-800 text-gray-400 rounded-xl text-xs disabled:opacity-30">↑ 위</button>
        <button onClick={() => setOffset(Math.min(total-visible,offset+visible))} disabled={offset+visible>=total} className="px-4 py-2 bg-slate-800 text-gray-400 rounded-xl text-xs disabled:opacity-30">↓ 아래</button>
      </div>
    </div>
  );
};

export const KanbanPreview: React.FC = () => {
  const [cols, setCols] = useState({
    '할 일':['디자인 명세','컴포넌트 구현'],
    '진행 중':['프리뷰 추가'],
    '완료':['데이터 구조','타입 정의'],
  });
  return (
    <div className="flex items-start gap-2 p-6 bg-slate-950 min-h-[380px] overflow-x-auto">
      {Object.entries(cols).map(([col,items]) => (
        <div key={col} className="flex-shrink-0 w-36 bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-800 flex items-center justify-between">
            <span className="text-gray-400 text-xs font-bold">{col}</span>
            <span className="text-xs text-gray-600">{items.length}</span>
          </div>
          <div className="p-2 space-y-1.5">
            {items.map(item => <div key={item} className="bg-gray-800 rounded-xl p-2 text-xs text-gray-300 font-semibold cursor-move">{item}</div>)}
          </div>
        </div>
      ))}
    </div>
  );
};

// ===== CHARTS =====
export const BarChartPreview: React.FC = () => {
  const data = [{label:'월',val:65},{label:'화',val:80},{label:'수',val:45},{label:'목',val:90},{label:'금',val:70},{label:'토',val:55},{label:'일',val:85}];
  const max = Math.max(...data.map(d=>d.val));
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
        <p className="text-gray-500 text-xs mb-4">주간 방문자 수</p>
        <div className="flex items-end gap-2 h-32">
          {data.map(d => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-blue-600 rounded-t-lg transition-all hover:bg-blue-500" style={{height:`${(d.val/max)*100}%`}} />
              <span className="text-gray-600 text-[10px]">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LineChartPreview: React.FC = () => {
  const data = [30,50,40,80,60,90,75,95];
  const max = Math.max(...data); const min = Math.min(...data);
  const w = 260; const h = 80;
  const pts = data.map((v,i) => `${i*(w/(data.length-1))},${h-((v-min)/(max-min)*(h-10)+5)}`).join(' ');
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
        <div className="flex justify-between mb-3"><div><p className="text-gray-500 text-xs">매출 추이</p><p className="text-white text-xl font-bold">₩89.4M</p></div><span className="text-green-400 text-sm font-bold">+24.1%</span></div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
          <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient></defs>
          <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#lg)" />
          <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {data.map((v,i) => <circle key={i} cx={i*(w/(data.length-1))} cy={h-((v-min)/(max-min)*(h-10)+5)} r="3" fill="#3b82f6" />)}
        </svg>
      </div>
    </div>
  );
};

export const PieChartPreview: React.FC = () => {
  const slices = [{label:'디자인',val:35,color:'#3b82f6'},{label:'개발',val:45,color:'#8b5cf6'},{label:'마케팅',val:20,color:'#10b981'}];
  let cum = 0;
  const toRad = (d: number) => (d/100)*2*Math.PI;
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="flex items-center gap-6">
        <svg width="120" height="120" viewBox="-1 -1 2 2">
          {slices.map(s => {
            const start = toRad(cum); cum += s.val;
            const end = toRad(cum);
            const x1=Math.sin(start),y1=-Math.cos(start),x2=Math.sin(end),y2=-Math.cos(end);
            const large = s.val > 50 ? 1 : 0;
            return <path key={s.label} d={`M0,0 L${x1},${y1} A1,1,0,${large},1,${x2},${y2}Z`} fill={s.color} stroke="#0f172a" strokeWidth="0.02" />;
          })}
        </svg>
        <div className="space-y-2">
          {slices.map(s => <div key={s.label} className="flex items-center gap-2"><div className="w-3 h-3 rounded-full flex-shrink-0" style={{background:s.color}} /><span className="text-gray-300 text-sm">{s.label}</span><span className="text-gray-500 text-xs">{s.val}%</span></div>)}
        </div>
      </div>
    </div>
  );
};

export const AreaChartPreview: React.FC = () => {
  const d1 = [20,35,25,60,45,80,65,90];
  const d2 = [10,20,15,35,25,50,40,60];
  const max = 100; const w = 260; const h = 80;
  const pts = (d: number[]) => d.map((v,i) => `${i*(w/(d.length-1))},${h-(v/max*(h-10)+5)}`).join(' ');
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
        <div className="flex gap-4 mb-3">
          <div className="flex items-center gap-1.5 text-xs"><div className="w-3 h-1 bg-blue-500 rounded-full" /><span className="text-gray-400">신규 사용자</span></div>
          <div className="flex items-center gap-1.5 text-xs"><div className="w-3 h-1 bg-purple-500 rounded-full" /><span className="text-gray-400">재방문자</span></div>
        </div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
          <defs>
            <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient>
            <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4"/><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/></linearGradient>
          </defs>
          <polygon points={`0,${h} ${pts(d2)} ${w},${h}`} fill="url(#ag2)" />
          <polyline points={pts(d2)} fill="none" stroke="#8b5cf6" strokeWidth="2" />
          <polygon points={`0,${h} ${pts(d1)} ${w},${h}`} fill="url(#ag1)" />
          <polyline points={pts(d1)} fill="none" stroke="#3b82f6" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

// ===== AUTH & SECURITY =====
export const BiometricAuthPreview: React.FC = () => {
  const [state, setState] = useState<'idle'|'scanning'|'success'|'fail'>('idle');
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center text-6xl transition-all ${state==='scanning'?'border-blue-500 shadow-lg shadow-blue-500/40':state==='success'?'border-green-500 shadow-lg shadow-green-500/40':state==='fail'?'border-red-500 shadow-lg shadow-red-500/40':'border-gray-700'}`}>
        {state==='success'?'✅':state==='fail'?'❌':'👆'}
      </div>
      <p className="text-gray-400 text-sm font-semibold">{state==='idle'?'지문을 인식하세요':state==='scanning'?'스캔 중...':state==='success'?'인증 완료!':'인증 실패'}</p>
      <div className="flex gap-2">
        <button onClick={() => { setState('scanning'); setTimeout(() => setState('success'), 1500); }} disabled={state!=='idle' && state!=='fail'} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50 text-sm">지문 인식</button>
        <button onClick={() => { setState('scanning'); setTimeout(() => setState('fail'), 1500); }} disabled={state!=='idle' && state!=='fail'} className="px-5 py-2.5 bg-gray-800 text-gray-400 rounded-xl font-bold disabled:opacity-50 text-sm">실패 테스트</button>
        {(state==='success'||state==='fail') && <button onClick={() => setState('idle')} className="px-5 py-2.5 bg-gray-800 text-gray-400 rounded-xl font-bold text-sm">초기화</button>}
      </div>
    </div>
  );
};

export const TwoFactorPreview: React.FC = () => {
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'qr'|'verify'|'done'>('qr');
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      {step==='qr' && <>
        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center">
          <div className="grid grid-cols-5 gap-0.5">{Array.from({length:25},(_,i)=><div key={i} className={`w-5 h-5 ${Math.random()>0.5?'bg-black':'bg-white'}`}/>)}</div>
        </div>
        <p className="text-gray-400 text-sm text-center">QR을 인증 앱으로 스캔하세요</p>
        <button onClick={() => setStep('verify')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">스캔 완료</button>
      </>}
      {step==='verify' && <>
        <p className="text-white font-bold">인증 코드 입력</p>
        <div className="flex gap-2">
          {[0,1,2,3,4,5].map(i => <input key={i} maxLength={1} value={code[i]||''} onChange={e => setCode(code.slice(0,i)+e.target.value+code.slice(i+1))} className="w-10 h-12 bg-gray-800 border border-gray-700 text-white text-center text-lg font-bold rounded-xl focus:outline-none focus:border-blue-500" />)}
        </div>
        <button onClick={() => setStep('done')} disabled={code.length<6} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50">확인</button>
      </>}
      {step==='done' && <>
        <div className="text-5xl">🔐</div>
        <p className="text-green-400 font-bold text-lg">2FA 설정 완료!</p>
        <button onClick={() => { setStep('qr'); setCode(''); }} className="px-4 py-2 bg-slate-800 text-gray-400 rounded-xl text-sm">다시 시작</button>
      </>}
    </div>
  );
};

export const PermissionRequestPreview: React.FC = () => <PermissionDialogPreview />;
export const SocialLoginPreview: React.FC = () => {
  const [loading, setLoading] = useState<string|null>(null);
  const providers = [{id:'google',icon:'🔵',label:'Google로 계속',bg:'border-gray-700 text-white hover:bg-gray-800'},{id:'apple',icon:'🍎',label:'Apple로 계속',bg:'bg-white text-black hover:bg-gray-100'},{id:'kakao',icon:'💛',label:'카카오로 계속',bg:'bg-yellow-400 text-black hover:bg-yellow-300'}];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="text-center mb-2"><h3 className="text-white font-bold text-lg">로그인</h3><p className="text-gray-500 text-sm">소셜 계정으로 간편하게 시작하세요</p></div>
      <div className="w-full max-w-xs space-y-3">
        {providers.map(p => (
          <button key={p.id} onClick={() => { setLoading(p.id); setTimeout(() => setLoading(null), 1500); }} className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl border font-bold text-sm transition-all ${p.bg} ${loading===p.id?'opacity-60':''}`}>
            {loading===p.id ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <span className="text-xl">{p.icon}</span>}
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ===== FORMS =====
export const MultiStepFormPreview: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({name:'',email:'',plan:'pro'});
  const steps = ['기본 정보','계정 설정','플랜 선택'];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s,i) => <React.Fragment key={s}><div className={`flex items-center gap-2 ${i<=step?'text-blue-400':'text-gray-600'}`}><div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i<step?'bg-blue-600 text-white':i===step?'border-2 border-blue-500 text-blue-400':'border-2 border-gray-700 text-gray-600'}`}>{i<step?<Check className="w-3 h-3"/>:i+1}</div><span className="text-xs font-semibold hidden sm:block">{s}</span></div>{i<steps.length-1&&<div className={`flex-1 h-px ${i<step?'bg-blue-600':'bg-gray-800'}`}/>}</React.Fragment>)}
        </div>
        <div className="bg-slate-900 border border-gray-800 rounded-2xl p-5">
          {step===0 && <div className="space-y-3"><input value={data.name} onChange={e => setData({...data,name:e.target.value})} placeholder="이름" className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" /></div>}
          {step===1 && <div className="space-y-3"><input value={data.email} onChange={e => setData({...data,email:e.target.value})} placeholder="이메일" type="email" className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" /></div>}
          {step===2 && <div className="space-y-2">{['free','pro','enterprise'].map(p => <button key={p} onClick={() => setData({...data,plan:p})} className={`w-full py-2.5 rounded-xl text-sm font-bold border transition-all ${data.plan===p?'bg-blue-600 border-blue-600 text-white':'border-gray-700 text-gray-400 hover:border-gray-500'}`}>{p==='free'?'무료':p==='pro'?'Pro ⭐':'Enterprise'}</button>)}</div>}
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={() => setStep(s=>Math.max(0,s-1))} disabled={step===0} className="flex-1 py-2.5 border border-gray-700 text-gray-400 rounded-xl text-sm disabled:opacity-30">이전</button>
          <button onClick={() => setStep(s=>Math.min(steps.length-1,s+1))} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold">{step===steps.length-1?'완료':'다음'}</button>
        </div>
      </div>
    </div>
  );
};

export const AutoSaveFormPreview: React.FC = () => {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>|null>(null);
  const handleChange = (v: string) => { setText(v); setSaved(false); if(timer) clearTimeout(timer); const t = setTimeout(() => setSaved(true), 1500); setTimer(t); };
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <span className="text-white font-bold text-sm">새 문서</span>
          <span className={`text-xs font-semibold ${saved?'text-green-400':'text-gray-600'}`}>{saved?'✓ 자동 저장됨':'저장 중...'}</span>
        </div>
        <textarea value={text} onChange={e => handleChange(e.target.value)} placeholder="내용을 입력하면 자동으로 저장됩니다..." className="w-full bg-transparent text-gray-300 text-sm p-4 focus:outline-none min-h-[180px] resize-none" />
      </div>
    </div>
  );
};

export const InlineValidationPreview: React.FC = () => {
  const [fields, setFields] = useState({email:'',pw:'',name:''});
  const validate = {email:(v:string)=>!v?null:v.includes('@')?'valid':'이메일 형식이 아닙니다',pw:(v:string)=>!v?null:v.length>=8?'valid':'8자 이상 입력하세요',name:(v:string)=>!v?null:v.length>=2?'valid':'2자 이상 입력하세요'};
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm space-y-3">
        {(['email','pw','name'] as const).map(k => {
          const result = validate[k](fields[k]);
          return <div key={k}>
            <input value={fields[k]} onChange={e => setFields({...fields,[k]:e.target.value})} placeholder={k==='email'?'이메일':k==='pw'?'비밀번호':'이름'} type={k==='pw'?'password':k==='email'?'email':'text'} className={`w-full bg-gray-800 text-white border rounded-xl px-4 py-2.5 text-sm focus:outline-none ${!result?'border-gray-700':result==='valid'?'border-green-500':'border-red-500'}`} />
            {result && result!=='valid' && <p className="text-red-400 text-xs mt-1 ml-1">{result}</p>}
            {result==='valid' && <p className="text-green-400 text-xs mt-1 ml-1">✓ 확인됨</p>}
          </div>;
        })}
      </div>
    </div>
  );
};

export const PINInputPreview: React.FC = () => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(''));
  const refs = Array.from({length:6},() => React.createRef<HTMLInputElement>());
  const handleChange = (i: number, v: string) => {
    const np = [...pin]; np[i] = v.slice(-1);
    setPin(np);
    if(v && i < 5) refs[i+1].current?.focus();
  };
  const correct = pin.join('')==='123456';
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div><p className="text-white font-bold text-lg text-center">PIN 입력</p><p className="text-gray-500 text-sm text-center">힌트: 123456</p></div>
      <div className="flex gap-2">
        {pin.map((v,i) => <input key={i} ref={refs[i]} maxLength={1} value={v} onChange={e => handleChange(i,e.target.value)} onKeyDown={e => e.key==='Backspace' && !v && i>0 && refs[i-1].current?.focus()} className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 focus:outline-none bg-gray-800 text-white transition-colors ${v?correct?'border-green-500':'border-blue-500':'border-gray-700'}`} />)}
      </div>
      {pin.every(v=>v) && <p className={`font-bold ${correct?'text-green-400':'text-red-400'}`}>{correct?'✓ 인증 완료!':'✗ PIN이 올바르지 않습니다'}</p>}
      <button onClick={() => setPin(Array(6).fill(''))} className="text-gray-600 text-sm hover:text-gray-400">초기화</button>
    </div>
  );
};

// ===== ACCESSIBILITY =====
export const FocusTrapPreview: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <button onClick={() => setOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">모달 열기 (Tab 포커스 트랩)</button>
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div role="dialog" aria-modal="true" className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full mx-4">
            <h2 className="text-white font-bold mb-1">포커스 트랩 데모</h2>
            <p className="text-gray-400 text-sm mb-4">Tab 키를 눌러 이 모달 안에서만 포커스가 순환됩니다.</p>
            <input placeholder="입력 필드 1" className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input placeholder="입력 필드 2" className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="flex gap-3">
              <button onClick={() => setOpen(false)} className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500">취소</button>
              <button onClick={() => setOpen(false)} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-300">확인</button>
            </div>
          </div>
        </div>
      )}
      <p className="text-gray-600 text-xs text-center">WCAG 2.1 AA 준수 · aria-modal 적용</p>
    </div>
  );
};

export const LiveRegionPreview: React.FC = () => {
  const [msgs, setMsgs] = useState<string[]>([]);
  const announce = (msg: string) => setMsgs(m => [...m.slice(-4), msg]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3"><span className="text-xs bg-green-900 text-green-400 px-2 py-0.5 rounded font-bold">LIVE</span><span className="text-gray-400 text-sm">aria-live region</span></div>
        <div aria-live="polite" aria-atomic="false" className="min-h-[80px] space-y-1">
          {msgs.length === 0 ? <p className="text-gray-600 text-sm">동작을 실행하면 스크린리더가 공지합니다</p>
          : msgs.map((m,i) => <p key={i} className="text-gray-300 text-sm">{m}</p>)}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <button onClick={() => announce('✓ 항목이 저장되었습니다')} className="px-4 py-2 bg-green-700 text-white rounded-xl text-sm font-bold">저장</button>
        <button onClick={() => announce('⚠️ 연결이 끊어졌습니다')} className="px-4 py-2 bg-yellow-700 text-white rounded-xl text-sm font-bold">경고</button>
        <button onClick={() => announce('📬 새 메시지 3개')} className="px-4 py-2 bg-blue-700 text-white rounded-xl text-sm font-bold">알림</button>
        <button onClick={() => setMsgs([])} className="px-4 py-2 bg-gray-800 text-gray-400 rounded-xl text-sm">초기화</button>
      </div>
    </div>
  );
};

// ===== AI/ML UX =====
export const AITypingStreamPreview: React.FC = () => {
  const fullText = 'Vibe UI Kit은 200개 이상의 컴포넌트를 제공하는 UX/UI 대백과입니다. 다크모드, 인터랙티브 프리뷰, 코드 스니펫을 모두 지원합니다! 🚀';
  const [text, setText] = useState('');
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    if (text.length >= fullText.length) { setRunning(false); return; }
    const t = setTimeout(() => setText(fullText.slice(0,text.length+1)), 30);
    return () => clearTimeout(t);
  }, [running, text]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm flex gap-3 items-start">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AI</div>
        <div className="flex-1 bg-slate-900 border border-gray-800 rounded-2xl rounded-tl-sm p-4 min-h-[80px]">
          <p className="text-gray-200 text-sm leading-relaxed">{text}{running && <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle" />}</p>
        </div>
      </div>
      <button onClick={() => { setText(''); setRunning(true); }} disabled={running} className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-bold disabled:opacity-50">AI 응답 시작</button>
    </div>
  );
};

export const ThinkingIndicatorPreview: React.FC = () => {
  const [state, setState] = useState<'idle'|'thinking'|'done'>('idle');
  const [answer, setAnswer] = useState('');
  const answers = ['컴포넌트를 잘 활용하면 개발 속도가 10배 빨라집니다.','좋은 UX는 사용자를 행복하게 만듭니다.','Vibe UI Kit으로 멋진 앱을 만들어보세요!'];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm space-y-3">
        <div className="flex gap-3 items-start justify-end">
          <div className="bg-blue-600 rounded-2xl rounded-br-sm px-4 py-2 text-white text-sm max-w-[80%]">컴포넌트 사용의 장점은?</div>
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">나</div>
        </div>
        {(state==='thinking'||state==='done') && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AI</div>
            <div className="bg-slate-900 border border-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
              {state==='thinking' ? (
                <div className="flex gap-1.5 items-center py-1">{[0,1,2].map(i => <span key={i} style={{animationDelay:`${i*150}ms`}} className="w-2 h-2 bg-gray-500 rounded-full animate-bounce block" />)}</div>
              ) : <p className="text-gray-300 text-sm">{answer}</p>}
            </div>
          </div>
        )}
      </div>
      <button onClick={() => { setState('thinking'); setTimeout(() => { setState('done'); setAnswer(answers[Math.floor(Math.random()*answers.length)]); }, 2000); }} disabled={state==='thinking'} className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-bold disabled:opacity-50">전송</button>
    </div>
  );
};

export const PromptInputPreview: React.FC = () => {
  const [val, setVal] = useState('');
  const [sent, setSent] = useState<string[]>([]);
  const suggestions = ['UI 개선 방법','색상 팔레트 추천','컴포넌트 설계 원칙'];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      {sent.length > 0 && <div className="w-full max-w-sm space-y-2">{sent.slice(-2).map((s,i) => <div key={i} className="text-right"><span className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-2xl rounded-br-sm inline-block">{s}</span></div>)}</div>}
      <div className="w-full max-w-sm flex flex-wrap gap-1.5 justify-center">
        {suggestions.map(s => <button key={s} onClick={() => setVal(s)} className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-400 rounded-full text-xs hover:border-blue-500 hover:text-blue-400">{s}</button>)}
      </div>
      <div className="w-full max-w-sm flex gap-2 items-end border-2 border-gray-700 focus-within:border-blue-500 rounded-2xl p-3 transition-colors">
        <textarea value={val} onChange={e => setVal(e.target.value)} placeholder="AI에게 무엇이든 물어보세요..." rows={2} className="flex-1 bg-transparent text-gray-200 text-sm resize-none focus:outline-none" />
        <button onClick={() => { if(val) { setSent([...sent,val]); setVal(''); } }} className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${val?'bg-blue-600 text-white hover:bg-blue-500':'bg-gray-800 text-gray-600'}`}>↑</button>
      </div>
    </div>
  );
};

export const ConfidenceBadgePreview: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const results = [{query:'Tailwind CSS 설치',confidence:94,source:'공식 문서'},{query:'React hooks 사용법',confidence:87,source:'Stack Overflow'},{query:'Next.js 라우팅',confidence:72,source:'커뮤니티 포럼'},{query:'GraphQL 설정',confidence:45,source:'블로그'}];
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 bg-slate-950 min-h-[380px]">
      {results.map((r,i) => (
        <div key={i} onClick={() => setSelected(i)} className={`w-full max-w-sm bg-slate-900 border rounded-2xl p-4 cursor-pointer transition-all ${selected===i?'border-blue-500':'border-gray-800 hover:border-gray-700'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-semibold">{r.query}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.confidence>=80?'bg-green-900 text-green-400':r.confidence>=60?'bg-yellow-900 text-yellow-400':'bg-red-900 text-red-400'}`}>{r.confidence}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500" style={{width:`${r.confidence}%`}} /></div>
            <span className="text-gray-600 text-xs">{r.source}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CitationPreview: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
    <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex gap-3 items-start mb-4">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">AI</div>
        <p className="text-gray-200 text-sm leading-relaxed">Tailwind CSS는 유틸리티 우선 CSS 프레임워크입니다.<sup className="text-blue-400 font-bold cursor-pointer text-xs">①</sup> 빠른 UI 개발에 최적화되어 있으며<sup className="text-blue-400 font-bold cursor-pointer text-xs">②</sup> 높은 생산성을 제공합니다.</p>
      </div>
      <div className="border-t border-gray-800 pt-3 space-y-2">
        {[{num:'①',title:'Tailwind CSS 공식 문서',url:'tailwindcss.com'},{num:'②',title:'CSS 프레임워크 비교 분석',url:'blog.vibe.kr'}].map(c => (
          <div key={c.num} className="flex items-start gap-2 text-xs">
            <span className="text-blue-400 font-bold flex-shrink-0">{c.num}</span>
            <div><p className="text-gray-300 font-semibold">{c.title}</p><p className="text-gray-600">{c.url}</p></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ===== MEDIA =====
export const VideoPlayerPreview: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (progress >= 100) { setPlaying(false); return; }
    const t = setInterval(() => setProgress(p => Math.min(100, p+0.5)), 100);
    return () => clearInterval(t);
  }, [playing, progress]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
        <div className="bg-gray-800 h-40 flex items-center justify-center cursor-pointer" onClick={() => setPlaying(!playing)}>
          <div className={`w-14 h-14 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center transition-all ${playing?'opacity-0':'opacity-100'}`}>
            {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setPlaying(!playing)} className="text-white">{playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}</button>
            <div className="flex-1 h-1.5 bg-gray-700 rounded-full cursor-pointer" onClick={e => { const r=e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX-r.left)/r.width)*100); }}>
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{width:`${progress}%`}} />
            </div>
            <span className="text-gray-400 text-xs font-mono">{Math.floor(progress/100*185)}s</span>
            <button onClick={() => setMuted(!muted)} className="text-gray-400 hover:text-white"><Volume2 className={`w-4 h-4 ${muted?'opacity-30':''}`} /></button>
            <span className="text-gray-400 text-xs">⛶</span>
          </div>
        </div>
      </div>
      <button onClick={() => { setProgress(0); setPlaying(false); }} className="px-4 py-2 bg-slate-800 text-gray-400 rounded-xl text-sm">초기화</button>
    </div>
  );
};

export const ImageGalleryPreview: React.FC = () => {
  const [selected, setSelected] = useState<number|null>(null);
  const [zoom, setZoom] = useState(1);
  const gradients = ['from-blue-400 to-indigo-600','from-purple-400 to-pink-600','from-green-400 to-cyan-600','from-orange-400 to-red-600','from-yellow-400 to-orange-600','from-pink-400 to-rose-600'];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="grid grid-cols-3 gap-1.5 w-full max-w-sm">
        {gradients.map((g,i) => (
          <div key={i} onClick={() => { setSelected(i); setZoom(1); }} className={`aspect-square rounded-xl bg-gradient-to-br ${g} cursor-pointer transition-transform hover:scale-95 ${selected===i?'ring-2 ring-white ring-offset-2 ring-offset-slate-950':''}`} />
        ))}
      </div>
      {selected !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className={`w-64 h-64 rounded-2xl bg-gradient-to-br ${gradients[selected]} transition-transform`} style={{transform:`scale(${zoom})`}} onClick={e => { e.stopPropagation(); setZoom(z => z===1?2:1); }} />
          <p className="absolute bottom-8 text-white/60 text-sm">클릭으로 줌 · 배경 클릭으로 닫기</p>
        </div>
      )}
    </div>
  );
};

export const AudioPlayerPreview: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [vol, setVol] = useState(70);
  useEffect(() => {
    if (!playing) return;
    if (progress >= 100) { setPlaying(false); return; }
    const t = setInterval(() => setProgress(p => Math.min(100,p+0.3)), 100);
    return () => clearInterval(t);
  }, [playing, progress]);
  const duration = 215;
  const current = Math.floor(progress/100*duration);
  const fmt = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 border border-gray-700 rounded-3xl p-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-3xl">🎵</div>
        <div className="text-center mb-4"><p className="text-white font-bold">지금 이 순간</p><p className="text-gray-400 text-sm">Vibe Artists</p></div>
        <div className="mb-3">
          <div className="h-1.5 bg-gray-700 rounded-full cursor-pointer mb-1" onClick={e => { const r=e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX-r.left)/r.width)*100); }}>
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width:`${progress}%`}} />
          </div>
          <div className="flex justify-between text-xs text-gray-500"><span>{fmt(current)}</span><span>{fmt(duration)}</span></div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => setProgress(0)} className="text-gray-500 hover:text-white text-xl">⏮</button>
          <button onClick={() => setPlaying(!playing)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            {playing ? <Pause className="w-5 h-5 text-gray-900" /> : <Play className="w-5 h-5 text-gray-900 ml-0.5" />}
          </button>
          <button onClick={() => setProgress(100)} className="text-gray-500 hover:text-white text-xl">⏭</button>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Volume2 className="w-4 h-4 text-gray-500" />
          <input type="range" min="0" max="100" value={vol} onChange={e => setVol(Number(e.target.value))} className="flex-1 accent-blue-500" />
        </div>
      </div>
    </div>
  );
};

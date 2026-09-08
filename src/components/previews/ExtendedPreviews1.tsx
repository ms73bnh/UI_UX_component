'use client';

import React, { useState } from 'react';
import { Heart, Bell, Search, Check, X, Star, ChevronRight, BarChart3, TrendingUp } from 'lucide-react';

// ===== ACT-10: Context Toolbar =====
export const ContextToolbarPreview: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <p className="text-gray-400 text-sm">항목을 선택하면 툴바가 나타납니다</p>
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4 cursor-pointer" onClick={() => setActive(active ? null : 'item')}>
        <p className="text-white text-sm font-semibold">📄 디자인 명세서.pdf</p>
        <p className="text-gray-500 text-xs mt-1">3.2MB · 오늘 수정</p>
      </div>
      {active && (
        <div className="flex gap-2 bg-gray-900 border border-gray-700 rounded-2xl px-4 py-2 shadow-xl">
          {[{icon:'✏️',label:'편집'},{icon:'📋',label:'복사'},{icon:'📤',label:'공유'},{icon:'🗑',label:'삭제'}].map(({icon,label}) => (
            <button key={label} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-gray-800 transition-colors">
              <span className="text-lg">{icon}</span>
              <span className="text-[10px] text-gray-400">{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ===== ACT-11: Add Item Button =====
export const AddItemButtonPreview: React.FC = () => {
  const [items, setItems] = useState(['첫 번째 항목', '두 번째 항목']);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-slate-900 border border-gray-800 rounded-xl px-4 py-3">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-white text-sm flex-1">{item}</span>
            <button onClick={() => setItems(items.filter((_,j)=>j!==i))} className="text-gray-600 hover:text-red-400 transition-colors"><X className="w-4 h-4" /></button>
          </div>
        ))}
        <button onClick={() => setItems([...items, `항목 ${items.length + 1}`])} className="w-full py-3 border-2 border-dashed border-gray-700 hover:border-blue-500 text-gray-500 hover:text-blue-400 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2">
          <span className="text-lg">+</span> 새 항목 추가
        </button>
      </div>
    </div>
  );
};

// ===== INPUT-10: Currency Input =====
export const CurrencyInputPreview: React.FC = () => {
  const [value, setValue] = useState('50000');
  const [currency, setCurrency] = useState('KRW');
  const currencies = ['KRW', 'USD', 'EUR', 'JPY'];
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm">
        <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">금액 입력</label>
        <div className="flex gap-2">
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-slate-800 text-white border border-gray-700 rounded-xl px-3 py-3 text-sm font-bold focus:outline-none focus:border-blue-500">
            {currencies.map(c => <option key={c}>{c}</option>)}
          </select>
          <input type="text" value={Number(value).toLocaleString()} onChange={e => setValue(e.target.value.replace(/,/g,''))} className="flex-1 bg-slate-800 text-white border border-gray-700 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none focus:border-blue-500" />
        </div>
        <p className="text-gray-500 text-xs mt-2">≈ ${(Number(value)/1350).toFixed(2)} USD</p>
      </div>
    </div>
  );
};

// ===== INPUT-11: Phone Input =====
export const PhoneInputPreview: React.FC = () => {
  const [phone, setPhone] = useState('');
  const flags = [{ code: '+82', flag: '🇰🇷', name: '한국' }, { code: '+1', flag: '🇺🇸', name: 'US' }, { code: '+81', flag: '🇯🇵', name: '일본' }];
  const [selectedFlag, setSelectedFlag] = useState(flags[0]);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm">
        <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 block">전화번호</label>
        <div className="flex gap-2">
          <select onChange={e => setSelectedFlag(flags[Number(e.target.value)])} className="bg-slate-800 text-white border border-gray-700 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-blue-500">
            {flags.map((f,i) => <option key={f.code} value={i}>{f.flag} {f.code}</option>)}
          </select>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="010-0000-0000" className="flex-1 bg-slate-800 text-white border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
        </div>
        {phone.length > 0 && <p className="text-green-400 text-xs mt-2 font-semibold">✓ {selectedFlag.code} {phone}</p>}
      </div>
    </div>
  );
};

// ===== INPUT-12: Password Input =====
export const PasswordInputPreview: React.FC = () => {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['', '약함', '보통', '강함'];
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm space-y-3">
        <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">비밀번호</label>
        <div className="relative">
          <input type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호 입력" className="w-full bg-slate-800 text-white border border-gray-700 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-blue-500" />
          <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">{show ? '🙈' : '👁'}</button>
        </div>
        {pw.length > 0 && (
          <div>
            <div className="flex gap-1 mb-1">{[1,2,3].map(i => <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= strength ? strengthColors[strength] : 'bg-gray-700'}`} />)}</div>
            <p className={`text-xs font-semibold ${strength===1?'text-red-400':strength===2?'text-yellow-400':'text-green-400'}`}>{strengthLabels[strength]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== INPUT-13: Password Strength =====
export const PasswordStrengthPreview: React.FC = () => <PasswordInputPreview />;

// ===== SELECT-11: Filter Chips =====
export const FilterChipsPreview: React.FC = () => {
  const options = ['전체','서울','부산','제주','인천','대구'];
  const [selected, setSelected] = useState('전체');
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="flex flex-wrap gap-2 justify-center">
        {options.map(o => (
          <button key={o} onClick={() => setSelected(o)} className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${selected===o?'bg-blue-600 text-white border-blue-600':'bg-slate-800 text-gray-400 border-gray-700 hover:border-gray-500'}`}>{o}</button>
        ))}
      </div>
      <p className="text-gray-500 text-sm">선택됨: <span className="text-blue-400 font-bold">{selected}</span></p>
    </div>
  );
};

// ===== SELECT-12: Multi-Select Listbox =====
export const MultiSelectListboxPreview: React.FC = () => {
  const options = ['디자인','개발','마케팅','기획','데이터'];
  const [selected, setSelected] = useState<string[]>(['디자인']);
  const toggle = (o: string) => setSelected(selected.includes(o) ? selected.filter(s=>s!==o) : [...selected, o]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        {options.map(o => (
          <button key={o} onClick={() => toggle(o)} className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-800 last:border-0 transition-colors ${selected.includes(o)?'bg-blue-600/10':'hover:bg-slate-800'}`}>
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected.includes(o)?'bg-blue-600 border-blue-600':'border-gray-600'}`}>{selected.includes(o)&&<Check className="w-3 h-3 text-white" />}</div>
            <span className={`text-sm font-semibold ${selected.includes(o)?'text-blue-400':'text-gray-400'}`}>{o}</span>
          </button>
        ))}
      </div>
      <p className="text-gray-500 text-xs">{selected.length}개 선택됨</p>
    </div>
  );
};

// ===== SELECT-13: Tree Select =====
export const TreeSelectPreview: React.FC = () => {
  const [open, setOpen] = useState<string[]>(['카테고리']);
  const [selected, setSelected] = useState('');
  const tree = [{ id: '카테고리', label: '📁 카테고리', children: [{ id: 'ui', label: '📂 UI 컴포넌트', children: [{ id: 'btn', label: '🔵 버튼' }, { id: 'form', label: '🔵 폼' }] }, { id: 'pattern', label: '📂 패턴', children: [{ id: 'nav', label: '🔵 내비게이션' }] }] }];
  const toggle = (id: string) => setOpen(open.includes(id) ? open.filter(o=>o!==id) : [...open, id]);
  const renderNode = (node: any, depth=0): React.ReactNode => (
    <div key={node.id} style={{ paddingLeft: depth * 16 }}>
      <button onClick={() => node.children ? toggle(node.id) : setSelected(node.id)} className={`w-full text-left px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${selected===node.id?'bg-blue-600 text-white':'text-gray-300 hover:bg-slate-700'}`}>
        {node.children && <span className="text-xs">{open.includes(node.id)?'▼':'▶'}</span>}
        {node.label}
      </button>
      {node.children && open.includes(node.id) && node.children.map((c:any) => renderNode(c, depth+1))}
    </div>
  );
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-xs bg-slate-900 border border-gray-800 rounded-2xl p-3">
        {tree.map(n => renderNode(n))}
      </div>
      {selected && <p className="text-blue-400 text-sm font-semibold">선택: {selected}</p>}
    </div>
  );
};

// ===== NAV-06: Pagination =====
export const PaginationPreview: React.FC = () => {
  const [page, setPage] = useState(1);
  const total = 12;
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4 min-h-[200px] flex items-center justify-center">
        <p className="text-gray-400 text-sm">페이지 {page} / {total} 콘텐츠</p>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => setPage(Math.max(1,page-1))} disabled={page===1} className="w-9 h-9 rounded-xl bg-slate-800 text-gray-400 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-sm">‹</button>
        {[...Array(5)].map((_,i) => {
          const p = i + Math.max(1, page-2);
          if (p > total) return null;
          return <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${page===p?'bg-blue-600 text-white':'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}>{p}</button>;
        })}
        <button onClick={() => setPage(Math.min(total,page+1))} disabled={page===total} className="w-9 h-9 rounded-xl bg-slate-800 text-gray-400 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-sm">›</button>
      </div>
    </div>
  );
};

// ===== NAV-07: Prev/Next Navigation =====
export const PrevNextNavPreview: React.FC = () => {
  const items = ['소개','기능','가격','FAQ','연락처'];
  const [idx, setIdx] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-8 text-center">
        <p className="text-gray-500 text-xs mb-2">{idx+1} / {items.length}</p>
        <h3 className="text-white text-2xl font-bold">{items[idx]}</h3>
      </div>
      <div className="flex gap-4">
        <button onClick={() => setIdx(Math.max(0,idx-1))} disabled={idx===0} className="px-6 py-2.5 bg-slate-800 text-gray-300 rounded-full text-sm font-bold disabled:opacity-30 hover:bg-slate-700">← 이전</button>
        <button onClick={() => setIdx(Math.min(items.length-1,idx+1))} disabled={idx===items.length-1} className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold disabled:opacity-30 hover:bg-blue-500">다음 →</button>
      </div>
    </div>
  );
};

// ===== NAV-09: Contextual Breadcrumb =====
export const ContextualBreadcrumbPreview: React.FC = () => {
  const paths = [['홈'],['홈','상품'],['홈','상품','전자기기'],['홈','상품','전자기기','스마트폰']];
  const [depth, setDepth] = useState(3);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
        <div className="flex items-center gap-1 flex-wrap">
          {paths[depth].map((p,i) => (
            <React.Fragment key={p}>
              <button onClick={() => setDepth(i)} className={`text-sm font-semibold transition-colors ${i===depth?'text-white':'text-gray-500 hover:text-gray-300'}`}>{p}</button>
              {i < paths[depth].length-1 && <ChevronRight className="w-4 h-4 text-gray-700" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {paths.map((_,i) => <button key={i} onClick={() => setDepth(i)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${depth===i?'bg-blue-600 text-white':'bg-slate-800 text-gray-400'}`}>Depth {i+1}</button>)}
      </div>
    </div>
  );
};

// ===== NAV-10: Nested Menu =====
export const NestedMenuPreview: React.FC = () => {
  const [open, setOpen] = useState<string[]>(['대시보드']);
  const [active, setActive] = useState('개요');
  const menu = [
    { id: '대시보드', label: '🏠 대시보드', children: ['개요', '통계', '보고서'] },
    { id: '사용자', label: '👥 사용자', children: ['목록', '권한', '활동로그'] },
    { id: '설정', label: '⚙️ 설정', children: ['일반', '보안', '알림'] },
  ];
  return (
    <div className="flex items-start justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-48 bg-slate-900 border border-gray-800 rounded-2xl p-2 space-y-1">
        {menu.map(m => (
          <div key={m.id}>
            <button onClick={() => setOpen(open.includes(m.id) ? open.filter(o=>o!==m.id) : [...open, m.id])} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-gray-300 hover:bg-slate-800 font-semibold">
              <span>{m.label}</span><span className="text-xs text-gray-600">{open.includes(m.id)?'▼':'▶'}</span>
            </button>
            {open.includes(m.id) && (
              <div className="pl-4 space-y-0.5">
                {m.children.map(c => <button key={c} onClick={() => setActive(c)} className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${active===c?'bg-blue-600 text-white':'text-gray-500 hover:text-gray-300'}`}>{c}</button>)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex-1 bg-slate-900 border border-gray-800 rounded-2xl p-4 min-h-[200px]">
        <h3 className="text-white font-bold">{active}</h3>
        <p className="text-gray-500 text-sm mt-2">콘텐츠 영역</p>
      </div>
    </div>
  );
};

// ===== NAV-11: Tab Navigation =====
export const TabNavigationPreview: React.FC = () => {
  const tabs = ['메인','서비스','게시판','고객센터','마이페이지'];
  const [active, setActive] = useState('메인');
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="flex gap-1 bg-slate-900 border border-gray-800 rounded-2xl p-1 flex-wrap justify-center">
        {tabs.map(t => <button key={t} onClick={() => setActive(t)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${active===t?'bg-blue-600 text-white shadow-sm':'text-gray-500 hover:text-gray-300'}`}>{t}</button>)}
      </div>
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-6 text-center min-h-[200px] flex items-center justify-center">
        <p className="text-gray-400">{active} 콘텐츠</p>
      </div>
    </div>
  );
};

// ===== NAV-12: Icon Tab Bar =====
export const IconTabBarPreview: React.FC = () => {
  const tabs = [{icon:'🏠',label:'홈'},{icon:'🔍',label:'탐색'},{icon:'💬',label:'메시지'},{icon:'🔔',label:'알림'},{icon:'👤',label:'프로필'}];
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4 min-h-[200px] flex items-center justify-center">
        <p className="text-gray-400">{tabs[active].label} 화면</p>
      </div>
      <div className="w-full max-w-sm bg-slate-900 border border-gray-700 rounded-2xl p-3 flex justify-around">
        {tabs.map((t,i) => (
          <button key={t.label} onClick={() => setActive(i)} className="flex flex-col items-center gap-1">
            <span className={`text-2xl transition-transform ${active===i?'scale-125':''}`}>{t.icon}</span>
            <span className={`text-[10px] font-bold ${active===i?'text-blue-400':'text-gray-600'}`}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ===== NAV-13: Notification Tab =====
export const NotificationTabPreview: React.FC = () => {
  const tabs = [{label:'받은함',count:3},{label:'보낸함',count:0},{label:'중요',count:1},{label:'스팸',count:12}];
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm">
        <div className="flex border-b border-gray-800">
          {tabs.map((t,i) => (
            <button key={t.label} onClick={() => setActive(i)} className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-3 text-xs font-bold transition-all ${active===i?'border-b-2 border-blue-500 text-white':'text-gray-600 hover:text-gray-400'}`}>
              {t.label}
              {t.count > 0 && <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${active===i?'bg-blue-600 text-white':'bg-gray-800 text-gray-500'}`}>{t.count}</span>}
            </button>
          ))}
        </div>
        <div className="bg-slate-900 rounded-b-2xl p-4 min-h-[160px] flex items-center justify-center">
          <p className="text-gray-500 text-sm">{tabs[active].label} ({tabs[active].count})</p>
        </div>
      </div>
    </div>
  );
};

// ===== OVER-07: Context Menu =====
export const ContextMenuPreview: React.FC = () => {
  const [pos, setPos] = useState<{x:number,y:number}|null>(null);
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-950 min-h-[380px] relative" onContextMenu={e => { e.preventDefault(); setPos({x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY}); }} onClick={() => setPos(null)}>
      <div className="text-center text-gray-400 text-sm">우클릭 또는 길게 누르기</div>
      {pos && (
        <div className="absolute bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-10" style={{left:pos.x, top:pos.y}}>
          {['열기','복사','이름 변경','삭제'].map((item,i) => <button key={item} className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-800 transition-colors ${i===3?'text-red-400 border-t border-gray-700':'text-gray-300'}`}>{item}</button>)}
        </div>
      )}
      <p className="text-gray-600 text-xs mt-4">클릭하면 닫힘</p>
    </div>
  );
};

// ===== OVER-08: Confirm Dialog =====
export const ConfirmDialogPreview: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string|null>(null);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      {result && <div className={`px-4 py-2 rounded-xl text-sm font-bold ${result==='확인'?'bg-blue-600 text-white':'bg-gray-800 text-gray-400'}`}>{result} 선택됨</div>}
      <button onClick={() => { setOpen(true); setResult(null); }} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500">항목 삭제</button>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={e => e.stopPropagation()}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-xs w-full mx-4 shadow-2xl">
            <h3 className="text-white font-bold text-lg mb-2">정말 삭제하시겠습니까?</h3>
            <p className="text-gray-400 text-sm mb-6">이 작업은 취소할 수 없습니다.</p>
            <div className="flex gap-3">
              <button onClick={() => { setOpen(false); setResult('취소'); }} className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-xl font-bold hover:bg-gray-800">취소</button>
              <button onClick={() => { setOpen(false); setResult('확인'); }} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500">삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== OVER-09: Loading Overlay =====
export const LoadingOverlayPreview: React.FC = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px] relative">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-6 relative">
        <h3 className="text-white font-bold mb-2">데이터 목록</h3>
        {[1,2,3].map(i => <div key={i} className="h-8 bg-gray-800 rounded-lg mb-2" />)}
        {loading && (
          <div className="absolute inset-0 bg-black/70 rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-sm font-bold">불러오는 중...</p>
          </div>
        )}
      </div>
      <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }} disabled={loading} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50">데이터 로드</button>
    </div>
  );
};

// ===== OVER-10: Toast Notification =====
export const ToastNotificationPreview: React.FC = () => {
  const [toasts, setToasts] = useState<{id:number,msg:string,type:string}[]>([]);
  let id = 0;
  const show = (msg: string, type: string) => {
    const tid = ++id;
    setToasts(t => [...t, {id:tid, msg, type}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== tid)), 3000);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className={`px-4 py-3 rounded-xl text-sm font-bold shadow-xl border flex items-center gap-2 ${t.type==='success'?'bg-green-900 border-green-700 text-green-300':t.type==='error'?'bg-red-900 border-red-700 text-red-300':'bg-blue-900 border-blue-700 text-blue-300'}`}>
            <span>{t.type==='success'?'✓':t.type==='error'?'✕':'ℹ'}</span>{t.msg}
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <button onClick={() => show('저장되었습니다!','success')} className="px-4 py-2 bg-green-700 text-white rounded-xl text-sm font-bold">성공</button>
        <button onClick={() => show('오류가 발생했습니다','error')} className="px-4 py-2 bg-red-700 text-white rounded-xl text-sm font-bold">오류</button>
        <button onClick={() => show('알림이 도착했습니다','info')} className="px-4 py-2 bg-blue-700 text-white rounded-xl text-sm font-bold">정보</button>
      </div>
    </div>
  );
};

// ===== OVERLAY-11: Bottom Sheet =====
export const BottomSheetV2Preview: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px] relative overflow-hidden">
      <button onClick={() => setOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">바텀 시트 열기</button>
      {open && (
        <>
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 rounded-t-3xl p-6">
            <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-4" />
            <h3 className="text-white font-bold mb-3">공유하기</h3>
            <div className="grid grid-cols-4 gap-3">
              {['카카오','링크','이메일','더보기'].map(item => (
                <button key={item} onClick={() => setOpen(false)} className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-xl">📤</div>
                  <span className="text-xs text-gray-400">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ===== OVERLAY-12: Side Drawer =====
export const SideDrawerPreview: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px] relative overflow-hidden">
      <button onClick={() => setOpen(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">패널 열기</button>
      {open && (
        <>
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-2/3 max-w-xs bg-gray-900 border-l border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">상세 패널</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2">
              {['이름','이메일','역할','상태'].map(f => <div key={f} className="bg-gray-800 rounded-xl p-3"><p className="text-gray-500 text-xs">{f}</p><div className="h-4 bg-gray-700 rounded mt-1 w-3/4" /></div>)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ===== LIST-05: Feed List Item =====
export const FeedListItemPreview: React.FC = () => {
  const items = [
    {name:'김철수',time:'방금 전',text:'새 프로젝트를 시작했습니다! 🚀'},
    {name:'이영희',time:'5분 전',text:'디자인 리뷰 완료했어요.'},
    {name:'박준호',time:'10분 전',text:'배포 성공! 🎉'},
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6 bg-slate-950 min-h-[380px]">
      {items.map((item,i) => (
        <div key={i} className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{item.name[0]}</div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white text-sm font-bold">{item.name}</span>
              <span className="text-gray-600 text-xs">{item.time}</span>
            </div>
            <p className="text-gray-400 text-sm">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ===== LIST-07: Masonry Grid =====
export const MasonryGridPreview: React.FC = () => {
  const items = [
    {h:80,color:'from-blue-500 to-blue-700'},{h:120,color:'from-purple-500 to-purple-700'},
    {h:100,color:'from-green-500 to-green-700'},{h:60,color:'from-orange-500 to-orange-700'},
    {h:90,color:'from-pink-500 to-pink-700'},{h:110,color:'from-cyan-500 to-cyan-700'},
  ];
  return (
    <div className="flex items-start justify-center p-8 bg-slate-950 min-h-[380px]">
      <div className="columns-3 gap-2 w-full max-w-sm">
        {items.map((item,i) => (
          <div key={i} style={{height:item.h}} className={`w-full mb-2 rounded-xl bg-gradient-to-b ${item.color} break-inside-avoid`} />
        ))}
      </div>
    </div>
  );
};

// ===== LIST-08: Media Card =====
export const MediaCardPreview: React.FC = () => {
  const cards = [
    {title:'여름 컬렉션',sub:'2024 신상품',gradient:'from-orange-400 to-pink-500'},
    {title:'트렌드 아이템',sub:'이번 주 인기',gradient:'from-blue-400 to-indigo-500'},
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      {cards.map((c,i) => (
        <div key={i} className="w-full max-w-sm flex gap-4 bg-slate-900 border border-gray-800 rounded-2xl p-3">
          <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${c.gradient} flex-shrink-0`} />
          <div className="flex flex-col justify-center">
            <p className="text-white font-bold">{c.title}</p>
            <p className="text-gray-400 text-sm">{c.sub}</p>
            <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold w-fit">보기</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ===== LISTS-11: Sortable Table =====
export const SortableTablePreview: React.FC = () => {
  const [sort, setSort] = useState({col:'이름', dir: 1});
  const data = [
    {이름:'김철수',상태:'활성',날짜:'2026-09-01'},
    {이름:'이영희',상태:'비활성',날짜:'2026-08-15'},
    {이름:'박준호',상태:'활성',날짜:'2026-09-08'},
  ];
  const sorted = [...data].sort((a,b) => (a[sort.col as keyof typeof a] > b[sort.col as keyof typeof b] ? sort.dir : -sort.dir));
  const toggle = (col: string) => setSort(s => s.col===col ? {col,dir:s.dir*-1} : {col,dir:1});
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-800">
            {['이름','상태','날짜'].map(col => (
              <th key={col} onClick={() => toggle(col)} className="px-4 py-3 text-left text-gray-500 font-semibold cursor-pointer hover:text-white select-none">
                {col} {sort.col===col ? (sort.dir===1?'↑':'↓') : '↕'}
              </th>
            ))}
          </tr></thead>
          <tbody>{sorted.map((row,i) => (
            <tr key={i} className="border-b border-gray-800 last:border-0 hover:bg-slate-800 transition-colors">
              <td className="px-4 py-3 text-white font-semibold">{row.이름}</td>
              <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${row.상태==='활성'?'bg-green-900 text-green-400':'bg-gray-800 text-gray-500'}`}>{row.상태}</span></td>
              <td className="px-4 py-3 text-gray-400">{row.날짜}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};

// ===== FEED-06 ~ FEED-13 helpers =====
export const WarningBannerPreview: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
    <div className="w-full max-w-sm space-y-3">
      {[{type:'info',icon:'ℹ️',msg:'새 버전이 출시되었습니다.',bg:'bg-blue-900/50 border-blue-700 text-blue-300'},
        {type:'warn',icon:'⚠️',msg:'저장공간이 부족합니다.',bg:'bg-yellow-900/50 border-yellow-700 text-yellow-300'},
        {type:'error',icon:'❌',msg:'연결이 끊어졌습니다.',bg:'bg-red-900/50 border-red-700 text-red-300'},
        {type:'success',icon:'✅',msg:'백업 완료되었습니다.',bg:'bg-green-900/50 border-green-700 text-green-300'},
      ].map(({icon,msg,bg}) => (
        <div key={msg} className={`flex items-center gap-3 px-4 py-3 border rounded-xl ${bg}`}>
          <span>{icon}</span><span className="text-sm font-semibold">{msg}</span>
        </div>
      ))}
    </div>
  </div>
);

export const InlineNotificationPreview: React.FC = () => {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const items = [{id:1,msg:'이메일 인증이 필요합니다.',icon:'📧'},{id:2,msg:'프로필을 완성해주세요.',icon:'👤'},{id:3,msg:'새 메시지가 있습니다.',icon:'💬'}];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm space-y-2">
        {items.filter(i=>!dismissed.includes(i.id)).map(item => (
          <div key={item.id} className="flex items-center gap-3 bg-slate-900 border border-gray-700 rounded-xl px-4 py-3">
            <span className="text-xl">{item.icon}</span>
            <span className="flex-1 text-gray-300 text-sm">{item.msg}</span>
            <button onClick={() => setDismissed([...dismissed, item.id])} className="text-gray-600 hover:text-gray-400"><X className="w-4 h-4" /></button>
          </div>
        ))}
        {dismissed.length === items.length && <p className="text-gray-600 text-center text-sm py-8">모든 알림을 확인했습니다 ✓</p>}
      </div>
    </div>
  );
};

export const ReviewCardPreview: React.FC = () => {
  const reviews = [
    {name:'김철수',stars:5,text:'정말 완성도가 높은 컴포넌트 라이브러리입니다!'},
    {name:'이영희',stars:4,text:'사용하기 편리하고 디자인이 아름답습니다.'},
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      {reviews.map((r,i) => (
        <div key={i} className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">{r.name[0]}</div>
            <div><p className="text-white font-bold text-sm">{r.name}</p><p className="text-amber-400 text-sm">{'★'.repeat(r.stars)}{'☆'.repeat(5-r.stars)}</p></div>
          </div>
          <p className="text-gray-400 text-sm">{r.text}</p>
        </div>
      ))}
    </div>
  );
};

export const SuccessAnimationPreview: React.FC = () => {
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      {done ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-900 border-4 border-green-500 flex items-center justify-center animate-bounce">
            <Check className="w-10 h-10 text-green-400 stroke-[3]" />
          </div>
          <p className="text-green-400 text-xl font-extrabold">완료!</p>
          <button onClick={() => setDone(false)} className="px-4 py-2 text-gray-500 text-sm underline">다시 시도</button>
        </div>
      ) : (
        <button onClick={() => setDone(true)} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-500">작업 완료</button>
      )}
    </div>
  );
};

// ===== GEST-05 ~ GEST-08 =====
export const SwipeGesturePreview: React.FC = () => {
  const [x, setX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [action, setAction] = useState<string|null>(null);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm relative overflow-hidden rounded-2xl">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center px-4">
          <div className={`text-sm font-bold ${x > 30 ? 'text-green-400' : x < -30 ? 'text-red-400' : 'text-gray-600'}`}>
            {x > 30 ? '← 아카이브' : x < -30 ? '삭제 →' : '←  스와이프  →'}
          </div>
        </div>
        <div
          className="relative bg-slate-800 border border-gray-700 p-4 cursor-grab active:cursor-grabbing transition-transform"
          style={{transform:`translateX(${x}px)`}}
          onMouseDown={e => setStartX(e.clientX)}
          onMouseMove={e => e.buttons && setX(Math.max(-120, Math.min(120, e.clientX - startX)))}
          onMouseUp={() => {
            setAction(x > 60 ? '아카이브됨!' : x < -60 ? '삭제됨!' : null);
            setX(0);
          }}
          onMouseLeave={() => setX(0)}
        >
          <p className="text-white font-semibold">이메일 제목입니다</p>
          <p className="text-gray-500 text-sm">발신자 · 5분 전</p>
        </div>
      </div>
      {action && <div className="px-4 py-2 bg-gray-800 rounded-xl text-sm font-bold text-white">{action}</div>}
    </div>
  );
};

export const SwipeRevealPreview: React.FC = () => <SwipeGesturePreview />;

export const SwipeRefreshGesturePreview: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl overflow-hidden">
        {refreshing && (
          <div className="flex items-center justify-center gap-2 py-3 border-b border-gray-800">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">새로고침 중...</span>
          </div>
        )}
        <div className="p-4">
          {[1,2,3].map(i => <div key={i} className="py-3 border-b border-gray-800 last:border-0 text-gray-400 text-sm">항목 {i + count * 3}</div>)}
        </div>
      </div>
      <button onClick={() => { setRefreshing(true); setTimeout(() => { setRefreshing(false); setCount(c=>c+1); }, 1500); }} disabled={refreshing} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-50">↓ 당겨서 새로고침</button>
    </div>
  );
};

export const LongPressMenuPreview: React.FC = () => {
  const [holding, setHolding] = useState(false);
  const [open, setOpen] = useState(false);
  let timer: ReturnType<typeof setTimeout>;
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div
        className={`w-40 h-40 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer select-none transition-transform ${holding?'scale-95 bg-blue-900/30 border-blue-500':'bg-slate-800 border-gray-700'} border-2`}
        onMouseDown={() => { setHolding(true); timer = setTimeout(() => { setOpen(true); setHolding(false); }, 800); }}
        onMouseUp={() => { clearTimeout(timer); setHolding(false); }}
        onMouseLeave={() => { clearTimeout(timer); setHolding(false); }}
      >
        <span className="text-4xl">📁</span>
        <span className="text-gray-400 text-sm">길게 누르기</span>
        {holding && <div className="w-10 h-1 bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-blue-500 animate-[grow_0.8s_linear]" /></div>}
      </div>
      {open && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
          {['열기','복사','이름 변경','공유','삭제'].map((item,i) => (
            <button key={item} onClick={() => setOpen(false)} className={`w-full px-6 py-3 text-left text-sm font-semibold transition-colors hover:bg-gray-800 ${i===4?'text-red-400 border-t border-gray-700':'text-gray-300'}`}>{item}</button>
          ))}
        </div>
      )}
    </div>
  );
};

// ===== MOTION-03 ~ MOTION-07 =====
export const StaggeredListPreview: React.FC = () => {
  const [show, setShow] = useState(false);
  const items = ['첫 번째 항목','두 번째 항목','세 번째 항목','네 번째 항목'];
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm space-y-2">
        {items.map((item,i) => (
          <div key={item} className={`bg-slate-900 border border-gray-800 rounded-xl px-4 py-3 text-gray-300 text-sm font-semibold transition-all duration-500 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{transitionDelay: show ? `${i*100}ms` : '0ms'}}>
            {item}
          </div>
        ))}
      </div>
      <button onClick={() => setShow(!show)} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">{show ? '숨기기' : '순서대로 나타내기'}</button>
    </div>
  );
};

export const MicroAnimationPreview: React.FC = () => {
  const [state, setState] = useState<'idle'|'loading'|'success'>('idle');
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <button
        onClick={() => { setState('loading'); setTimeout(() => setState('success'), 1500); setTimeout(() => setState('idle'), 3000); }}
        disabled={state !== 'idle'}
        className={`px-8 py-3 rounded-2xl font-bold text-white transition-all flex items-center gap-3 ${state==='idle'?'bg-blue-600 hover:bg-blue-500':state==='loading'?'bg-gray-700':'bg-green-600'}`}
      >
        {state==='idle' && '저장'}
        {state==='loading' && <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />저장 중...</>}
        {state==='success' && <><Check className="w-4 h-4 stroke-[3]" />완료!</>}
      </button>
    </div>
  );
};

export const StateTransitionPreview: React.FC = () => {
  const states = ['오프라인','연결 중...','온라인','바쁨'];
  const colors = ['bg-gray-500','bg-yellow-500 animate-pulse','bg-green-500','bg-red-500'];
  const [idx, setIdx] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="flex items-center gap-3 bg-slate-900 border border-gray-800 rounded-2xl px-6 py-4">
        <div className={`w-3 h-3 rounded-full ${colors[idx]}`} />
        <span className="text-white font-semibold">{states[idx]}</span>
      </div>
      <div className="flex gap-2">
        {states.map((s,i) => <button key={s} onClick={() => setIdx(i)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${idx===i?'bg-blue-600 text-white':'bg-slate-800 text-gray-500'}`}>{s}</button>)}
      </div>
    </div>
  );
};

export const CountUpPreview: React.FC = () => {
  const [val, setVal] = useState(0);
  const [running, setRunning] = useState(false);
  const target = 128450;
  React.useEffect(() => {
    if (running) {
      const step = target / 60;
      const timer = setInterval(() => setVal(v => { if (v >= target) { setRunning(false); clearInterval(timer); return target; } return Math.min(v + step, target); }), 16);
      return () => clearInterval(timer);
    }
  }, [running]);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="text-center">
        <p className="text-gray-500 text-sm mb-2">월 매출</p>
        <p className="text-5xl font-black text-white font-mono">₩{Math.floor(val).toLocaleString()}</p>
      </div>
      <button onClick={() => { setVal(0); setRunning(true); }} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">카운트 시작</button>
    </div>
  );
};

export const RippleEffectPreview: React.FC = () => {
  const [ripples, setRipples] = useState<{x:number,y:number,id:number}[]>([]);
  let nextId = 0;
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = ++nextId;
    setRipples(r => [...r, {x:e.clientX-rect.left, y:e.clientY-rect.top, id}]);
    setTimeout(() => setRipples(r => r.filter(rip=>rip.id!==id)), 600);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="relative overflow-hidden bg-blue-600 text-white rounded-2xl px-8 py-4 cursor-pointer font-bold text-lg select-none" onClick={handleClick}>
        클릭해보세요!
        {ripples.map(r => (
          <div key={r.id} className="absolute rounded-full bg-white/30 animate-ping" style={{left:r.x-20,top:r.y-20,width:40,height:40,animationDuration:'0.6s',animationIterationCount:1}} />
        ))}
      </div>
    </div>
  );
};

// ===== MOTION-12/13/14 =====
export const SkeletonToContentPreview: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-4">
        {loaded ? (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
              <div><p className="text-white font-bold">홍길동</p><p className="text-gray-500 text-xs">디자이너</p></div>
            </div>
            <p className="text-gray-400 text-sm">Vibe UI Kit을 사용한 지 6개월이 됐습니다. 정말 유용한 도구입니다!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 bg-gray-800 rounded-full animate-pulse w-3/4" />
                <div className="h-2 bg-gray-800 rounded-full animate-pulse w-1/2" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-2.5 bg-gray-800 rounded-full animate-pulse" />
              <div className="h-2.5 bg-gray-800 rounded-full animate-pulse w-5/6" />
              <div className="h-2.5 bg-gray-800 rounded-full animate-pulse w-4/6" />
            </div>
          </div>
        )}
      </div>
      <button onClick={() => { setLoaded(false); setTimeout(() => setLoaded(true), 1500); }} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold">{loaded ? '다시 로드' : '콘텐츠 로드'}</button>
    </div>
  );
};

export const PageTransitionPreview: React.FC = () => {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const pages = ['홈 페이지','상품 목록','상세 페이지'];
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-950 min-h-[380px]">
      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-2xl p-6 min-h-[180px] flex items-center justify-center overflow-hidden relative">
        <div key={page} className="text-center" style={{animation: `slideIn${dir>0?'Right':'Left'} 0.3s ease`}}>
          <p className="text-gray-500 text-xs mb-2">페이지 {page+1} / {pages.length}</p>
          <h3 className="text-white text-xl font-bold">{pages[page]}</h3>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => { setDir(-1); setPage(p => Math.max(0,p-1)); }} disabled={page===0} className="px-5 py-2.5 bg-slate-800 text-gray-300 rounded-xl font-bold disabled:opacity-30">← 이전</button>
        <button onClick={() => { setDir(1); setPage(p => Math.min(pages.length-1,p+1)); }} disabled={page===pages.length-1} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-30">다음 →</button>
      </div>
      <style>{`@keyframes slideInRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}@keyframes slideInLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
};

const { useState, useMemo } = React;

// Lucide Icons from CDN
const LayoutDashboard = (props) => <i data-lucide="layout-dashboard" {...props}></i>;
const ListChecks = (props) => <i data-lucide="list-checks" {...props}></i>;
const ClipboardList = (props) => <i data-lucide="clipboard-list" {...props}></i>;
const History = (props) => <i data-lucide="history" {...props}></i>;
const Search = (props) => <i data-lucide="search" {...props}></i>;
const X = (props) => <i data-lucide="x" {...props}></i>;
const Copy = (props) => <i data-lucide="copy" {...props}></i>;
const ExternalLink = (props) => <i data-lucide="external-link" {...props}></i>;
const Check = (props) => <i data-lucide="check" {...props}></i>;
const Plus = (props) => <i data-lucide="plus" {...props}></i>;
const AlertTriangle = (props) => <i data-lucide="alert-triangle" {...props}></i>;
const Wifi = (props) => <i data-lucide="wifi" {...props}></i>;
const Clock = (props) => <i data-lucide="clock" {...props}></i>;
const ArrowRight = (props) => <i data-lucide="arrow-right" {...props}></i>;
const RotateCcw = (props) => <i data-lucide="rotate-ccw" {...props}></i>;

const MOCK_MOGS = [
  { id: 'mog-001', name: 'Active Dry Yeast', type: 'Elementary', generic: 'Yeast', site: 'Mumbai MUM-PR-07', queue: 'amber', currentAPLs: 12, status: 'Unmapped', reasoning: 'Semantic match on characteristic and prior-cycle brand consistency. Multiple candidates qualify. Confirm default before mapping.' },
  { id: 'mog-002', name: 'Nutritional Yeast', type: 'Elementary', generic: 'Yeast', site: 'Bengaluru BEN-KA-02', queue: 'amber', currentAPLs: 4, status: 'Unmapped', reasoning: 'Brand continuity suggests HealthPro but pack size variance detected.' },
  { id: 'mog-003', name: 'Instant Yeast', type: 'Elementary', generic: 'Yeast', site: 'Delhi DEL-NCR-03', queue: 'amber', currentAPLs: 6, status: 'Unmapped', reasoning: 'Multiple brand candidates. Pack size consistent across top matches.' },
  { id: 'mog-004', name: "Brewer's Yeast", type: 'Elementary', generic: 'Yeast', site: 'Pune PUN-MH-08', queue: 'amber', currentAPLs: 3, status: 'Unmapped', reasoning: 'Limited candidates. One strong match identified.' },
  { id: 'mog-005', name: 'Coriander Powder', type: 'Elementary', generic: 'Spices', site: 'Chennai CHN-TN-04', queue: 'amber', currentAPLs: 5, status: 'Unmapped', reasoning: 'Prior cycle brand MDH has multiple pack variants available.' },
  { id: 'mog-006', name: 'Garam Masala Powder', type: 'Composite', generic: 'Spices', site: 'Mumbai MUM-PR-07', queue: 'amber', currentAPLs: 7, status: 'Unmapped', reasoning: 'Composite MOG. Everest and MDH both qualify on semantic match.' },
  { id: 'mog-007', name: 'Iodized Salt', type: 'Elementary', generic: 'Salt', site: 'Mumbai MUM-PR-07', queue: 'green', currentAPLs: 2, status: 'Unmapped', reasoning: 'Unambiguous match. Tata Salt 1kg pack matches all criteria including prior cycle default.' },
  { id: 'mog-008', name: 'Granular Sugar', type: 'Elementary', generic: 'Sugar', site: 'Mumbai MUM-PR-07', queue: 'green', currentAPLs: 1, status: 'Unmapped', reasoning: 'Single exact match. Tata Sugar 1kg pack, brand and pack size verified.' },
  { id: 'mog-009', name: 'Turmeric Whole', type: 'Elementary', generic: 'Spices', site: 'Delhi DEL-NCR-03', queue: 'green', currentAPLs: 1, status: 'Unmapped', reasoning: 'Clean match on all attributes. Prior cycle supplier unchanged.' },
  { id: 'mog-010', name: 'Pav Bhaji Masala Special Blend', type: 'Composite', generic: 'Spices', site: 'Delhi DEL-NCR-03', queue: 'red', currentAPLs: 0, status: 'Unmapped', reasoning: 'No credible APL match found. The closest candidate failed both generic name and characteristic checks. Investigation required.' },
  { id: 'mog-011', name: 'Regional Pickle Mix', type: 'Composite', generic: 'Condiments', site: 'Kolkata KOL-WB-21', queue: 'red', currentAPLs: 0, status: 'Unmapped', reasoning: 'No matching APL exists in ODS. Possible MAM Exception Type A.' },
  { id: 'mog-012', name: 'Artisan Gluten Free Flour', type: 'Elementary', generic: 'Flour', site: 'Bangalore BLR-KA-03', queue: 'red', currentAPLs: 0, status: 'Unmapped', reasoning: 'No candidates meet minimum match threshold. All failed characteristic check.' },
  { id: 'mog-013', name: 'Mustard Oil Cold Pressed', type: 'Elementary', generic: 'Oil', site: 'Mumbai MUM-PR-07', queue: 'blue', currentAPLs: 1, status: 'Mapped', reasoning: 'Currently linked APL Fortune ₹140 has been retired in SAP. Transition planning required.', retiredAPL: 'Fortune ₹140' },
  { id: 'mog-014', name: 'Whole Wheat Flour', type: 'Elementary', generic: 'Flour', site: 'Mumbai MUM-PR-07', queue: 'blue', currentAPLs: 1, status: 'Mapped', reasoning: 'Aashirvaad ₹48 retired. Replacement candidate identified.', retiredAPL: 'Aashirvaad ₹48' },
  { id: 'mog-015', name: 'Amul Butter', type: 'Elementary', generic: 'Dairy', site: 'Mumbai MUM-PR-07', queue: 'blue', currentAPLs: 1, status: 'Mapped', reasoning: 'APL retired in latest sync. No replacement identified yet.', retiredAPL: 'Amul ₹60' },
];

const AMBER_CANDIDATES = {
  'mog-001': [
    { id: 'apl-1', name: 'Herbal Essence Co.', article: '458921', pack: '500g', cost: 150, topPick: true, chips: [{ label: 'Brand match', type: 'positive' }, { label: 'Pack size match', type: 'positive' }, { label: 'Semantic fit', type: 'positive' }, { label: 'Prior cycle brand', type: 'positive' }] },
    { id: 'apl-2', name: 'Global Spice Traders', article: '302847', pack: '1kg', cost: 84, lowerCost: true, chips: [{ label: 'Semantic fit', type: 'positive' }, { label: 'Lower cost', type: 'positive' }, { label: 'Different pack size', type: 'attention' }] },
    { id: 'apl-3', name: "Fleischmann's Yeast", article: '201456', pack: '500g', cost: 165, chips: [{ label: 'Semantic fit', type: 'neutral' }, { label: 'Pack size match', type: 'neutral' }, { label: 'New brand', type: 'attention' }] },
    { id: 'apl-4', name: 'Red Star Active Dry', article: '308921', pack: '250g', cost: 95, chips: [{ label: 'Semantic fit', type: 'neutral' }, { label: 'Smaller pack', type: 'attention' }] },
    { id: 'apl-5', name: 'SAF Instant Yeast', article: '445128', pack: '500g', cost: 180, chips: [{ label: 'Different variant', type: 'attention' }] },
    { id: 'apl-6', name: 'Lallemand Instant', article: '551203', pack: '500g', cost: 175, chips: [{ label: 'Similar variant', type: 'neutral' }] },
    { id: 'apl-7', name: 'Anchor Dry Yeast', article: '229014', pack: '1kg', cost: 310, chips: [{ label: 'Semantic fit', type: 'neutral' }, { label: 'Larger pack', type: 'neutral' }] },
  ],
};

const GREEN_CANDIDATES = {
  'mog-007': [{ id: 'apl-g1', name: 'Tata Salt', article: '100234', pack: '1kg', cost: 22, topPick: true, chips: [{ label: 'Exact match', type: 'positive' }, { label: 'Prior cycle default', type: 'positive' }] }],
  'mog-008': [{ id: 'apl-g2', name: 'Tata Sugar', article: '100567', pack: '1kg', cost: 44, topPick: true, chips: [{ label: 'Exact match', type: 'positive' }, { label: 'Brand verified', type: 'positive' }] }],
  'mog-009': [{ id: 'apl-g3', name: 'MDH Turmeric Whole', article: '108321', pack: '500g', cost: 185, topPick: true, chips: [{ label: 'Exact match', type: 'positive' }, { label: 'Supplier unchanged', type: 'positive' }] }],
};

const BLUE_REPLACEMENTS = {
  'mog-013': [
    { id: 'apl-b1', name: "Nature's Bliss", article: '402311', pack: '1L', cost: 180, topPick: true, chips: [{ label: 'Cold pressed', type: 'positive' }, { label: 'Pack match', type: 'positive' }] },
    { id: 'apl-b2', name: 'Aroma Roots', article: '402412', pack: '1L', cost: 220, chips: [{ label: 'Cold pressed', type: 'positive' }, { label: 'Higher cost', type: 'attention' }] },
    { id: 'apl-b3', name: 'Pure Leaf Essentials', article: '402555', pack: '500ml', cost: 175, chips: [{ label: 'Smaller pack', type: 'attention' }] },
  ],
  'mog-014': [
    { id: 'apl-b4', name: 'Ashirwad Select', article: '503211', pack: '10kg', cost: 52, topPick: true, chips: [{ label: 'Closest brand', type: 'positive' }, { label: 'Pack match', type: 'positive' }] },
    { id: 'apl-b5', name: 'Pillsbury Chakki Fresh', article: '503344', pack: '10kg', cost: 58, chips: [{ label: 'Pack match', type: 'positive' }, { label: 'Different brand', type: 'attention' }] },
  ],
  'mog-015': [],
};

const QueueTag = ({ queue, children, size = 'sm' }) => {
  const styles = {
    green: { bg: '#EAF3DE', text: '#173404' },
    amber: { bg: '#FAEEDA', text: '#412402' },
    red: { bg: '#FCEBEB', text: '#501313' },
    blue: { bg: '#E6F1FB', text: '#042C53' },
    neutral: { bg: '#F1EFE8', text: '#2C2C2A' },
  };
  const s = styles[queue] || styles.neutral;
  return (
    <span style={{ fontSize: size === 'xs' ? '10px' : '11px', padding: size === 'xs' ? '2px 6px' : '3px 8px', background: s.bg, color: s.text, borderRadius: '4px', letterSpacing: '0.4px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {children}
    </span>
  );
};

const Chip = ({ type, children }) => {
  const colors = {
    positive: { bg: 'rgba(59,109,17,0.12)', text: '#173404' },
    attention: { bg: 'rgba(186,117,23,0.18)', text: '#633806' },
    neutral: { bg: '#F1EFE8', text: '#5F5E5A' },
  };
  const c = colors[type] || colors.neutral;
  return <span style={{ fontSize: '11px', padding: '2px 7px', background: c.bg, color: c.text, borderRadius: '3px', whiteSpace: 'nowrap' }}>{children}</span>;
};

const Button = ({ variant = 'secondary', size = 'md', children, onClick, disabled }) => {
  const baseStyle = { border: 'none', borderRadius: '6px', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontWeight: 500, opacity: disabled ? 0.5 : 1, display: 'inline-flex', alignItems: 'center', gap: '6px' };
  const variants = {
    primary: { background: '#2C2C2A', color: '#FFFFFF' },
    secondary: { background: '#FFFFFF', color: '#2C2C2A', border: '0.5px solid #D3D1C7' },
    ghost: { background: 'transparent', color: '#5F5E5A' },
    danger: { background: '#FFFFFF', color: '#A32D2D', border: '0.5px solid #F09595' },
  };
  const sizes = { sm: { fontSize: '11px', padding: '5px 10px' }, md: { fontSize: '12px', padding: '7px 12px' }, lg: { fontSize: '13px', padding: '9px 16px' } };
  return <button onClick={onClick} disabled={disabled} style={{ ...baseStyle, ...variants[variant], ...sizes[size] }}>{children}</button>;
};

const NavSidebar = ({ active, onNavigate, myTasksCount }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'queue', label: 'Queue List', icon: ListChecks },
    { id: 'tasks', label: 'My Tasks', icon: ClipboardList, badge: myTasksCount },
    { id: 'history', label: 'History', icon: History },
  ];
  return (
    <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '14px 10px', height: 'fit-content' }}>
      <div style={{ marginBottom: '20px', paddingLeft: '6px' }}>
        <p style={{ fontSize: '11px', color: '#888780', margin: '0 0 3px', letterSpacing: '0.4px', fontWeight: 500 }}>CMP AUTOBOT</p>
        <p style={{ fontSize: '12px', color: '#5F5E5A', margin: 0 }}>MOG–APL Mapper v1</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {items.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <div key={item.id} onClick={() => onNavigate(item.id)} style={{ padding: '8px 10px', fontSize: '13px', background: isActive ? '#F1EFE8' : 'transparent', borderRadius: '6px', fontWeight: isActive ? 500 : 400, color: isActive ? '#2C2C2A' : '#5F5E5A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={14} />
                {item.label}
              </span>
              {item.badge > 0 && <span style={{ fontSize: '11px', color: '#378ADD', fontWeight: 500 }}>{item.badge}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#639922', paddingLeft: '6px' }}>
        <Wifi size={12} />
        ODS Connected
      </div>
    </div>
  );
};

const QueueList = ({ mogs, activeTab, onTabChange, selectedMogId, onSelectMog, taskDraftState }) => {
  const counts = {
    amber: mogs.filter(m => m.queue === 'amber').length,
    green: mogs.filter(m => m.queue === 'green').length,
    red: mogs.filter(m => m.queue === 'red').length,
    blue: mogs.filter(m => m.queue === 'blue').length,
  };
  const tabs = [{ id: 'amber', label: 'Amber' }, { id: 'green', label: 'Green' }, { id: 'red', label: 'Red' }, { id: 'blue', label: 'Blue' }];
  const filtered = mogs.filter(m => m.queue === activeTab);
  return (
    <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '12px 10px', height: 'fit-content' }}>
      <p style={{ fontSize: '13px', fontWeight: 500, margin: '0 0 10px', color: '#2C2C2A' }}>Queue List</p>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => onTabChange(t.id)} style={{ cursor: 'pointer', padding: '5px 8px', background: activeTab === t.id ? (t.id === 'amber' ? '#FAEEDA' : t.id === 'green' ? '#EAF3DE' : t.id === 'red' ? '#FCEBEB' : '#E6F1FB') : 'transparent', borderRadius: '10px', fontSize: '11px', fontWeight: 500, color: activeTab === t.id ? (t.id === 'amber' ? '#412402' : t.id === 'green' ? '#173404' : t.id === 'red' ? '#501313' : '#042C53') : '#5F5E5A' }}>
            {t.label} {counts[t.id]}
          </div>
        ))}
      </div>
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <Search size={12} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#888780' }} />
        <input placeholder="Search MOG..." style={{ width: '100%', fontSize: '11px', padding: '6px 8px 6px 26px', boxSizing: 'border-box', border: '0.5px solid #D3D1C7', borderRadius: '4px', outline: 'none', fontFamily: 'inherit' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '600px', overflowY: 'auto' }}>
        {filtered.map(mog => {
          const isSelected = selectedMogId === mog.id;
          const tabColor = activeTab === 'amber' ? '#EF9F27' : activeTab === 'green' ? '#639922' : activeTab === 'red' ? '#E24B4A' : '#378ADD';
          const tabBg = activeTab === 'amber' ? '#FAEEDA' : activeTab === 'green' ? '#EAF3DE' : activeTab === 'red' ? '#FCEBEB' : '#E6F1FB';
          const draftSelections = taskDraftState[mog.id];
          return (
            <div key={mog.id} onClick={() => onSelectMog(mog.id)} style={{ padding: '9px 10px', borderLeft: `2px solid ${isSelected ? tabColor : 'transparent'}`, background: isSelected ? tabBg : 'transparent', borderRadius: '0 4px 4px 0', marginBottom: '2px', cursor: 'pointer' }}>
              <p style={{ fontSize: '12px', fontWeight: 500, margin: '0 0 2px', color: '#2C2C2A' }}>{mog.name}</p>
              <p style={{ fontSize: '10px', color: '#888780', margin: '0 0 3px' }}>{mog.site}</p>
              {mog.queue === 'amber' && <p style={{ fontSize: '10px', color: '#888780', margin: 0 }}>{(AMBER_CANDIDATES[mog.id] || []).length} candidates{draftSelections ? ` · ${Object.values(draftSelections).filter(s => s === 'selected').length} selected` : ''}</p>}
              {mog.queue === 'green' && <p style={{ fontSize: '10px', color: '#888780', margin: 0 }}>Auto-matched</p>}
              {mog.queue === 'red' && <p style={{ fontSize: '10px', color: '#888780', margin: 0 }}>Investigation required</p>}
              {mog.queue === 'blue' && <p style={{ fontSize: '10px', color: '#888780', margin: 0 }}>{mog.retiredAPL} retired</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AmberDetail = ({ mog, onConfirm, onFlagException, onSendToRed, draftSelections, onDraftChange }) => {
  const candidates = AMBER_CANDIDATES[mog.id] || AMBER_CANDIDATES['mog-001'];
  const [localState, setLocalState] = useState(() => {
    if (draftSelections) return draftSelections;
    return candidates.reduce((acc, c) => { acc[c.id] = c.topPick ? 'selected' : 'undecided'; return acc; }, {});
  });
  const [defaultAPL, setDefaultAPL] = useState(() => candidates.find(c => c.topPick)?.id || candidates[0]?.id);

  const updateState = (aplId, newState) => {
    const updated = { ...localState, [aplId]: newState };
    setLocalState(updated);
    onDraftChange(updated);
  };

  const selectedCount = Object.values(localState).filter(s => s === 'selected').length;
  const dismissedCount = Object.values(localState).filter(s => s === 'dismissed').length;
  const undecidedCount = candidates.length - selectedCount - dismissedCount;
  const selectedAPLs = candidates.filter(c => localState[c.id] === 'selected');
  const defaultCandidate = candidates.find(c => c.id === defaultAPL);

  return (
    <div>
      <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '16px 18px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <p style={{ fontSize: '18px', fontWeight: 500, margin: 0, color: '#2C2C2A' }}>{mog.name}</p>
              <QueueTag queue="amber" size="xs">UNMAPPED</QueueTag>
            </div>
            <p style={{ fontSize: '12px', color: '#5F5E5A', margin: 0 }}>{mog.type} MOG · {mog.generic} · {mog.site}</p>
          </div>
          <Button variant="ghost" size="sm"><History size={12} /> History</Button>
        </div>
        <div style={{ marginTop: '12px', padding: '10px 12px', background: '#F1EFE8', borderRadius: '6px' }}>
          <p style={{ fontSize: '10px', color: '#888780', margin: '0 0 4px', letterSpacing: '0.4px', fontWeight: 500 }}>AUTOBOT REASONING · 04:12 IST · 16 APR</p>
          <p style={{ fontSize: '12px', color: '#5F5E5A', margin: 0, lineHeight: 1.5 }}>{mog.reasoning}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', borderBottom: '0.5px solid rgba(0,0,0,0.08)', marginBottom: '10px' }}>
        <div style={{ padding: '8px 2px', borderBottom: '2px solid #2C2C2A', fontSize: '12px', fontWeight: 500 }}>Likely matches ({candidates.length})</div>
        <div style={{ padding: '8px 2px', fontSize: '12px', color: '#888780', cursor: 'pointer' }}>Current APLs ({mog.currentAPLs})</div>
      </div>

      <p style={{ fontSize: '10px', color: '#888780', margin: '0 0 8px', letterSpacing: '0.3px', fontWeight: 500 }}>SELECT ONE OR MORE · PICK A DEFAULT</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {candidates.map(c => {
          const state = localState[c.id];
          const isSelected = state === 'selected';
          const isDismissed = state === 'dismissed';
          const isDefault = isSelected && defaultAPL === c.id;
          return (
            <div key={c.id} style={{ background: isSelected ? '#EAF3DE' : '#FFFFFF', border: isSelected ? '0.5px solid #639922' : '0.5px solid rgba(0,0,0,0.08)', borderRadius: '6px', padding: '12px 14px', opacity: isDismissed ? 0.5 : 1 }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <input type="checkbox" checked={isSelected} onChange={e => updateState(c.id, e.target.checked ? 'selected' : 'undecided')} style={{ width: '15px', height: '15px', marginTop: '2px', accentColor: '#3B6D11', cursor: 'pointer' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: isSelected ? '#173404' : isDismissed ? '#888780' : '#2C2C2A', textDecoration: isDismissed ? 'line-through' : 'none' }}>{c.name}</p>
                    {c.topPick && !isDismissed && <span style={{ fontSize: '9px', padding: '2px 6px', background: '#3B6D11', color: 'white', borderRadius: '3px', letterSpacing: '0.4px', fontWeight: 500 }}>TOP PICK</span>}
                    {isDefault && <span style={{ fontSize: '9px', padding: '2px 6px', background: '#2C2C2A', color: 'white', borderRadius: '3px', letterSpacing: '0.4px', fontWeight: 500 }}>DEFAULT</span>}
                    {isSelected && !isDefault && <button onClick={() => setDefaultAPL(c.id)} style={{ fontSize: '9px', padding: '2px 7px', background: 'transparent', color: '#3B6D11', border: '0.5px solid #3B6D11', borderRadius: '3px', cursor: 'pointer', letterSpacing: '0.4px', fontWeight: 500 }}>MAKE DEFAULT</button>}
                    {isDismissed && <button onClick={() => updateState(c.id, 'undecided')} style={{ fontSize: '10px', background: 'transparent', border: 'none', color: '#378ADD', cursor: 'pointer', padding: 0 }}>Undo</button>}
                  </div>
                  <p style={{ fontSize: '12px', color: isSelected ? '#27500A' : '#5F5E5A', margin: '0 0 6px' }}>
                    Article {c.article} · {c.pack} pack · <span style={{ fontWeight: 500 }}>₹{c.cost}.00</span>
                    {c.lowerCost && !isDismissed && <span style={{ color: '#639922' }}> · lower cost</span>}
                  </p>
                  {!isDismissed && (
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {c.chips.map((chip, i) => <Chip key={i} type={chip.type}>{chip.label}</Chip>)}
                      {!isSelected && <button onClick={() => updateState(c.id, 'dismissed')} style={{ fontSize: '10px', background: 'transparent', border: 'none', color: '#888780', cursor: 'pointer', padding: '2px 6px', marginLeft: 'auto' }}>Dismiss</button>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '6px', padding: '12px 14px', marginTop: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <p style={{ fontSize: '12px', fontWeight: 500, margin: 0, color: '#2C2C2A' }}>Your selection</p>
          <button style={{ fontSize: '11px', background: 'transparent', border: 'none', color: '#378ADD', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Plus size={11} /> Add APL manually</button>
        </div>
        <div style={{ fontSize: '12px', color: '#5F5E5A', display: 'flex', justifyContent: 'space-between' }}>
          <span>{selectedCount} APLs selected · {dismissedCount} dismissed · {undecidedCount} undecided</span>
          {selectedCount > 0 && <span style={{ color: '#2C2C2A', fontWeight: 500 }}>Default: {defaultCandidate?.name || '—'}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', gap: '8px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <Button variant="secondary" size="sm">Skip for now</Button>
          <Button variant="secondary" size="sm" onClick={onSendToRed}>Send to Red</Button>
          <Button variant="secondary" size="sm" onClick={onFlagException}>Flag MAM Exception</Button>
        </div>
        <Button variant="primary" size="lg" disabled={selectedCount === 0} onClick={() => onConfirm(selectedAPLs, defaultCandidate)}>
          Confirm selection → My Tasks ({selectedCount})
        </Button>
      </div>
    </div>
  );
};

const GreenDetail = ({ mog, onConfirm, onReject }) => {
  const candidates = GREEN_CANDIDATES[mog.id] || [];
  const defaultCandidate = candidates[0];
  return (
    <div>
      <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '16px 18px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <p style={{ fontSize: '18px', fontWeight: 500, margin: 0, color: '#2C2C2A' }}>{mog.name}</p>
              <QueueTag queue="green" size="xs">READY TO MAP</QueueTag>
            </div>
            <p style={{ fontSize: '12px', color: '#5F5E5A', margin: 0 }}>{mog.type} MOG · {mog.generic} · {mog.site}</p>
          </div>
          <Button variant="ghost" size="sm"><History size={12} /> History</Button>
        </div>
        <div style={{ marginTop: '12px', padding: '10px 12px', background: '#EAF3DE', borderRadius: '6px' }}>
          <p style={{ fontSize: '10px', color: '#3B6D11', margin: '0 0 4px', letterSpacing: '0.4px', fontWeight: 500 }}>✓ AUTOBOT MATCHED · 04:12 IST · 16 APR</p>
          <p style={{ fontSize: '12px', color: '#173404', margin: 0, lineHeight: 1.5 }}>{mog.reasoning}</p>
        </div>
      </div>

      <p style={{ fontSize: '10px', color: '#888780', margin: '0 0 8px', letterSpacing: '0.3px', fontWeight: 500 }}>AUTOBOT'S RECOMMENDATION</p>

      {candidates.map(c => (
        <div key={c.id} style={{ background: '#EAF3DE', border: '0.5px solid #639922', borderRadius: '6px', padding: '14px 16px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <p style={{ fontSize: '15px', fontWeight: 500, margin: 0, color: '#173404' }}>{c.name}</p>
            <span style={{ fontSize: '9px', padding: '2px 6px', background: '#2C2C2A', color: 'white', borderRadius: '3px', letterSpacing: '0.4px', fontWeight: 500 }}>DEFAULT</span>
          </div>
          <p style={{ fontSize: '12px', color: '#27500A', margin: '0 0 8px' }}>Article {c.article} · {c.pack} pack · <span style={{ fontWeight: 500 }}>₹{c.cost}.00</span></p>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {c.chips.map((chip, i) => <Chip key={i} type={chip.type}>{chip.label}</Chip>)}
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="danger" size="sm" onClick={onReject}><RotateCcw size={12} /> Reject match</Button>
        <Button variant="primary" size="lg" onClick={() => onConfirm([defaultCandidate], defaultCandidate)}>
          Confirm → My Tasks (1)
        </Button>
      </div>
    </div>
  );
};

const RedDetail = ({ mog, onEscalate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div>
      <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '16px 18px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <p style={{ fontSize: '18px', fontWeight: 500, margin: 0, color: '#2C2C2A' }}>{mog.name}</p>
              <QueueTag queue="red" size="xs">NO MATCH</QueueTag>
            </div>
            <p style={{ fontSize: '12px', color: '#5F5E5A', margin: 0 }}>{mog.type} MOG · {mog.generic} · {mog.site}</p>
          </div>
          <Button variant="ghost" size="sm"><History size={12} /> History</Button>
        </div>
        <div style={{ marginTop: '12px', padding: '10px 12px', background: '#FCEBEB', borderRadius: '6px' }}>
          <p style={{ fontSize: '10px', color: '#A32D2D', margin: '0 0 4px', letterSpacing: '0.4px', fontWeight: 500 }}>⚠ NO CREDIBLE MATCH · 04:12 IST · 16 APR</p>
          <p style={{ fontSize: '12px', color: '#501313', margin: 0, lineHeight: 1.5 }}>{mog.reasoning}</p>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '16px 18px', marginBottom: '12px' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, margin: '0 0 4px', color: '#2C2C2A' }}>Search & add APL manually</p>
        <p style={{ fontSize: '11px', color: '#888780', margin: '0 0 12px' }}>Search the APL catalog if you know which APL should be linked.</p>
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888780' }} />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name, article number, or brand..." style={{ width: '100%', fontSize: '12px', padding: '8px 10px 8px 32px', boxSizing: 'border-box', border: '0.5px solid #D3D1C7', borderRadius: '6px', outline: 'none', fontFamily: 'inherit' }} />
        </div>
        <p style={{ fontSize: '11px', color: '#888780', margin: 0, fontStyle: 'italic' }}>Adding manually will move this MOG to Green queue and stage it in My Tasks.</p>
      </div>

      <div style={{ background: '#FFFFFF', border: '0.5px solid #F09595', borderRadius: '8px', padding: '16px 18px' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, margin: '0 0 4px', color: '#2C2C2A' }}>No suitable APL exists?</p>
        <p style={{ fontSize: '11px', color: '#888780', margin: '0 0 12px' }}>Escalate as MAM Exception if the procurement team isn't buying this ingredient.</p>
        <div style={{ background: '#FCEBEB', borderRadius: '6px', padding: '12px', marginBottom: '12px' }}>
          <p style={{ fontSize: '11px', color: '#501313', margin: '0 0 3px', fontWeight: 500 }}>MAM Exception · Type A</p>
          <p style={{ fontSize: '11px', color: '#791F1F', margin: 0, lineHeight: 1.5 }}>MOG exists in CookBook but no corresponding APL in SAP/ODS. Flags to Procurement for investigation.</p>
        </div>
        <Button variant="danger" size="md" onClick={onEscalate}><AlertTriangle size={12} /> Escalate to MAM Exception Type A</Button>
      </div>
    </div>
  );
};

const BlueDetail = ({ mog, onReplace, onPlanTransition }) => {
  const replacements = BLUE_REPLACEMENTS[mog.id] || [];
  const [selectedReplacement, setSelectedReplacement] = useState(replacements.find(r => r.topPick)?.id || null);

  return (
    <div>
      <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '16px 18px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <p style={{ fontSize: '18px', fontWeight: 500, margin: 0, color: '#2C2C2A' }}>{mog.name}</p>
              <QueueTag queue="blue" size="xs">TRANSITION REQUIRED</QueueTag>
            </div>
            <p style={{ fontSize: '12px', color: '#5F5E5A', margin: 0 }}>{mog.type} MOG · {mog.generic} · {mog.site}</p>
          </div>
          <Button variant="ghost" size="sm"><History size={12} /> History</Button>
        </div>
        <div style={{ marginTop: '12px', padding: '10px 12px', background: '#E6F1FB', borderRadius: '6px' }}>
          <p style={{ fontSize: '10px', color: '#0C447C', margin: '0 0 4px', letterSpacing: '0.4px', fontWeight: 500 }}>⚠ APL RETIRED IN SAP · 04:12 IST · 16 APR</p>
          <p style={{ fontSize: '12px', color: '#042C53', margin: 0, lineHeight: 1.5 }}>Current APL <span style={{ fontWeight: 500 }}>{mog.retiredAPL}</span> is no longer available. Existing mapping is preserved. Plan transition before stock exhaustion.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
        <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '6px', padding: '14px' }}>
          <p style={{ fontSize: '11px', color: '#888780', margin: '0 0 6px', letterSpacing: '0.3px', fontWeight: 500 }}>CURRENT APL · RETIRED</p>
          <p style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 4px', color: '#2C2C2A', textDecoration: 'line-through' }}>{mog.retiredAPL}</p>
          <p style={{ fontSize: '11px', color: '#5F5E5A', margin: 0, lineHeight: 1.5 }}>Still physically available. Recipe costing continues against this APL until replacement.</p>
        </div>
        <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '6px', padding: '14px' }}>
          <p style={{ fontSize: '11px', color: '#888780', margin: '0 0 6px', letterSpacing: '0.3px', fontWeight: 500 }}>REPLACEMENT</p>
          <p style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 4px', color: selectedReplacement ? '#2C2C2A' : '#888780' }}>
            {selectedReplacement ? replacements.find(r => r.id === selectedReplacement)?.name : 'None selected'}
          </p>
          <p style={{ fontSize: '11px', color: '#5F5E5A', margin: 0, lineHeight: 1.5 }}>Select below to prepare atomic swap.</p>
        </div>
      </div>

      {replacements.length > 0 ? (
        <>
          <p style={{ fontSize: '10px', color: '#888780', margin: '0 0 8px', letterSpacing: '0.3px', fontWeight: 500 }}>SUGGESTED REPLACEMENTS</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            {replacements.map(r => {
              const isSelected = selectedReplacement === r.id;
              return (
                <div key={r.id} onClick={() => setSelectedReplacement(r.id)} style={{ background: isSelected ? '#E6F1FB' : '#FFFFFF', border: isSelected ? '0.5px solid #378ADD' : '0.5px solid rgba(0,0,0,0.08)', borderRadius: '6px', padding: '12px 14px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <input type="radio" checked={isSelected} onChange={() => setSelectedReplacement(r.id)} style={{ width: '15px', height: '15px', marginTop: '2px', accentColor: '#185FA5' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                        <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: isSelected ? '#042C53' : '#2C2C2A' }}>{r.name}</p>
                        {r.topPick && <span style={{ fontSize: '9px', padding: '2px 6px', background: '#185FA5', color: 'white', borderRadius: '3px', letterSpacing: '0.4px', fontWeight: 500 }}>TOP PICK</span>}
                      </div>
                      <p style={{ fontSize: '12px', color: isSelected ? '#0C447C' : '#5F5E5A', margin: '0 0 6px' }}>{r.pack} pack · <span style={{ fontWeight: 500 }}>₹{r.cost}.00</span></p>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {r.chips.map((chip, i) => <Chip key={i} type={chip.type}>{chip.label}</Chip>)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ background: '#FCEBEB', border: '0.5px solid #F09595', borderRadius: '6px', padding: '14px', marginBottom: '14px' }}>
          <p style={{ fontSize: '12px', color: '#501313', margin: 0, lineHeight: 1.5 }}>No replacement APL identified. Transition cannot proceed until procurement adds a new APL. Plan transition for now.</p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="secondary" size="md" onClick={onPlanTransition}><Clock size={12} /> Plan transition (keep current APL)</Button>
        <Button variant="primary" size="lg" disabled={!selectedReplacement} onClick={() => onReplace(replacements.find(r => r.id === selectedReplacement))}>
          Replace now → My Tasks
        </Button>
      </div>
    </div>
  );
};

const HandoffModal = ({ task, onClose, onComplete }) => {
  const [completed, setCompleted] = useState(false);
  const [continueNext, setContinueNext] = useState(true);

  const packageText = useMemo(() => {
    const lines = [`MOG: ${task.mogName}`, `Site: ${task.site}`];
    if (task.action === 'link') {
      task.apls.forEach((apl, i) => {
        lines.push(`APL ${i + 1}: ${apl.article || '—'} · ${apl.name}${apl.id === task.defaultId ? ' [DEFAULT]' : ''}`);
      });
    } else if (task.action === 'replace') {
      lines.push(`Delink: ${task.retiredAPL}`);
      lines.push(`Link: ${task.apls[0].name} [DEFAULT]`);
    }
    return lines.join('\n');
  }, [task]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
      <div style={{ background: '#FFFFFF', borderRadius: '12px', maxWidth: '540px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px', borderBottom: '0.5px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '11px', color: '#888780', margin: '0 0 4px', letterSpacing: '0.3px' }}>STEP 2 OF 3 · REVIEW & SUBMIT</p>
            <p style={{ fontSize: '17px', fontWeight: 500, margin: 0, color: '#2C2C2A' }}>Ready to enter in CookBook</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#5F5E5A', cursor: 'pointer', padding: '4px', lineHeight: 1 }}><X size={18} /></button>
        </div>

        <div style={{ padding: '16px 20px', background: '#F1EFE8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <p style={{ fontSize: '15px', fontWeight: 500, margin: 0, color: '#2C2C2A' }}>{task.mogName}</p>
            <QueueTag queue={task.sourceQueue} size="xs">{task.sourceQueue.toUpperCase()} · {task.action === 'replace' ? 'REPLACE' : 'CONFIRMED'}</QueueTag>
          </div>
          <p style={{ fontSize: '12px', color: '#5F5E5A', margin: 0 }}>{task.site}</p>
        </div>

        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontSize: '11px', color: '#888780', margin: '0 0 10px', letterSpacing: '0.3px', fontWeight: 500 }}>APLS TO LINK ({task.apls.length})</p>
          <div style={{ border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
            {task.apls.map((apl, i) => {
              const isDefault = apl.id === task.defaultId;
              return (
                <div key={apl.id} style={{ padding: '10px 14px', background: isDefault ? '#EAF3DE' : '#FFFFFF', borderBottom: i < task.apls.length - 1 ? '0.5px solid rgba(0,0,0,0.08)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, margin: 0, color: isDefault ? '#173404' : '#2C2C2A' }}>{apl.name}</p>
                    {isDefault && <span style={{ fontSize: '9px', padding: '2px 6px', background: '#3B6D11', color: 'white', borderRadius: '3px', letterSpacing: '0.4px', fontWeight: 500 }}>DEFAULT</span>}
                  </div>
                  <p style={{ fontSize: '11px', color: isDefault ? '#27500A' : '#5F5E5A', margin: 0 }}>Article {apl.article} · {apl.pack} · ₹{apl.cost}.00</p>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ padding: '10px 14px', background: '#E6F1FB', borderRadius: '6px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '14px', color: '#0C447C', lineHeight: 1.4, flexShrink: 0 }}>ⓘ</span>
            <p style={{ fontSize: '11px', color: '#0C447C', margin: 0, lineHeight: 1.5 }}>V1: Autobot does not post to CookBook. Copy details below and enter them manually.</p>
          </div>
        </div>

        <div style={{ padding: '0 20px 16px' }}>
          <p style={{ fontSize: '11px', color: '#888780', margin: '0 0 8px', letterSpacing: '0.3px', fontWeight: 500 }}>COOKBOOK ENTRY PACKAGE</p>
          <div style={{ background: '#F1EFE8', borderRadius: '6px', padding: '12px 14px', fontFamily: 'ui-monospace, SF Mono, Menlo, monospace', fontSize: '11px', lineHeight: 1.8, color: '#2C2C2A', whiteSpace: 'pre-wrap' }}>
            {packageText}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <Button variant="secondary" size="md"><Copy size={12} /> Copy details</Button>
            <Button variant="secondary" size="md"><ExternalLink size={12} /> Open CookBook</Button>
          </div>
        </div>

        <div style={{ padding: '16px 20px', background: '#F1EFE8', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} style={{ width: '15px', height: '15px', marginTop: '2px', accentColor: '#2C2C2A' }} />
            <div>
              <p style={{ fontSize: '12px', fontWeight: 500, margin: '0 0 2px', color: '#2C2C2A' }}>I have entered this mapping in CookBook</p>
              <p style={{ fontSize: '11px', color: '#5F5E5A', margin: 0 }}>Confirming will mark MOG as mapped and update the dashboard.</p>
            </div>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', marginLeft: '25px', cursor: 'pointer', fontSize: '11px', color: '#5F5E5A' }}>
            <input type="checkbox" checked={continueNext} onChange={e => setContinueNext(e.target.checked)} style={{ width: '13px', height: '13px', accentColor: '#5F5E5A' }} />
            Continue to next task after this
          </label>
        </div>

        <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
          <Button variant="ghost" size="md" onClick={onClose}>Save draft & close</Button>
          <Button variant="primary" size="lg" disabled={!completed} onClick={() => onComplete(continueNext)}>
            Mark as mapped <ArrowRight size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const MyTasks = ({ tasks, onOpenTask }) => {
  const [filter, setFilter] = useState('all');
  const counts = {
    all: tasks.length,
    green: tasks.filter(t => t.sourceQueue === 'green').length,
    amber: tasks.filter(t => t.sourceQueue === 'amber').length,
    blue: tasks.filter(t => t.sourceQueue === 'blue').length,
    escalated: tasks.filter(t => t.type === 'escalation').length,
  };
  const filtered = filter === 'all' ? tasks : filter === 'escalated' ? tasks.filter(t => t.type === 'escalation') : tasks.filter(t => t.sourceQueue === filter);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
          <p style={{ fontSize: '20px', fontWeight: 500, margin: 0, color: '#2C2C2A' }}>My Tasks</p>
          <p style={{ fontSize: '11px', color: '#888780', margin: 0 }}>ODS synced 04:12 IST · 16 Apr</p>
        </div>
        <p style={{ fontSize: '12px', color: '#5F5E5A', margin: 0 }}>Mappings you've confirmed. Enter each in CookBook, then mark as done.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px' }}>
        {[
          { label: 'From Green', count: counts.green, color: '#639922' },
          { label: 'From Amber', count: counts.amber, color: '#EF9F27' },
          { label: 'From Blue', count: counts.blue, color: '#378ADD' },
          { label: 'Escalations', count: counts.escalated, color: '#E24B4A' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', padding: '10px 12px', borderRadius: '6px' }}>
            <p style={{ fontSize: '11px', color: '#888780', margin: '0 0 4px' }}>{s.label}</p>
            <p style={{ fontSize: '18px', fontWeight: 500, margin: 0, color: s.color }}>{s.count}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '8px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${counts.all})` },
            { id: 'green', label: `Green (${counts.green})` },
            { id: 'amber', label: `Amber (${counts.amber})` },
            { id: 'blue', label: `Blue (${counts.blue})` },
            { id: 'escalated', label: `Escalated (${counts.escalated})` },
          ].map(tab => (
            <button key={tab.id} onClick={() => setFilter(tab.id)} style={{ padding: '6px 10px', fontSize: '11px', background: filter === tab.id ? '#FFFFFF' : 'transparent', border: filter === tab.id ? '0.5px solid #2C2C2A' : '0.5px solid rgba(0,0,0,0.08)', borderRadius: '6px', cursor: 'pointer', fontWeight: filter === tab.id ? 500 : 400, color: filter === tab.id ? '#2C2C2A' : '#5F5E5A' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: '#FFFFFF', border: '0.5px dashed rgba(0,0,0,0.15)', borderRadius: '8px', padding: '40px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#888780', margin: '0 0 4px' }}>No tasks yet</p>
          <p style={{ fontSize: '11px', color: '#B4B2A9', margin: 0 }}>Confirm items from Queue List to see them here.</p>
        </div>
      ) : (
        <div style={{ background: '#FFFFFF', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
          {filtered.map((task, i) => {
            const borderColor = task.type === 'escalation' ? '#E24B4A' : task.sourceQueue === 'green' ? '#639922' : task.sourceQueue === 'amber' ? '#EF9F27' : '#378ADD';
            const isBlocked = task.type === 'escalation' || task.type === 'watch';
            return (
              <div key={task.id} style={{ padding: '12px 14px', borderLeft: `3px solid ${borderColor}`, borderBottom: i < filtered.length - 1 ? '0.5px solid rgba(0,0,0,0.08)' : 'none', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                    {task.type === 'escalation' ? (
                      <QueueTag queue="red" size="xs">MAM EXCEPTION · TYPE A</QueueTag>
                    ) : task.type === 'watch' ? (
                      <QueueTag queue="blue" size="xs">BLUE · WATCH</QueueTag>
                    ) : task.action === 'replace' ? (
                      <QueueTag queue="blue" size="xs">BLUE · REPLACE</QueueTag>
                    ) : (
                      <QueueTag queue={task.sourceQueue} size="xs">{task.sourceQueue.toUpperCase()}</QueueTag>
                    )}
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#2C2C2A' }}>{task.mogName}</p>
                    <span style={{ fontSize: '11px', color: '#888780' }}>· {task.site}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#5F5E5A', margin: '0 0 4px' }}>
                    {task.type === 'escalation' ? 'No credible APL — escalated to Procurement Team · Awaiting resolution' :
                     task.type === 'watch' ? `${task.retiredAPL} retired · Transition planned — waiting for stock exhaustion` :
                     task.action === 'replace' ? <>
                       <span style={{ textDecoration: 'line-through', color: '#888780' }}>{task.retiredAPL}</span> → Link <span style={{ color: '#2C2C2A', fontWeight: 500 }}>{task.apls[0].name}</span> · Atomic swap
                     </> : <>
                       Link <span style={{ color: '#2C2C2A', fontWeight: 500 }}>{task.apls.find(a => a.id === task.defaultId)?.name}</span> <span style={{ fontSize: '9px', padding: '1px 5px', background: '#2C2C2A', color: 'white', borderRadius: '3px' }}>DEFAULT</span>
                       {task.apls.length > 1 && <> + <span style={{ color: '#2C2C2A', fontWeight: 500 }}>{task.apls.length - 1} more</span></>}
                       · {task.sourceQueue === 'green' ? 'Autobot auto-matched' : 'You confirmed after review'}
                     </>}
                  </p>
                  <p style={{ fontSize: '10px', color: '#888780', margin: 0 }}>{task.timestamp}</p>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  {isBlocked ? (
                    <Button variant="secondary" size="sm">{task.type === 'escalation' ? 'View thread' : 'Replace now'}</Button>
                  ) : (
                    <>
                      <Button variant="secondary" size="sm"><Copy size={11} /> Copy</Button>
                      <Button variant="primary" size="sm" onClick={() => onOpenTask(task)}><Check size={11} /> Done</Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: '#2C2C2A', color: '#FFFFFF', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', zIndex: 200, display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Check size={14} style={{ color: '#97C459' }} />
      {message}
    </div>
  );
};

export default function App() {
  const [mogs, setMogs] = useState(MOCK_MOGS);
  const [activeView, setActiveView] = useState('queue');
  const [activeTab, setActiveTab] = useState('amber');
  const [selectedMogId, setSelectedMogId] = useState('mog-001');
  const [tasks, setTasks] = useState([
    { id: 't-001', mogId: 'mog-xyz', mogName: 'Whole Wheat Flour', site: 'Mumbai MUM-PR-07', sourceQueue: 'blue', type: 'watch', retiredAPL: 'Aashirvaad ₹48', timestamp: 'Planned 09:15 · No action needed until stock runs out' },
  ]);
  const [draftSelections, setDraftSelections] = useState({});
  const [handoffTask, setHandoffTask] = useState(null);
  const [toast, setToast] = useState(null);

  // Initialize Lucide Icons
  React.useEffect(() => {
    lucide.createIcons();
  }, []);

  const selectedMog = mogs.find(m => m.id === selectedMogId);
  const filteredMogs = mogs.filter(m => m.queue === activeTab);

  React.useEffect(() => {
    if (!selectedMog || selectedMog.queue !== activeTab) {
      const first = mogs.find(m => m.queue === activeTab);
      if (first) setSelectedMogId(first.id);
    }
  }, [activeTab, mogs, selectedMog]);

  const moveToNext = (currentId) => {
    const next = filteredMogs.find(m => m.id !== currentId);
    if (next) setSelectedMogId(next.id);
  };

  const handleConfirmMapping = (apls, defaultAPL) => {
    const newTask = {
      id: `t-${Date.now()}`,
      mogId: selectedMog.id,
      mogName: selectedMog.name,
      site: selectedMog.site,
      sourceQueue: selectedMog.queue,
      action: 'link',
      apls: apls,
      defaultId: defaultAPL.id,
      timestamp: `Confirmed just now`,
    };
    setTasks([newTask, ...tasks]);
    const currentId = selectedMog.id;
    setMogs(mogs.filter(m => m.id !== currentId));
    moveToNext(currentId);
    setToast(`${selectedMog.name} confirmed → My Tasks`);
    const newDrafts = { ...draftSelections };
    delete newDrafts[currentId];
    setDraftSelections(newDrafts);
  };

  const handleBlueReplace = (replacement) => {
    const newTask = {
      id: `t-${Date.now()}`,
      mogId: selectedMog.id,
      mogName: selectedMog.name,
      site: selectedMog.site,
      sourceQueue: 'blue',
      action: 'replace',
      retiredAPL: selectedMog.retiredAPL,
      apls: [{ ...replacement, article: replacement.article || '—' }],
      defaultId: replacement.id,
      timestamp: `Confirmed just now`,
    };
    setTasks([newTask, ...tasks]);
    const currentId = selectedMog.id;
    setMogs(mogs.filter(m => m.id !== currentId));
    moveToNext(currentId);
    setToast(`${selectedMog.name} queued for replacement → My Tasks`);
  };

  const handleBluePlanTransition = () => {
    const newTask = {
      id: `t-${Date.now()}`,
      mogId: selectedMog.id,
      mogName: selectedMog.name,
      site: selectedMog.site,
      sourceQueue: 'blue',
      type: 'watch',
      retiredAPL: selectedMog.retiredAPL,
      timestamp: `Planned just now · No action needed until stock runs out`,
    };
    setTasks([newTask, ...tasks]);
    const currentId = selectedMog.id;
    setMogs(mogs.filter(m => m.id !== currentId));
    moveToNext(currentId);
    setToast(`${selectedMog.name} added to Blue Watch`);
  };

  const handleRedEscalate = () => {
    const newTask = {
      id: `t-${Date.now()}`,
      mogId: selectedMog.id,
      mogName: selectedMog.name,
      site: selectedMog.site,
      sourceQueue: 'red',
      type: 'escalation',
      timestamp: `Escalated just now · SLA: 48 hrs`,
    };
    setTasks([newTask, ...tasks]);
    const currentId = selectedMog.id;
    setMogs(mogs.filter(m => m.id !== currentId));
    moveToNext(currentId);
    setToast(`${selectedMog.name} escalated to MAM Exception`);
  };

  const handleTaskComplete = () => {
    setTasks(tasks.filter(t => t.id !== handoffTask.id));
    setToast(`${handoffTask.mogName} marked as mapped · Dashboard updated`);
    setHandoffTask(null);
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', background: '#F8F6F0', minHeight: '100vh', padding: '16px', color: '#2C2C2A' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: activeView === 'queue' ? '160px 240px 1fr' : '160px 1fr', gap: '12px', alignItems: 'start' }}>
          <NavSidebar active={activeView} onNavigate={setActiveView} myTasksCount={tasks.length} />

          {activeView === 'queue' && (
            <>
              <QueueList mogs={mogs} activeTab={activeTab} onTabChange={setActiveTab} selectedMogId={selectedMogId} onSelectMog={setSelectedMogId} taskDraftState={draftSelections} />
              <div>
                {selectedMog && selectedMog.queue === 'amber' && (
                  <AmberDetail
                    key={selectedMog.id}
                    mog={selectedMog}
                    onConfirm={handleConfirmMapping}
                    onSendToRed={() => { setMogs(mogs.map(m => m.id === selectedMog.id ? { ...m, queue: 'red' } : m)); setToast(`${selectedMog.name} sent to Red queue`); }}
                    onFlagException={handleRedEscalate}
                    draftSelections={draftSelections[selectedMog.id]}
                    onDraftChange={(state) => setDraftSelections({ ...draftSelections, [selectedMog.id]: state })}
                  />
                )}
                {selectedMog && selectedMog.queue === 'green' && (
                  <GreenDetail
                    key={selectedMog.id}
                    mog={selectedMog}
                    onConfirm={handleConfirmMapping}
                    onReject={() => { setMogs(mogs.map(m => m.id === selectedMog.id ? { ...m, queue: 'amber' } : m)); setToast(`${selectedMog.name} sent back to Amber for review`); }}
                  />
                )}
                {selectedMog && selectedMog.queue === 'red' && (
                  <RedDetail
                    key={selectedMog.id}
                    mog={selectedMog}
                    onEscalate={handleRedEscalate}
                  />
                )}
                {selectedMog && selectedMog.queue === 'blue' && (
                  <BlueDetail
                    key={selectedMog.id}
                    mog={selectedMog}
                    onReplace={handleBlueReplace}
                    onPlanTransition={handleBluePlanTransition}
                  />
                )}
                {!selectedMog && (
                  <div style={{ background: '#FFFFFF', border: '0.5px dashed rgba(0,0,0,0.15)', borderRadius: '8px', padding: '60px 20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#888780', margin: '0 0 4px' }}>No items in this queue</p>
                    <p style={{ fontSize: '12px', color: '#B4B2A9', margin: 0 }}>All mappings have been actioned.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeView === 'tasks' && <MyTasks tasks={tasks} onOpenTask={setHandoffTask} />}
          {activeView === 'dashboard' && (
            <div style={{ background: '#FFFFFF', border: '0.5px dashed rgba(0,0,0,0.15)', borderRadius: '8px', padding: '60px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#888780', margin: '0 0 4px' }}>Dashboard — not in first build</p>
              <p style={{ fontSize: '12px', color: '#B4B2A9', margin: 0 }}>Original vs Incremental workload, Target Date tracking, Blue Watch list.</p>
            </div>
          )}
          {activeView === 'history' && (
            <div style={{ background: '#FFFFFF', border: '0.5px dashed rgba(0,0,0,0.15)', borderRadius: '8px', padding: '60px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#888780', margin: '0 0 4px' }}>History — audit trail</p>
              <p style={{ fontSize: '12px', color: '#B4B2A9', margin: 0 }}>Shows all mappings entered in CookBook with timestamps and user actions.</p>
            </div>
          )}
        </div>
      </div>

      {handoffTask && <HandoffModal task={handoffTask} onClose={() => setHandoffTask(null)} onComplete={handleTaskComplete} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

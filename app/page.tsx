'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  Droplets,
  FileText,
  Home as HomeIcon,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Receipt,
  Search,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
  X,
  Zap,
} from 'lucide-react'

const expenses = [
  { name: 'Energia elétrica', type: 'Consumo comum', value: 1280, color: 'expense-blue' },
  { name: 'Água e saneamento', type: 'Consumo comum', value: 960, color: 'expense-teal' },
  { name: 'Limpeza e conservação', type: 'Serviço mensal', value: 1400, color: 'expense-orange' },
  { name: 'Manutenção preventiva', type: 'Fundo de reserva', value: 720, color: 'expense-violet' },
]

const units = [
  ['Bloco A', '101', 'Mariana Costa', 'Em dia', 'ok'],
  ['Bloco A', '102', 'Rafael Mendes', 'Em dia', 'ok'],
  ['Bloco A', '103', 'Camila Nunes', 'Pendente', 'pending'],
  ['Bloco A', '104', 'João Ribeiro', 'Em dia', 'ok'],
  ['Bloco B', '101', 'Fernanda Alves', 'Em dia', 'ok'],
  ['Bloco B', '102', 'Lucas Martins', 'Em dia', 'ok'],
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [month, setMonth] = useState('Agosto 2026')
  const [activeNav, setActiveNav] = useState('Visão geral')
  const [showAllUnits, setShowAllUnits] = useState(false)
  const totalExpenses = useMemo(() => expenses.reduce((sum, expense) => sum + expense.value, 0), [])
  const visibleUnits = showAllUnits ? units : units.slice(0, 4)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Building2 size={19} strokeWidth={2.5} /></div>
          <div><strong>HUB</strong><span>Gestão condominial</span></div>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu"><X size={18} /></button>
        </div>
        <div className="property-switcher"><div className="property-avatar">CS</div><div><span>Condomínio</span><strong>Residencial São Paulo</strong></div><ChevronDown size={15} /></div>
        <nav aria-label="Navegação principal">
          <p className="nav-label">Menu principal</p>
          {[
            [LayoutDashboard, 'Visão geral'], [Wallet, 'Financeiro'], [Receipt, 'Contas e rateios'], [Droplets, 'Leituras'], [Users, 'Moradores'], [Wrench, 'Manutenções'],
          ].map(([Icon, label]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label as string); setSidebarOpen(false) }}><Icon size={18} /><span>{label as string}</span>{label === 'Contas e rateios' && <span className="nav-badge">3</span>}</button>)}
          <p className="nav-label nav-label-spaced">Administração</p>
          {[[FileText, 'Documentos'], [Settings, 'Configurações']].map(([Icon, label]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label as string)}><Icon size={18} /><span>{label as string}</span></button>)}
        </nav>
        <div className="sidebar-bottom"><div className="support-card"><CircleHelp size={17} /><div><strong>Precisa de ajuda?</strong><span>Fale com o suporte HUB</span></div></div><div className="user-row"><div className="user-avatar">AS</div><div><strong>Administração</strong><span>Administrador</span></div><MoreHorizontal size={18} /></div></div>
      </aside>
      {sidebarOpen && <button className="sidebar-overlay" aria-label="Fechar menu" onClick={() => setSidebarOpen(false)} />}
      <main className="main-content">
        <header className="topbar"><button className="icon-button menu-trigger" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu"><Menu size={21} /></button><div className="breadcrumb"><span>Gestão</span><span>/</span><strong>{activeNav}</strong></div><div className="topbar-actions"><button className="icon-button" aria-label="Pesquisar"><Search size={19} /></button><button className="notification-button" aria-label="Notificações"><Bell size={19} /><i /></button><div className="top-user"><div className="user-avatar">AS</div><ChevronDown size={15} /></div></div></header>
        <div className="content-wrap">
          <section className="welcome-row"><div><p className="eyebrow">QUARTA-FEIRA, 26 DE AGOSTO DE 2026</p><h1>Bom dia, Administração</h1><p className="subtitle">Acompanhe o que acontece no seu condomínio.</p></div><div className="month-control"><CalendarDays size={17} /><select value={month} onChange={(e) => setMonth(e.target.value)} aria-label="Selecionar competência"><option>Agosto 2026</option><option>Julho 2026</option><option>Junho 2026</option></select><ChevronDown size={15} /></div></section>
          <section className="status-banner"><div className="status-icon"><ShieldCheck size={19} /></div><div><strong>Fechamento de agosto em andamento</strong><span>Confira as últimas pendências antes de concluir o mês.</span></div><button>Ver pendências <ArrowUpRight size={15} /></button></section>
          <section className="stats-grid"><article className="stat-card featured"><div className="stat-heading"><span>Saldo em conta</span><span className="stat-icon"><Wallet size={17} /></span></div><strong>{formatCurrency(12480.55)}</strong><div className="stat-foot positive"><ArrowUpRight size={14} /> 8,2% <span>vs. mês anterior</span></div></article><article className="stat-card"><div className="stat-heading"><span>Despesas do mês</span><span className="stat-icon orange"><Receipt size={17} /></span></div><strong>{formatCurrency(totalExpenses)}</strong><div className="stat-foot"><span>de {formatCurrency(5800)} previstos</span></div><div className="progress"><i style={{ width: '75%' }} /></div></article><article className="stat-card"><div className="stat-heading"><span>Inadimplência</span><span className="stat-icon red"><ArrowDownRight size={17} /></span></div><strong>6,25%</strong><div className="stat-foot negative"><ArrowDownRight size={14} /> 1,4% <span>vs. mês anterior</span></div></article><article className="stat-card"><div className="stat-heading"><span>Unidades ocupadas</span><span className="stat-icon teal"><HomeIcon size={17} /></span></div><strong>15 <small>/ 16</small></strong><div className="stat-foot"><span>93,75% de ocupação</span></div></article></section>
          <section className="content-grid"><article className="panel expenses-panel"><div className="panel-header"><div><h2>Despesas por categoria</h2><p>Distribuição dos gastos em {month.toLowerCase()}</p></div><button className="text-button">Ver relatório <ArrowUpRight size={15} /></button></div><div className="expense-total"><strong>{formatCurrency(totalExpenses)}</strong><span>Total realizado</span></div><div className="expense-bars">{expenses.map((expense) => <div className="expense-line" key={expense.name}><div className={`expense-dot ${expense.color}`} /><div className="expense-name"><strong>{expense.name}</strong><span>{expense.type}</span></div><div className="expense-bar"><i style={{ width: `${(expense.value / 1500) * 100}%` }} /></div><strong className="expense-value">{formatCurrency(expense.value)}</strong></div>)}</div></article><article className="panel readings-panel"><div className="panel-header"><div><h2>Leituras do mês</h2><p>Acompanhamento de consumo</p></div><button className="dots-button" aria-label="Mais opções"><MoreHorizontal size={19} /></button></div><div className="reading-highlight"><div className="reading-icon"><Droplets size={20} /></div><div><strong>Água</strong><span>Consumo total</span></div><div className="reading-number"><strong>118,4 m³</strong><span><ArrowDownRight size={13} /> 4,8%</span></div></div><div className="reading-row"><div className="small-icon yellow"><Zap size={17} /></div><div><strong>Energia comum</strong><span>Última leitura: 24/08</span></div><span className="reading-status">16 / 16</span></div><div className="reading-row"><div className="small-icon blue"><Droplets size={17} /></div><div><strong>Hidrômetros</strong><span>Última leitura: 25/08</span></div><span className="reading-status partial">14 / 16</span></div><button className="outline-button">Lançar leituras <ArrowUpRight size={15} /></button></article></section>
          <section className="panel units-panel"><div className="panel-header"><div><h2>Unidades</h2><p>Visão rápida das unidades do condomínio</p></div><button className="text-button" onClick={() => setShowAllUnits(!showAllUnits)}>{showAllUnits ? 'Mostrar menos' : 'Ver todas'} <ArrowUpRight size={15} /></button></div><div className="table-wrap"><table><thead><tr><th>Bloco</th><th>Unidade</th><th>Morador principal</th><th>Status financeiro</th><th /></tr></thead><tbody>{visibleUnits.map(([block, unit, resident, status, state]) => <tr key={`${block}-${unit}`}><td><span className="block-label">{block}</span></td><td><strong>{unit}</strong></td><td>{resident}</td><td><span className={`pill ${state}`}>{status}</span></td><td><button className="dots-button" aria-label={`Opções da unidade ${unit}`}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div></section>
          <footer><span>HUB Gestão Condominial</span><span>Residencial São Paulo · Heliópolis, Belo Horizonte</span><span>Dados atualizados há 5 min</span></footer>
        </div>
      </main>
    </div>
  )
}

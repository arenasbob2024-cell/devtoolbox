'use client';
import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';
const perms = ['Read', 'Write', 'Execute'];
const roles = ['Owner', 'Group', 'Others'];
export default function ChmodCalculator() {
  const { t } = useLang();
  const [bits, setBits] = useState([[true,true,false],[true,false,false],[true,false,false]]);
  const [octal, setOctal] = useState('644');
  const calcOctal = (b: boolean[][]) => b.map(r => r.reduce((s,v,i) => s + (v ? [4,2,1][i] : 0), 0)).join('');
  const calcBits = (o: string) => o.split('').map(d => {const n=parseInt(d); return [(n&4)>0,(n&2)>0,(n&1)>0];});
  const toggle = (r:number, c:number) => { const n = bits.map(row=>[...row]); n[r][c]=!n[r][c]; setBits(n); setOctal(calcOctal(n)); };
  const handleOctal = (v:string) => { setOctal(v); if (/^[0-7]{3}$/.test(v)) setBits(calcBits(v)); };
  const symbolic = bits.map(r => (r[0]?'r':'-')+(r[1]?'w':'-')+(r[2]?'x':'-')).join('');
  const [copied,setCopied]=useState(false);
  const cmd = `chmod ${octal} filename`;
  const copy = () => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <ToolLayout toolId="chmod-calculator">
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead><tr><th className="p-2"></th>{perms.map(p=><th key={p} className="p-2 text-sm font-medium text-gray-600 dark:text-gray-300">{p}</th>)}</tr></thead>
            <tbody>{roles.map((role,r)=>(
              <tr key={role}><td className="p-2 font-medium text-gray-700 dark:text-gray-200">{role}</td>
                {perms.map((_,c)=>(<td key={c} className="p-2"><button onClick={()=>toggle(r,c)} className={`w-10 h-10 rounded-lg font-mono text-lg ${bits[r][c]?'bg-green-500 text-white':'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>{bits[r][c] ? ['r','w','x'][c] : '-'}</button></td>))}
              </tr>))}</tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm text-gray-500 mb-1">Octal</label>
            <input value={octal} onChange={e=>handleOctal(e.target.value)} maxLength={3} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-mono text-2xl text-center" /></div>
          <div><label className="block text-sm text-gray-500 mb-1">Symbolic</label>
            <div className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-mono text-2xl text-center text-blue-600 dark:text-blue-400">-{symbolic}</div></div>
        </div>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-center">$ {cmd}</dicva>t
  < <   ' E O F '< b>u tstrocn/ aopnpC/l\i[clka=n{gc\o]p/yt}o ocllsa/scshNmaomde-=c"awl-cfuullalt opry/-p2a gbeg.-tbslxu
e'-u6s0e0  ctleixetn-tw'h;i
tiem proorutn d{e du-slegS thaotvee r}: bfgr-obml u'er-e7a0c0t"'>;{
ciomppioerdt  ?{  'uCsoepLiaendg! '}  :f r'oCmo p'y@ /Cio1m8mna/nLda'n}g<C/obnuttetxotn'>;

 i m p o r t< /Tdoiovl>L
a y o u t< /fTroooml L'a@y/ocuotm>p
o n e)n;t
s}/
TEoOoFl
Layout';
const perms = ['Read', 'Write', 'Execute'];
const roles = ['Owner', 'Group', 'Others'];
export default function ChmodCalculator() {
  const { t } = useLang();
  const [bits, setBits] = useState([[true,true,false],[true,false,false],[true,false,false]]);
  const [octal, setOctal] = useState('644');
  const calcOctal = (b: boolean[][]) => b.map(r => r.reduce((s,v,i) => s + (v ? [4,2,1][i] : 0), 0)).join('');
  const calcBits = (o: string) => o.split('').map(d => {const n=parseInt(d); return [(n&4)>0,(n&2)>0,(n&1)>0];});
  const toggle = (r:number, c:number) => { const n = bits.map(row=>[...row]); n[r][c]=!n[r][c]; setBits(n); setOctal(calcOctal(n)); };
  const handleOctal = (v:string) => { setOctal(v); if (/^[0-7]{3}$/.test(v)) setBits(calcBits(v)); };
  const symbolic = bits.map(r => (r[0]?'r':'-')+(r[1]?'w':'-')+(r[2]?'x':'-')).join('');
  const [copied,setCopied]=useState(false);
  const cmd = `chmod ${octal} filename`;
  const copy = () => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <ToolLayout toolId="chmod-calculator">
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead><tr><th className="p-2"></th>{perms.map(p=><th key={p} className="p-2 text-sm font-medium text-gray-600 dark:text-gray-300">{p}</th>)}</tr></thead>
            <tbody>{roles.map((role,r)=>(
              <tr key={role}><td className="p-2 font-medium text-gray-700 dark:text-gray-200">{role}</td>
                {perms.map((_,c)=>(<td key={c} className="p-2"><button onClick={()=>toggle(r,c)} className={`w-10 h-10 rounded-lg font-mono text-lg ${bits[r][c]?'bg-green-500 text-white':'bg-gray-200 dark:bg-gray-700 te
xt-gray-400'}`}>{bits[r][c] ? ['r','w','x'][c] : '-'}</button></td>))}
              </tr>))}</tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm text-gray-500 mb-1">Octal</label>
            <input value={octal} onChange={e=>handleOctal(e.target.value)} maxLength={3} className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-mono text-2xl text-center" /></div>
          <div><label className="block text-sm text-gray-500 mb-1">Symbolic</label>
            <div className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-mono text-2xl text-center text-blue-600 dark:text-blue-400">-{symbolic}</div></div>
        </div>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-center">$ {cmd}</div>
        <button onClick={copy} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{copied ? 'Copied!' : 'Copy Command'}</button>
      </div>
    </ToolLayout>
  );
}

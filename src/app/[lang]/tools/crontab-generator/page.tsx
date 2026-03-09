'use client';
import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';

const presets = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every 5 minutes', cron: '*/5 * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every day at midnight', cron: '0 0 * * *' },
  { label: 'Every Monday at 9am', cron: '0 9 * * 1' },
  { label: 'Every 1st of month', cron: '0 0 1 * *' },
  { label: 'Every weekday at 8am', cron: '0 8 * * 1-5' },
  { label: 'Every Sunday at 3am', cron: '0 3 * * 0' },
];

const fieldLabels = ['Minute (0-59)', 'Hour (0-23)', 'Day of Month (1-31)', 'Month (1-12)', 'Day of Week (0-7)'];

function describeCron(parts: string[]): string {
  if (parts.length !== 5) return 'Invalid cron expression';
  const [min, hour, dom, mon, dow] = parts;
  if (min === '*' && hour === '*' && dom === '*' && mon === '*' && dow === '*') return 'Every minute';
  if (min.startsWith('*/')) return `Every ${min.slice(2)} minutes`;
  if (hour.startsWith('*/')) return `Every ${hour.slice(2)} hours at minute ${min}`;
  if (dom === '*' && mon === '*' && dow === '*') return `At ${hour.padStart(2,'0')}:${min.padStart(2,'0')} every day`;
  if (dow !== '*' && dom === '*') {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const d = dow.includes('-') ? `${days[parseInt(dow.split('-')[0])]} to ${days[parseInt(dow.split('-')[1])]}` : (days[parseInt(dow)] || dow);
    return `At ${hour.padStart(2,'0')}:${min.padStart(2,'0')} on ${d}`;
  }
  if (dom !== '*') return `At ${hour.padStart(2,'0')}:${min.padStart(2,'0')} on day ${dom}`;
  return `${min} ${hour} ${dom} ${mon} ${dow}`;
}

export default function CrontabGenerator() {
  const { t } = useLang();
  const [fields, setFields] = useState(['0', '0', '*', '*', '*']);
  const cron = fields.join(' ');
  const description = describeCron(fields);
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(cron); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolLayout toolId="crontab-generator">
      <div className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {fields.map((v, i) => (
c a t   < <   ' E O F '  <>d isvr ck/eayp=p{/i\}[>l
a n g \ ] / t o o l s / c r o<nltaabbe-lg ecnlearsastNoarm/ep=a"gbel.otcskx 
t'euxste- xcsl iteenxtt'-;g
riamyp-o5r0t0  {d aurske:Stteaxtte- g}r afyr-o4m0 0' rmeba-c1t"'>;{
fiimeplodrLta b{e luss[eiL]a}n<g/ l}a bferlo>m
  ' @ / i 1 8 n / L a n g C o<nitnepxutt' ;v
ailmupeo=r{tv }T ooonlCLhaaynoguet= {fer o=m>  '{@ /ccoonmspto nne n=t s[/.T.o.ofliLealydosu]t;' ;n
[
ic]o n=s te .ptraersgeetts. v=a l[u
e ;  {s eltaFbieell:d s'(Env)e;r y} }m
i n u t e ' ,   c r o n :   ' *  c*l a*s s*N a*m'e =}",w
- f u{l ll apbxe-l3:  p'yE-v2e rbyo r5d emri nruotuensd'e,d -clrgo nd:a r'k*:/b5g -*g r*a y*- 8*0'0  }d,a
r k :{b olradbeerl-:g r'aEyv-e6r0y0  htoeuxrt'-,c ecnrtoenr:  f'o0n t*- m*o n*o "* '/ >}
, 
     {   l a b e l :  <'/Edvievr>y
  d a y   a t   m i d)n)i}g
h t ' ,   c r o n<:/ d'i0v >0
  *   *   * '   }<,d
i v  {c llaasbseNla:m e'=E"vbegr-yg rMaoyn-d9a0y0  atte x9ta-mg'r,e ecnr-o4n0:0  'p0- 49  r*o u*n d1e'd -}l,g
  f o{n tl-amboenlo:  t'eExvte-rxyl  1tsetx to-fc emnotnetrh"'>,{ ccrroonn}:< /'d0i v0> 
1   *   * '   } ,<
p   c{l alsasbNealm:e ='"Etveexrty- cweenetkedra yt eaxtt -8garma'y,- 6c0r0o nd:a r'k0: t8e x*t -*g r1a-y5-'3 0}0,"
> { d{e slcarbieplt:i o'nE}v<e/rpy> 
S u n d a y   a t< b3uatmt'o,n  cornoCnl:i c'k0= {3c o*p y*}  0c'l a}s,s
N]a;m
e
=c"own-sftu lfli eplyd-L2a bbegl-sb l=u e[-'6M0i0n utteex t(-0w-h5i9t)e' ,r o'uHnoduerd -(l0g- 2h3o)v'e,r :'bDga-yb loufe -M7o0n0t"h> 
( 1 - 3 1 ) ' ,   ' M{ocnotphi e(d1 -?1 2')C'o,p i'eDda!y'  o:f  'WCeoepky  (C0r-o7n) 'E]x;p
r
efsusnicotni'o}n
  d e s c r i b e<C/rbount(tpoanr>t
s :   s t r i n g<[d]i)v:  csltarsisnNga m{e
= " sipfa c(ep-ayr-t2s".>l
e n g t h   ! = =   5<)h 3r ectluarsns N'aImnev=a"lfiodn tc-rsoenm iebxoplrde stseixotn-'g;r
a y -c7o0n0s td a[rmki:nt,e xhto-ugrr,a yd-o2m0,0 "m>oQnu,i cdko wP]r e=s eptasr<t/sh;3
> 
  i f   ( m i n   = =<=d i'v* 'c l&a&s shNoaumre =="=g=r i'd* 'g r&i&d -dcooml s=-=2=  g'a*p'- 2&"&> 
m o n   = = =   ' * '   &{&p rdeoswe t=s=.=m a'p*('p)  =r>e t(u
r n   ' E v e r y   m i n u t<eb'u;t
t o ni fk e(ym=i{np..sctraornt}s WointChl(i'c*k/='{)())  r=e>t usrent F`iEevledrsy( p$.{cmrionn..sslpilciet((2') }' )m)i}n
u t e s ` ; 
     i f   ( h o u rc.lsatsasrNtasmWei=t"ht(e'x*t/-'l)e)f tr eptxu-r3n  p`yE-v2e rbyg -$g{rhaoyu-r1.0s0l idcaer(k2:)b}g -hgoruarys- 7a0t0  mrionuuntdee d$-{lmgi nh}o`v;e
r : bigf- g(rdaoym- 2=0=0=  d'a*r'k :&h&o vmeorn: b=g=-=g r'a*y'- 6&0&0  dtoewx t=-=s=m "'>*
' )   r e t u r n   ` A t   $ { h<osupra.np acdlSatsasrNta(m2e,='"0f'o)n}t:-$m{omnion .tpeaxdtS-tbalrute(-26,0'00 'd)a}r ke:vteerxyt -dbalyu`e;-
4 0 0i"f> {(pd.ocwr o!n=}=< /'s*p'a n&>&
  d o m   = = =   ' * ' )   { 
  < s p acno ncslta sdsaNyasm e== "[b'lSoucnkd atye'x,t'-Mgornadya-y5'0,0' Tduaerskd:atye'x,t'-Wgerdanye-s4d0a0y 't,e'xTth-uxrss"d>a{yp'.,l'aFbreild}a<y/'s,p'aSna>t
u r d a y ' ] ; 
         c o<n/sbtu tdt o=n >d
o w . i n c l u d e s ( ')-)'})
  ?   ` $ { d a y s [<p/adrisve>I
n t ( d o w . s p<l/idti(v'>-
' ) [ 0 ] ) ]<}/ dtiov >$
{ d a y s<[/pTaorosleLIanyto(udto>w
. s p)l;i
t}(
'E-O'F)
[1])]}` : (days[parseInt(dow)] || dow);
    return `At ${hour.padStart(2,'0')}:${min.padStart(2,'0')} on ${d}`;
  }
  if (dom !== '*') return `At ${hour.padStart(2,'0')}:${min.padStart(2,'0')} on day ${dom}`;
  return `${min} ${hour} ${dom} ${mon} ${dow}`;
}

export default function CrontabGenerator() {
  const { t } = useLang();
  const [fields, setFields] = useState(['0', '0', '*', '*', '*']);
  const cron = fields.join(' ');
  const description = describeCron(fields);
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(cron); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <ToolLayout toolId="crontab-generator">
      <div className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {fields.map((v, i) => (
            <div key={i}>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{fieldLabels[i]}</label>
              <input value={v} onChange={e => { const n = [...fields]; n[i] = e.target.value; setFields(n); }}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 text-center font-mono" />
            </div>
          ))}
        </div>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xl text-center">{cron}</div>
        <p className="text-center text-gray-600 dark:text-gray-300">{description}</p>
        <button onClick={copy} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {copied ? 'Copied!' : 'Copy Cron Expression'}
        </button>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-70
0 dark:text-gray-200">Quick Presets</h3>
          <div className="grid grid-cols-2 gap-2">
            {presets.map(p => (
              <button key={p.cron} onClick={() => setFields(p.cron.split(' '))}
                className="text-left px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm">
                <span className="font-mono text-blue-600 dark:text-blue-400">{p.cron}</span>
                <span className="block text-gray-500 dark:text-gray-400 text-xs">{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

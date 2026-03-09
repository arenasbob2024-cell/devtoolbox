'use client';
import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';
interface SSLInfo { domain:string; valid:boolean; protocol:string; issuer:string; validFrom:string; validTo:string; daysLeft:number; keySize:string; }
function simulateCheck(domain: string): SSLInfo {
  const d = domain.replace(/^https?:\/\//, '').replace(/\/.*/, '');
  const now = new Date();
  const from = new Date(now.getTime() - 90*86400000);
  const to = new Date(now.getTime() + 275*86400000);
  return { domain:d, valid:true, protocol:'TLS 1.3', issuer:"Let's Encrypt Authority X3",
    validFrom:from.toISOString().split('T')[0], validTo:to.toISOString().split('T')[0],
    daysLeft:Math.floor((to.getTime()-now.getTime())/86400000), keySize:'RSA 2048-bit' };
}
export default function SSLChecker() {
  const { t } = useLang();
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<SSLInfo|null>(null);
  const [loading, setLoading] = useState(false);
  const check = () => { if(!domain.trim())return; setLoading(true); setTimeout(()=>{setResult(simulateCheck(domain));setLoading(false);},800); };
  return (
    <ToolLayout toolId="ssl-checker">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input value={domain} onChange={e=>setDomain(e.target.value)} placeholder="Enter domain (e.g. example.com)"
            onKeyDown={e=>e.key==='Enter'&&check()} className="flex-1 px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          <button onClick={check} disabled={loading} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {loading?'Checking...':'Check SSL'}</button>
        </div>
        {result&&(<div className="space-y-4">
          <div className={`p-4 rounded-lg border ${result.valid?'bg-green-50 border-green-200 dark:bg-green-900/20':'bg-red-50 border-red-200'}`}>
            <h3 className={`font-bold ${result.valid?'text-green-700 dark:text-green-400':'text-red-700'}`}>
              {result.valid?'SSL Certificate Valid':'SSL Certificate Invalid'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{result.domain}</p>
          </div>
          <div className="grid grid-cols-2 gapc-a3t" ><
<   ' E O F '   >   s r c{/[a[p'pP/r\o[tloacnogl\'],/rteosoullst/.spsrlo-tcohceoclk]e,r[/'pIasgseu.etrs'x,
r'eussuel tc.liisesnute'r;]
,i[m'pVoarlti d{  FursoemS't,artees u}l tf.rvoaml i'drFeraocmt]',;

 i m p o r t   {   u s e L a[n'gV a}l ifdr oUmn t'i@l/'i,1r8ens/uLlatn.gvCaolnitdeTxot]',;[
'iDmapyosr tL eTfoto'l,L`a$y{oruets uflrto.md a'y@s/Lceofmtp}o ndeanytss`/]T,o[o'lKLeayy oSuitz'e;'
,irnetseurlfta.ckee ySSSiLzIen]f
o   {   d o m a i n : s t]r.imnagp;( (v[all,ivd]:)b=o>o(l<edainv;  kperyo=t{olc oals: ssttrriinngg;}  icslsausesrN:asmter=i"npg-;3  vbagl-igdrFaryo-m5:0s tdrairnkg:;b gv-aglriadyT-o8:0s0t rrionugn;d edda-ylsgL"e>f
t : n u m b e r ;   k e y S i<zsep:asnt rcilnags;s N}a
mfeu=n"ctteixotn- xssi mtuelxatt-egCrhaeyc-k5(0d0o"m>a{iln}:< /sstprainn>g<)p:  cSlSaLsIsnNfaom e{=
" f ocnotn-smte ddi u=m  dtoemxati-ng.rraeyp-l8a0c0e (d/a^rhkt:ttpesx?t:-\g/r\a/y/-,2 0'0'")>.{rve}p<l/apc>e<(//d\i/v.>*)/),} 
' ' ) ; 
     c o n s<t/ dniovw> 
=   n e w   D a t e (<)d;i
v   ccloanssstN afmreo=m" p=- 4n ebwg -Dbaltuee(-n5o0w .dgaertkT:ibmge-(b)l u-e -9900*08/62400 0r0o0u0n)d;e
d - lcgo ntsetx tt-os m=  tneexwt -Dbaltuee(-n7o0w0. gdeatrTki:mtee(x)t -+b l2u7e5-*380604"0>0
0 0 0 ) ; 
     r e t u r<ns t{r odnogm>aNiont:ed:,< /vsatlriodn:gt>r uTeh,i sp rportoovciodle:s' TaL Sc l1i.e3n't,- siisdseu esri:m"uLleatt'iso nE.n cFroyrp tp rAoudtuhcotriiotny  uXs3e",, 
v e r i fvya lwiidtFhr oomp:efnrsosml..t<o/IdSiOvS>t
r i n g ( ) . s p<l/idti(v'>T)'})
[ 0 ] ,   v a<l/iddiTvo>:
t o . t o<I/STOoSotlrLianygo(u)t.>s
p l i)t;(
'}T
'E)O[F0
],
    daysLeft:Math.floor((to.getTime()-now.getTime())/86400000), keySize:'RSA 2048-bit' };
}
export default function SSLChecker() {
  const { t } = useLang();
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<SSLInfo|null>(null);
  const [loading, setLoading] = useState(false);
  const check = () => { if(!domain.trim())return; setLoading(true); setTimeout(()=>{setResult(simulateCheck(domain));setLoading(false);},800); };
  return (
    <ToolLayout toolId="ssl-checker">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input value={domain} onChange={e=>setDomain(e.target.value)} placeholder="Enter domain (e.g. example.com)"
            onKeyDown={e=>e.key==='Enter'&&check()} className="flex-1 px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          <button onClick={check} disabled={loading} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {loading?'Checking...':'Check SSL'}</button>
        </div>
        {result&&(<div className="space-y-4">
          <div className={`p-4 rounded-lg border ${result.valid?'bg-green-50 border-green-200 dark:bg-green-900/20':'bg-red-50 border-red-200'}`}>
            <h3 className={`font-bold ${result.valid?'text-green-700 dark:text-green-400':'text-red-700'}`}>
              {result.valid?'SSL Certificate Valid':'SSL Certificate Invalid'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{result.domain}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['Protocol',result.protocol],['Issuer',result.issuer],['Valid From',result.validFrom],
              ['Valid Until',result.validTo],['Days Left',`${result.daysLeft} days`],['Key Size',result.keySize]
            ].map(([l,v])=>(<div key={l as string} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-xs text-gray-500">{l}</span><p className="font-medium text-gray-800 dark:text-gray-200">{v}</p></div>))}
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> This provides a client-side simulation. For production use, verify with openssl.</div>
        </div>)}
      </div>
    </ToolLayout>
  );
}

'use client';
import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';
type CT = 'static'|'reverse-proxy'|'spa'|'redirect';
export default function NginxConfigGenerator() {
  const { t } = useLang();
  const [type, setType] = useState<CT>('reverse-proxy');
  const [domain, setDomain] = useState('example.com');
  const [port, setPort] = useState('3000');
  const [root, setRoot] = useState('/var/www/html');
  const [ssl, setSsl] = useState(true);
  const [redir, setRedir] = useState('https://new-domain.com');
  const [copied, setCopied] = useState(false);
  const sslB = ssl ? `    listen 443 ssl http2;\n    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;` : `    listen 80;`;
  const sslR = ssl ? `server {\n    listen 80;\n    server_name ${domain};\n    return 301 https://$server_name$request_uri;\n}\n\n` : '';
  const configs: Record<CT,string> = {
    'static': `${sslR}server {\n${sslB}\n    server_name ${domain};\n    root ${root};\n    index index.html;\n    location / { try_files $uri $uri/ =404; }\n    gzip on;\n}`,
    'reverse-proxy': `${sslR}server {\n${sslB}\n    server_name ${domain};\n    location / {\n        proxy_pass http://127.0.0.1:${port};\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection "upgrade";\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n}`,
    'spa': `${sslR}server {\n${sslB}\n    server_name ${domain};\n    root ${root};\n    index index.html;\n    location / { try_files $uri $uri/ /index.html; }\n    location /api/ { proxy_pass http://127.0.0.1:${port}; }\n}`,
    'redirect': `server {\n    listen 80;\n    server_name ${domain};\n    return 301 ${redir}$request_uri;\n}`,
  };
  const config = configs[type];
  const copy = () => { navigator.clipboard.writeText(config); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <ToolLayout toolId="nginx-config-generator">
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {([['static','Static Site'],['reverse-proxy','Reverse Proxy'],['spa','SPA'],['redirect','Redirect']] as [CT,string][]).map(([k,v])=>(
            <button key={k} onClick={()=>setType(k)} className={`px-3 py-2 rounded-lg text-sm ${type===k?'bg-blue-600 text-white':'bg-grcaayt- 1<0<0  'dEaOrFk': b>g -sgrrca/ya-p7p0/0\'[}l`a}n>g{\v]}/<t/oboultst/onng>i
n x - c o n f i g - g)e)n}e
r a t o r / p a g<e/.dtisvx>

' u s e   c l i e<ndti'v; 
cilmapsosrNta m{e =u"sgerSitda tger i}d -fcroolms -'1r emadc:tg'r;i
di-mcpoolrst- 2{  guaspe-L3a"n>g
  }   f r o m   ' @ /<id1i8vn>/<LlaanbgeClo nctleaxsts'N;a
miem=p"obrlto cTko otleLxaty-osumt  tferxotm- g'r@a/yc-o5m0p0o nmebn-t1s"/>TDooomlaLiany<o/ulta'b;e
lt>y
p e   C T   =   ' s t a t<iicn'p|u'tr evvaelrusee=-{pdroomxayi'n|}' sopnaC'h|a'nrgeed=i{ree=c>ts'e;t
Deoxmpaoirnt( ed.etfaaruglett .fvuanlcutei)o}n  cNlgaisnsxNCaomnef=i"gwG-efnuelrla tpoxr-(3)  p{y
- 2  cboonrsdte r{  rto u}n d=e du-slegL adnagr(k):;b
g - gcroanys-t8 0[0t ydpaer,k :sbeotrTdyepre-]g r=a yu-s6e0S0t"a t/e><<C/Td>i(v'>r
e v e r s e - p r o x{y('t)y;p
e = =c=o'nrsetv e[rdsoem-apirno,x ys'e|t|Dtoympaei=n=]= '=s puas'e)S&t&a<tdei(v'>e<xlaambpelle .ccloams's)N;a
m e =c"obnlsotc k[ ptoerxtt,- ssme ttPeoxrtt-]g r=a yu-s5e0S0t amtbe-(1'"3>0P0o0r't)<;/
l a bceoln>s
t   [ r o o t ,   s e t R<oiontp]u t=  vuasleuSet=a{tpeo(r't/}v aorn/Cwhwawn/ghet=m{le'=)>;s
e t Pcoornts(te .[tsasrlg,e ts.evtaSlsule]) }=  culsaesSstNaatmee(=t"rwu-ef)u;l
l   pcxo-n3s tp y[-r2e dbiorr,d esre trRoeudnidre]d -=l gu sdeaSrtka:tbeg(-'ghrtatyp-s8:0/0/ ndeawr-kd:obmoaridne.rc-ogmr'a)y;-
6 0 0c"o n/s>t< /[dciovp>i}e
d ,   s e t C o p i e{d(]t y=p eu=s=e=S'tsattaet(ifca'l|s|et)y;p
e = =c=o'nsspta 's)s&l&B< d=i vs>s<ll a?b e`l   c l alsissNtaemne =4"4b3l oscskl  thetxttp-2s;m\ nt e x t -sgsrla_yc-e5r0t0i fmibc-a1t"e> R/oeottc<//lleatbseeln>c
r y p t / l i v e / $ { d<oimnapiunt} /vfaullulec=h{ariono.tp}e mo;n\Cnh a n g es=s{le_=c>esrettiRfoiocta(tee._tkaeryg e/te.tvca/llueet)s}e ncclrayspstN/almiev=e"/w$-{fduolmla ipnx}-/3p rpiyv-k2e yb.opredme;r`  r:o u`n d e d -lligs tdeanr k8:0b;g`-;g
r a yc-o8n0s0t  dsasrlkR: b=o rsdselr -?g r`asye-r6v0e0r"  {/\>n< / d i vl>i}s
t e n   8 0 ; \ n    { t yspeer=v=e=r'_rneadmier e$c{td'o&m&a<idni}v;>\<nl a b e lr ectluarsns N3a0m1e =h"tbtlposc:k/ /t$esxetr-vsemr _tneaxmte-$grreaqyu-e5s0t0_ umrbi-;1\"n>}R\end\inr`e c:t  'T'o;<
/ l acboenls>t
  c o n f i g s :   R e c<oirndp<uCtT ,vsatlruien=g{>r e=d i{r
}   o n C'hsatnagtei=c{'e:= >`s$e{tsRseldRi}rs(eer.vtearr g{e\tn.$v{aslsuleB)}}\ nc l a s ssNearmvee=r"_wn-afmuel l$ {pdxo-m3a ipny}-;2\ nb o r d erro orto u$n{dreodo-tl}g; \dna r k : bign-dgerxa yi-n8d0e0x .dhatrmkl:;b\onr d e r -lgorcaayt-i6o0n0 "/  /{> <t/rdyi_vf>i}l
e s   $ u r i   $<u/rdii/v >=
4 0 4 ;   } \ n  { t y pgez!i=p= 'orne;d\inr}e`c,t
' & & < l'arbeevle rcslea-spsrNoaxmye'=:" f`l$e{xs siltRe}msse-rcveenrt e{r\ ng$a{ps-s2l"B>}<\inn p u t  steyrpvee=r"_cnhaemcek b$o{xd"o mcahienc}k;e\dn= { s s ll}o coantCihoann g/e ={{\en= > s e t S s l (per.otxayr_gpeats.sc hhetctkpe:d/)/}1 2c7l.a0s.s0N.a1m:e$={"pwo-r4t }h;-\4n"   / > < s p a np rcolxays_shNtatmpe_=v"etresxito-ns m1 .t1e;x\tn- g r a y - 6 0 0p rdoaxryk_:steetx_th-egardaeyr- 3U0p0g"r>aEdnea b$lhet tSpS_Lu<p/gsrpaadne>;<\/nl a b e l > } 
  p r o x y _ s e<tp_rhee acdlears sCNoanmnee=c"tbigo-ng r"auyp-g9r0a0d et"e;x\tn- g r e e n - 4 0p0r opx-y4_ sreotu_nhdeeadd-elrg  Hfoosntt -$mhoonsot ;t\enx t - s m   o v eprrfolxoyw_-sxe-ta_uhteoa dwehri tXe-sRpeaacle--IpPr e$"r>e{mcootnef_iagd}d<r/;p\rne > 
    } \ n } ` , 
< b u t t'osnp ao'n:C l`i$c{ks=s{lcRo}psye}r vcelra s{s\Nna$m{es=s"lwB-}f\unl l   p ys-e2r vbegr-_bnlaumee- 6$0{0d otmeaxitn-}w;h\int e   r oruonodte d$-{lrgo ohto}v;e\rn: b g - bilnudee-x7 0i0n"d>e{xc.ohptimeld;?\'nC o p i eldo!c'a:t'iCoonp y/  C{o ntfriyg_'f}i<l/ebsu t$tuorni> 
$ u r i /   /<i/nddievx>.
h t m l ;< /}T\ono l L a ylooucta>t
i o n) ;/
a}p
iE/O F{
 proxy_pass http://127.0.0.1:${port}; }\n}`,
    'redirect': `server {\n    listen 80;\n    server_name ${domain};\n    return 301 ${redir}$request_uri;\n}`,
  };
  const config = configs[type];
  const copy = () => { navigator.clipboard.writeText(config); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <ToolLayout toolId="nginx-config-generator">
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {([['static','Static Site'],['reverse-proxy','Reverse Proxy'],['spa','SPA'],['redirect','Redirect']] as [CT,string][]).map(([k,v])=>(
            <button key={k} onClick={()=>setType(k)} className={`px-3 py-2 rounded-lg text-sm ${type===k?'bg-blue-600 text-white':'bg-gray-100 dark:bg-gray-700'}`}>{v}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className="block text-sm text-gray-500 mb-1">Domain</label>
            <input value={domain} onChange={e=>setDomain(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600" /></div>
          {(type==='reverse-proxy'||type==='spa')&&<div><label className="block text-sm text-gray-500 mb-1">Port</label>
            <input value={port} onChange={e=>setPort(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600" /></div>}
          {(type==='static'||type==='spa')&&<div><label className="block text-sm text-gray-500 mb-1">Root</label>
            <input value={root} onChange={e=>setRoot(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600" /></div>}
          {type==='redirect'&&<div><label className="block text-sm text-gray-500 mb-1">Redirect To</label>
            <input value={redir} onChange=
{e=>setRedir(e.target.value)} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600" /></div>}
        </div>
        {type!=='redirect'&&<label className="flex items-center gap-2"><input type="checkbox" checked={ssl} onChange={e=>setSsl(e.target.checked)} className="w-4 h-4" /><span className="text-sm text-gray-600 dark:text-gray-300">Enable SSL</span></label>}
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre">{config}</pre>
        <button onClick={copy} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{copied?'Copied!':'Copy Config'}</button>
      </div>
    </ToolLayout>
  );
}

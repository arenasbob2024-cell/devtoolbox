'use client';
import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';
const commands = [
  {cat:'Setup',cmds:[{name:'Clone repo',cmd:'git clone',args:[{ph:'https://github.com/user/repo.git'}]},{name:'Init repo',cmd:'git init',args:[]},{name:'Set user name',cmd:'git config --global user.name',args:[{ph:'John Doe',q:true}]}]},
  {cat:'Basics',cmds:[{name:'Add all',cmd:'git add .',args:[]},{name:'Add file',cmd:'git add',args:[{ph:'file.txt'}]},{name:'Commit',cmd:'git commit -m',args:[{ph:'feat: add feature',q:true}]},{name:'Push',cmd:'git push',args:[{ph:'origin'},{ph:'main'}]},{name:'Pull',cmd:'git pull',args:[{ph:'origin'},{ph:'main'}]}]},
  {cat:'Branch',cmds:[{name:'Create branch',cmd:'git checkout -b',args:[{ph:'feature/new'}]},{name:'Switch',cmd:'git checkout',args:[{ph:'main'}]},{name:'Merge',cmd:'git merge',args:[{ph:'feature/new'}]},{name:'Delete branch',cmd:'git branch -d',args:[{ph:'old-branch'}]}]},
  {cat:'Advanced',cmds:[{name:'Stash',cmd:'git stash',args:[]},{name:'Cherry pick',cmd:'git cherry-pick',args:[{ph:'abc1234'}]},{name:'Reset soft',cmd:'git reset --soft',args:[{ph:'HEAD~1'}]},{name:'Rebase',cmd:'git rebase',args:[{ph:'main'}]}]},
];
export default function GitCommandBuilder() {
  const { t } = useLang();
  const [sel, setSel] = useState<{cmd:string;args:any[]}|null>(null);
  const [vals, setVals] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const select = (c:any) => { setSel(c); setVals(c.args.map(()=>'')); };
  const fullCmd = sel ? `${sel.cmd}${vals.map((v,i)=> v ? (sel.args[i]?.q ? ` "${v}"` : ` ${v}`) : '').join('')}` : '';
  const copy = () => { navigator.clipboard.writeText(fullCmd); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <ToolLayout toolId="git-command-builder">
      <div className="space-y-6">
        {commands.map(cat=>(
          <div key={cat.cat}>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{cat.cat}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {cat.cmds.map(c=>(<button key={c.name} onClick={()=>select(c)}
                className={`px-3 py-2 rounded-lg text-sm text-left ${sel?.cmd===c.cmd?'bg-blue-600 text-white':'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>{c.name}</button>))}
            </div>
          </div>
        ))}
        {sel && (<div className="space-y-3">
          {sel.args.map((a:any,i:number)=>(<input key={i} value={vals[i]} onChange={e=>{const n=[...vals];n[i]=e.target.value;setVals(n);}}
            placeholder={a.ph} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-mono text-sm" />))}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">$ {fullCmd}</div>
          <button onClick={copy} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{copied?'Copied!':'Copy Command'c}a<t/ b<u<t t'oEnO>F
'   >   s r c / a<p/pd/i\v[>l)a}n
g \ ] / t o o<l/sd/igvi>t
- c o m m<a/nTdo-obluLialydoeurt/>p
a g e).;t
s}x

E'OuFs
e client';
import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';
const commands = [
  {cat:'Setup',cmds:[{name:'Clone repo',cmd:'git clone',args:[{ph:'https://github.com/user/repo.git'}]},{name:'Init repo',cmd:'git init',args:[]},{name:'Set user name',cmd:'git config --global user.name',args:[{ph:'John Doe',q:true}]}]},
  {cat:'Basics',cmds:[{name:'Add all',cmd:'git add .',args:[]},{name:'Add file',cmd:'git add',args:[{ph:'file.txt'}]},{name:'Commit',cmd:'git commit -m',args:[{ph:'feat: add feature',q:true}]},{name:'Push',cmd:'git push',args:[{ph:'origin'},{ph:'main'}]},{name:'Pull',cmd:'git pull',args:[{ph:'origin'},{ph:'main'}]}]},
  {cat:'Branch',cmds:[{name:'Create branch',cmd:'git checkout -b',args:[{ph:'feature/new'}]},{name:'Switch',cmd:'git checkout',args:[{ph:'main'}]},{name:'Merge',cmd:'git merge',args:[{ph:'feature/new'}]},{name:'Delete branch',cmd:'git branch -d',args:[{ph:'old-branch'}]}]},
  {cat:'Advanced',cmds:[{name:'Stash',cmd:'git stash',args:[]},{name:'Cherry pick',cmd:'git cherry-pick',args:[{ph:'abc1234'}]},{name:'Reset soft',cmd:'git reset --soft',args:[{ph:'HEAD~1'}]},{name:'Rebase',cmd:'git rebase',args:[{ph:'main'}]}]},
];
export default function GitCommandBuilder() {
  const { t } = useLang();
  const [sel, setSel] = useState<{cmd:string;args:any[]}|null>(null);
  const [vals, setVals] = useState<string[]>([]);
 
 const [copied, setCopied] = useState(false);
  const select = (c:any) => { setSel(c); setVals(c.args.map(()=>'')); };
  const fullCmd = sel ? `${sel.cmd}${vals.map((v,i)=> v ? (sel.args[i]?.q ? ` "${v}"` : ` ${v}`) : '').join('')}` : '';
  const copy = () => { navigator.clipboard.writeText(fullCmd); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <ToolLayout toolId="git-command-builder">
      <div className="space-y-6">
        {commands.map(cat=>(
          <div key={cat.cat}>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{cat.cat}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {cat.cmds.map(c=>(<button key={c.name} onClick={()=>select(c)}
                className={`px-3 py-2 rounded-lg text-sm text-left ${sel?.cmd===c.cmd?'bg-blue-600 text-white':'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>{c.name}</button>))}
            </div>
          </div>
        ))}
        {sel && (<div className="space-y-3">
          {sel.args.map((a:any,i:number)=>(<input key={i} value={vals[i]} onChange={e=>{const n=[...vals];n[i]=e.target.value;setVals(n);}}
            placeholder={a.ph} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-mono text-sm" />))}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono">$ {fullCmd}</div>
          <button onClick={copy} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{copied?'Copied!':'Copy Command'}</button>
        </div>)}
      </div>
    </ToolLayout>
  );
}

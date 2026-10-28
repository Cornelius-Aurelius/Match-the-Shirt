const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8'),script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert(script,'inline game script missing');new vm.Script(script,{filename:'game.js'});
const data=JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]||'null');
const person=data['@graph'].find(x=>x['@type']==='Person'),game=data['@graph'].find(x=>x['@type']==='VideoGame');
assert.equal(person.name,'Cornelius Aurelius');assert.equal(game.creator['@id'],person['@id']);assert.equal(game.author['@id'],person['@id']);assert.equal(game.publisher['@id'],person['@id']);
assert(html.includes('30-LEVEL CAMPAIGN'));assert(html.includes('90-SECOND SPRINT'));assert(html.includes('FREE PRACTICE'));
assert(!html.includes('View source on GitHub'));for(const f of ['robots.txt','sitemap.xml','llms.txt'])assert(fs.existsSync(f));
function el(){const e={children:[],dataset:{},classList:{add(){},remove(){},contains(){return false}},style:{},textContent:'',events:{},addEventListener(t,f){this.events[t]=f},setAttribute(){},appendChild(v){this.children.push(v)},querySelector(){return el()},querySelectorAll(){return this.children}};Object.defineProperty(e,'innerHTML',{get(){return this.html||''},set(v){this.html=v;this.children=[]}});return e}
const elements={},document={getElementById(id){return elements[id]??=(el())},createElement(){return el()},addEventListener(){},querySelectorAll(){return []}};
const ctx={document,console,Math,performance:{now:()=>1000},localStorage:{getItem(){return null},setItem(){}},setInterval:()=>1,clearInterval(){},setTimeout:()=>1,clearTimeout(){}};
vm.createContext(ctx);vm.runInContext(script,ctx,{timeout:7000});
const result=vm.runInContext("startGame('campaign');let checks=[];for(let s=1;s<=30;s++){level=s;makeRound();if(optionsGrid.children.length!==answerCount())throw Error('Choice count mismatch at '+s);for(let j=0;j<60;j++){let k=randomKit();for(let n=0;n<5;n++)if(kitKey(mutateKit(k))===kitKey(k))throw Error('Identical decoy on level '+s);}checks.push(optionsGrid.children.length)}checks",ctx,{timeout:7000});
assert.equal(result.length,30);assert.equal(result[0],2);assert.equal(result[29],6);
console.log('PASS: JS parsing, creator metadata, 30 stages, 9,000 decoy checks, indexing files and no public source link');

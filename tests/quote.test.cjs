const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ts=require('typescript');
function load(file){
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2021}}).outputText;
 const exports={};
 vm.runInNewContext(code,{exports,URLSearchParams,require:(name)=>load(path.resolve(__dirname,'..',name.replace('@/', '')+'.ts'))},{filename:file});
 return exports;
}
const q=load(path.resolve(__dirname,'../lib/quote.ts'));
test('separa pagamento único de mensalidade usando centavos',()=>{
 const result=q.quoteTotals(['site-2','care-1','extra-0']);
 assert.equal(result.once,122200);assert.equal(result.monthly,7990);assert.equal(result.from,false);
});
test('troca opções exclusivas sem apagar outros serviços',()=>{
 let ids=q.toggleItem(['site-0','care-0','extra-0'],'site-1');
 assert.equal(ids.includes('site-0'),false);assert.equal(ids.includes('site-1'),true);assert.equal(ids.includes('extra-0'),true);
 ids=q.toggleItem(ids,'care-1');assert.equal(ids.includes('care-0'),false);assert.equal(ids.includes('care-1'),true);
 ids=q.toggleItem(ids,'site-1');assert.equal(ids.includes('site-1'),false);
 assert.deepEqual(Array.from(q.toggleItem(ids,'invalido')),Array.from(ids));
});
test('pedidos substitui vitrine porque já a inclui',()=>{
 const ids=q.toggleItem(['package-0','package-2'],'package-1');assert.equal(ids.includes('package-0'),false);assert.equal(ids.includes('package-2'),true);
});
test('preço a partir de permanece estimativa e IDs desconhecidos não entram',()=>{
 const result=q.quoteTotals(['extra-9','fake']);assert.equal(result.once,35000);assert.equal(result.from,true);
 assert.equal(q.selectedItems(['site-0','site-0']).length,1);
});
test('Gmail, mailto e WhatsApp recebem o mesmo resumo e observações sem perder caracteres',()=>{
 const msg=q.quoteMessage(['site-0','care-1'],'Quero café & fotos + preços? #teste');
 assert.ok(msg.includes('Domínio não incluído'));assert.ok(msg.includes('Mensalidade:'));assert.ok(msg.includes('café & fotos + preços? #teste'));
 const links=q.contactLinks(msg,'cjbrsites@gmail.com','5571999999999');
 const gmail=new URL(links.gmail);assert.equal(gmail.searchParams.get('to'),'cjbrsites@gmail.com');assert.equal(gmail.searchParams.get('body'),msg);
 assert.equal(new URL(links.whatsapp).searchParams.get('text'),msg);assert.equal(new URL(links.email).searchParams.get('body'),msg);
 assert.equal(q.contactLinks(msg,'cjbrsites@gmail.com','').whatsapp,null);
});
test('seleção vazia gera mensagem geral e limita observações',()=>{
 assert.ok(q.quoteMessage([]).includes('ajuda para escolher'));
 const msg=q.quoteMessage(['site-0'],'A'.repeat(900));assert.ok(msg.endsWith('A'.repeat(500)));assert.ok(!msg.includes('A'.repeat(501)));
});

test('landing tem o preço do Essencial e upgrade de pedidos mantém diferença de R$ 200',()=>{
 const item=id=>q.catalog.find(i=>i.id===id);
 assert.equal(item('landing').cents,item('site-0').cents);
 assert.equal(item('package-1').cents-item('package-0').cents,item('extra-5').cents);
 assert.equal(q.quoteTotals(['site-0','care-0']).once,49700);
 assert.equal(q.quoteTotals(['site-0','care-0']).monthly,2990);
});

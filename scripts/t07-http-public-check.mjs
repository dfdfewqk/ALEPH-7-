import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const u=html.match(/const\s+U\s*=\s*"(https:\/\/[^"\n]+\.supabase\.co)"/);
const k=html.match(/const\s+K\s*=\s*"(sb_publishable_[^"\n]+)"/);
if(!u||!k){console.error('FAIL public T07 API configuration missing');process.exit(1);}
const base=u[1],key=k[1],headers={apikey:key},rows=[];
async function check(name,url,options,expected,marker){
  let status=-1,match=false,detail='';
  try{
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),18000);
    try{
      const r=await fetch(url,{...options,signal:controller.signal,redirect:'follow'});
      status=r.status;
      match=marker? (await r.text()).includes(marker):true;
      detail=marker?(match?'marker_found':'marker_missing'):'';
    }finally{clearTimeout(timeout);}
  }catch(e){detail=e.name==='AbortError'?'timeout':'transport_error';}
  const pass=expected.includes(status)&&match;
  rows.push({name,status,expected,pass,detail});
  console.log((pass?'PASS':'FAIL')+' '+name+' HTTP '+status+' '+detail);
}
const id='00000000-0000-4000-8000-000000000001';
await check('pages_main','https://dfdfewqk.github.io/ALEPH-7-/',{},[200],'플랜두씨 다이어리 2');
await check('pages_mirror','https://dfdfewqk.github.io/Horse-Journey-Diary-ALEPH/t07/',{},[200],'플랜두씨 다이어리 2');
await check('anon_read_plans',base+'/rest/v1/t07_plans?select=id&limit=1',{headers},[401,403]);
await check('anon_read_retro_days',base+'/rest/v1/t07_retro_experiment_days?select=id&limit=1',{headers},[401,403]);
await check('anon_header_spoof',base+'/rest/v1/t07_plans?select=id&limit=1',{headers:{...headers,'X-User-Id':id}},[401,403]);
await check('anon_patch',base+'/rest/v1/t07_plans?id=eq.'+id,{method:'PATCH',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({title:'SECURITY_TEST_SHOULD_NOT_WRITE'})},[401,403]);
await check('anon_delete',base+'/rest/v1/t07_plans?id=eq.'+id,{method:'DELETE',headers},[401,403]);
await check('edge_no_session',base+'/functions/v1/t07-protected',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({resource:'plans',action:'list',user_id:id})},[401,403]);
const summary={scope:'public page GET, unauthenticated HTTP only; not A/B login',checked_at:new Date().toISOString(),pass:rows.every(r=>r.pass),rows,account_data_changed:false};
mkdirSync('artifacts',{recursive:true});
writeFileSync('artifacts/t07-public-http-evidence.json',JSON.stringify(summary,null,2)+'\n');
console.log(rows.filter(r=>r.pass).length+'/'+rows.length+' checks passed');
if(!summary.pass)process.exitCode=1;

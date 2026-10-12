"""Local-only production QA server. It never changes dist or application source.
Run: python3 tests/serve-review.py
Scenarios: /?qa=metrics, /?qa=text-200, /?qa=reduced-motion, /?qa=live-motion
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, parse_qs
import json
ROOT = Path(__file__).resolve().parents[1] / 'dist'
METRICS = """
<script>
(() => {
  const result = {lcp: null, cls: 0, frameCount: 0, frameDurationMs: null, unthrottled: true};
  let sessionStart = 0, sessionValue = 0, lastShift = 0;
  try {new PerformanceObserver(list => {for (const e of list.getEntries()) result.lcp = Math.round(e.startTime);}).observe({type:'largest-contentful-paint',buffered:true});} catch {}
  try {new PerformanceObserver(list => {for (const e of list.getEntries()) {if(e.hadRecentInput)continue;if(e.startTime-lastShift>1000 || e.startTime-sessionStart>5000){sessionStart=e.startTime;sessionValue=0;}sessionValue+=e.value;lastShift=e.startTime;result.cls=Math.max(result.cls,sessionValue);}}).observe({type:'layout-shift',buffered:true});} catch {}
  addEventListener('load', () => {
    const start = performance.now(); let first;
    function frame(now) {first ??= now;result.frameCount++;if(now-start<2500)requestAnimationFrame(frame);else result.frameDurationMs=Math.round((now-first)/Math.max(1,result.frameCount-1)*100)/100;}
    requestAnimationFrame(frame);
    setTimeout(() => {result.cls=Math.round(result.cls*10000)/10000;result.viewport=[innerWidth,innerHeight];result.documentWidth=document.documentElement.scrollWidth;const output=document.createElement('output');output.id='qa-metrics';output.hidden=true;output.textContent=JSON.stringify(result);document.body.append(output);console.info('LOCAL_REVIEW_METRICS',JSON.stringify(result));},4000);
  }, {once:true});
})();
</script>
"""
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs): super().__init__(*args, directory=str(ROOT), **kwargs)
    def do_GET(self):
        path=urlsplit(self.path).path
        if path == '/' or not (ROOT / path.lstrip('/')).is_file():
            html=(ROOT/'index.html').read_text()
            scenario=parse_qs(urlsplit(self.path).query).get('qa',['metrics'])[0]
            extra=''
            if scenario=='text-200': extra='<style>html{font-size:200%!important}</style>'
            if scenario=='no-webgl': extra="<script>const originalContext=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /^webgl/.test(type)?null:originalContext.call(this,type,...args)};</script>"
            if scenario=='reduced-motion': extra="<script>const originalMatchMedia=window.matchMedia.bind(window);window.matchMedia=function(query){const media=originalMatchMedia(query);if(query==='(prefers-reduced-motion: reduce)')Object.defineProperty(media,'matches',{value:true});return media;};</script>"
            if scenario=='live-motion': extra="""<script>
              (()=>{let reduced=false;const watched=[];const original=window.matchMedia.bind(window);
              window.matchMedia=query=>{const media=original(query);if(query==='(prefers-reduced-motion: reduce)'){Object.defineProperty(media,'matches',{get:()=>reduced});watched.push(media);}return media;};
              addEventListener('DOMContentLoaded',()=>{const button=document.createElement('button');button.textContent='Toggle system reduced motion (QA)';button.id='qa-motion-toggle';button.style.cssText='position:fixed;bottom:8px;right:8px;z-index:999;background:white;color:black;border:1px solid black;padding:12px';button.onclick=()=>{reduced=!reduced;for(const media of watched)media.dispatchEvent(new Event('change'));button.setAttribute('aria-pressed',reduced);};document.body.append(button);});})();
              </script>"""
            body=html.replace('</head>',extra+METRICS+'</head>').encode()
            self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Content-Length',str(len(body)));self.end_headers();self.wfile.write(body)
        else: super().do_GET()
print('Production QA preview: http://127.0.0.1:5174/', flush=True)
ThreadingHTTPServer(('127.0.0.1',5174),Handler).serve_forever()

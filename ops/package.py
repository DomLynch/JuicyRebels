#!/usr/bin/env python3
"""Freeze committed static runtime bytes; no compilation or public activation."""
import hashlib,io,json,subprocess,tarfile
from pathlib import Path
root=Path(__file__).resolve().parents[1]
sha=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
files=[root/name for name in ['index.html','style.css','lab.html','lab.css','manifest.webmanifest','icon.svg']]
files+=sorted((root/'src').glob('*.js'))+sorted((root/'vendor').glob('*'))
manifest={}
for p in sorted(files):
    name=str(p.relative_to(root));data=p.read_bytes()
    assert data==subprocess.check_output(['git','show',f'{sha}:{name}'],cwd=root),f'Uncommitted runtime file: {name}'
    manifest[name]=hashlib.sha256(data).hexdigest()
payload=hashlib.sha256(json.dumps(manifest,sort_keys=True,separators=(',',':')).encode()).hexdigest()
release=f'juicy-1-{sha[:8]}-{payload[:8]}'
out=root/'artifacts'/'release'/release
out.mkdir(parents=True,exist_ok=False)
meta={'release_id':release,'source_commit':sha,'payload_sha256':payload,'files_sha256':manifest}
meta_bytes=(json.dumps(meta,indent=2)+'\n').encode()
archive=out/'payload.tar'
with tarfile.open(archive,'w') as tar:
    for name in sorted(manifest):
        data=(root/name).read_bytes();item=tarfile.TarInfo(name);item.size=len(data);item.mode=0o644;tar.addfile(item,io.BytesIO(data))
    item=tarfile.TarInfo('release.json');item.size=len(meta_bytes);item.mode=0o644;tar.addfile(item,io.BytesIO(meta_bytes))
receipt={'release_id':release,'source_commit':sha,'payload_sha256':payload,'package_tar_sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'release_json_sha256':hashlib.sha256(meta_bytes).hexdigest(),'package_path':str(archive),'files_sha256':manifest}
(out/'package-receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps(receipt,indent=2))

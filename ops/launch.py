#!/usr/bin/env python3
"""Degree Choice first launch only. Run on VPS; never changes protected games."""
import argparse, hashlib, json, os, re, shutil, subprocess, time
from pathlib import Path
from urllib.request import urlopen
from urllib.error import URLError
CONF=Path('/etc/nginx/sites-available/degree-choice-armagedom.conf')
ROOT=Path('/var/www/juicyrebels')
BACKUP=Path('/var/backups/juicyrebels/first-launch-20261005')
ARCHIVE=ROOT/'archives/combat-18'
OLD=Path('/var/www/test-combat-armagedom-1/current')
def digest(data): return hashlib.sha256(data).hexdigest()
def inventory(path):
    result={}
    for p in sorted(path.rglob('*')):
        assert not p.is_symlink(), f'Unexpected symlink: {p}'
        if p.is_file(): result[str(p.relative_to(path))]=digest(p.read_bytes())
    return result
def get(url):
    for attempt in range(10):
        try:
            with urlopen(url,timeout=20) as response:
                assert response.status==200
                return response.geturl(),response.read()
        except URLError:
            if attempt==9: raise
            time.sleep(0.4)
def protected():
    configs={}
    for directory in ['sites-available','snippets','conf.d']:
        for p in sorted((Path('/etc/nginx')/directory).rglob('*')):
            if p.is_file() and p!=CONF: configs[str(p)]=digest(p.read_bytes())
    for name in ['nginx.conf','mime.types']:
        p=Path('/etc/nginx')/name;configs[str(p)]=digest(p.read_bytes())
    url,data=get('https://playarmagedom.com/')
    return {'nginx_sha256':configs,'main_served_url':url,'main_index_sha256':digest(data)}
def public_files(prefix,manifest):
    observed={}
    for name,sha in manifest.items():
        _,data=get(prefix+name);actual=digest(data);assert actual==sha,f'Public hash mismatch: {prefix+name}';observed[name]=actual
    return observed
def replace_config(text):
    tmp=CONF.with_suffix('.juicy-tmp');tmp.write_text(text);os.replace(tmp,CONF)
    subprocess.run(['nginx','-t'],check=True)
    subprocess.run(['systemctl','reload','nginx'],check=True)
def receipt(name,data):
    BACKUP.mkdir(parents=True,exist_ok=True);(BACKUP/name).write_text(json.dumps(data,indent=2)+'\n')
def prepare():
    assert not (BACKUP/'archive.json').exists(),'Archive already verified; reuse its receipt'
    assert OLD.resolve().name=='combat-18-ab135cc9-d6a9e9','Current test changed; inspect before continuing'
    before=protected();old_conf=CONF.read_text();assert 'root /var/www/test-combat-armagedom-1/current;' in old_conf
    manifest=inventory(OLD.resolve());public_files('https://degree-choice.com/',manifest)
    BACKUP.mkdir(parents=True,exist_ok=True)
    original=BACKUP/'degree-choice.original.conf'
    if original.exists(): assert original.read_text()==old_conf,'Current config differs from recorded original'
    else: original.write_text(old_conf)
    if not (BACKUP/'shooting-test-exact').exists(): shutil.copytree(OLD.resolve(),BACKUP/'shooting-test-exact')
    if not ARCHIVE.exists(): shutil.copytree(OLD.resolve(),ARCHIVE)
    assert inventory(ARCHIVE)==manifest==inventory(BACKUP/'shooting-test-exact')
    for p in ARCHIVE.rglob('*'): p.chmod(0o555 if p.is_dir() else 0o444)
    ARCHIVE.chmod(0o555)
    archive_config=old_conf.replace('    location = /armagedom {', '    location = /archive/combat-18 { return 308 /archive/combat-18/; }\n    location ^~ /archive/combat-18/ { alias /var/www/juicyrebels/archives/combat-18/; index index.html; }\n    location = /armagedom {')
    assert archive_config!=old_conf
    (BACKUP/'degree-choice.archive.conf').write_text(archive_config)
    (BACKUP/'rollback.sh').write_text('#!/bin/bash\nset -euo pipefail\ncp /var/backups/juicyrebels/first-launch-20261005/degree-choice.archive.conf /etc/nginx/sites-available/degree-choice-armagedom.conf.rollback-tmp\nmv /etc/nginx/sites-available/degree-choice-armagedom.conf.rollback-tmp /etc/nginx/sites-available/degree-choice-armagedom.conf\nnginx -t\nsystemctl reload nginx\n')
    (BACKUP/'rollback.sh').chmod(0o700)
    try:
        replace_config(archive_config)
        observed=public_files('https://degree-choice.com/archive/combat-18/',manifest)
        public_files('https://degree-choice.com/',manifest)
        after=protected();assert after==before,'Protected state changed during archive setup'
        receipt('archive.json',{'time_utc':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'source_root':str(OLD.resolve()),'archive_url':'https://degree-choice.com/archive/combat-18/','files_sha256':manifest,'public_files_sha256':observed,'protected_before':before,'protected_after':after,'original_config_sha256':digest(old_conf.encode()),'archive_config_sha256':digest(archive_config.encode())})
    except Exception:
        replace_config(old_conf);raise
    print(json.dumps({'archive':'https://degree-choice.com/archive/combat-18/','receipt':str(BACKUP/'archive.json'),'files':len(manifest)}))
def activate(release):
    candidate=ROOT/'releases'/release;assert candidate.is_dir()
    metadata=json.loads((candidate/'release.json').read_text());assert metadata['release_id']==release
    manifest=metadata['files_sha256'];assert all(digest((candidate/name).read_bytes())==sha for name,sha in manifest.items())
    archive=json.loads((BACKUP/'archive.json').read_text());public_files('https://degree-choice.com/archive/combat-18/',archive['files_sha256'])
    config=CONF.read_text();assert config==(BACKUP/'degree-choice.archive.conf').read_text(),'Degree Choice configuration changed since archive; inspect'
    before=protected();receipt('protected-preactivation.json',before)
    pointer=ROOT/'current';assert not pointer.exists() and not pointer.is_symlink(),'Existing Juicy current pointer requires separate intake'
    os.symlink(candidate,ROOT/'current.next');os.replace(ROOT/'current.next',pointer)
    new=config.replace('root /var/www/test-combat-armagedom-1/current;','root /var/www/juicyrebels/current;').replace('        text/plain txt;','        text/plain txt;\n        image/svg+xml svg;')
    assert new!=config
    try:
        replace_config(new)
        observed=public_files('https://degree-choice.com/',{**manifest,'release.json':digest((candidate/'release.json').read_bytes())})
        public_files('https://degree-choice.com/archive/combat-18/',archive['files_sha256'])
        after=protected();assert after==before,'Protected state changed during activation'
        receipt('activation.json',{'time_utc':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'release':metadata,'release_json_sha256':digest((candidate/'release.json').read_bytes()),'public_files_sha256':observed,'protected_before':before,'protected_after':after,'rollback_command':str(BACKUP/'rollback.sh'),'config_sha256':digest(new.encode())})
    except Exception:
        replace_config(config);raise
    print(json.dumps({'live':'https://degree-choice.com/','release_id':release,'receipt':str(BACKUP/'activation.json')}))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('action',choices=['archive','activate']);parser.add_argument('--release');a=parser.parse_args()
    if a.action=='archive':prepare()
    else:
        assert a.release and re.fullmatch(r'juicy-1-[a-f0-9]{8}-[a-f0-9]{8}',a.release)
        activate(a.release)

# Serverless Custom Build Script

Use custom build scripts for your serverless bundle (e.g. GOLANG).


config:


```yaml
custom:
  build:
    script: ./build.py
    directory: ./build # output directory of your build script
    options: --release --platform=linux --arch=static_amd64
```


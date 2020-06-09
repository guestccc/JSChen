# 从 docker 工作流来了解学习 docker



## 捋一下流程

![/assets/img/docker1](/assets/img/docker1.png)

流程描述：

首先 `dockerfile` 是用来干嘛的呢，他是用来定制镜像的一个东西（文件），可以把它想象做源码，通过**命令** `docker build` 之后会生成 `docker image`（镜像），其实就是可以理解成一个前端项目的打包，而 `docker image` 通过**命令** `docker run` 基于一个镜像 `docker image` 启动一个容器 `docker container`

::: tip 与前端项目做对比
前端项目: 源码打包 --> 打包后文件 --> 用打包后的文件在 xx 端口运行文件
docker: dockerfile打包 --> 镜像 --> 用打包后的镜像在 xx 端口运行容器

docker流程简化: dockerfile --> docker image --> docker container
:::

下面来分别细品一下这三个东西

## 1. dockerfile 

这个东西就是一个文件，文件里面写一条又一条的 指令 ，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。

举个例子

``` powershell
# dockerifle
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
```

上面这个 dockerifle 这个文件写了两行指令，也就是两层，可以想象成是楼层

|一层|`FROM nginx`|
|--|--|
|二层|`RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html`|

这个层的概念挺重要的，docker 如今这么🔥，这种机制就是原因之一

## 2. docker image 镜像

什么是镜像呢

指定 dockerfile 通过 **命令** `docker build` 后生成的文件系统

这个文件系统，他也是分层的哈，采用的是分级存储机制，

这种分层存储机制有些特别之处，举两个例子：

1. 两个层次和顺序上有所相同docker文件

```powershell
# Dcokerfile
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
RUN echo '<h1>Hello, Docker2!</h1>' > /usr/share/nginx/html/index.html
```

```powershell
# Dcokerfile.2
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
RUN echo '<h1>Hello, Docker3!</h1>' > /usr/share/nginx/html/index.html
```

分别打包两个 dockerfile 来研究下

> 我这里是在桌面目录下的 dockerfile 文件夹下建了两个文件，分别是 `Dockerfile.2` 和 `Dockerfile`，并且在桌面目录下执行了 `docker build`

**预设：本地已有 `nginx` 镜像， ID:ed21b7a8aee9**

`docker build -t nginx:ccc1 -f dockerfile/Dockerfile dockerfile`

```powershell
# Dcokerfile
ccc@cccde-MBP  ~/Desktop  docker build -t nginx:ccc1 -f dockerfile/Dockerfile dockerfile
Sending build context to Docker daemon  3.072kB
Step 1/3 : FROM nginx
 ---> ed21b7a8aee9 # 这里是直接拿的我本地的nginx镜像来作为这一层的镜像 -- 后面解释
Step 2/3 : RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
 ---> Running in 807fc992f1a2
Removing intermediate container 807fc992f1a2
 ---> 3e29b42cb5c0 # 这里是生成新一层镜像
Step 3/3 : RUN echo '<h1>Hello, Docker2!</h1>' > /usr/share/nginx/html/index.html
 ---> Running in 20cdcb26f67a
Removing intermediate container 20cdcb26f67a
 ---> 4e070946a40c # 这里是生成新一层镜像
Successfully built 4e070946a40c
Successfully tagged nginx:ccc1
```

`docker build -t nginx:ccc2 -f dockerfile/Dockerfile.2 dockerfile`

```powershell
# Dcokerfile.2
 ccc@cccde-MBP  ~/Desktop  docker build -t nginx:ccc2 -f dockerfile/Dockerfile.2 dockerfile
Sending build context to Docker daemon  3.072kB
Step 1/3 : FROM nginx
 ---> ed21b7a8aee # 这里是直接拿的我本地的nginx镜像来作为这一层的镜像 -- 后面解释
Step 2/3 : RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
 ---> Using cache
 ---> 3e29b42cb5c0  # 这里是用上一个镜像同一层的镜像
Step 3/3 : RUN echo '<h1>Hello, Docker3!</h1>' > /usr/share/nginx/html/index.html
 ---> Running in 653187eeac8b
Removing intermediate container 653187eeac8b
 ---> 03d5affd23d7 # 这里是生成新一层镜像
Successfully built 03d5affd23d7
Successfully tagged nginx:ccc2
```

解释：

首先本地已有 `nginx` 镜像，ID: ed21b7a8aee

假设这个 nginx 是两层哈，看下第一张图

![docker2](/assets/img/docker2.png)

看下第二张图：

![docker2](/assets/img/docker3.png)

第二张图，由于 nginx:ccc 镜像的第一层，引入的就是 nginx 镜像，所以直接引用了 nginx 镜像来作为 nginx:ccc 镜像的第一层镜像，那么 nginx:ccc 镜像的第一层与 nginx 镜像开始平行，而第二层以下，都是新生成一层镜像

看下第三张图：

![docker2](/assets/img/docker4.png)


第三张图，由于 nginx:ccc2 镜像的第一层，引入的就是 nginx 镜像，所以直接引用了 nginx 镜像来作为 nginx:ccc2 镜像的第一层镜像，那么 nginx:ccc2 镜像的第一层与 nginx 镜像和 nginx:ccc 镜像的第一层开始平行，那么 nginx:ccc2 镜像的第二层也与 nginx:ccc 镜像的第二层平行，而又因为 nginx:ccc2 镜像的第二层与 nginx:ccc 镜像的第二层平行且相等，所以 nginx:ccc2 在 docker build 的时候，第二层直接引用了 nginx:ccc 镜像的第二层

用表格来看的话是这样子


||nginx:ccc|nginx:ccc2|特点|
|--|--|--|--|
|第一层|nginx|nginx|同层且相同|
|第二层|`RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html`|`RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html`|同层且相同|
|第三层|`RUN echo '<h1>Hello, Docker2!</h1>' > /usr/share/nginx/html/index.html`|`RUN echo '<h1>Hello, Docker3!</h1>' > /usr/share/nginx/html/index.html`|同层且不相同|

## 3. docker container 容器

一句话，容器也是分层，区别在于，容器是运行时的，实实在在的在跑相应的镜像

区别在于什么呢，来理解一下哈

::: tip 重点理解 不懂找我
镜像所谓的的分层是对所有镜像中每一层整合后进行排版，存的只是尚未执行的执行过程的树状流程图，而容器是自己镜像所有层执行后的文件系统，也就是对于镜像而已，镜像与镜像之间可能共享某几层，而对于容器而言，容器和容器之间都是一份自己所属镜像运行的结果（这个结果其实就是所有层执行后，对文件系统的所有更改后的文件系统而已也就是文件而已）
:::

## 4. 常用命令

1. docker build


`docker build -t nginx:ccc2 -f dockerfile/Dockerfile.2 dockerfile`

指定 Dockerfile 目录 dockerfile/Dockerfile ，指定上下文为路径 dockerfile ，

--tag/-t 是tag，通常是 tag:name 格式或者 name 格式

-f 指定要使用的 Dockerfile 的路径

2. docker pull

`docker pull nginx`

3. docker image

`docker images -a` 

列出所有镜像

-a 所有

`docker images nginx`

列出所有 REPOSITORY 为 nginx 的镜像

`docker image prune`

删除虚悬镜像

4. docker run

`docker run -d --name myNginx -p 8080:80 nginx:ccc`

-d 后台运行

--name 给容器命名

-p 指定宿主端口:容器端口 映射

nginx:ccc 指定基础镜像

5. docker stop/start/restart

`docker stop/start/restart nginx`

停止，启动，重启 nginx 容器

6. docker rm

`docker rm nginx`

删除 nginx 容器

`docker rmi nginx`

7. docker-compose



参考链接

这边感谢一下 bingo ，能有这篇文章的输出得感谢 bingo 通宵教学

[bingo blog](https://bingozb.github.io/)

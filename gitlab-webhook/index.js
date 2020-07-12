// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const request = require("request");
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

// 创建一个Koa对象表示web app本身:
const app = new Koa();


const HEADER_KEY = "x-gitlab-event";

const HEADER_KEY_V2 = "X-Gitlab-Event";

const EVENTS = {
  "Push Hook": "push",
  "Tag Push Hook": "tag_push",
  "Issue Hook": "issue",
  "Note Hook": "note",//comment
  "Merge Request Hook": "merge_request",
  "Review Hook": "review"
};

const actionWords = {
  "open": "发起🚀",
  "close": "关闭🔕",
  "reopen": "重新发起♻️🚀",
  "update": "更新💄",
  "merge": "合并💋"
};

let  robotKey = ''

// 请求
function sendHttpRequest(msg) {
  return new Promise(function (resolve, reject) {
    console.log(robotKey,'robotKey');
    
    request.post(
      // 测试群
      // 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=e713fb3d-73c5-4a4c-a7d1-f1cbe0a66d5a',
      // 前端群
      // 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=5e1f8127-8a90-48b2-bc86-40d363c4d28c',
      `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${robotKey}`,
      {
        json: {
          "msgtype": "markdown",
          "markdown": {content:msg}
        }
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          if (body.errcode === 0 && body.errmsg === "ok") {
            console.log("机器人成功发送通知", body);
            resolve(response);
          } else {
            console.error("机器人发送通知失败", body);
            reject(body);
          }
        } else {
          console.error("调用机器人webhook失败", error);
          reject(error);
        }
      }
    );
  });
}


// 事件分流
async function getWebhook(ctx) {
  console.log("git webhook req", ctx.request);
  const event = ctx.request.header[HEADER_KEY] || ctx.request.header[HEADER_KEY_V2];
  
  if (!event) {
    ctx.body = `Sorry，这可能不是一个gitlab的webhook请求`;
    return;
  }

  // 拿key
  const url = ctx.request.url;
  const ROBOTKEY_REGEX = /key=([a-zA-Z0-9-]+)/g;
  const robotKeyRe = ROBOTKEY_REGEX.exec(url);
  robotKey = robotKeyRe && robotKeyRe[1];
  
  switch (EVENTS[event]) {
    case "push":
      return await handlePush(ctx);
    case "merge_request":
      return await handleMR(ctx);
    default:
      return await handleDefault(ctx, event);
  }
}

// push
async function handlePush(ctx) {
  const body = ctx.request.body
  let msg;
  console.log("ctx", ctx);
  const { user_name, repository, commits, ref } = body;
  const lastCommit = commits[0];
  const branchName = ref.replace("refs/heads/", "");
  msg = `项目 ${repository.name} 收到了一次push，提交者：${user_name}，最新提交信息：${lastCommit.message}`;
  ctx.body = msg;
  const mdMsg = `项目 **[${repository.name}](${repository.homepage})** 收到一次push提交
                    > 提交者:  \<font color= \"warning\"\>${user_name}\</font\>
                    > 分支:  \<font color= \"info\"\>${branchName}\</font\>
                    > 最新提交信息: \<font color= \"comment\"\> ${lastCommit.message}\</font\>`;
  await sendHttpRequest(mdMsg);
  ctx.status = 200;
  return;
}

// mergeRequest
async function handleMR(ctx) {
  const body = ctx.request.body
  const {user, object_attributes} = body;
  const attr = object_attributes;
  const mdMsg = ` ${user.name} @陈程城 
                在 **[${attr.source.name}](${attr.source.web_url})** \<font color= \"warning\"\>${actionWords[attr.action]}\</font\>了一个MR
                > 标题：\<font color= \"warning\"\>${attr.title}\</font\>
                > 源分支：\<font color= \"info\"\>${attr.source_branch}\</font\>
                > 目标分支：\<font color= \"comment\"\> ${attr.target_branch}\</font\>
                [查看MR详情](${attr.url})`;
    await sendHttpRequest(mdMsg);
    ctx.status = 200;
    return;
}

//  其他请求
async function handleDefault(ctx, event) {
  ctx.body = `Sorry，暂时还没有处理${event}事件`;
}


router.post('/gitlab/webhook', async (ctx, next) => {
  await getWebhook(ctx)
});

app.use(bodyParser());
app.use(router.routes());

// 在端口3000监听:
app.listen(3001);
console.log('app started at port 3001...');


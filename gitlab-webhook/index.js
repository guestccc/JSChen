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
  "Note Hook": "note",
  "Merge Request Hook": "merge_request",
  "Review Hook": "review"
};

let list = [
  // push
  {
    "object_kind": "push",
    "before": "95790bf891e76fee5e1747ab589903a6a1f80f22",
    "after": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
    "ref": "refs/heads/master",
    "checkout_sha": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
    "user_id": 4,
    "user_name": "ccc",
    "user_username": "jsmith",
    "user_email": "john@example.com",
    "user_avatar": "https://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=8://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=80",
    "project_id": 15,
    "project": {
      "id": 15,
      "name": "Diaspora",
      "description": "",
      "web_url": "http://example.com/mike/diaspora",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:mike/diaspora.git",
      "git_http_url": "http://example.com/mike/diaspora.git",
      "namespace": "Mike",
      "visibility_level": 0,
      "path_with_namespace": "mike/diaspora",
      "default_branch": "master",
      "homepage": "http://example.com/mike/diaspora",
      "url": "git@example.com:mike/diaspora.git",
      "ssh_url": "git@example.com:mike/diaspora.git",
      "http_url": "http://example.com/mike/diaspora.git"
    },
    "repository": {
      "name": "智能系统thor",
      "url": "git@example.com:mike/diaspora.git",
      "description": "",
      "homepage": "https://blog.jschen.cc",
      "git_http_url": "http://example.com/mike/diaspora.git",
      "git_ssh_url": "git@example.com:mike/diaspora.git",
      "visibility_level": 0
    },
    "commits": [
      {
        "id": "b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
        "message": "ccc推了一条更新",
        "timestamp": "2011-12-12T14:27:31+02:00",
        "url": "http://example.com/mike/diaspora/commit/b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
        "author": {
          "name": "Jordi Mallach",
          "email": "jordi@softcatala.org"
        },
        "added": ["CHANGELOG"],
        "modified": ["app/controller/application.rb"],
        "removed": []
      },
      {
        "id": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
        "message": "fixed readme",
        "timestamp": "2012-01-03T23:36:29+02:00",
        "url": "http://example.com/mike/diaspora/commit/da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
        "author": {
          "name": "GitLab dev user",
          "email": "gitlabdev@dv6700.(none)"
        },
        "added": ["CHANGELOG"],
        "modified": ["app/controller/application.rb"],
        "removed": []
      }
    ],
    "total_commits_count": 4
  },
  // create delete
  {
    "object_kind": "tag_push",
    "before": "0000000000000000000000000000000000000000",
    "after": "82b3d5ae55f7080f1e6022629cdb57bfae7cccc7",
    "ref": "refs/tags/v1.0.0",
    "checkout_sha": "82b3d5ae55f7080f1e6022629cdb57bfae7cccc7",
    "user_id": 1,
    "user_name": "John Smith",
    "user_avatar": "https://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=8://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=80",
    "project_id": 1,
    "project": {
      "id": 1,
      "name": "Example",
      "description": "",
      "web_url": "http://example.com/jsmith/example",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:jsmith/example.git",
      "git_http_url": "http://example.com/jsmith/example.git",
      "namespace": "Jsmith",
      "visibility_level": 0,
      "path_with_namespace": "jsmith/example",
      "default_branch": "master",
      "homepage": "http://example.com/jsmith/example",
      "url": "git@example.com:jsmith/example.git",
      "ssh_url": "git@example.com:jsmith/example.git",
      "http_url": "http://example.com/jsmith/example.git"
    },
    "repository": {
      "name": "Example",
      "url": "ssh://git@example.com/jsmith/example.git",
      "description": "",
      "homepage": "http://example.com/jsmith/example",
      "git_http_url": "http://example.com/jsmith/example.git",
      "git_ssh_url": "git@example.com:jsmith/example.git",
      "visibility_level": 0
    },
    "commits": [],
    "total_commits_count": 0
  },
  // issues
  {
    "object_kind": "issue",
    "user": {
      "name": "Administrator",
      "username": "root",
      "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
    },
    "project": {
      "id": 1,
      "name": "Gitlab Test",
      "description": "Aut reprehenderit ut est.",
      "web_url": "http://example.com/gitlabhq/gitlab-test",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:gitlabhq/gitlab-test.git",
      "git_http_url": "http://example.com/gitlabhq/gitlab-test.git",
      "namespace": "GitlabHQ",
      "visibility_level": 20,
      "path_with_namespace": "gitlabhq/gitlab-test",
      "default_branch": "master",
      "homepage": "http://example.com/gitlabhq/gitlab-test",
      "url": "http://example.com/gitlabhq/gitlab-test.git",
      "ssh_url": "git@example.com:gitlabhq/gitlab-test.git",
      "http_url": "http://example.com/gitlabhq/gitlab-test.git"
    },
    "repository": {
      "name": "Gitlab Test",
      "url": "http://example.com/gitlabhq/gitlab-test.git",
      "description": "Aut reprehenderit ut est.",
      "homepage": "http://example.com/gitlabhq/gitlab-test"
    },
    "object_attributes": {
      "id": 301,
      "title": "New API: create/update/delete file",
      "assignee_ids": [51],
      "assignee_id": 51,
      "author_id": 51,
      "project_id": 14,
      "created_at": "2013-12-03T17:15:43Z",
      "updated_at": "2013-12-03T17:15:43Z",
      "position": 0,
      "branch_name": null,
      "description": "Create new API for manipulations with repository",
      "milestone_id": null,
      "state": "opened",
      "iid": 23,
      "url": "http://example.com/diaspora/issues/23",
      "action": "open"
    },
    "assignees": [{
      "name": "User1",
      "username": "user1",
      "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
    }],
    "assignee": {
      "name": "User1",
      "username": "user1",
      "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
    },
    "labels": [{
      "id": 206,
      "title": "API",
      "color": "#ffffff",
      "project_id": 14,
      "created_at": "2013-12-03T17:15:43Z",
      "updated_at": "2013-12-03T17:15:43Z",
      "template": false,
      "description": "API related issues",
      "type": "ProjectLabel",
      "group_id": 41
    }],
    "changes": {
      "updated_by_id": {
        "previous": null,
        "current": 1
      },
      "updated_at": {
        "previous": "2017-09-15 16:50:55 UTC",
        "current": "2017-09-15 16:52:00 UTC"
      },
      "labels": {
        "previous": [{
          "id": 206,
          "title": "API",
          "color": "#ffffff",
          "project_id": 14,
          "created_at": "2013-12-03T17:15:43Z",
          "updated_at": "2013-12-03T17:15:43Z",
          "template": false,
          "description": "API related issues",
          "type": "ProjectLabel",
          "group_id": 41
        }],
        "current": [{
          "id": 205,
          "title": "Platform",
          "color": "#123123",
          "project_id": 14,
          "created_at": "2013-12-03T17:15:43Z",
          "updated_at": "2013-12-03T17:15:43Z",
          "template": false,
          "description": "Platform related issues",
          "type": "ProjectLabel",
          "group_id": 41
        }]
      }
    }
  },
  // note hook commit
  {
    "object_kind": "note",
    "user": {
      "name": "Administrator",
      "username": "root",
      "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
    },
    "project_id": 5,
    "project": {
      "id": 5,
      "name": "Gitlab Test",
      "description": "Aut reprehenderit ut est.",
      "web_url": "http://example.com/gitlabhq/gitlab-test",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:gitlabhq/gitlab-test.git",
      "git_http_url": "http://example.com/gitlabhq/gitlab-test.git",
      "namespace": "GitlabHQ",
      "visibility_level": 20,
      "path_with_namespace": "gitlabhq/gitlab-test",
      "default_branch": "master",
      "homepage": "http://example.com/gitlabhq/gitlab-test",
      "url": "http://example.com/gitlabhq/gitlab-test.git",
      "ssh_url": "git@example.com:gitlabhq/gitlab-test.git",
      "http_url": "http://example.com/gitlabhq/gitlab-test.git"
    },
    "repository": {
      "name": "Gitlab Test",
      "url": "http://example.com/gitlab-org/gitlab-test.git",
      "description": "Aut reprehenderit ut est.",
      "homepage": "http://example.com/gitlab-org/gitlab-test"
    },
    "object_attributes": {
      "id": 1243,
      "note": "This is a commit comment. How does this work?",
      "noteable_type": "Commit",
      "author_id": 1,
      "created_at": "2015-05-17 18:08:09 UTC",
      "updated_at": "2015-05-17 18:08:09 UTC",
      "project_id": 5,
      "attachment": null,
      "line_code": "bec9703f7a456cd2b4ab5fb3220ae016e3e394e3_0_1",
      "commit_id": "cfe32cf61b73a0d5e9f13e774abde7ff789b1660",
      "noteable_id": null,
      "system": false,
      "st_diff": {
        "diff": "--- /dev/null\n+++ b/six\n@@ -0,0 +1 @@\n+Subproject commit 409f37c4f05865e4fb208c771485f211a22c4c2d\n",
        "new_path": "six",
        "old_path": "six",
        "a_mode": "0",
        "b_mode": "160000",
        "new_file": true,
        "renamed_file": false,
        "deleted_file": false
      },
      "url": "http://example.com/gitlab-org/gitlab-test/commit/cfe32cf61b73a0d5e9f13e774abde7ff789b1660#note_1243"
    },
    "commit": {
      "id": "cfe32cf61b73a0d5e9f13e774abde7ff789b1660",
      "message": "Add submodule\n\nSigned-off-by: Dmitriy Zaporozhets \u003cdmitriy.zaporozhets@gmail.com\u003e\n",
      "timestamp": "2014-02-27T10:06:20+02:00",
      "url": "http://example.com/gitlab-org/gitlab-test/commit/cfe32cf61b73a0d5e9f13e774abde7ff789b1660",
      "author": {
        "name": "Dmitriy Zaporozhets",
        "email": "dmitriy.zaporozhets@gmail.com"
      }
    }
  },
  // note hook merge request
  {
    "object_kind": "note",
    "user": {
      "name": "Administrator",
      "username": "root",
      "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
    },
    "project_id": 5,
    "project": {
      "id": 5,
      "name": "Gitlab Test",
      "description": "Aut reprehenderit ut est.",
      "web_url": "http://example.com/gitlab-org/gitlab-test",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
      "git_http_url": "http://example.com/gitlab-org/gitlab-test.git",
      "namespace": "Gitlab Org",
      "visibility_level": 10,
      "path_with_namespace": "gitlab-org/gitlab-test",
      "default_branch": "master",
      "homepage": "http://example.com/gitlab-org/gitlab-test",
      "url": "http://example.com/gitlab-org/gitlab-test.git",
      "ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
      "http_url": "http://example.com/gitlab-org/gitlab-test.git"
    },
    "repository": {
      "name": "Gitlab Test",
      "url": "http://localhost/gitlab-org/gitlab-test.git",
      "description": "Aut reprehenderit ut est.",
      "homepage": "http://example.com/gitlab-org/gitlab-test"
    },
    "object_attributes": {
      "id": 1244,
      "note": "This MR needs work.",
      "noteable_type": "MergeRequest",
      "author_id": 1,
      "created_at": "2015-05-17 18:21:36 UTC",
      "updated_at": "2015-05-17 18:21:36 UTC",
      "project_id": 5,
      "attachment": null,
      "line_code": null,
      "commit_id": "",
      "noteable_id": 7,
      "system": false,
      "st_diff": null,
      "url": "http://example.com/gitlab-org/gitlab-test/merge_requests/1#note_1244"
    },
    "merge_request": {
      "id": 7,
      "target_branch": "markdown",
      "source_branch": "master",
      "source_project_id": 5,
      "author_id": 8,
      "assignee_id": 28,
      "title": "Tempora et eos debitis quae laborum et.",
      "created_at": "2015-03-01 20:12:53 UTC",
      "updated_at": "2015-03-21 18:27:27 UTC",
      "milestone_id": 11,
      "state": "opened",
      "merge_status": "cannot_be_merged",
      "target_project_id": 5,
      "iid": 1,
      "description": "Et voluptas corrupti assumenda temporibus. Architecto cum animi eveniet amet asperiores. Vitae numquam voluptate est natus sit et ad id.",
      "position": 0,
      "source": {
        "name": "Gitlab Test",
        "description": "Aut reprehenderit ut est.",
        "web_url": "http://example.com/gitlab-org/gitlab-test",
        "avatar_url": null,
        "git_ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
        "git_http_url": "http://example.com/gitlab-org/gitlab-test.git",
        "namespace": "Gitlab Org",
        "visibility_level": 10,
        "path_with_namespace": "gitlab-org/gitlab-test",
        "default_branch": "master",
        "homepage": "http://example.com/gitlab-org/gitlab-test",
        "url": "http://example.com/gitlab-org/gitlab-test.git",
        "ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
        "http_url": "http://example.com/gitlab-org/gitlab-test.git"
      },
      "target": {
        "name": "Gitlab Test",
        "description": "Aut reprehenderit ut est.",
        "web_url": "http://example.com/gitlab-org/gitlab-test",
        "avatar_url": null,
        "git_ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
        "git_http_url": "http://example.com/gitlab-org/gitlab-test.git",
        "namespace": "Gitlab Org",
        "visibility_level": 10,
        "path_with_namespace": "gitlab-org/gitlab-test",
        "default_branch": "master",
        "homepage": "http://example.com/gitlab-org/gitlab-test",
        "url": "http://example.com/gitlab-org/gitlab-test.git",
        "ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
        "http_url": "http://example.com/gitlab-org/gitlab-test.git"
      },
      "last_commit": {
        "id": "562e173be03b8ff2efb05345d12df18815438a4b",
        "message": "Merge branch 'another-branch' into 'master'\n\nCheck in this test\n",
        "timestamp": "2015-04-08T21: 00:25-07:00",
        "url": "http://example.com/gitlab-org/gitlab-test/commit/562e173be03b8ff2efb05345d12df18815438a4b",
        "author": {
          "name": "John Smith",
          "email": "john@example.com"
        }
      },
      "work_in_progress": false,
      "assignee": {
        "name": "User1",
        "username": "user1",
        "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
      }
    }
  },
  // note hook issues
  {
    "object_kind": "note",
    "user": {
      "name": "Administrator",
      "username": "root",
      "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=40\u0026d=identicon"
    },
    "project_id": 5,
    "project": {
      "id": 5,
      "name": "Gitlab Test",
      "description": "Aut reprehenderit ut est.",
      "web_url": "http://example.com/gitlab-org/gitlab-test",
      "avatar_url": null,
      "git_ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
      "git_http_url": "http://example.com/gitlab-org/gitlab-test.git",
      "namespace": "Gitlab Org",
      "visibility_level": 10,
      "path_with_namespace": "gitlab-org/gitlab-test",
      "default_branch": "master",
      "homepage": "http://example.com/gitlab-org/gitlab-test",
      "url": "http://example.com/gitlab-org/gitlab-test.git",
      "ssh_url": "git@example.com:gitlab-org/gitlab-test.git",
      "http_url": "http://example.com/gitlab-org/gitlab-test.git"
    },
    "repository": {
      "name": "diaspora",
      "url": "git@example.com:mike/diaspora.git",
      "description": "",
      "homepage": "http://example.com/mike/diaspora"
    },
    "object_attributes": {
      "id": 1241,
      "note": "Hello world",
      "noteable_type": "Issue",
      "author_id": 1,
      "created_at": "2015-05-17 17:06:40 UTC",
      "updated_at": "2015-05-17 17:06:40 UTC",
      "project_id": 5,
      "attachment": null,
      "line_code": null,
      "commit_id": "",
      "noteable_id": 92,
      "system": false,
      "st_diff": null,
      "url": "http://example.com/gitlab-org/gitlab-test/issues/17#note_1241"
    },
    "issue": {
      "id": 92,
      "title": "test",
      "assignee_ids": [],
      "assignee_id": null,
      "author_id": 1,
      "project_id": 5,
      "created_at": "2015-04-12 14:53:17 UTC",
      "updated_at": "2015-04-26 08:28:42 UTC",
      "position": 0,
      "branch_name": null,
      "description": "test",
      "milestone_id": null,
      "state": "closed",
      "iid": 17,
      "labels": [
        {
          "id": 25,
          "title": "Afterpod",
          "color": "#3e8068",
          "project_id": null,
          "created_at": "2019-06-05T14:32:20.211Z",
          "updated_at": "2019-06-05T14:32:20.211Z",
          "template": false,
          "description": null,
          "type": "GroupLabel",
          "group_id": 4
        },
        {
          "id": 86,
          "title": "Element",
          "color": "#231afe",
          "project_id": 4,
          "created_at": "2019-06-05T14:32:20.637Z",
          "updated_at": "2019-06-05T14:32:20.637Z",
          "template": false,
          "description": null,
          "type": "ProjectLabel",
          "group_id": null
        }
      ],
    }
  }
]

function sendHttpRequest(msg) {
  return new Promise(function (resolve, reject) {
    request.post(
      // 测试群
      // 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=e713fb3d-73c5-4a4c-a7d1-f1cbe0a66d5a',
      // 前端群
      'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=5e1f8127-8a90-48b2-bc86-40d363c4d28c',
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

async function getWebhook(ctx) {
  console.log("git webhook req", ctx.request);
  const event = ctx.request.header[HEADER_KEY] || ctx.request.header[HEADER_KEY_V2];
  console.log(event,'event');
  
  if (!event) {
    ctx.body = `Sorry，这可能不是一个gitlab的webhook请求`;
    return;
  }
  const url = ctx.request.url;
  const ROBOTKEY_REGEX = /key=([a-zA-Z0-9-]+)/g;
  const robotKeyRe = ROBOTKEY_REGEX.exec(url);
  const robotKey = robotKeyRe && robotKeyRe[1];
  console.log('key', robotKey)

  if (ctx.request.header["x-event-test"] == "true") {
    // test事件中仅处理push，否则推送太多
    if (EVENTS[event] == "push") {
      return await handleTest(ctx, robotKey);
    } else {
      ctx.status = 200;
      ctx.body = "其他test请求我可不会管";
      return;
    }
  }
  switch (EVENTS[event]) {
    case "push":
      return await handlePush(ctx, robotKey);
    case "merge_request":
      return await handleMR(ctx, robotKey);
    case "issue":
      return await handleIssue(ctx, robotKey);
    default:
      return await handleDefault(ctx, event);
  }
}


async function handlePush(ctx, robotKey) {
  const body = ctx.request.body
  let msg;
  console.log("ctx", ctx);
  const { user_name, repository, commits, ref } = body;
  if (repository.name === "project_test" && user_name === "user_test") {
    msg = "收到一次webhook test";
    ctx.body = msg;
    return
  } else {
    const lastCommit = commits[0];
    const branchName = ref.replace("refs/heads/", "");
    msg = `项目 ${repository.name} 收到了一次push，提交者：${user_name}，最新提交信息：${lastCommit.message}`;
    ctx.body = msg;
    const mdMsg = `项目 **[${repository.name}](${repository.homepage})** 收到一次push提交
                     > 提交者:  \<font color= \"warning\"\>${user_name}\</font\>
                     > 分支:  \<font color= \"info\"\>${branchName}\</font\>
                     > 最新提交信息: \<font color= \"comment\"\> ${lastCommit.message}\</font\>`;
    await sendHttpRequest(mdMsg,robotKey);
    ctx.status = 200;
    return;
  }
}

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
});


router.get('/gitlab/webhook', async (ctx, next) => {
  console.log('成功了get')
  console.log(ctx.request);
  await getWebhook({
    request:{
      header:{
        'x-gitlab-event':'Push Hook'
      },
      url:'xxx?key=e713fb3d-73c5-4a4c-a7d1-f1cbe0a66d5a',
      body:{
        "object_kind": "push",
        "before": "95790bf891e76fee5e1747ab589903a6a1f80f22",
        "after": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
        "ref": "refs/heads/master",
        "checkout_sha": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
        "user_id": 4,
        "user_name": "ccc",
        "user_username": "jsmith",
        "user_email": "john@example.com",
        "user_avatar": "https://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=8://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=80",
        "project_id": 15,
        "project": {
          "id": 15,
          "name": "Diaspora",
          "description": "",
          "web_url": "http://example.com/mike/diaspora",
          "avatar_url": null,
          "git_ssh_url": "git@example.com:mike/diaspora.git",
          "git_http_url": "http://example.com/mike/diaspora.git",
          "namespace": "Mike",
          "visibility_level": 0,
          "path_with_namespace": "mike/diaspora",
          "default_branch": "master",
          "homepage": "http://example.com/mike/diaspora",
          "url": "git@example.com:mike/diaspora.git",
          "ssh_url": "git@example.com:mike/diaspora.git",
          "http_url": "http://example.com/mike/diaspora.git"
        },
        "repository": {
          "name": "智能系统thor",
          "url": "git@example.com:mike/diaspora.git",
          "description": "",
          "homepage": "https://blog.jschen.cc",
          "git_http_url": "http://example.com/mike/diaspora.git",
          "git_ssh_url": "git@example.com:mike/diaspora.git",
          "visibility_level": 0
        },
        "commits": [
          {
            "id": "b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
            "message": "ccc推了一条更新",
            "timestamp": "2011-12-12T14:27:31+02:00",
            "url": "http://example.com/mike/diaspora/commit/b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
            "author": {
              "name": "Jordi Mallach",
              "email": "jordi@softcatala.org"
            },
            "added": ["CHANGELOG"],
            "modified": ["app/controller/application.rb"],
            "removed": []
          },
          {
            "id": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
            "message": "fixed readme",
            "timestamp": "2012-01-03T23:36:29+02:00",
            "url": "http://example.com/mike/diaspora/commit/da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
            "author": {
              "name": "GitLab dev user",
              "email": "gitlabdev@dv6700.(none)"
            },
            "added": ["CHANGELOG"],
            "modified": ["app/controller/application.rb"],
            "removed": []
          }
        ],
        "total_commits_count": 4
      }
    }
  })
});
router.post('/gitlab/webhook', async (ctx, next) => {
  console.log('成功了post')
  console.log(ctx.request);
  await sendHttpRequest(ctx.request.method)
});

app.use(bodyParser());
app.use(router.routes());

// 在端口3000监听:
// app.listen(3000);
console.log('app started at port 3000...');

getWebhook({
  request:{
    header:{
      'x-gitlab-event':'Push Hook'
    },
    url:'xxx?key=e713fb3d-73c5-4a4c-a7d1-f1cbe0a66d5a',
    body:{
      "object_kind": "push",
      "before": "95790bf891e76fee5e1747ab589903a6a1f80f22",
      "after": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
      "ref": "refs/heads/master",
      "checkout_sha": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
      "user_id": 4,
      "user_name": "ccc",
      "user_username": "jsmith",
      "user_email": "john@example.com",
      "user_avatar": "https://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=8://s.gravatar.com/avatar/d4c74594d841139328695756648b6bd6?s=80",
      "project_id": 15,
      "project": {
        "id": 15,
        "name": "Diaspora",
        "description": "",
        "web_url": "http://example.com/mike/diaspora",
        "avatar_url": null,
        "git_ssh_url": "git@example.com:mike/diaspora.git",
        "git_http_url": "http://example.com/mike/diaspora.git",
        "namespace": "Mike",
        "visibility_level": 0,
        "path_with_namespace": "mike/diaspora",
        "default_branch": "master",
        "homepage": "http://example.com/mike/diaspora",
        "url": "git@example.com:mike/diaspora.git",
        "ssh_url": "git@example.com:mike/diaspora.git",
        "http_url": "http://example.com/mike/diaspora.git"
      },
      "repository": {
        "name": "智能系统thor",
        "url": "git@example.com:mike/diaspora.git",
        "description": "",
        "homepage": "https://blog.jschen.cc",
        "git_http_url": "http://example.com/mike/diaspora.git",
        "git_ssh_url": "git@example.com:mike/diaspora.git",
        "visibility_level": 0
      },
      "commits": [
        {
          "id": "b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
          "message": "ccc推了一条更新",
          "timestamp": "2011-12-12T14:27:31+02:00",
          "url": "http://example.com/mike/diaspora/commit/b6568db1bc1dcd7f8b4d5a946b0b91f9dacd7327",
          "author": {
            "name": "Jordi Mallach",
            "email": "jordi@softcatala.org"
          },
          "added": ["CHANGELOG"],
          "modified": ["app/controller/application.rb"],
          "removed": []
        },
        {
          "id": "da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
          "message": "fixed readme",
          "timestamp": "2012-01-03T23:36:29+02:00",
          "url": "http://example.com/mike/diaspora/commit/da1560886d4f094c3e6c9ef40349f7d38b5d27d7",
          "author": {
            "name": "GitLab dev user",
            "email": "gitlabdev@dv6700.(none)"
          },
          "added": ["CHANGELOG"],
          "modified": ["app/controller/application.rb"],
          "removed": []
        }
      ],
      "total_commits_count": 4
    }
  }
})
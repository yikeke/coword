// 获取 url 的 html 源文件
// 获取 html 源文件的有效内容
// 把有效内容输入到 python 词频脚本中
// 输出 词频，返回给前端

var repoInfo = {};

function generate() {
    var link = $('#input-link').val();
    if (link) {
        $("#status").text("生成中……");
        console.log("Input URL: " + link);
        var content = reqData(link);
        setTimeout(function () {
            zipIssues(content);
        }, 0)
    }
    else {
        $("#status").text("URL is required.");
    }
}

function postData(input) {
    $.ajax({
    type: "POST",
    url: "/py/index.py",
    data: { param: input },
    success: callbackFunc
    });
    }
    function callbackFunc(response) {
    // do something with the response
    console.log(response);
    }
    postData('data to process');

$(function () {
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            $("#generate").click();
        }
    });
});
/*
//解析 url、生成 api 的 url
function parseUrl(crtUrl) {
    var urlSplit = crtUrl.split('/');
    //console.log(urlSplit);//list
    var username = urlSplit[3];
    var repopath = urlSplit[4];
    repoInfo.username = username;
    repoInfo.repopath = repopath;
    var api = "https://api.github.com/repos/" + username + "/" + repopath;

    console.log("Get GitHub api URL:" + api);
    return api;
}

// 打包issues
function zipIssues(apiUrl) {
    var zip = new JSZip();
    var total_issues = reqIssNum(apiUrl);
    var maxPageIssuesNum = 30;
    var total_pages = Math.ceil(total_issues / maxPageIssuesNum);
    console.log("Total pages: " + total_pages);
    if (total_issues == undefined) {
        $("#status").text("Request failed.");
        return;
    } else if (total_issues == 0) {
        $("#status").text("No issue.");
        return;
    }
    for (var p = 1; p <= total_pages; p++) {
        var issueInfo = reqIssData(apiUrl, p);
        if (issueInfo == undefined) {
            $("#status").text("Request failed.");
        }
        var len = issueInfo.length;
        //当前页的issue总数
        console.log("p" + p + " issues number: " + len);
        for (var i = 0; i < len; i++) {
            var title = issueInfo[i].title;
            var number = issueInfo[i].number;
            var content = issueInfo[i].body;
            var tags = "";
            var lablesNum = issueInfo[i].labels.length;

            for (var j = 0; j < lablesNum; j++) {
                var label = issueInfo[i].labels[j].name;
                tags += label;
                if (j < lablesNum - 1) {
                    tags += ",";
                }
            }
            tags = tags.replace(/[\\]/g, "↘").replace(/[\/]/g, "↗");//防止/和\构成文件夹
            title = title.replace(/[\\]/g, "↘").replace(/[\/]/g, "↗");
            //添加md文件名称和内容
            if (tags != "") {
                zip.folder("P" + p).file(number + " " + tags + "-" + title + ".md", content);
            } else {
                zip.folder("P" + p).file(number + " " + title + ".md", content);
            }
        }
    }

    zip.generateAsync({
        type: "blob"
    }).then(function (content) {
        //打包
        saveAs(content, "[Gissue] " + repoInfo.username + "-" + repoInfo.repopath + " #" + repoInfo.newest + ".zip");
    });
    $("#status").text("Done.");
}


function reqIssNum(apiUrl) {
    var total_issues;
    $.ajax({
        url: apiUrl,
        type: "GET",
        async: false,
        success: function (repoInfo) {
            total_issues = repoInfo.open_issues;
        }
    });

    console.log("Total issues: " + total_issues);
    return total_issues;
}


function reqIssData(apiUrl, pageNO) {
    var oriData;
    $.ajax({
        url: apiUrl + "/issues?page=" + pageNO,
        type: "GET",
        async: false,
        //dataType: "jsonp",
        success: function (issueInfo) {
            var pageIssuesNum = issueInfo.length;
            if (pageNO == 1) {
                repoInfo.newest = issueInfo[0].number;
            }
            if (pageIssuesNum == undefined) {
                $("#status").text("Request failed.");
                return;
            }
            oriData = issueInfo;
        }
    });
    return oriData;
}
*/
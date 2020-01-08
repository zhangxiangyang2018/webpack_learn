// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 100; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 10), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
 
    return {
        articles: articles
    }
}
 
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);
const getUsers = function() {
    let data = [];
    for (let i = 0; i < 5; i++) {
        let newArticleObject = {
            nickName: Random.name(), //  Random.csentence( min, max )
            userName: Random.cname(5, 10), //  Random.csentence( min, max )
            locked:0,
            id:Random.csentence(5, 10),
            roles:getUserRole()
        }
        data.push(newArticleObject)
    }
 
    return {
        data: data
    }
}
const getUserRole = function() {
    let data = [];
    for (let i = 0; i < 3; i++) {
        let newArticleObject = {
            roleKey: Random.cname(), //  Random.csentence( min, max )
            name: Random.csentence(5, 10), //  Random.csentence( min, max )
            locked:0,
            id:Random.csentence(5, 10),
            status: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
        }
        data.push(newArticleObject)
    }
 
    return data
}
 
// 所有用户
Mock.mock('/news/userList', 'post', getUsers);


const getRoles = function() {
    let data = [];
    for (let i = 0; i < 5; i++) {
        let newArticleObject = {
            roleKey: Random.cname(), //  Random.csentence( min, max )
            name: Random.csentence(5, 10), //  Random.csentence( min, max )
            locked:0,
            id:Random.name(5, 10),
            status: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
        }
        data.push(newArticleObject)
    }
 
    return {
        data: data
    }
}
// 所有角色
Mock.mock('/news/roleAll', 'post', getRoles);
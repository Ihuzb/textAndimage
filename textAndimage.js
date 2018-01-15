/**
 * Created by Administrator on 2017/7/14.
 */
var fs = require('fs');
var images = require('images');
var TextToSVG = require('text-to-svg');
var async = require('async');
var gm = require('gm');
var textToSVG = TextToSVG.loadSync('./svgfile/simhei.ttf');
var sourceImg = images('./svgfile/background1.png');
var timestamp = Date.parse(new Date());
var userid = 29115;
var svgPath = './svgfile/' + timestamp + '_' + userid + '_svg';
var svgName = timestamp + '_' + userid + '_svgcard.png';
var svg1 = textToSVG.getSVG('共晒了6次餐', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});

var svg2 = textToSVG.getSVG('为留守儿童捐赠了10000分', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});
var svg3 = textToSVG.getSVG('爱心积分12344分', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});
var svg4 = textToSVG.getSVG('爱心排名是第10名', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});
var svg5 = textToSVG.getSVG('帝听', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});
var filePath = [];
async.series({
    svg1: function (callback) {
        fs.writeFileSync(svgPath + '1.svg', svg1);
        gm(svgPath + '1.svg').write(svgPath + '1.png', function (err) {
            if (!err) console.log('image converted.');
            var target2Img = images(svgPath + '1.png');
            var offsetX2 = 100;
            var offsetY2 = 465;
            filePath.push(svgPath + '1.svg', svgPath + '1.png');
            callback(null, target2Img, offsetX2, offsetY2);
        })
    },
    svg2: function (callback) {
        fs.writeFileSync(svgPath + '2.svg', svg2);
        gm(svgPath + '2.svg').write(svgPath + '2.png', function (err) {
            if (!err) console.log('image converted.');
            var target1Img = images(svgPath + '2.png');
            var offsetX1 = 450;
            var offsetY1 = 465;
            filePath.push(svgPath + '2.svg', svgPath + '2.png');
            callback(null, target1Img, offsetX1, offsetY1);
        })
    },
    svg3: function (callback) {
        fs.writeFileSync(svgPath + '3.svg', svg3);
        gm(svgPath + '3.svg').write(svgPath + '3.png', function (err) {
            if (!err) console.log('image converted.');
            var target1Img = images(svgPath + '3.png');
            var offsetX1 = 100;
            var offsetY1 = 575;
            filePath.push(svgPath + '3.svg', svgPath + '3.png');
            callback(null, target1Img, offsetX1, offsetY1);
        })
    },
    svg4: function (callback) {
        fs.writeFileSync(svgPath + '4.svg', svg4);
        gm(svgPath + '4.svg').write(svgPath + '4.png', function (err) {
            if (!err) console.log('image converted.');
            var target1Img = images(svgPath + '4.png');
            var offsetX1 = 450;
            var offsetY1 = 575;
            filePath.push(svgPath + '4.svg', svgPath + '4.png');
            callback(null, target1Img, offsetX1, offsetY1);
        })
    }
}, function (err, results) {
    console.log(results)
    images(sourceImg)
        .draw(images("/home/img/qrc1/headimg/headoJk_JwD8aMN1ZvlqNGyRm0xcOjM8.jpg"), 310, 100)
        .draw(results.svg1[0], results.svg1[1], results.svg1[2])
        .draw(results.svg2[0], results.svg2[1], results.svg2[2])
        .draw(results.svg3[0], results.svg3[1], results.svg3[2])
        .draw(results.svg4[0], results.svg4[1], results.svg4[2])
        .save(svgPath + 'card.png', {quality: 100});
    //删除多余文件
    filePath.forEach(function (pa) {
        fs.unlinkSync(pa);
    })
    console.log('ok', svgName);
});














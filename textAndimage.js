/**
 * Created by Administrator on 2017/7/14.
 */
const fs = require('fs');
const images = require('images');
const TextToSVG = require('text-to-svg');
const async = require('async');
const gm = require('gm');
// 主要文件目录
const mainPath = './svgfile/';
// 设置字体黑体
const textToSVG = TextToSVG.loadSync(mainPath + 'simhei.ttf');
// 设置背景图片
const sourceImg = images(mainPath + 'background1.png');
// 设置时间戳来区分名称
const timestamp = Date.parse(new Date()) / 1000;
// 保存的svg文件名称
const svgPath = mainPath + timestamp + '_svg';
// 生成的合成图片名称
const svgName = timestamp + '_svgcard.png';
// 设置文字
const svg1 = textToSVG.getSVG('共晒了6次餐', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});
const svg2 = textToSVG.getSVG('为留守儿童捐赠了10000分', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});
const svg3 = textToSVG.getSVG('爱心积分12344分', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});
const svg4 = textToSVG.getSVG('爱心排名是第10名', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});
const svg5 = textToSVG.getSVG('帝听', {
    x: 0,
    y: 0,
    fontSize: 25,
    anchor: 'top',
});
// 存储生成的svg文件名和svg转png图片名,用于后续删除
const filePath = [];
async.parallel({
    // 将生成的文字svg转换成图片,一并返回其文件名和尺寸
    svg1: callback => {
        fs.writeFileSync(svgPath + '1.svg', svg1);
        gm(svgPath + '1.svg').write(svgPath + '1.png', err => {
            if (!err) console.log('1.svg生成成功！');
            let target2Img = images(svgPath + '1.png');
            let offsetX2 = 100;
            let offsetY2 = 465;
            filePath.push(svgPath + '1.svg', svgPath + '1.png');
            callback(null, target2Img, offsetX2, offsetY2);
        })
    },
    svg2: callback => {
        fs.writeFileSync(svgPath + '2.svg', svg2);
        gm(svgPath + '2.svg').write(svgPath + '2.png', err => {
            if (!err) console.log('2.svg生成成功！');
            let target1Img = images(svgPath + '2.png');
            let offsetX1 = 450;
            let offsetY1 = 465;
            filePath.push(svgPath + '2.svg', svgPath + '2.png');
            callback(null, target1Img, offsetX1, offsetY1);
        })
    },
    svg3: callback => {
        fs.writeFileSync(svgPath + '3.svg', svg3);
        gm(svgPath + '3.svg').write(svgPath + '3.png', err => {
            if (!err) console.log('3.svg生成成功！');
            let target1Img = images(svgPath + '3.png');
            let offsetX1 = 100;
            let offsetY1 = 575;
            filePath.push(svgPath + '3.svg', svgPath + '3.png');
            callback(null, target1Img, offsetX1, offsetY1);
        })
    },
    svg4: callback => {
        fs.writeFileSync(svgPath + '4.svg', svg4);
        gm(svgPath + '4.svg').write(svgPath + '4.png', err => {
            if (!err) console.log('4.svg生成成功！');
            let target1Img = images(svgPath + '4.png');
            let offsetX1 = 450;
            let offsetY1 = 575;
            filePath.push(svgPath + '4.svg', svgPath + '4.png');
            callback(null, target1Img, offsetX1, offsetY1);
        })
    }
}, (err, results) => {
    images(sourceImg)
    // 头像路径
        .draw(images(mainPath+"headoJk_JwD8aMN1ZvlqNGyRm0xcOjM8.jpg"), 310, 100)
        .draw(results.svg1[0], results.svg1[1], results.svg1[2])
        .draw(results.svg2[0], results.svg2[1], results.svg2[2])
        .draw(results.svg3[0], results.svg3[1], results.svg3[2])
        .draw(results.svg4[0], results.svg4[1], results.svg4[2])
        .save(svgPath + 'card.png', {quality: 100});
    //删除多余文件
    filePath.forEach(pa => fs.unlinkSync(pa));
    console.log('ok', svgName);
});














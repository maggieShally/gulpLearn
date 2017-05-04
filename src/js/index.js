var arr = [ 1,2,3,4,5,6];
console.log(arr);
var str = 'langlign@qq.com';
var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
reg.test(str);
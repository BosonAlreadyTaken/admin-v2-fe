// 块级作用域
if(true){
    var test = 1;
}
console.log(test);

// 会计作用域
let arr = [1, 2, 3, 4];
for(let i = 0,iLength=arr.length; i<iLength;i++) {
    // do something
}
console.log(i)

//箭头函数

var obj = {
    commonFn: function() {
        console.log(this)
    },
    arrowFn: () => {
        console.log(this);
    }
}
obj.commonFn(); // this obj
obj.arrowFn(); // this window

//不能用作构造函数
let Animal = function() {}
let animal = new Animal();


let str = `
    <div>
        <h1>你好</h1>
    </div>
`
document.querySelector('body').innerHTML = str;

new Promise((resolve, reject) => {
    $.ajax({
        url: 'http://baidu.com/user/get_usr_info.do',
        type: 'post',
        success(res) {
            resolve(res)
        },
        error(err) {
            reject(err)
        }

    })
}).then((res) => {
    console.log('success:', res);
}, (err) => {
    console.log('error:', err);
})

class Animal{
    constructor() {
        this.name = 'animal';
    }
    getName() {
        return this.name;
    }
}
class Cat extends Animal{
    constructor() {
        super();
        this.name = 'cat';
    }
}

var name = 'Bosn',
    age = 18;
var obj = {
    name: name,
    age: age,
    getName: function() {
        return this.name;
    },
    getAge: function() {
        return this.age;
    }
}

let name = "Bosn",
    age = 18;

let obj = {
    name,
    age,
    getName() {
        return this.name;
    },
    ['get' + 'Age']() {
        return this.age;
    }
}
































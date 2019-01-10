import User from './src/AppData/User'

global.user = new User();
global.helper = {
  convertIntToVND: (intNum) => {

    if (intNum === 0) {
      //console.log(num);
      return "0 VNĐ";
    }

    var str = " VNĐ";
    var num = intNum;

    var count = 0;
    //console.log(num);
    while (num > 0) {
      if (count !== 0 && count % 3 === 0)
        str = "," + str;
      str = (num % 10).toString() + str;
      count++;
      num = parseInt(num / 10, 10);
      //console.log(num + "{" + str + "}");
    }
    if (str.length > 0 && str[0] === ',')
      str = str.slice(1, str.length);
    return str;
  }

}

let env = process.env.NODE_ENV;
let baseUrl = '/';
let baseUrl2 = '/';
let baseUrl3 = '/';
if(env != 'development') {
    baseUrl = 'https://api.ithome.com/';
    baseUrl2 = 'http://tim007.xyz:8383/';
    baseUrl3 = 'https://m.ithome.com/'
}
export { baseUrl, baseUrl2, baseUrl3}
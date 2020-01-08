export let apiurl=  "http://192.168.5.71:9527"; // 张

const url ={
    /**日志 */
    getAlllog:`${apiurl}/log/logPageList`,// 所有日志
    deleteLog:`${apiurl}/log/`,// 删除日志

}
export default url
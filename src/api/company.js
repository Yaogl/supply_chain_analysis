import request from "./request";
export function getBaseInfo(data) {
  return request({
    url: `/api/company_find`,
    method: "post",
    data
  });
}

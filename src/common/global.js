export const API_BASE_URL = "http://ajaypalsidhu.com/demo/HomeFit/api/api.php?";
export const IMAGE_PATH = "http://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/";

export const convertFormData = async (data) => {
  var formData = new FormData();
  for (var k in data) {
      formData.append(k, data[k]);
  }
  return formData;
}

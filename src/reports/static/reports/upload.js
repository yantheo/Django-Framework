Dropzone.autoDiscover = false;
const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value;
const alertBox = document.getElementById("alert-box");
const handleAlerts = (type, msg) => {
  alertBox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${msg}
    </div>
  `;
  return alertBox;
};

const mydropzone = new Dropzone("#my-awesome-dropzone", {
  method: "post",
  url: "/reports/upload/",
  init: function () {
    this.on("sending", function (file, xhr, formData) {
      console.log("sending");
      formData.append("csrfmiddlewaretoken", csrf);
    });
    this.on("success", function (file, response) {
      console.log("File uploaded successfully:", response);
      const ex = response.ex;
      if (ex) {
        handleAlerts('danger', 'File already exists')
      } else {
        handleAlerts('success', 'Your file has been uploaded!')
      }
    });
    this.on("error", function (file, response) {
      console.log("File upload error:", response);
    });
  },
  maxFiles: 3,
  maxFilesize: 3, // in MB
  acceptedFiles: ".csv",
});

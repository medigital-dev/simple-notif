const toastContainer =
  '<div aria-live="polite" aria-atomic="true" class="position-relative"><div class="toast-container p-1 position-fixed"></div></div>';

$("html body").append(toastContainer);

function fireNotif(message = "", icon = "", position = "", delay = 2000) {
  const toastElm = $(".toast-container");
  const closeBtn =
    delay == 0
      ? '<button type="button" class="btn-close btn-sm" data-bs-dismiss="toast" aria-label="Close"></button>'
      : "";
  toastElm.removeClass(
    "top-0 start-0 start-50 translate-middle-x end-0 top-50 translate-middle-y translate-middle bottom-0"
  );
  const possitionClass = positionVal(position);
  toastElm.addClass(possitionClass);

  let data = getType(icon);
  let Elm =
    '<div class="toast align-items-center border-0 mb-1 ' +
    data.class +
    '" role="alert" aria-live="assertive" aria-atomic="true">' +
    '<div class="toast-body d-flex justify-content-between">' +
    '<div class="d-flex align-items-start w-100 me-2"><span class="">' +
    data.icon +
    "</span><div class='w-100'>" +
    message +
    "</div></div>" +
    closeBtn +
    "</div>" +
    "</div>";
  toastElm.append(Elm);

  var toast = new bootstrap.Toast($(".toast:last"), {
    delay: delay,
    autohide: delay == 0 ? false : true,
  });
  toast.show();

  function getType(name) {
    let data;
    switch (name) {
      case "success":
        data = {
          class: "text-bg-success",
          icon: '<i class="fa-solid fa-check-circle me-1"></i>',
          type: "Success",
        };
        return data;
        break;

      case "error":
        data = {
          class: "text-bg-danger",
          icon: '<i class="fa-solid fa-xmark-circle me-1"></i>',
          type: "Error",
        };
        return data;
        break;
      case "warning":
        data = {
          class: "text-bg-warning",
          icon: '<i class="fa-solid fa-triangle-exclamation me-1"></i>',
          type: "Warning",
        };
        return data;
        break;

      case "question":
        data = {
          class: "text-bg-secondary",
          icon: '<i class="fa-solid fa-question-circle me-1"></i>',
          type: "Question",
        };
        return data;
        break;

      case "info":
        data = {
          class: "text-bg-info",
          icon: '<i class="fa-solid fa-info-circle me-1"></i>',
          type: "Info",
        };
        return data;
        break;

      default:
        data = {
          class: "",
          icon: "",
          type: "Info",
        };
        return data;
        break;
    }
  }

  function positionVal(id) {
    switch (id) {
      case "top-start":
        return "top-0 start-0";
        break;

      case "top-center":
        return "top-0 start-50 translate-middle-x";
        break;

      case "top-end":
        return "top-0 end-0";
        break;

      case "middle-start":
        return "top-50 start-0 translate-middle-y";
        break;

      case "middle-center":
        return "top-50 start-50 translate-middle";
        break;

      case "middle-end":
        return "top-50 end-0 translate-middle-y";
        break;

      case "bottom-start":
        return "bottom-0 start-0";
        break;

      case "bottom-center":
        return "bottom-0 start-50 translate-middle-x";
        break;

      case "bottom-end":
        return "bottom-0 end-0";
        break;

      default:
        return "top-0 end-0";
        break;
    }
  }
}

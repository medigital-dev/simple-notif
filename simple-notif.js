const toastContainer =
  '<div aria-live="polite" aria-atomic="true" class="position-relative"><div class="toast-container p-1 position-fixed"></div></div>';

$("html body").append(toastContainer);

/**
 * Menampilkan notifikasi.
 * Bisa menerima parameter sebagai objek konfigurasi atau individual parameter.
 *
 * @param {string|Object} message - Pesan notifikasi.
 * @param {Object} [icon=""] - Tipe notifikasi info|success|error|warning|question. Default ""
 * @param {string} [position=""] - Posisi notifikasi top-start|top-center|top-end|middle-start|middle-center|middle-end|bottom-start|bottom-center|bottom-end. Default top-end
 * @param {interger} [delay=2000] - Waktu notifikasi tampil (mili second). Default 2000. Jika diisi 0 maka akan tampil terus dengan tombol tutup.
 */
function toast(messageOrConfig, ...params) {
  return new Promise((resolve) => {
    let config;
    if (typeof messageOrConfig === "object") {
      if (params.length > 0) {
        console.log(
          "toast() tidak boleh memiliki parameter tambahan jika menggunakan objek konfigurasi."
        );
      }

      config = {
        message: messageOrConfig.message,
        icon: messageOrConfig.icon || "",
        position: messageOrConfig.position || "",
        delay:
          messageOrConfig.icon === "question"
            ? 0
            : messageOrConfig.delay ?? 2000,
      };
    } else {
      config = {
        message: messageOrConfig,
        icon: params[0] || "",
        position: params[1] || "",
        delay: params[0] === "question" ? 0 : params[2] ?? 2000,
      };
    }

    const toastElm = $(".toast-container");
    const closeBtn =
      config.delay == 0
        ? '<button type="button" class="btn-close btn-sm" data-bs-dismiss="toast" title="Tutup Notifikasi" aria-label="Close"></button>'
        : "";

    toastElm.removeClass(
      "top-0 start-0 start-50 translate-middle-x end-0 top-50 translate-middle-y translate-middle bottom-0"
    );

    const possitionClass = positionVal(config.position);
    toastElm.addClass(possitionClass);

    let data = getType(config.icon);

    const actionButtons =
      config.icon === "question"
        ? `<div class="mt-2 pt-2 border-top border-primary d-flex justify-content-around">
              <button class="btn btn-sm btn-outline-secondary btn-cancel" data-bs-dismiss="toast">Batal</button>
              <button class="btn btn-sm btn-outline-primary me-2 btn-yes">Ya</button>
            </div>`
        : "";

    let Elm = `<div class="toast border border-1 border-primary align-items-center mb-1 ${data.class}" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-body">
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-start w-100 me-2">
                <span>${data.icon}</span>
                <div class='w-100'>
                  ${config.message}
                  ${actionButtons}
                </div>
              </div>
              ${closeBtn}
            </div>
          </div>
        </div>`;

    toastElm.append(Elm);

    var toastElement = $(".toast:last");
    var toast = new bootstrap.Toast(toastElement, {
      delay: config.delay,
      autohide: config.delay == 0 ? false : true,
    });

    toast.show();

    if (config.icon === "question") {
      toastElement.find(".btn-yes").on("click", function () {
        toast.hide();
        resolve(true);
      });

      toastElement.find(".btn-cancel").on("click", function () {
        toast.hide();
        resolve(false);
      });
    } else {
      setTimeout(() => resolve(null), config.delay);
    }

    function getType(name) {
      let data;
      switch (name) {
        case "success":
          return {
            class: "text-bg-success",
            icon: '<i class="bi bi-check2-circle me-1"></i>',
          };
        case "error":
          return {
            class: "text-bg-danger",
            icon: '<i class="bi bi-x-circle me-1"></i>',
          };
        case "warning":
          return {
            class: "text-bg-warning",
            icon: '<i class="bi bi-exclamation-circle me-1"></i>',
          };
        case "question":
          return {
            class: "",
            icon: '<i class="bi bi-question-circle me-1"></i>',
          };
        case "info":
          return {
            class: "text-bg-info",
            icon: '<i class="bi bi-info-circle me-1"></i>',
          };
        default:
          return { class: "", icon: "" };
      }
    }

    function positionVal(id) {
      const positions = {
        "top-start": "top-0 start-0",
        "top-center": "top-0 start-50 translate-middle-x",
        "top-end": "top-0 end-0",
        "middle-start": "top-50 start-0 translate-middle-y",
        "middle-center": "top-50 start-50 translate-middle",
        "middle-end": "top-50 end-0 translate-middle-y",
        "bottom-start": "bottom-0 start-0",
        "bottom-center": "bottom-0 start-50 translate-middle-x",
        "bottom-end": "bottom-0 end-0",
      };
      return positions[id] || "bottom-0 start-50 translate-middle-x";
    }
  });
}

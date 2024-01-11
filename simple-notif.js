const toastContainer = '<div aria-live="polite" aria-atomic="true" class="position-relative"><div class="toast-container position-fixed top-0 end-0 p-2"></div></div>';

        $('html body').append(toastContainer);

        function toastFire(message, icon = 'info', delay = 5000) {

            const toastElm = $('.toast-container');
            let data = getType(icon);
            let Elm =
                '<div class="toast align-items-center ' +
                data.class +
                '" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-body"><div class="d-flex"><span id="icon" class="me-2">' +
                data.icon +
                '</span><span id="message">' +
                message +
                '</span></div></div></div>';
            toastElm.append(Elm);

            var toast = new bootstrap.Toast($('.toast:last'), {
                delay: delay
            });
            toast.show();

            function getType(name) {
                let data;
                switch (name) {
                    case 'success':
                        data = {
                            class: 'text-bg-success',
                            icon: '<i class="fa-solid fa-check-circle"></i>'
                        }
                        return data
                        break;

                    case 'error':
                        data = {
                            class: 'text-bg-danger',
                            icon: '<i class="fa-solid fa-xmark-circle"></i>'
                        }
                        return data
                        break;
                    case 'warning':
                        data = {
                            class: 'text-bg-warning',
                            icon: '<i class="fa-solid fa-triangle-exclamation"></i>'
                        }
                        return data
                        break;

                    case 'question':
                        data = {
                            class: 'text-bg-secondary',
                            icon: '<i class="fa-solid fa-question-circle"></i>'
                        }
                        return data
                        break;

                    case 'info':
                        data = {
                            class: 'text-bg-primary',
                            icon: '<i class="fa-solid fa-info-circle"></i>'
                        }
                        return data
                        break;

                    default:
                        data = {
                            class: 'text-bg-primary',
                            icon: '<i class="fa-solid fa-info-circle"></i>'
                        }
                        return data
                        break;
                }
            }
        }

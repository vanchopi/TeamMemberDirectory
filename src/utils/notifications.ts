import { Notify } from "quasar";

export function successMessage(message = "Успешно выполнено"): void {
  notification(message, "success");
}

export function errorMessage(message = "Ошибка"): void {
  notification(message, "error");
}

function notification(message: string, type: string): void {
  Notify.create({
    color: type === "error" ? "red-5" : "green-4",
    textColor: "white",
    position: "top",
    attrs: {
      role: "alertdialog",
    },
    classes: "custom-notify",
    iconSize: "12px",
    // timeout: 1000000,
    actions: [
      {
        icon: "close",
        color: "white",
        "aria-label": "Dismiss",
      },
    ],
    message: message,
  });
}
